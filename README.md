# Agoraise

Agoraise is a community-focused fundraising web app that prioritizes security and transparency. It empowers users to make decisions while adding a new dimension to social media engagement.

## Keywords:

- Community: supporters and followers of a project are directly involved in its life
- Mass Adoption: leveraging starknet support for account abstraction we aim to have zero registration barriers for any user
- Layer 2: definitely not the layer 2 you think. We don't aim to replace any social media in existence. We want to add functionalities on top of it. Allow your SM followers to interact with your project in one **_two actually_** click.
- Transparency: raising money is a challenge for new people. At Agoraise we want the donators not worry about any scams or shady activities. Everything is transparent by design. If the majority of the donators want to have their money back they will have them. Without any fee.
- Semplicity: the last but not least keyword. We don't want to have people taking hours to understand how to donate or raise money. Start to raise money in 5 minutes! As simple as that.

Additional info: `Work In Progress`

Video: `Work In Progress`

Made during ETHWarsaw 2024 hackathon

## Deployments
Accepting technical challenges related to account abstraction and related infrastructure, it was decided to conduct deployments on Sei EVM and Aleph Zero EVM networks.
|Name|   Address   | Sei EVM Devnet | Aleph0 EVM Testnet |
|-----------|--------|----------|-------------|
|EntryPoint|0x2a858e44dF145C405c81d1C2BC46AEB74878c1a7| *Failed (EIP-170)*| [Explorer](https://evm-explorer-testnet.alephzero.org/address/0x2a858e44dF145C405c81d1C2BC46AEB74878c1a7) |
|Singletone Paymaster V7|0xB2AA7F204b579CF4899239B0648DbFC7666A1d9e|[SeiTrace](https://seitrace.com/address/0xB2AA7F204b579CF4899239B0648DbFC7666A1d9e?chain=arctic-1&page=1&next_page_params=%257B%257D)|[Explorer](https://evm-explorer-testnet.alephzero.org/address/0xB2AA7F204b579CF4899239B0648DbFC7666A1d9e)|
|CampaignFactory|0xB72E172F5De80727c3D9f4435C3338E1Ee5A5b23|[SeiTrace](https://seitrace.com/address/0xB72E172F5De80727c3D9f4435C3338E1Ee5A5b23?chain=arctic-1&page=1&next_page_params=%257B%257D)|[Explorer](https://evm-explorer-testnet.alephzero.org/address/0xB72E172F5De80727c3D9f4435C3338E1Ee5A5b23)|
|MilestoneManager|0x14AFfECbAc564E56Dc0fb7a1aE6F4eB7B1cc01Cf|[SeiTrace](https://seitrace.com/address/0x14AFfECbAc564E56Dc0fb7a1aE6F4eB7B1cc01Cf?chain=arctic-1&page=1&next_page_params=%257B%257D)|[Explorer](https://evm-explorer-testnet.alephzero.org/address/0x14AFfECbAc564E56Dc0fb7a1aE6F4eB7B1cc01Cf)|
|CampaignVault|0xd15361cCB4dD2e30C079641C4F78480608F94636|[SeiTrace](https://seitrace.com/address/0xd15361cCB4dD2e30C079641C4F78480608F94636?chain=arctic-1&page=1&next_page_params=%257B%257D)|[Explorer](https://evm-explorer-testnet.alephzero.org/address/0xd15361cCB4dD2e30C079641C4F78480608F94636)|

Despite the smart contracts, a set of tools (bundler, node and RPC server) have been installed on a VM kindly provided by [**dbForest**](https://dbForest.org);

## Acknowledgement
This project relies on repositories developed, supported and maintained (fully or partially) by open source communities.
Specifically, next libraries/tools were explored and inspired by:
- [**Account Abstraction**](https://github.com/eth-infinitism/account-abstraction) - Implementation of contracts for ERC-4337 account abstraction via alternative mempool.
- [**Singletone Paymaster**](https://github.com/pimlicolabs/singleton-paymaster) - an ERC-4337 paymaster implementation that allows users to sponsor their gas fees either with ERC-20 tokens
- [**Silius**](https://github.com/silius-rs/silius) - ERC-4337 (Account Abstraction) bundler implementation in Rust.
- [**Rundler**](https://github.com/alchemyplatform/rundler) - High-performance, modular implementation of an ERC-4337 bundler