import React from 'react'
import styled from 'styled-components'
import { IntlProvider, FormattedMessage } from 'react-intl'
import en_US from '../../i18n/en_US.js'
import zh_CN from '../../i18n/zh_CN.js'

interface CardTitleProps {
  text?: string,
  cur_language?: any
}

const CardTitle: React.FC<CardTitleProps> = ({ text,cur_language }) => (
  // <StyledCardTitle>{text}</StyledCardTitle>
  <IntlProvider locale={'en'} messages={cur_language === '中文' ? zh_CN : en_US} >
    <StyledCardTitle><FormattedMessage id={text}></FormattedMessage></StyledCardTitle>
  </IntlProvider>
)

const StyledCardTitle = styled.div`
  color: ${props => props.theme.color.grey[600]};
  font-size: 18px;
  font-weight: 700;
  // padding: ${props => props.theme.spacing[4]}px;
  margin-top:20px;
  text-align: center;
`

export default CardTitle