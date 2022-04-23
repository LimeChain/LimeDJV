//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    uint256 public INITIAL_SUPPLY = 2000000; //2 Millions

    constructor() ERC20("MockToken", "MOCK") {
        _mint(msg.sender, INITIAL_SUPPLY * 10**18);
    }

    function mint(address _to, uint256 _amount) external {
        _mint(_to, _amount);
    }
}
