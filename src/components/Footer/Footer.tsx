import React from 'react'
import styled from 'styled-components'

import Nav from './components/Nav'

interface FooterProps {
  cur_language?: any
}

const Footer: React.FC<FooterProps> = (cur_language) => (
  <StyledFooter>
    <StyledFooterInner>
      <Nav cur_language={cur_language} />
    </StyledFooterInner>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
`
const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${props => props.theme.topBarSize}px;
  max-width: ${props => props.theme.siteWidth}px;
  width: 100%;
`

export default Footer