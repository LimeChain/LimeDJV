//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./Factory.sol";
import "./Greeter.sol";
/// @title JointVenture factory - Allows creation of Joint Ventures.
contract JointVentureFactory is Factory {
    /*
     * Public functions
     */
    function create(
        string memory greeting
    ) public returns (address wallet) {
        wallet = address(
            new Greeter(
                greeting
            )
        );
        register(wallet);
    }
}
