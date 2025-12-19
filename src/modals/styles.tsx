import styled from 'styled-components'
import { Button } from '../components/shared/Button'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: justify;
`

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
`

export const FundPageButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const FundPageButton: any = styled(Button)`
  background-color: #7d00ff;
  border-radius: 624.9375rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  height: 56px;
  border: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #6400cc;
    border: none;
  }
`

export const FundPageFooter = styled.div`
  text-align: center;
  color: #aaaaaa;
  font-family: system-ui, sans-serif;
  margin-top: 16px;
`

export const ButtonText = styled.span`
  flex: 1;
  text-align: center;
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  font-family: system-ui, sans-serif;
`

export const SectionDescription = styled.p`
  display: inline-flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  color: #aaaaaa;
  font-family: system-ui, sans-serif;
  margin-block: 0 10px;
  height: 2.5rem;
`

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
`
