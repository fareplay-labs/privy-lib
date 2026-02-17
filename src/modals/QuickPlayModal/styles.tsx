import styled from "styled-components";
import { Button } from "../../components/shared/Button";


export const QuickplayContent = styled.div`
  padding-bottom: 32px;

  p {
    font-family: system-ui, sans-serif;
  }
`;

export const FundPageButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const FundPageButton = styled(Button)`
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
`;

export const FundPageFooter = styled.div`
  text-align: center;
  color: #aaa;
  font-family: system-ui, sans-serif;
  margin-top: 16px;
`;

export const ButtonText = styled.span`
  flex: 1;
  text-align: center;
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  font-family: system-ui, sans-serif;
`;