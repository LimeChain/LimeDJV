//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract VoterManager {
    /*
     *  Events
     */
    event VoterAddition(address indexed voter);
    event VoterRemoval(address indexed voter);
    event RequirementChange(uint256 required);

    /*
     *  Constants
     */
    uint256 public constant MAX_OWNER_COUNT = 50;

    /*
     *  Storage
     */
    mapping(address => bool) public isVoter;
    address[] public voters;
    uint256 public required;

    modifier voterDoesNotExist(address voter) {
        require(!isVoter[voter], "JV: Voter Exists");
        _;
    }

    modifier voterExists(address voter) {
        require(isVoter[voter], "JV: Only Voter");
        _;
    }

    modifier validRequirement(uint256 voterCount, uint256 _required) {
        require(
            voterCount <= MAX_OWNER_COUNT &&
                _required <= voterCount &&
                _required != 0 &&
                voterCount != 0
        );
        _;
    }

    /// @dev Allows to add a new voter. Proposal has to be sent by wallet.
    /// @param voter Address of new voter.
    function _addVoter(address voter)
        internal
        virtual
        voterDoesNotExist(voter)
    {
        isVoter[voter] = true;
        voters.push(voter);
        emit VoterAddition(voter);
    }

    /// @dev Allows to remove an voter. Proposal has to be sent by wallet.
    /// @param voter Address of voter.
    function _removeVoter(address voter) internal virtual voterExists(voter) {
        isVoter[voter] = false;
        for (uint256 i = 0; i < voters.length - 1; i++)
            if (voters[i] == voter) {
                voters[i] = voters[voters.length - 1];
                break;
            }
        voters.pop();
        if (required > voters.length) _changeRequirement(voters.length);
        emit VoterRemoval(voter);
    }

    /// @dev Allows to replace an voter with a new voter. Proposal has to be sent by wallet.
    /// @param voter Address of voter to be replaced.
    /// @param newVoter Address of new voter.
    function _replaceVoter(address voter, address newVoter)
        internal
        voterExists(voter)
        voterDoesNotExist(newVoter)
    {
        for (uint256 i = 0; i < voters.length; i++)
            if (voters[i] == voter) {
                voters[i] = newVoter;
                break;
            }
        isVoter[voter] = false;
        isVoter[newVoter] = true;
        emit VoterRemoval(voter);
        emit VoterAddition(newVoter);
    }

    /// @dev Allows to change the number of required confirmations. Proposal has to be sent by wallet.
    /// @param _required Number of required confirmations.
    function _changeRequirement(uint256 _required)
        internal
        virtual
        validRequirement(voters.length, _required)
    {
        required = _required;
        emit RequirementChange(_required);
    }
}
