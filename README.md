LimeDJV is a framework for decentralized joint ventures between DAOs. 

## Overview

The goal of this project is to create a framework where two or more DAOs can have a Joint Venture. A Joint Venture is a partnership where the participants agree on progressing (developing, designing, marketing etc.) a product together and sharing the proceeds of it. This is quite a common occurrence in the traditional corporate world and it would make sense for DAOs to have joint ventures on products that lie in the intersections between their domains.

Participating DAOs get a pre-defined revenue split of the JV profits that can be adjusted through a vote.

The framework consists of a single smart contract that governs the decision making and revenue splitting.

## Features

### General

- Ability to specify 2 DAOs (called voters) with equal rights
- Ability to change voters and proposers - only through a vote
- The system should be able to work regardless of the type of governance for the DAO (Governor Bravo, Snapshot + Multisig, Barn-style DAO, or else)

### Voting

- Ability to specify proposers - proposers and voters can propose, but only voters can vote.
- Ability to change voters and proposers - only through a vote.
- Ability to propose an execution - should have multiple (up to 10) targets, calldata-s and values. Can be done by proposer or voter.
- Ability to vote on executing the proposal or rejecting the proposal.
    - If the proposal reaches majority votes (2 out of the 2), this should also execute the transaction(s).

### Revenue splits

- Ability to receive ETH and ERC20(thats a given) in the Joint Venture contracts.
- Ability to trigger an equal split for the outstanding balance of ETH.
- Ability to trigger an equal split for the outstanding balance of ERC20 specified by its token address.

### User Experience

- Ability for the client side applications of the Joint Ventures app to help the DAOs with the creation of their DAO vote parameters (target, value, calldata).
