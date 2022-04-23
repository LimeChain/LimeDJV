//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract VoterManager {
    uint8 public test;

    constructor() {
        test = 4;
    }

    function testa() public view returns (uint256) {
        return test;
    }
}
