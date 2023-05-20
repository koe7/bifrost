import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';

export const AdditionalPart = () => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    // 목표 시간 설정 (예시: 현재 시간에서 10분 뒤)
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + 19946);

    // Countdown 업데이트 함수
    const updateCountdown = () => {
      const currentTime = new Date();
      const timeDiff = targetTime.getTime() - currentTime.getTime();

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setCountdown(`Until rebalancing ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
      } else {
        setCountdown('Countdown ended');
      }
    };

    // 매 초마다 Countdown 업데이트
    const interval = setInterval(updateCountdown, 1000);

    // 컴포넌트 언마운트 시 Interval 정리
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Wrapper>
      <LeftPart>
        <PnL>PnL</PnL>
        <Percentage>+15.26%</Percentage>
      </LeftPart>
      <RightPart>
        <Countdown>{countdown}</Countdown>
      </RightPart>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex items-center justify-between mr-8 ml-8
`;

const LeftPart = tw.div`
  flex items-center space-x-2
`;

const PnL = tw.div`
  font-semibold text-lg text-black
`;

const Percentage = tw.div`
  font-semibold text-lg text-green-500
`;

const RightPart = tw.div``;

const Countdown = tw.div`
  font-medium text-gray-600
`;

export default AdditionalPart;
