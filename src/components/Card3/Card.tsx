import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => (
  <StyledCard>
    {children}
  </StyledCard>
)

const StyledCard = styled.div`
  display: flex;
  // width:93%;
  // margin-left:-33px;
  width:100%;
  flex-direction: column;
  overflow: hidden;
  @media(max-width: 767px) {
    width:100%;
    height:100%;
    margin-top:10px;
    justify-content: space-between;
  }
`

export default Card