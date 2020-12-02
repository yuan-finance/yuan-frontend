import React from 'react'
import styled from 'styled-components'

import Button from '../Button'
import Input, { InputProps } from '../Input'
import { IntlProvider, FormattedMessage } from 'react-intl'
import en_US from '../../i18n/en_US.js'
import zh_CN from '../../i18n/zh_CN.js'

interface TokenInputProps extends InputProps {
  max: number | string,
  symbol: string,
  onSelectMax?: () => void,
  cur_language?: any
}

const TokenInput: React.FC<TokenInputProps> = ({ max, symbol, onChange, onSelectMax, value, cur_language }) => {
  return (
    <IntlProvider locale={'en'} messages={cur_language === '中文' ? zh_CN : en_US} >
      <StyledTokenInput>
        <StyledMaxText>{max.toLocaleString()} {symbol}<FormattedMessage id={'Available'} />
        </StyledMaxText>
        <Input
          endAdornment={(
            <StyledTokenAdornmentWrapper>
              {/* <StyledTokenSymbol>{symbol}</StyledTokenSymbol> */}
              <StyledSpacer />
              <Max__btn onClick={onSelectMax}>
                <FormattedMessage id={'max'} />
              </Max__btn>
            </StyledTokenAdornmentWrapper>
          )}
          onChange={onChange}
          placeholder="0"
          value={value}
        />
      </StyledTokenInput>
    </IntlProvider>
  )
}

const Max__btn = styled.div`
  background: #476065;
  padding: 3px 10px;
  cursor: pointer;
  border-radius: 2px;
  color: #fff;
`

const StyledTokenInput = styled.div`
  @media(max-width: 767px) {
  // background: red;
  width: 86%;
  margin-left: 7%;
}
`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex; 
  
  @media(max-width: 767px) {
    // background: red;
    // flex: 3;
    position: absolute;
    right: 5px;
  }
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${props => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${props => props.theme.color.grey[600]};
  font-weight: 700;
`

export default TokenInput