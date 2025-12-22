import numeral from "numeral";
import { useEffect, useState, useRef } from "react";
import { CopyWalletInput } from "../../components/shared/CopyInput";

import {
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
}

export const TransferModalFunds: React.FC<TransferModalFundsProps> = ({
  selectedCurrencyBalance,
  currencyName = "ETH",
  networkName = "Arbitrum",
}) => {
  const prevBalanceRef = useRef(selectedCurrencyBalance);
  const [balanceDifference, setBalanceDifference] = useState("0.00");

  useEffect(() => {
    const currentNum = numeral(selectedCurrencyBalance).value() ?? 0;
    const prevNum = numeral(prevBalanceRef.current).value() ?? 0;
    if (currentNum !== prevNum) {
      const diff = currentNum - prevNum;
      // Only show positive differences (deposits)
      setBalanceDifference(diff > 0 ? numeral(diff).format("0,0.00") : "0.00");
      prevBalanceRef.current = selectedCurrencyBalance;
    }
  }, [selectedCurrencyBalance]);
  return (
    <DepositBoxWrapper>
      <DepositTitle>
        Deposit {currencyName} ({networkName})
      </DepositTitle>

      <DepositContent>
        <p>Buy {currencyName} on Coinbase, Binance, or another exchange.</p>
        <p>
          Send/Withdraw {currencyName} to the address below and select{" "}
          {networkName} as the network.
        </p>
      </DepositContent>
      <div className="balance-received">
        {balanceDifference !== "0.00" &&
          `Received: ${balanceDifference} ${currencyName}`}
      </div>
      <CopyWalletInput />
      <SBalanceDisplay>
        {currencyName} balance:{" "}
        {numeral(selectedCurrencyBalance).format("0,0.00")}
      </SBalanceDisplay>
    </DepositBoxWrapper>
  );
};
