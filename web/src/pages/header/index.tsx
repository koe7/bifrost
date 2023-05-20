import tw from 'twin.macro';

import { useConnectWallet } from '../../hooks/data/use-connect-wallet';

export const Header = () => {
  const { connect, isConnectError: isError } = useConnectWallet();
  return (
    <Wrapper>
      <LogoAndServiceName>
        <Logo src="../../../public/cocktail.png" alt="Logo" />
        <ServiceName>CocktailBar</ServiceName>
      </LogoAndServiceName>
      <WalletButton onClick={() => connect()} >Connect Wallet</WalletButton>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex items-center justify-between
  bg-teal-500 text-white
  py-4 px-6
`;

const LogoAndServiceName = tw.div`
  text-xl font-semibold flex items-center
`;

const Logo = tw.img`
  rounded-full
  w-24 h-24
`;

const ServiceName = tw.span`
  ml-2
`;

const WalletButton = tw.button`
  px-4 py-2
  bg-white text-teal-500
  font-semibold rounded-md
`;

export default Header;
