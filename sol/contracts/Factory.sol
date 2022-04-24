//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Factory {
    /*
     *  Events
     */
    event ContractInstantiation(address sender, address instantiation);

    /*
     *  Storage
     */
    mapping(address => bool) public isInstantiation;
    mapping(address => address[]) public instantiations;
    address[] public allInstantiations;

    /*
     * Public functions
     */
    /// @dev Returns number of instantiations by creator.
    /// @param creator Contract creator.
    /// @return Returns number of instantiations by creator.
    function getInstantiationCount(address creator)
        public
        view
        returns (uint256)
    {
        return instantiations[creator].length;
    }

    /// @dev Returns addresses of all of instantiations by creator.
    /// @param creator Contract creator.
    /// @return Returns number of instantiations by creator.
    function getInstantiations(address creator)
        public
        view
        returns (address[] memory)
    {
        return instantiations[creator];
    }

    // todo this should be outside of the contract
    /// @dev Returns addresses of all of instantiations.
    /// @return Returns number of instantiations ever created.
    function getAllInstantiations() public view returns (address[] memory) {
        return allInstantiations;
    }

    /*
     * Internal functions
     */
    /// @dev Registers contract in factory registry.
    /// @param instantiation Address of contract instantiation.
    function register(address instantiation) internal {
        isInstantiation[instantiation] = true;
        instantiations[msg.sender].push(instantiation);
        allInstantiations.push(instantiation);
        emit ContractInstantiation(msg.sender, instantiation);
    }
}
