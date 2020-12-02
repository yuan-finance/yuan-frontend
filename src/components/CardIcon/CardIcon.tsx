import React from 'react'
import styled from 'styled-components'

interface CardIconProps {
  children?: React.ReactNode,
  noBorder?: boolean,
  cur_language?: string
}

const CardIcon: React.FC<CardIconProps> = ({ children, noBorder, cur_language }) => (
  <StyledCardIcon noBorder={noBorder} cur_language={cur_language}>
    {children}
  </StyledCardIcon>
)

interface StyledCardIconProps {
  noBorder?: boolean,
  cur_language?: string
}

const StyledCardIcon = styled.div<StyledCardIconProps>`
  flex:none;
  font-size: ${props => props.cur_language === '中文' ? "35px" : "20px"};
  color:#476065;
  height: 90px;
  line-height:66px;
  width: 90px;
  border-radius: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
  border:${props => props.noBorder ? "none" : "2px solid #8C9C9F"};
  margin-bottom:20px;
  box-sizing:border-box;
  @media(max-width: 767px) {
    margin-bottom:10px;
  }
`

export default CardIcon