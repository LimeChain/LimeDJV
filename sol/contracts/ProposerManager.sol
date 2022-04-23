//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract ProposerManager {
    /*
     *  Events
     */
    event ProposerAddition(address indexed proposer);
    event ProposerRemoval(address indexed proposer);

    /*
     *  Storage
     */
    mapping(address => bool) public isProposer;
    address[] public proposers;

    /*
     *  Modifiers
     */
    modifier proposerDoesNotExist(address proposer) {
        require(!isProposer[proposer], "JV: Proposer Exists");
        _;
    }

    modifier proposerExists(address proposer) {
        require(isProposer[proposer], "JV: Only Proposer");
        _;
    }

    /// @dev Allows to add a new proposer. Proposal has to be sent by wallet.
    /// @param proposer Address of new proposer.
    function _addProposer(address proposer)
        internal
        virtual
        proposerDoesNotExist(proposer)
    {
        isProposer[proposer] = true;
        proposers.push(proposer);
        emit ProposerAddition(proposer);
    }

    /// @dev Allows to remove an proposer. Proposal has to be sent by wallet.
    /// @param proposer Address of proposer.
    function _removeProposer(address proposer)
        internal
        virtual
        proposerExists(proposer)
    {
        isProposer[proposer] = false;
        for (uint256 i = 0; i < proposers.length - 1; i++)
            if (proposers[i] == proposer) {
                proposers[i] = proposers[proposers.length - 1];
                break;
            }
        proposers.pop();
        emit ProposerRemoval(proposer);
    }

    /*
     * Web3 call functions
     */

    /// @dev Returns list of proposers.
    /// @return List of voter addresses.
    function getProposers() public view returns (address[] memory) {
        return proposers;
    }
}
