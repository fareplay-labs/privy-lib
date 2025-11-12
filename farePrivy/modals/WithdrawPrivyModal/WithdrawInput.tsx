import { styled } from 'styled-components'
import numeral from 'numeral'
import { BORDER_COLORS, TEXT_COLORS } from "../design"
import { InputSlider } from "../components/shared/Input/InputSlider"
import { FareNumberInput } from "../components/shared/Input/FareNumberInput"
import { COLORS } from '../../config/constants'

const WithdrawalInput = styled(FareNumberInput)`
  background: ${COLORS.SECONDARY.DARK_GRAY};
  border: 1px solid ${BORDER_COLORS.one};
  color: ${TEXT_COLORS.one};
  border-radius: 12px;
  height: 36px;

  &:focus,
  &:focus-within {
    border: 1.5px solid ${COLORS.PRIMARY.PURPLE} !important;
    box-shadow: 0 0 0 2px ${COLORS.ALPHA.PURPLE_33};
    outline: none;
  }
`

const CustomInputSlider = styled(InputSlider)`
  background: rgb(82, 82, 82);
  border: 1px solid ${COLORS.ALPHA.BORDER_10};
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  height: 11px;
  width: 99%;
  display: flex;
  align-items: center;
  position: relative;

  .thumb-0 {
    background: ${COLORS.ALPHA.PURPLE_50} !important;
    border: 1px solid ${COLORS.PRIMARY.PURPLE};
  }

  .track-0 {
    border-top: 1px solid ${COLORS.PRIMARY.PURPLE} !important;
  }

  .track-1 {
    border: none !important;
    box-shadow: none;
  }
`

export const WithdrawInput = memo(function WithdrawInput({
  amount,
  setAmount,
  tokenIcon,
  tokenName,
  max,
  decimals = 2,
}: {
  amount: number
  max: number
  setAmount: any
  tokenIcon: string
  tokenName: string
  decimals: number
}) {
  return (
    <WithdrawalInput
      value={amount}
      onChange={(event: { target: { value: any } }) => {
        setAmount(numeral(event.target.value).value() as any)
      }}
      allowLeadingZeros={false}
      allowNegative={false}
      thousandSeparator=','
      decimalScale={decimals}
      hasInputSlider
      customInputSlider={CustomInputSlider}
      inputSuffix={<img src={tokenIcon} alt={tokenName} width={20} loading='lazy' />}
      inputSliderProps={{
        value: amount,
        onChange: (sliderValue: any) => {
          setAmount(sliderValue)
        },
        min: 0,
        max,
        step: max / 100,
      }}
    />
  )
})
