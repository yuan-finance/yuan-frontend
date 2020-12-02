import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { IntlProvider, FormattedMessage } from 'react-intl'

interface PageProps {
  setLanguage?: any
  cur_language?: any,
  setShow?: any
}

const Nav: React.FC<PageProps> = ({ setLanguage, cur_language, setShow }) => {
  const closeMenu = (bool: any) => {
    // alert(bool)
    setShow(bool)
  }

  return (
    <StyledNav onClick={() => { closeMenu(false) }}>
      <StyledLink exact activeClassName="active" to="/">
        <FormattedMessage id={'home'} />
      </StyledLink>

      <StyledLink exact activeClassName="active" to="/distribution">
        <FormattedMessage id={'Distribution'} />
      </StyledLink>

      <StyledLink exact activeClassName="active" to="/staking">
        <FormattedMessage id={'Staking'} />
      </StyledLink>

      <StyledLink exact activeClassName="active" to="/governance">
        <FormattedMessage id={'Vote'} />
      </StyledLink>
      {/* <Styled__a href='javascript:;'>
        <FormattedMessage id={'Vote'} />
      </Styled__a> */}

      <Styled__language onClick={() => { setLanguage('English') }}>
        <span style={{ color: cur_language === '中文' ? '#fff' : '#A2C1C6' }}>中文</span> / <span style={{ color: cur_language === 'English' ? '#fff' : '#A2C1C6' }}>EN</span>
      </Styled__language>
    </StyledNav>
  )
}

const Styled__language = styled.div`
  color: #A2C1C6;
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  line-height: 58px;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`


const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Styled__a = styled.a`
  color: #A2C1C6;
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;

  &::before{
    content:'';
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #476065;
    margin-right: 5px;
    margin-bottom: 3px;
  }

  &:hover {
    color: #fff;

    &::before{
      background: #fff;
      margin-top: -3px;
    }
  }
  &.active {
    color: #fff;

    &::before{
      background: #fff;
      margin-top: -3px;
    }
  }

  line-height: 58px;
`

const StyledLink = styled(NavLink)`
  color: #A2C1C6;
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;

  &::before{
    content:'';
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #476065;
    margin-right: 5px;
    margin-bottom: 3px;
  }

  &:hover {
    color: #fff;

    &::before{
      background: #fff;
      margin-top: -3px;
    }
  }
  &.active {
    color: #fff;

    &::before{
      background: #fff;
      margin-top: -3px;
    }
  }

  line-height: 58px;
`

export default Nav