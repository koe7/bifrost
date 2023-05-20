import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

export const MainPage = () => {
  const navigate = useNavigate();

  const handleGoClick = () => {
    navigate('/portfolio/0');
  };

  return (
    <Wrapper>
      <Box>
        <Title>Major Coins</Title>
        <Description>
          <InfoWrapper>
            <InfoText>TVL:</InfoText>
            <InfoValue>$10M</InfoValue>
          </InfoWrapper>
          <InfoWrapper>
            <InfoText>1Y PnL:</InfoText>
            <InfoValue>+48.1%</InfoValue>
          </InfoWrapper>
        </Description>
        <Button onClick={handleGoClick}>Go</Button>
      </Box>
      <Box>
        <Title>{"Satoshi's Hidden Portfolio"}</Title>
        <DisabledButton disabled>Coming soon..</DisabledButton>
      </Box>
      <Box>
        <Title>Add your own portfolio</Title>
        <DisabledButton disabled>+</DisabledButton>
      </Box>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex justify-start
  w-full h-1/2 space-x-4
`;

const Box = tw.div`
  flex flex-col items-center justify-center
  w-1/4 h-1/4 p-12 m-12
  bg-gray-200 rounded-md
  h-full
`;

const Title = tw.h2`
  text-2xl font-bold mb-4
`;

const Description = tw.div`
  text-lg mb-4
`;

const InfoWrapper = tw.div`
  flex items-center mb-2
`;

const InfoText = tw.p`
  text-base font-semibold mr-2
`;

const InfoValue = tw.p`
  text-base
`;

const Button = tw.button`
  px-4 py-2 mt-auto w-full
  bg-blue-500 text-white rounded-md
  hover:bg-blue-600 transition-colors
`;

const DisabledButton = tw.button`
  px-4 py-2 mt-auto w-full
  bg-blue-200 text-white rounded-md
  cursor-not-allowed
`;

export default MainPage;
