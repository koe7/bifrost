import tw from 'twin.macro';

export const Footer = () => {
  return (
    <Wrapper>
      <Text>© 2023 Taekeon Go. All Rights Reserved</Text>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex justify-center items-center
  bg-teal-100
  py-4
`;

const Text = tw.div`
  text-center
  font-sans text-gray-600
`;
