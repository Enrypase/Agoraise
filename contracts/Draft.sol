pragma solidity ^0.8.21;

struct Campaign {
    address creator;
    string metadata;
}

contract CampaignFactory {
    function setup() external {

    }
}

contract CampaingVault {
    uint256 contributors = 0;

    mapping(address => bool) hasContributed;
    
    function deposit(address asset, uint256 amount) external {
        bool storage flag = hasContributed[msg.sender];

        if(!flag) {
            flag = true;
            contributors += 1;
        }
    }

    function withdraw(uint256 amount, address to) external {

    }

    function getContributorCount() public returns (uint256) {
        return contributors;
    }

    function extractMetadata() public {
        return "";
    }

    function extractMilestones(bool closed) external {

    }
}

error NotAllowed(address target);
error InvalidMilestone(address campaign, uint32 milestoneId);
error AlreadyResolved(address campaign, uint32 milestoneId);

// donation per milestone
// distribution strategy
contract MilestoneManager {
    mapping(address => mapping(uint32 => Milestone)) milestones;
    mapping(address => uint32) milestonesCount;

    modifier allowed(address entity) {
        if(msg.sender != entity) return NotAllowed(entity);
        _;
    }

    struct Milestone {
        uint64 start;
        uint64 deadline;
        uint256 allocation;
        address asset;
        address oracle;
        bool closed;
    }

    function setup(address campaign, Milestone memory milestone) public allowed(campaign.creator) {
        uint32 index = milestonesCount[campaign];

        milestones[campaign][index] = milestone;
        milestonesCount[campaign] += 1;
    }

    function resolve(address campaign, uint32 id) external allowed(milestone.oracle) {
        Milestone memory milestone = milestones[campaign][id];

        if(milestone.oracle == address(0)) return InvalidMilestone(campaign, id);
        if(milestone.closed) return AlreadyResolved(campaign, id);

        milestone.closed = true;
        IERC20(asset).transferFrom(milestone.campaing, milestone.campaign.creator, milestone.allocation);
    }

    function update(address campaign, uint32 id, Milestone memory updated) external allowed(milestone.oracle) {
        Milestone memory milestone = milestones[campaign][id];

        if(milestone.closed && milestone.deadline <= block.timestamp) return AlreadyResolved(campaign, id);

        milestone = updated;
    }
}

contract Tresure {
    function withdraw() external {

    }

    //send the tax to the origin
    function restore() external {

    }
}