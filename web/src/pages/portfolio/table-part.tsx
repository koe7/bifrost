import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import tw from 'twin.macro';

import { ABI,CONTRACT_ADDRESS } from '~/constants';

import { useConnectWallet } from '../../hooks/data/use-connect-wallet';

export const TablePart = () => {
  const [assets, setAssets] = useState([0, 0, 0]);
  const { connect, isConnectError: isError } = useConnectWallet();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (!isError && typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
          const address = await provider.getSigner().getAddress();

          const result = await contract.assets(address);
          setAssets(result.map((item: ethers.BigNumber) => (item.div(ethers.BigNumber.from(1e6)).toNumber() / 1e12).toFixed(4)));
        }
      } catch (error) {
        console.error('컨트랙트 함수 호출 오류:', error);
      }
    };

    fetchAssets();
  }, [isError]);

  const data = [
    { ticker: 'BFC', amount: assets[0], value: assets[0] * 0.1 },
    { ticker: 'ETH', amount: assets[1], value: assets[1] * 2000 },
    { ticker: 'BNB', amount: assets[2], value: assets[2] * 300 },
    { ticker: 'MATIC', amount: 0, value: 0 },
    { ticker: 'BTC', amount: 0, value: 0 },
    ];

  const totalValue = data.reduce((acc, item) => acc + item.value, 0);
  
  return (
    <Wrapper>
      <TableWrapper>
        <TableHeader>
          <TableHeaderCell>TICKER</TableHeaderCell>
          <TableHeaderCell>AMOUNT</TableHeaderCell>
          <TableHeaderCell>VALUE($)</TableHeaderCell>
          <TableHeaderCell>SHARE</TableHeaderCell>
          <TableHeaderCell>TARGET SHARE</TableHeaderCell>
          <TableHeaderCell>DIFF</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableData>{item.ticker}</TableData>
              <TableData>{item.amount}</TableData>
              <TableData>{item.value}</TableData>
              <TableData>{totalValue == 0 ? '0' : `${((item.value / totalValue) * 100).toFixed(2)}%`}</TableData>
              <TableData>{index > 2 ? "0%" : "33.33%"}</TableData>
              <TableData>{totalValue == 0 ? '0' : `${((item.value / totalValue) * 100 - (index > 2 ? 0 : TARGET_SHARE)).toFixed(2)}%`}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>
      <AdditionalWrapper></AdditionalWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  border border-gray-400 p-4 mb-4
`;

const TableWrapper = tw.div`
  overflow-x-auto
`;

const TableHeader = tw.div`
  flex
  bg-teal-500
  text-white
  font-semibold
`;

const TableHeaderCell = tw.div`
  flex-1
  px-4
  py-2
  text-lg
  text-center
`;

const TableBody = tw.div``;

const TableRow = tw.div`
  flex
`;

const TableData = tw.div`
  flex-1
  px-4
  py-2
  border-t border-gray-400
  text-lg
  text-center
`;

const AdditionalWrapper = tw.div``;

const TARGET_SHARE = 33;

export default TablePart;
