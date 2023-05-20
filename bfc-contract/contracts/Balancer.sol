// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./BifswapV2Router02.sol";
import "./BifswapV2Pair.sol";

contract Balancer {
    // WBFC, ETH, BNB(, MATIC, BTC)
    address WBFC = 0x1745F24d85192545E5eD1c9574782d067D3Fda09;
    address ETH = 0xc83EEd1bf5464eD5383bc3342b918E08f6815950;
    address BNB = 0xCd8bf79fA84D551f2465C0a646cABc295d43Be5C;

    address BFC_SWAP = 0x5eA1fA6e03468B0BBF76811e5B163fA18636080f;

    mapping(address => uint) bfcBalance;
    mapping(address => uint) ethBalance;
    mapping(address => uint) bnbBalance;

    constructor() {
        IERC20(ETH).approve(BFC_SWAP, 2 ** 256 - 1);
        IERC20(BNB).approve(BFC_SWAP, 2 ** 256 - 1);
    }

    function deposit() external payable {
        depositAddr(msg.sender, msg.value);
    }

    function depositAddr(address addr, uint amount) internal {
        uint originEthBalance = IERC20(ETH).balanceOf(address(this));
        uint originBnbBalance = IERC20(BNB).balanceOf(address(this));

        swapEthForToken(ETH, amount / 3);
        swapEthForToken(BNB, amount / 3);

        bfcBalance[addr] += amount / 3;
        ethBalance[addr] +=
            IERC20(ETH).balanceOf(address(this)) -
            originEthBalance;
        bnbBalance[addr] +=
            IERC20(BNB).balanceOf(address(this)) -
            originBnbBalance;
    }

    function claim() external {
        // TODO : claim all $BiFi rewards
    }

    function withdraw(uint ratio) external {
        require(ratio != 0 && ratio <= 1e6, "TK: 100% is 1e6.");
        uint bfcWithdraw = (bfcBalance[msg.sender] * ratio) / 1e6;
        uint ethWithdraw = (ethBalance[msg.sender] * ratio) / 1e6;
        uint bnbWithdraw = (bnbBalance[msg.sender] * ratio) / 1e6;

        bfcBalance[msg.sender] = bfcBalance[msg.sender] - bfcWithdraw;
        ethBalance[msg.sender] = ethBalance[msg.sender] - ethWithdraw;
        bnbBalance[msg.sender] = bnbBalance[msg.sender] - bnbWithdraw;

        payable(msg.sender).transfer(bfcWithdraw);
        IERC20(ETH).transfer(msg.sender, ethWithdraw);
        IERC20(BNB).transfer(msg.sender, bnbWithdraw);
    }

    function rebalance(address addr) external {
        // A lot to be optimized X(
        uint originalBalance = address(this).balance;
        swapTokenForEth(ETH, ethBalance[addr]);
        swapTokenForEth(BNB, bnbBalance[addr]);
        uint newDeposit = bfcBalance[addr] +
            address(this).balance -
            originalBalance;
        bfcBalance[addr] = 0;
        ethBalance[addr] = 0;
        bnbBalance[addr] = 0;

        depositAddr(addr, newDeposit);
    }

    function swapEthForToken(address tokenAddr, uint amount) internal {
        address[] memory path = new address[](2);
        path[0] = WBFC;
        path[1] = tokenAddr;

        (bool success, ) = payable(BFC_SWAP).call{value: amount}(
            abi.encodeWithSignature(
                "swapExactETHForTokensSupportingFeeOnTransferTokens(uint256,address[],address,uint256)",
                0,
                path,
                address(this),
                block.timestamp + 3600
            )
        );
        require(success, "Swap execution failed.");
    }

    function swapTokenForEth(address tokenAddr, uint amount) internal {
        address[] memory path = new address[](2);
        path[0] = tokenAddr;
        path[1] = WBFC;

        IBifswapV2Router02(BFC_SWAP).swapExactTokensForETH(
            amount,
            0,
            path,
            address(this),
            block.timestamp + 3600
        );
    }

    function assets(
        address addr
    ) external view returns (uint bfc, uint eth, uint bnb) {
        bfc = bfcBalance[addr];
        eth = ethBalance[addr];
        bnb = bnbBalance[addr];
    }

    function rewards() external view returns (uint) {
        // TODO
        return 0;
    }

    receive() external payable {}
}
