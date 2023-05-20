import tw from 'twin.macro';

export const TablePart = () => {
  const data = [
    { ticker: 'BFC', amount: 100, value: 5000 },
    { ticker: 'ETH', amount: 50, value: 10000 },
    { ticker: 'BNB', amount: 200, value: 15000 },
    { ticker: 'MATIC', amount: 150, value: 7500 },
    { ticker: 'BTC', amount: 30, value: 30000 },
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
              <TableData>{`${((item.value / totalValue) * 100).toFixed(2)}%`}</TableData>
              <TableData>20%</TableData>
              <TableData>{`${((item.value / totalValue) * 100 - TARGET_SHARE).toFixed(2)}%`}</TableData>
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

const TARGET_SHARE = 20; // Set your desired target share percentage here

export default TablePart;
