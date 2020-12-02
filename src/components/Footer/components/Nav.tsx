import React from 'react'
import styled from 'styled-components'


interface NavProps {
  cur_language?: any
}

const Nav: React.FC<NavProps> = ({ cur_language }) => {
  return (
    <StyledNav>
      <StyledLink href="https://github.com/yuan-finance/yuan" target='_blannk'>Github</StyledLink>
      <StyledLink href="https://twitter.com/1YuanFinance" target='_blannk'>Twitter</StyledLink>
      {cur_language.cur_language === '中文' && <StyledLink target='_blannk' href="https://t.me/YuanFinanceCN">Telegram</StyledLink>}
      {cur_language.cur_language !== '中文' && <StyledLink target='_blannk' href="https://t.me/YuanFinance">Telegram</StyledLink>}
      <StyledLink target='_blannk' href="https://medium.com/@yuanfinance">Medium</StyledLink>

      {
        cur_language.cur_language === '中文' &&
        <StyledLink target='_blannk' href="https://github.com/yuan-finance/yuan/blob/master/PeckShield-Audit-Report-Yuan-v1.0.pdf">
          审计报告
      </StyledLink>
      }

      {
        cur_language.cur_language !== '中文' &&
        <StyledLink target='_blannk' href="https://github.com/yuan-finance/yuan/blob/master/PeckShield-Audit-Report-Yuan-v1.0.pdf">
          Audit Report
      </StyledLink>
      }

    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  
  @media(max-width: 767px) {
    flex-wrap: wrap;
    padding-bottom: 15px;
  }
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[400]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }

  @media(max-width: 767px) {
    width:33%;
    padding-left: 0;
    padding-right: 0;
    margin-top: 15px;
  }
`

export default Nav