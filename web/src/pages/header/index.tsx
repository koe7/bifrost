import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { useConnectWallet } from '../../hooks/data/use-connect-wallet';

export const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const { connect, disconnect, isConnected, isConnectError: isError } = useConnectWallet();
  return (
    <Wrapper>
      <LogoAndServiceName onClick={handleLogoClick}>
        <Logo src="../../../public/cocktail.png" alt="Logo" />
        <ServiceName>CocktailBar</ServiceName>
        <Sponsor>x BIFROST</Sponsor>
      </LogoAndServiceName>
      { isConnected ?
        <WalletButton onClick={() => disconnect()} >Disconnect</WalletButton>
        : <WalletButton onClick={() => connect()} >Connect Wallet</WalletButton>
    }
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

const Sponsor = tw.p`
  text-xs ml-2 italic text-end text-black
`;

const WalletButton = tw.button`
  px-4 py-2
  bg-white text-teal-500
  font-semibold rounded-md
`;

export default Header;
