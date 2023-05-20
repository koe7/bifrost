import tw from 'twin.macro';

import {AdditionalPart} from './additional-part.tsx';
import {ButtonPart} from './button-part.tsx';
import {TablePart} from './table-part.tsx';

const PortfolioPage = () => {
  return (
    <Wrapper>
      <ButtonPart/>
      <TablePart/>
      <AdditionalPart/>
    </Wrapper>
  );
};

const Wrapper = tw.div``;

const MyButton = tw.button`
  px-4 py-2
  bg-teal-500
  text-white
  font-semibold
  rounded-md
  shadow-md
  hover:bg-teal-600
  transition-colors
`;

const MyTextField = tw.input`
  px-4 py-2
  border
  border-gray-300
  rounded-md
  shadow-md
  focus:outline-none
  focus:border-teal-500
`;

const MySpan = tw.span`
  text-black
`;

const TableWrapper = tw.div``;

const AddtionalWrapper = tw.div``;

export default PortfolioPage;
