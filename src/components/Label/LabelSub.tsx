import React from 'react'
import styled from 'styled-components'
import { IntlProvider, FormattedMessage } from 'react-intl'
import en_US from '../../i18n/en_US.js'
import zh_CN from '../../i18n/zh_CN.js'

interface LabelProps {
  text?: string,
  cur_language?: any
}

const LabelSub: React.FC<LabelProps> = ({ text, cur_language }) => (
  <IntlProvider locale={'en'} messages={cur_language === '中文' ? zh_CN : en_US} >
    <StyledLabel>
      {text.replace('USDX', 'USDx')}<FormattedMessage id={'Staked'} />
    </StyledLabel>
  </IntlProvider>
)

const StyledLabel = styled.div`
  color: ${props => props.theme.color.grey[400]};
  font-size: 20px;
  @media(max-width: 767px) {
    font-size:15px
  }
`

export default LabelSub