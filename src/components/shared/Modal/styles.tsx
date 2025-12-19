import { motion } from "framer-motion";
import styled from "styled-components";
import { Button } from "../Button";

export const SModalOverlayContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: justify;

  @media (min-aspect-ratio: 16/9) and (max-width: 992px) and (orientation: landscape) {
    display: none;
  }
`;

export const SModalWrapper = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: 450px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);

  @media (max-width: 600px) {
    min-width: 300px;
    width: 90%;
  }
`;

export const SModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: black;
  height: 90%;
  max-height: 800px;
  width: 600px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;

  &.card-modal-content {
    height: 600px;

    @media (max-height: 605px) {
      height: 500px;
    }
  }

  &.fund-modal-content {
    padding: 2rem;
    width: 440px;
    text-align: left;
    background-color: #1c1c1e;
    border-radius: 2.5rem !important;
    overflow: hidden;
    border-radius: 16px;
    text-align: justify;

    @media (max-width: 992px) {
      padding: 14px;
      width: 100%;
      text-align: left;
    }
  }

  &.support-modal {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: 16px 0;
    height: 330px;
    width: 100%;

    p {
      text-align: center;
      font-size: 16px;
      margin: 0;
    }
  }

  &.offer-modal {
    padding: 32px;
    flex-direction: row;

    h2 {
      color: #4af5d3;
    }

    @media (max-width: 992px) {
      flex-direction: column;
      padding: 16px 24px;
      height: 600px;
      overflow-y: auto;
    }
  }

  @media (max-width: 992px) {
    width: 320px;
    text-align: center;
  }
`;

export const SFundModalButton: any = styled(Button)`
  height: 30px;
  width: 30px;
  padding: 0;
  border: none;
  background-color: transparent;
  font-family: system-ui, sans-serif;

  &:hover {
    border: none;
  }
`;

export const SModalHeader = styled.div`
  padding: 0 16px;
  width: 100%;
`;

export const SModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: white;
  line-height: 1;

  @media (max-width: 600px) {
    font-size: 18px;
    margin-inline: 12px;
  }
`;

export const SModalDescription = styled.p`
  font-size: 16px;
  color: #aaa;
  margin: 8px 0;
  text-align: justify;

   @media (max-width: 600px) {
    font-size: 14px;
    margin-inline: 12px;
    text-align: left;
  }
`;

export const SModalBody = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  width: 100%;
  padding: 16px;

  @media (max-width: 600px) {
    padding: 8px;
    overflow-x: hidden;
  }

  &.support-modal-content {
    width: 100%;
    width: -moz-available; /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available; /* Firefox will ignore this. */
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 100%;
    line-height: 1.5;

    @media (max-width: 992px) {
      padding: 20px 24px;
    }
  }
`;

export const SModalFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.submit-button {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
  }

  .next-button {
    display: flex;
    justify-content: flex-end;
  }
`;

export const SModalButton: any = styled(Button)`
  width: 30px !important;
  aspect-ratio: 1;
  padding: 0;
  border: none;
  background-color: transparent;
  font-family: system-ui, sans-serif;

  &:hover {
    border: none;
  }
`;
