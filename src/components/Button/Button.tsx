import React, { useContext, useMemo, useState, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'
import Stake from '../../assets/img/stake/stake_btn.svg'
import Harvest_disabled from '../../assets/img/stake/Harvest_disabled.svg'
import Rebase from '../../assets/img/Page/Rebase.svg'
import Rebase_disabled from '../../assets/img/Page/Rebase_disabled.svg'
import LoginOut from '../../assets/img/stake/LoginOut.svg'
import { IntlProvider, FormattedMessage } from 'react-intl'
import en_US from '../../i18n/en_US.js'
import zh_CN from '../../i18n/zh_CN.js'


interface ButtonProps {
  widthProps?: number,
  heightProps?: number,
  imageBg?: string,
  children?: React.ReactNode,
  disabled?: boolean,
  href?: string,
  onClick?: () => void,
  size?: 'sm' | 'md' | 'lg',
  text?: string,
  to?: string,
  variant?: 'default' | 'secondary' | 'tertiary',
  cur_language?: any
}

const Button: React.FC<ButtonProps> = ({ cur_language, widthProps, heightProps, imageBg, children, disabled, href, onClick, size, text, to, variant, }) => {
  const [lang, setLang] = useState(cur_language === '中文' ? 'yuanFont' : 'Microsoft YaHei')
  const { color, spacing } = useContext(ThemeContext)

  useEffect(() => {
    if (cur_language === 'English') {
      setLang('Microsoft YaHei')
    } else if (cur_language === '中文') {
      setLang('yuanFont')
    }
    // console.log(cur_language)
  }, [cur_language])


  let buttonColor: string
  switch (variant) {
    case 'secondary':
      buttonColor = color.grey[500]
      break
    case 'default':
    default:
      buttonColor = color.primary.main
  }

  let boxShadow: string
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  let imageUrl: string
  switch (size) {
    case 'sm':
      boxShadow = `4px 4px 8px ${color.grey[300]},
        -8px -8px 16px ${color.grey[100]}FF;`
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14
      break
    case 'lg':
      boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px ${color.grey[100]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px -2px ${color.grey[100]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }
  switch (imageBg) {
    case 'Rebase':
      imageUrl = Rebase
      break;
    case 'Rebase_disabled':
      imageUrl = Rebase_disabled
      break;
    case 'Stake':
      imageUrl = Stake
      break;
    case 'Harvest_disabled':
      imageUrl = Harvest_disabled
      break;
    case 'LoginOut':
      imageUrl = LoginOut
      break;
    default:
      break
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledExternalLink disabled={disabled} href={to}><FormattedMessage id={text} /></StyledExternalLink>
    } else if (href) {
      return <StyledExternalLink disabled={disabled} href={href} target="__blank"><FormattedMessage id={text} /></StyledExternalLink>
    } else {
      return <FormattedMessage id={text} />
    }
  }, [href, text, to])

  return (
    <IntlProvider locale={'en'} messages={cur_language === '中文' ? zh_CN : en_US} >
      <StyledButton
        width={widthProps}
        height={heightProps}
        imageUrl={imageUrl}
        boxShadow={boxShadow}
        color={buttonColor}
        disabled={disabled}
        fontSize={fontSize}
        onClick={onClick}
        padding={buttonPadding}
        size={buttonSize}
        fontFamily={lang}
      >
        {children}
        {ButtonChild}
      </StyledButton>
    </IntlProvider>
  )
}

interface StyledButtonProps {
  width: number,
  height: number,
  imageUrl: string,
  boxShadow: string,
  color: string,
  disabled?: boolean,
  fontSize: number,
  padding: number,
  size: number,
  fontFamily: string
}

const StyledButton = styled.button<StyledButtonProps>`
  width: ${props => props.width || 206}px;
  height: ${props => props.height || 52}px;
  background: url(${props => props.imageUrl || Stake});
  background-size: 100% 100%;
  text-align: center;
  line-height: ${props => props.height || 52}px;
  color: #fff;
  font-size:18px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  border:none;
  padding:0;
  outline: none;
  font-family:${props => props.fontFamily};

  @media(max-width: 767px) {
    margin:0 auto 20px;
    width: 100%;
    line-height: ${props => props.height || 40}px;
  }
`

interface StyledLinkProps {
  disabled?: boolean,
}

const StyledLink = styled(Link)<StyledLinkProps>`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`

const StyledExternalLink = styled.a<StyledLinkProps>`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`

export default Button