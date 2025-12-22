import styled from "styled-components";

export const CopyInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin-block: 16px;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;

export const InputAddress = styled.input`
  background: #2c2c2e;
  border: 1px solid #1b1d26;
  color: #ffffff;
  border-radius: 12px;
  font-family: "system-ui, sans-serif";
  padding: 8px 16px;
  font-size: 14px;
  flex: 1;
  height: 40px;

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &:focus {
    outline: none;
    border: 1px solid #7d00ff;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;


export const SClickToCopy = styled.div`
  flex: 1;
  all: unset;
  cursor: pointer;
  padding: 0px 18px;
  border-radius: 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  height: 100%;
  transition: ease-in-out all 0.12s;
  border: 1px solid #1b1d26;
  box-shadow: inset 0px 0px 56px #410dff00;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  text-wrap: nowrap;
  user-select: none;

  &:hover {
    border: 1px solid #410dff;
    box-shadow: inset 0px 0px 56px #410dff75;
  }
`;

export const SClickTextToCopy = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  color: #aaa;
  font-size: 12px;
  font-family: GohuUppercase, monospace;
  cursor: pointer;

  > span {
    transition: all ease-in-out 0.16;
    color: #aaa;
    font-size: 12px;
    line-height: 9px;
    padding-top: 1px;
  }

  &:hover {
    > span {
      color: white;
    }
  }

  &.leaderboard {
    width: auto;
  }
`;