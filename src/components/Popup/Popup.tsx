import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Link } from 'react-router-dom'
import { IntlProvider, FormattedMessage } from 'react-intl'
import en_US from '../../i18n/en_US.js'
import zh_CN from '../../i18n/zh_CN.js'
import pendding from './img/pendding.svg'
import success from './img/success.png'
import fail from './img/fail.svg'
import { useWallet } from 'use-wallet'
import popup_bg from './img/border.svg'
import popup_arrow from './img/arrive.svg'

interface PopupProps {
  showPopup?: {
    show?: boolean,
    status?: string,
    hash?: string,
    text?: string
  },
  cur_language?: any
}
const Popup: React.FC<PopupProps> = ({ showPopup, cur_language }) => {
  const { chainId } = useWallet()

  return (
    <IntlProvider locale={'en'} messages={cur_language === '中文' ? zh_CN : en_US} >
      {
        showPopup.show &&
        <StyledPopup>
          <StyledImg src={`${showPopup.status === 'pendding' ?
            pendding
            :
            showPopup.status === 'success' ?
              success : fail}`
          } alt="" className={showPopup.status === 'pendding' ? 'rotate' : ''} />

          <StyledText>
            <FormattedMessage id={showPopup.text} />
          </StyledText>

          {
            showPopup.hash &&
            <StyledA
              href={'https://' + `${chainId === 42 ? 'kovan.' : ''}` + 'etherscan.io/tx/' + showPopup.hash}
              target='_blank'>view < StyledImg_arrow alt="" src={popup_arrow} />
            </StyledA>
          }
        </StyledPopup>
      }
    </IntlProvider >
  )
}

export default Popup

const StyledA = styled.a`
text-decoration: none;
background: #476065;
color: #fff;
padding: 0 5px;
height: 24px;
line-height: 24px;
margin-top: 5px;
margin-right: 6px;
border-radius: 2px;
`

const StyledText = styled.span`
flex: 1;
padding-left: 15px;
line-height: 34px;
`

const StyledImg_arrow = styled.img`
width: 10px;
height: 10px;
`

const StyledImg = styled.img`
width: 20px;
height: 20px;
margin-top: 6px;
`

const StyledPopup = styled.div`
width: 270px;
height: 34px;
line-height: 34px;
position: absolute;
top: 20px;
right: 0;
display: flex;
justify-content: space-between;
padding: 5px;
background: url(${popup_bg}) no-repeat center center;
background-size: 100%;

@media(max-width: 767px) {
  top: 0px;
  right: 15px;
}
`