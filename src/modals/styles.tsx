import styled from "styled-components";
import { Button } from "../components/shared/Button";
import { motion } from "framer-motion";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: justify;
`;

export const Container = styled.div<{ $maxHeight?: string }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 680px;

  @media (max-width: 600px) {
    min-height: 400px;
    max-height: ${(props) => props.$maxHeight || "650px"};
  }

  @media (max-width: 360px) and (max-height: 605px) {
    height: 500px;
  }

  @media (max-height: 776px) {
    min-height: 596px;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
`;

export const SectionDescription = styled.p`
  display: inline-flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  color: #aaaaaa;
  font-family: system-ui, sans-serif;
  margin-block: 0 10px;
  height: 2.5rem;
`;

export const WithdrawalButton: any = styled(Button)`
  display: flex;
  font-family: system-ui, sans-serif;
  justify-content: flex-end;
  border: none;
  border-radius: 10rem;
  padding: 0.5rem;
  padding-inline: 1rem;
  height: 40px;
  background-color: rgba(118, 118, 128, 0.18);

  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  -moz-backdrop-filter: blur(0px);
  -ms-backdrop-filter: blur(0px);

  &:hover {
    border: none;
    background-color: rgba(118, 118, 128, 0.24);
  }

  img {
    margin-left: 0.5rem;
    width: 12px;
  }

  span {
    font-family: system-ui, sans-serif;
  }
`;

export const AccordionContainer: any = styled(motion.div)`
  overflow: hidden;
  background-color: #2c2c2e;
  border-radius: 0.75rem;
  margin-bottom: 16px;
  padding: 1rem;
  text-align: justify;
  cursor: pointer;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

export const AccordionHeader: any = styled(motion.div)`
  padding: 10px 10px 0px;
`;


export const AccordionTitle = styled.div`
  display: inline-flex;
  align-items: center;

  > h1 {
    display: flex;
    font-size: 20px;
    margin-block: 0;
    font-family: system-ui, sans-serif;

    @media (max-width: 600px) {
      font-size: 18px;
    }
  }

  > div {
    position: relative;
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
  }
`;

export const AccordionDescription = styled.p`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #aaa;
  font-family: system-ui, sans-serif;
  margin-block: 0;
  gap: 12px;
`;

export const AccordionContent: any = styled(motion.div)`
  padding: 0px 10px;
  display: block;
  width: 85%;
`;

export const ReadMoreButton: any = styled(Button)`
  display: flex;
  justify-content: flex-end;
  border: none;
  border-radius: 10rem;
  padding: 0.5rem;
  padding-inline: 1rem;
  height: 2.25rem;
  margin: 5px;
  background-color: rgba(118, 118, 128, 0.18);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  -moz-backdrop-filter: blur(0px);
  -ms-backdrop-filter: blur(0px);

  span {
    font-family: system-ui, sans-serif;
    font-size: 12px;
  }

  &:hover {
    border: none;
    background-color: rgba(118, 118, 128, 0.24);
  }
`;

export const AccordionDetails: any = styled(motion.div)`
  color: #aaa;
`;

export const DepositBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1c1c1e;

  @media (max-width: 600px) {
    width: 100%;
  }

  .balance-received {
    color: #4af5d3;
  }

  .balance-display {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 12px;
  }
`;

export const DepositTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: white;
  line-height: 1.25;
  font-family: system-ui, sans-serif;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    font-size: 18px;
    margin-inline: 12px;
  }
`;


export const DepositContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 16px 16px 0;
  font-size: 16px;
  gap: 8px;
  color: #aaa;
  line-height: 1.25;

  p {
    margin: 8px 0;
    font-family: system-ui, sans-serif;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 16px;
    margin-inline: 12px;
    word-wrap: break-word;
  }
`;

export const SBalanceDisplay = styled.div`
  font-family: system-ui, sans-serif;
  margin-block: 12px;
`;
