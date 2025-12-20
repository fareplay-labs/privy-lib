import numeral from "numeral";
import { useEffect, useState } from "react";
import {
  BubbleWrapper,
  DepositBoxWrapper,
  DepositContent,
  DepositTitle,
  SBalanceDisplay,
} from "../styles";

export interface TransferModalFundsProps {
  selectedCurrencyBalance: number | string;
  CopyWalletInputComponent?: React.ReactNode;
  currencyName?: string;
  networkName?: string;
  currencyIcon?: string;
  networkLogo?: string;
  coinbaseIcon?: string;
  binanceIcon?: string;
  krakenIcon?: string;
}

export const TransferModalFunds: React.FC<TransferModalFundsProps> = ({
  selectedCurrencyBalance,
  CopyWalletInputComponent,
  currencyName = "ETH",
  networkName = "Arbitrum",
  currencyIcon = "/icons/eth.svg",
  networkLogo = "/icons/arbitrum.svg",
  coinbaseIcon = "/icons/coinbase.svg",
  binanceIcon = "/icons/binance.svg",
  krakenIcon = "/icons/kraken.svg",
}) => {
  const [prevBalance, setPrevBalance] = useState(selectedCurrencyBalance);
  const [balanceDifference, setBalanceDifference] = useState("0.00");

  useEffect(() => {
    const currentNum = numeral(selectedCurrencyBalance).value() ?? 0;
    const prevNum = numeral(prevBalance).value() ?? 0;
    if (currentNum !== prevNum) {
      const diff = currentNum - prevNum;
      // Only show positive differences (deposits)
      setBalanceDifference(diff > 0 ? numeral(diff).format("0,0.00") : "0.00");
      setPrevBalance(selectedCurrencyBalance);
    }
  }, [selectedCurrencyBalance, prevBalance]);
  
  return (
    <DepositBoxWrapper>
      <DepositTitle>
        Deposit {currencyName} ({networkName})
      </DepositTitle>
      <BubbleWrapper>
        <img src={coinbaseIcon} width={18} alt="coinbase logo" />
        <img src={binanceIcon} width={18} alt="binance logo" />
        <img src={krakenIcon} width={18} alt="kraken logo" />
      </BubbleWrapper>
      <DepositContent>
        <p>
          Buy {currencyName} on Coinbase, Binance, or another exchange.
          <BubbleWrapper className="currencyBubble">
            <img src={currencyIcon} width={14} alt={currencyName} />{" "}
            {currencyName}
          </BubbleWrapper>
        </p>
        <p>
          Send/Withdraw {currencyName} to the address below and select{" "}
          {networkName} as the network.
          <BubbleWrapper className="arbitrumBubble">
            <img src={networkLogo} width={14} alt="network logo" />
            {networkName}
          </BubbleWrapper>
        </p>
      </DepositContent>
      <div className="balance-received">
        {balanceDifference !== "0.00" &&
          `Received: ${balanceDifference} ${currencyName}`}
      </div>
      {CopyWalletInputComponent}
      <SBalanceDisplay>
        {currencyName} balance:{" "}
        {numeral(selectedCurrencyBalance).format("0,0.00")}
      </SBalanceDisplay>
    </DepositBoxWrapper>
  );
};
