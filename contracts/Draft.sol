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
    function setup() external {

    }
}

interface Vault {
    function deposit(address, uint256, uint[] calldata) external;
    function withdraw(uint256, address) external;
}

contract CampaignVault is Vault {
    uint256 public contributors;
    MilestoneManager public manager;
    Campaign public campaignMetadata;

    mapping(address => bool) contributed;

    function deposit(address asset, uint256 amount, uint[] calldata hint) external {
        bool flag = contributed[msg.sender];

        if(!flag) {
            contributed[msg.sender] = true;
            contributors += 1;
        }

        _distribute(asset, amount, hint);
    }

    function withdraw(uint256 amount, address to) external {

    }

    function isDepositWindowOpenForMilestone(uint32 id) public returns (bool) {
        Milestone memory milestone = manager.getById(address(this), id);

        return milestone.start <= block.timestamp && milestone.deadline > block.timestamp;
    }

    function getContributorCount() public returns (uint256) {
        return contributors;
    }

    function extractMetadata() public returns (Campaign memory) {
        return campaignMetadata;
    }

    function listMilestones() public returns (Milestone[] memory) {
        return manager.enumerate(address(this));
    }

    function _distribute(address asset, uint amount, uint[] calldata hint) internal {
        manager.rebalance(address(this), asset, amount, hint);
    }
}

error NotAllowed(address target);
error InvalidMilestone(address campaign, uint32 milestoneId);
error AlreadyResolved(address campaign, uint32 milestoneId);
error BadDistributionHint(address campaing, uint[] hint);

// donation per milestone
// distribution strategy
contract MilestoneManager {
    mapping(address => mapping(uint32 => Milestone)) milestones;
    mapping(address => uint32) milestonesCount;

    modifier allowed(address entity) {
        if(msg.sender != entity) revert NotAllowed(entity);
        _;
    }

    modifier vault(address entity) {
        if(msg.sender.code.length == 0 || 
           !ERC165(msg.sender).supportsInterface(type(Vault).interfaceId)) 
        revert NotAllowed(entity);
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
        IERC20(milestone.asset).transferFrom(campaign, creator, milestone.allocation);
    }

    function update(address campaign, uint32 id, Milestone memory updated) external allowed(milestones[campaign][id].oracle) {
        Milestone memory milestone = milestones[campaign][id];

        if(milestone.closed) revert AlreadyResolved(campaign, id);

        milestone = updated;
    }

    function rebalance(address campaign, address asset, uint amount, uint[] calldata hint) external vault(campaign) {
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

    function enumerate(address campaign) public returns (Milestone[] memory list) {
        uint total = milestonesCount[campaign];

        for(uint32 i = 0; i < total;) {
            list[i] = milestones[campaign][i];

            unchecked {
                i++;
            }
        }
    }

    function getById(address campaing, uint32 id) public returns (Milestone memory) {
        return milestones[campaing][id];
    }
}

contract Treasure {
    function withdraw() external {

    }

    //send the tax to the origin
    function restore() external {

    }
}