import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import tw from 'twin.macro';

import { ABI,CONTRACT_ADDRESS } from '~/constants';

import { useConnectWallet } from '../../hooks/data/use-connect-wallet';


export const ButtonPart = () => {
  const [depositValue, setDepositValue] = useState('');
  const [withdrawalValue, setWithdrawalValue] = useState('');
  const [assets, setAssets] = useState('loading...');
  const { connect, isConnectError: isError } = useConnectWallet();
  
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (!isError && typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
          const address = await provider.getSigner().getAddress();

          const result = await contract.assets(address);
          setAssets(result.toString());
        }
      } catch (error) {
        console.error('컨트랙트 함수 호출 오류:', error);
      }
    };

    fetchAssets();
  }, [isError]);

  const depositButtonClick = async () => {
    try {
      if (!isError && typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        const depositAmount = ethers.utils.parseEther(depositValue);
        await contract.deposit({value : depositAmount});
      }
    } catch (error) {
      console.error('컨트랙트 함수 호출 오류:', error);
    }
  };

  const withdrawalButtonClick = async () => {
    try {
      if (!isError && typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        await contract.withdraw(parseInt(withdrawalValue) * 10000);
      }
    } catch (error) {
      console.error('컨트랙트 함수 호출 오류:', error);
    }
  };

  return (
      <Wrapper>
        <FlexWrapper>
          <DepositWrapper>
            <MyTextField type="text" 
            value={depositValue}
            onChange={(e) => setDepositValue(e.target.value)}/>
            <UnitSpan> BFC </UnitSpan>
            <MyButton onClick={depositButtonClick}>Deposit</MyButton>
          </DepositWrapper>
          <RewardWrapper>
            <MySpan>{assets}</MySpan>
            <UnitSpan> BiFi </UnitSpan>
            <MyButton>Claim</MyButton>
          </RewardWrapper>
          <WithdrawalWrapper>
            <MyTextField type="text" 
              value={withdrawalValue}
              onChange={(e) => setWithdrawalValue(e.target.value)}
              />
            <UnitSpan> % </UnitSpan>
            <MyButton onClick={withdrawalButtonClick}>Withdrawal</MyButton>
          </WithdrawalWrapper>
        </FlexWrapper>
      </Wrapper>
  );
};


const Wrapper = tw.div`
  border items-center border-gray-400 p-16 mb-16
`;

const FlexWrapper = tw.div`
  flex flex-wrap gap-16
`;

const DepositWrapper = tw.div`
  flex-1 flex items-center border-r border-gray-400 pr-32
`;

const RewardWrapper = tw.div`
  flex-1 flex items-center border-r border-gray-400 pr-32
`;

const WithdrawalWrapper = tw.div`
  flex-1 flex items-center pr-32
`;

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

const UnitSpan = tw.span`
  text-black mx-8
`;

const MySpan = tw.span`
  text-black
`;

export default ButtonPart;
