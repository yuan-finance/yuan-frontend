import React from 'react'
import styled from 'styled-components'
import { IntlProvider, FormattedMessage } from 'react-intl'
import Spacer from '../../components/Spacer'
import en_US from '../../i18n/en_US.js'
import zh_CN from '../../i18n/zh_CN.js'

import YUAN_USDx from '../../assets/img/Page/YUAN-USDx.svg'
import YUAN_ETH from '../../assets/img/Page/YUAN-ETH.svg'

interface PageHeaderProps {
  icon?: string,
  subtitle?: string,
  title?: string,
  cur_language?: any,
  deposit_tit1?: any,
  deposit_tit2?: any,
  deposit_tit3?: any,
  deposit_tit4?: any,
  src_logo?: any
}
const json_image: any = {
  'YUAN_ETH': YUAN_ETH,
  'YUAN_USDX': YUAN_USDx
}

const PageHeader: React.FC<PageHeaderProps> = ({
  src_logo,
  icon,
  subtitle,
  title,
  cur_language,
  deposit_tit1,
  deposit_tit2,
  deposit_tit3,
  deposit_tit4
}) => {
  return (
    <IntlProvider locale={'en'} messages={cur_language === '中文' ? zh_CN : en_US} >
      <StyledPageHeader>
        {
          icon && !src_logo &&
          <StyledIcon cur_language={cur_language}>
            <FormattedMessage id={icon} />
          </StyledIcon>
        }
        {
          src_logo &&
          <img src={json_image[deposit_tit2.replace('-', '_')]} alt="" />
        }
        {title && <StyledTitle><FormattedMessage id={title} /></StyledTitle>}
        <Spacer size="sm" />
        {/* <StyledTitle>{title}</StyledTitle> */}
        {
          subtitle ?
            <StyledSubtitle>{subtitle && <FormattedMessage id={subtitle} />}</StyledSubtitle>
            :
            <StyledSubtitle>
              <FormattedMessage id={deposit_tit1} />
              {deposit_tit2.replace('USDX', 'USDx') + ' '}
              <FormattedMessage id={deposit_tit3} />
              {deposit_tit4}
            </StyledSubtitle>
        }
      </StyledPageHeader>
    </IntlProvider>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  padding-top: 60px;
`

interface StyledIconProps {
  cur_language?: string
}
const StyledIcon = styled.div<StyledIconProps>`
  font-size: 60px;
  font-size: ${props => props.cur_language === '中文' ? '60px' : '20px'};
  height: 100px;
  line-height: 100px;
  text-align: center;
  width: 100px;
  color: #476065;  
  border: 2px solid #8C9C9F;
  border-radius:50px
`

const StyledTitle = styled.h1`
  color: #476065;
  font-size: 30px;
  line-height:40px;
  // font-weight: 700;
  margin: 0;
  padding: 0;
  // margin-bottom:10px
`

const StyledSubtitle = styled.h3`
  color: #476065;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
`

export default PageHeader