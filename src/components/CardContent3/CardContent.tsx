import React from 'react'
import styled from 'styled-components'

const CardContent: React.FC = ({ children }) => (
  <StyledCardContent>
    {children}
  </StyledCardContent>
)

const StyledCardContent = styled.div`
  display: flex;
  // flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 ${props => props.theme.spacing[4]}px;
  margin-bottom:20px;
  @media(max-width: 767px) {
    padding: 0 ${props => props.theme.spacing[2]}px;
    margin-bottom:0
  }
`

export default CardContent