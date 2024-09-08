pragma solidity ^0.8.21;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

struct Campaign {
    address creator;
    string metadata;
}

struct Milestone {
        uint64 start;
        uint64 deadline;
        uint256 allocation;
        address asset;
        address oracle;
        bool closed;
}

contract CampaignFactory {
    function setup(address milestoneManager, Campaign calldata metadata) external returns (address) {
        return address(new CampaignVault(milestoneManager, metadata));
    }
}

interface Vault {
    function deposit(address, uint256, uint[] calldata) external;
}

error BadMilestoneTiming(address, uint32);

contract CampaignVault is Vault {
    uint256 internal contributors;
    MilestoneManager public manager;
    Campaign public campaignMetadata;

    constructor(address milestoneManager, Campaign memory metadata) {
        contributors = 0;
        manager = MilestoneManager(milestoneManager);
        campaignMetadata = metadata;
    }

    mapping(address => bool) contributed;

    function deposit(address asset, uint256 amount, uint[] calldata hint) external {
        _deposit(asset, amount, hint);
    }

    function depositIntoMilestone(address asset, uint256 amount, uint32 id) external {
        if(!isDepositWindowOpenForMilestone(id)) revert BadMilestoneTiming(address(this), id);
        
        uint total = manager.enumerate(address(this)).length;
        uint256[] memory hint = new uint256[](total);

        hint[id] = 100;
        _deposit(asset, amount, hint);

        delete hint;
    }

    function isDepositWindowOpenForMilestone(uint32 id) public view returns (bool) {
        Milestone memory milestone = manager.getById(address(this), id);

        return milestone.start <= block.timestamp && 
               milestone.deadline > block.timestamp && 
               !milestone.closed;
    }

    function getContributorCount() public view returns (uint256) {
        return contributors;
    }

    function extractMetadata() public view returns (Campaign memory) {
        return campaignMetadata;
    }

    function listMilestones() public view returns (Milestone[] memory) {
        return manager.enumerate(address(this));
    }

    function _distribute(address asset, uint amount, uint[] memory hint) internal {
        manager.rebalance(address(this), asset, amount, hint);
    }

    function _deposit(address asset, uint256 amount, uint[] memory hint) internal {
        bool flag = contributed[msg.sender];

        if(!flag) {
            contributed[msg.sender] = true;
            contributors += 1;
        }

        IERC20(asset).approve(address(manager), type(uint256).max);
        _distribute(asset, amount, hint);
    }
}

error NotAllowed(address target);
error InvalidMilestone(address campaign, uint32 milestoneId);
error AlreadyResolved(address campaign, uint32 milestoneId);
error BadDistributionHint(address campaign, uint[] hint);

// donation per milestone
// distribution strategy
contract MilestoneManager {
    uint256 internal ORACLE_TAX;
    uint256 internal PROTOCOL_TAX;

    address public treasury;

    mapping(address => mapping(uint32 => Milestone)) milestones;
    mapping(address => uint32) milestonesCount;

    modifier allowed(address entity) {
        if(msg.sender != entity) revert NotAllowed(entity);
        _;
    }

    modifier vault {
        if(msg.sender.code.length == 0 || 
           !ERC165(msg.sender).supportsInterface(type(Vault).interfaceId)) 
        revert NotAllowed(msg.sender);
        _;
    }

    function setup(address campaign, Milestone memory milestone) external allowed(CampaignVault(campaign).extractMetadata().creator) {
        uint32 index = milestonesCount[campaign];

        milestones[campaign][index] = milestone;
        milestonesCount[campaign] += 1;
    }

    function resolve(address campaign, uint32 id) external allowed(milestones[campaign][id].oracle) {
        Milestone memory milestone = milestones[campaign][id];
        address creator = CampaignVault(campaign).extractMetadata().creator;

        if(milestone.oracle == address(0)) revert InvalidMilestone(campaign, id);
        if(milestone.closed) revert AlreadyResolved(campaign, id);

        milestone.closed = true;

        (uint protocolTax, uint oracleTax, uint leftover) = _deductTax(milestone.allocation);

        IERC20(milestone.asset).transferFrom(campaign, treasury, protocolTax);
        IERC20(milestone.asset).transferFrom(campaign, milestone.oracle, oracleTax);
        IERC20(milestone.asset).transferFrom(campaign, creator, leftover);
    }

    function update(address campaign, uint32 id, Milestone calldata updated) external allowed(milestones[campaign][id].oracle) {
        Milestone storage milestone = milestones[campaign][id];

        if(milestone.closed) revert AlreadyResolved(campaign, id);

        milestone.start = updated.start;
        milestone.deadline = updated.deadline;
        milestone.asset = updated.asset;
        milestone.allocation = updated.allocation;
        milestone.oracle = updated.oracle;
        milestone.closed = updated.closed;
    }

    function rebalance(address campaign, address asset, uint amount, uint[] calldata hint) external vault {
        uint hints = hint.length;
        uint milestonesTotal = milestonesCount[campaign];
        
        if(hints != milestonesTotal) revert BadDistributionHint(campaign, hint);

        uint cumulativeAmount = 0;

        for(uint32 i = 0; i < milestonesTotal;) {
            Milestone storage milestone = milestones[campaign][i];
            uint additiveAmount = (amount * hint[i]) / 1e2; 
            
            milestone.allocation += additiveAmount;
            cumulativeAmount += additiveAmount;

            unchecked {
                i++;
            }
        }

        if(cumulativeAmount != amount) revert BadDistributionHint(campaign, hint);
    }

    function enumerate(address campaign) public view returns (Milestone[] memory list) {
        uint total = milestonesCount[campaign];

        for(uint32 i = 0; i < total;) {
            list[i] = milestones[campaign][i];

            unchecked {
                i++;
            }
        }
    }

    function getById(address campaign, uint32 id) public view returns (Milestone memory) {
        return milestones[campaign][id];
    }

    function _deductTax(uint amount) internal view returns (uint, uint, uint) {
        uint protocolTax = (amount * PROTOCOL_TAX) / 1e18;
        uint oracleTax = (amount * ORACLE_TAX) / 1e18;
        uint leftover = amount - protocolTax - oracleTax;

        return (protocolTax, oracleTax, leftover);
    }
}