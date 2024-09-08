use core::starknet::ContractAddress;

struct Milestone {
    start: u64,
    deadline: u64,
    allocation: u256,
    asset: ContractAddress,
    oracle: ContractAddress,
    closed: bool
}

#[starknet::contract]
mod MilestoneManager {
    use core::starknet::{ClassHash, syscalls, SyscallResultTrait};
    use core::starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {}
}