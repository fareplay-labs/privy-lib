import React from "react";
import { motion } from "framer-motion";

export const transferReadMoreText = [
  "Deposit funds into your wallet from Coinbase, Binance or whichever exchange you hold your crypto on.",
  "You control the wallet that your funds go to. Fareplay has no access to your funds and cannot block withdrawals.",
  "Fareplay will never ask for your identification (no KYC).",
];

export const depositReadMoreText = [
  "Deposit funds into your wallet with Visa, Mastercard, Apple Pay or Google Pay.",
  "Powered by Coinbase, the world's largest and most trusted crypto on-ramp.",
  "Previous Coinbase users will not be asked to repeat KYC.",
];

export const descriptionDetails = (i: number, text: string): JSX.Element => {
  return (
    <motion.p
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={{ type: "spring", stiffness: 100 }}
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.25" }}
    >
      {text}
    </motion.p>
  );
};
