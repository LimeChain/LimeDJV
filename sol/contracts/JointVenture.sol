//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./VoterManager.sol";
import "./ProposerManager.sol";

/// @title JointVenture contract represented as Multisig wallet - Allows multiple parties to agree on proposals before execution.
contract JointVenture is VoterManager, ProposerManager {
    using Address for address payable;
    /*
     *  Events
     */
    event Confirmation(address indexed sender, uint256 indexed proposalId);
    event Revocation(address indexed sender, uint256 indexed proposalId);
    event Submission(uint256 indexed proposalId);
    event Execution(uint256 indexed proposalId);
    event ExecutionFailure(uint256 indexed proposalId);
    event Deposit(address indexed sender, uint256 value);
    event RevenueSplit(uint256 revenue, address[] voters);

    /*
     *  Storage
     */
    string public name;
    string public description;

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public confirmations;

    uint256 public proposalCount;

    struct Proposal {
        address destination;
        uint256 value;
        bytes data;
        bool executed;
    }

    /*
     *  Modifiers
     */
    modifier onlyJointVenture() {
        require(msg.sender == address(this), "JV: Only JV");
        _;
    }

    modifier voterOrProposer(address sender) {
        require(
            isVoter[sender] || isProposer[sender],
            "JV: Nor Voter or Proposer"
        );
        _;
    }

    modifier proposalExists(uint256 proposalId) {
        require(
            proposals[proposalId].destination != address(0),
            "JV: Tx Exists"
        );
        _;
    }

    modifier confirmed(uint256 proposalId, address voter) {
        require(confirmations[proposalId][voter], "JV: Tx not confirmed");
        _;
    }

    modifier notConfirmed(uint256 proposalId, address voter) {
        require(!confirmations[proposalId][voter], "JD: Tx confirmed");
        _;
    }

    modifier notExecuted(uint256 proposalId) {
        require(!proposals[proposalId].executed, "JV: Tx executed");
        _;
    }

    modifier notNull(address _address) {
        require(_address != address(0), "JV: 0x address!");
        _;
    }

    /// @dev Fallback function allows to deposit ether.
    receive() external payable {
        if (msg.value > 0) emit Deposit(msg.sender, msg.value);
    }

    /*
     * Public functions
     */
    /// @dev Contract constructor sets initial voters and required number of confirmations.
    /// @param _name Name of the particular JV.
    /// @param _description Description of the particular JV.
    /// @param _voters List of initial voters.
    /// @param _proposers List of initial proposers.
    /// @param _required Number of required confirmations.
    constructor(
        string memory _name,
        string memory _description,
        address[] memory _voters,
        address[] memory _proposers,
        uint256 _required
    ) validRequirement(_voters.length, _required) {
        for (uint256 i = 0; i < _voters.length; i++) {
            require(!isVoter[_voters[i]] && _voters[i] != address(0));
            isVoter[_voters[i]] = true;
        }

        for (uint256 i = 0; i < _proposers.length; i++) {
            require(!isProposer[_proposers[i]] && _proposers[i] != address(0));
            isProposer[_proposers[i]] = true;
        }
        voters = _voters;
        proposers = _proposers;
        required = _required;
        name = _name;
        description = _description;
    }

    /// @dev Allows to add a new voter. Proposal has to be sent by wallet.
    /// @param voter Address of new voter.
    function addVoter(address voter)
        public
        onlyJointVenture
        notNull(voter)
        validRequirement(voters.length + 1, required)
    {
        _addVoter(voter);
    }

    /// @dev Allows to remove an voter. Proposal has to be sent by wallet.
    /// @param voter Address of voter.
    function removeVoter(address voter) public onlyJointVenture {
        _removeVoter(voter);
    }

    /// @dev Allows to add a new proposer. Proposal has to be sent by wallet.
    /// @param proposer Address of new proposer.
    function addProposer(address proposer)
        public
        onlyJointVenture
        notNull(proposer)
    {
        _addProposer(proposer);
    }

    /// @dev Allows to remove an proposer. Proposal has to be sent by wallet.
    /// @param proposer Address of proposer.
    function removeProposer(address proposer) public onlyJointVenture {
        _removeProposer(proposer);
    }

    /// @dev Allows to replace an voter with a new voter. Proposal has to be sent by wallet.
    /// @param voter Address of voter to be replaced.
    /// @param newVoter Address of new voter.
    function replaceVoter(address voter, address newVoter)
        public
        onlyJointVenture
    {
        _replaceVoter(voter, newVoter);
    }

    /// @dev Allows to change the number of required confirmations. Proposal has to be sent by wallet.
    /// @param _required Number of required confirmations.
    function changeRequirement(uint256 _required) public onlyJointVenture {
        _changeRequirement(_required);
    }

    /// @dev Allows an voter to submit and confirm a proposal.
    /// @param destination Proposal target address.
    /// @param value Proposal ether value.
    /// @param data Proposal data payload.
    /// @return proposalId
    function submitProposal(
        address destination,
        uint256 value,
        bytes calldata data
    ) public voterOrProposer(msg.sender) returns (uint256 proposalId) {
        proposalId = addProposal(destination, value, data);
    }

    /// @dev Allows an voter to confirm a proposal.
    /// @param proposalId Proposal ID.
    function confirmProposal(uint256 proposalId)
        public
        voterExists(msg.sender)
        proposalExists(proposalId)
        notConfirmed(proposalId, msg.sender)
    {
        confirmations[proposalId][msg.sender] = true;
        emit Confirmation(msg.sender, proposalId);
        executeProposal(proposalId);
    }

    /// @dev Allows an voter to revoke a confirmation for a proposal.
    /// @param proposalId Proposal ID.
    function revokeConfirmation(uint256 proposalId)
        public
        voterExists(msg.sender)
        confirmed(proposalId, msg.sender)
        notExecuted(proposalId)
    {
        confirmations[proposalId][msg.sender] = false;
        emit Revocation(msg.sender, proposalId);
    }

    /// @dev Allows anyone to execute a confirmed proposal.
    /// @param proposalId Proposal ID.
    function executeProposal(uint256 proposalId)
        public
        voterExists(msg.sender)
        confirmed(proposalId, msg.sender)
        notExecuted(proposalId)
    {
        if (isConfirmed(proposalId)) {
            Proposal storage txn = proposals[proposalId];
            txn.executed = true;
            if (
                external_call(
                    txn.destination,
                    txn.value,
                    txn.data.length,
                    txn.data
                )
            ) emit Execution(proposalId);
            else {
                emit ExecutionFailure(proposalId);
                txn.executed = false;
            }
        }
    }

    // call has been separated into its own function in order to take advantage
    // of the Solidity's code generator to produce a loop that copies tx.data into memory.
    function external_call(
        address destination,
        uint256 value,
        uint256 dataLength,
        bytes memory data
    ) internal returns (bool) {
        bool result;

        assembly {
            let x := mload(0x40) // "Allocate" memory for output (0x40 is where "free memory" pointer is stored by convention)
            let d := add(data, 32) // First 32 bytes are the padded length of data, so exclude that
            result := call(
                sub(gas(), 34710), // 34710 is the value that solidity is currently emitting
                // It includes callGas (700) + callVeryLow (3, to pay for SUB) + callValueTransferGas (9000) +
                // callNewAccountGas (25000, in case the destination address does not exist and needs creating)
                destination,
                value,
                d,
                dataLength, // Size of the input (in bytes) - this is what fixes the padding problem
                x,
                0 // Output is ignored, therefore the output size is zero
            )
        }
        return result;
    }

    /// @dev Returns the confirmation status of a proposal.
    /// @param proposalId Proposal ID.
    /// @return Confirmation status.
    function isConfirmed(uint256 proposalId) public view returns (bool) {
        uint256 count = 0;
        for (uint256 i = 0; i < voters.length; i++) {
            if (confirmations[proposalId][voters[i]]) count += 1;
            if (count == required) return true;
        }
    }

    function splitRevenue(address token) external payable onlyJointVenture {
        uint256 revenue = getRevenueSplit(token);

        require(revenue > 0, "JV: Nothing to split");

        if (token == address(0)) {
            for (uint256 i = 0; i < voters.length; i++) {
                address payable voter = payable(voters[i]);
                payable(voter).sendValue(revenue);
            }
        } else {
            for (uint256 i = 0; i < voters.length; i++) {
                IERC20(token).transfer(voters[i], revenue);
            }
        }

        emit RevenueSplit(revenue, voters);
    }

    /*
     * Internal functions
     */
    /// @dev Adds a new proposal to the proposal mapping, if proposal does not exist yet.
    /// @param destination Proposal target address.
    /// @param value Proposal ether value.
    /// @param data Proposal data payload.
    /// @return proposalId
    function addProposal(
        address destination,
        uint256 value,
        bytes calldata data
    ) internal notNull(destination) returns (uint256 proposalId) {
        proposalId = proposalCount;
        proposals[proposalId] = Proposal({
            destination: destination,
            value: value,
            data: data,
            executed: false
        });
        proposalCount += 1;
        emit Submission(proposalId);
    }

    /*
     * Web3 call functions
     */
    /// @dev Returns number of confirmations of a proposal.
    /// @param proposalId Proposal ID.
    /// @return count - Number of confirmations.
    function getConfirmationCount(uint256 proposalId)
        public
        returns (uint256 count)
    {
        for (uint256 i = 0; i < voters.length; i++)
            if (confirmations[proposalId][voters[i]]) count += 1;
    }

    /// @dev Returns total number of proposals after filers are applied.
    /// @param pending Include pending proposals.
    /// @param executed Include executed proposals.
    /// @return count - Total number of proposals after filters are applied.
    function getProposalCount(bool pending, bool executed)
        public
        returns (uint256 count)
    {
        for (uint256 i = 0; i < proposalCount; i++)
            if (
                (pending && !proposals[i].executed) ||
                (executed && proposals[i].executed)
            ) count += 1;
    }

    /// @dev Returns list of voters.
    /// @return List of voter addresses.
    function getVoters() public view returns (address[] memory) {
        return voters;
    }

    /// @dev Returns list of proposers.
    /// @return List of voter addresses.
    function getProposers() public view returns (address[] memory) {
        return proposers;
    }

    /// @dev Returns array with voter addresses, which confirmed proposal.
    /// @param proposalId Proposal ID.
    /// @return _confirmations - array of voter addresses.
    function getConfirmations(uint256 proposalId)
        public
        view
        returns (address[] memory _confirmations)
    {
        address[] memory confirmationsTemp = new address[](voters.length);
        uint256 count = 0;
        uint256 i;
        for (i = 0; i < voters.length; i++)
            if (confirmations[proposalId][voters[i]]) {
                confirmationsTemp[count] = voters[i];
                count += 1;
            }
        _confirmations = new address[](count);
        for (i = 0; i < count; i++) _confirmations[i] = confirmationsTemp[i];
    }

    /// @dev Returns list of proposal IDs in defined range.
    /// @param from Index start position of proposal array.
    /// @param to Index end position of proposal array.
    /// @param pending Include pending proposals.
    /// @param executed Include executed proposals.
    /// @return _proposalIds - array of proposal IDs.
    function getProposalIds(
        uint256 from,
        uint256 to,
        bool pending,
        bool executed
    ) public view returns (uint256[] memory _proposalIds) {
        uint256[] memory proposalIdsTemp = new uint256[](proposalCount);
        uint256 count = 0;
        uint256 i;
        for (i = 0; i < proposalCount; i++)
            if (
                (pending && !proposals[i].executed) ||
                (executed && proposals[i].executed)
            ) {
                proposalIdsTemp[count] = i;
                count += 1;
            }
        _proposalIds = new uint256[](to - from);
        for (i = from; i < to; i++) _proposalIds[i - from] = proposalIdsTemp[i];
    }

    // todo this function must be taken outside of the contract. Here for POC
    /// @dev Returns list of proposal IDs in defined range.
    /// @param from Index start position of proposal array.
    /// @param to Index end position of proposal array.
    /// @param pending Include pending proposals.
    /// @param executed Include executed proposals.
    /// @return _proposals - array of proposals.
    function getProposals(
        uint256 from,
        uint256 to,
        bool pending,
        bool executed
    ) public view returns (Proposal[] memory _proposals) {
        uint256[] memory proposalIdsTemp = new uint256[](proposalCount);
        uint256 count = 0;
        uint256 i;
        for (i = 0; i < proposalCount; i++)
            if (
                (pending && !proposals[i].executed) ||
                (executed && proposals[i].executed)
            ) {
                proposalIdsTemp[count] = i;
                count += 1;
            }
        _proposals = new Proposal[](to - from);
        for (i = from; i < to; i++)
            _proposals[i - from] = proposals[proposalIdsTemp[i]];
    }

    /// @dev Returns split of revenue for each voter based on the current balance in the contract
    /// @param token token which funds will be split from.
    /// @return split - amount which each voter will receive.
    function getRevenueSplit(address token)
        public
        view
        returns (uint256 split)
    {
        if (token == address(0)) {
            if (address(this).balance > 0) {
                return address(this).balance / voters.length;
            }
        } else if (IERC20(token).balanceOf(address(this)) > 0) {
            return IERC20(token).balanceOf(address(this)) / voters.length;
        }
    }
}
