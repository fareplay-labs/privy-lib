import { styled } from 'styled-components'
import { Input } from '@/components/shared/Input'
import { SectionDescription, WithdrawalButton } from '../../../Modals/styles'
import { BORDER_COLORS, TEXT_COLORS } from '@/design'
import { Button } from '@/components/shared/Button'
import { COLORS } from '../../config/constants'

const secondary_color = COLORS.SECONDARY.DARK_GRAY
const accent_color = COLORS.PRIMARY.PURPLE
const hover_color = COLORS.PRIMARY.DARK_PURPLE

const font_color = `${TEXT_COLORS.one}`
const font_family = 'system-ui, sans-serif'

const line_height = '1.5'
const small_font_size = '12px'
const font_size = '14px'

const border_color = `${BORDER_COLORS.one}`
const border_radius = '12px'

const small_margin = '18px'

export const SInputWrapper = styled.div`
  width: 100%;
  padding-bottom: 12px;
  margin-bottom: ${small_margin};
`

export const SInput = styled(Input)`
  background: ${secondary_color};
  border: 1px solid ${border_color};
  color: ${TEXT_COLORS.one};
  border-radius: ${border_radius};
  padding: 8px 16px;
  font-size: ${font_size};
  flex: 1;
  height: 40px;
  font-family: ${font_family};

  &:focus {
    outline: none;
    border: 1px solid ${accent_color};
    box-shadow: 0 0 0 2px ${accent_color}33;
  }
`

export const SBalanceContent = styled.div`
  display: flex;

  #input-num-format {
    padding-top: 8px;
    padding-bottom: 12px;
    font-family: ${font_family};
  }

  &.balance-content-column {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`

export const SWithdrawalContent = styled.div`
  margin-top: 0px;
  padding-bottom: 0px;
`

export const SStepLabel = styled.div`
  font-size: ${font_size};
  color: ${font_color};
  font-weight: 700;
  margin-block: ${small_margin};
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${font_family};
`

export const SDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #232323;
  margin: 24px 0 0 0;
`

export const SExportWalletButton = styled(WithdrawalButton)`
  margin-block: ${small_margin};
  span {
    font-family: ${font_family};
  }
`

export const SExportHelper = styled.div`
  font-size: ${small_font_size};
  line-height: ${line_height};
  color: #aaa;
  margin-top: 6px;
  margin-bottom: 0;
  text-align: left;
  font-family: ${font_family};
`

export const SModalContent = styled.div`
  padding-bottom: 32px;
`

export const SModalDescription = styled.div`
  width: 100%;
  font-family: ${font_family};
  margin-bottom: 8px;
  font-size: ${font_size};
  line-height: ${line_height};
  color: ${font_color};
`

export const SButtonRow = styled.div`
  display: flex;
  gap: 12px;
`

export const SButton = styled(Button)<{ selectedToken: boolean }>`
  padding: 10px 20px;
  border-radius: ${border_radius};
  border: ${({ selectedToken }) =>
    selectedToken ? `1px solid ${accent_color}` : `1px solid #333`};
  background: ${({ selectedToken }) => (selectedToken ? accent_color + '22' : '#18181a')};
  font-weight: 700;
  cursor: pointer;
  font-size: ${font_size};
  transition: all 0.2s ease;

  &:hover {
    border: 1px solid ${hover_color};
  }
`

export const SSupportingText = styled.div`
  font-size: ${small_font_size};
  line-height: ${line_height};
  color: #aaa;
  margin-bottom: 0;
  margin-top: 2px;
  font-family: ${font_family};
`

export const SSectionDescription = styled(SectionDescription)`
  margin-bottom: 4px;
`
