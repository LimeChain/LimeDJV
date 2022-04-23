//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./Factory.sol";
import "./JointVenture.sol";

/// @title JointVenture factory - Allows creation of Joint Ventures.
contract JointVentureFactory is Factory {
    /*
     * Public functions
     */
    /// @dev Allows verified creation of multisignature wallet.
    /// @param _owners List of initial owners.
    /// @param _required Number of required confirmations.
    /// @param _name Name of the particular JV.
    /// @param _description Description of the particular JV.
    /// @return wallet
    function create(
        string memory _name,
        string memory _description,
        address[] memory _owners,
        address[] memory _proposers,
        uint256 _required
    ) public returns (address wallet) {
        wallet = address(
            new JointVenture(
                _name,
                _description,
                _owners,
                _proposers,
                _required
            )
        );
        register(wallet);
    }
}
