import React from 'react'
import styled from 'styled-components'

const ModalActions: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>
            {child}
          </StyledModalAction>
          {i < l - 1 && <StyledSpacer />}
        </>
      ))}
    </StyledModalActions>
  )
}

const StyledModalActions = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color.grey[100]}00;
  display: flex;
  margin:0 auto 15px;
  // margin: ${props => props.theme.spacing[4]}px ${props => -props.theme.spacing[4]}px ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  flex-direction: inherit;
  justify-content: flex-end;
  flex-wrap:wrap;
  @media(max-width: 767px) {
    margin: 0;
    padding: 0;
    width: 86%;
    margin:0 0 15px 7%;
    flex: 1;
    flex-direction: inherit;
    justify-content: flex-end;
    flex-wrap:wrap;
  }
`

const StyledModalAction = styled.div`
  display:flex;
  justify-content:flex-end;
  @media(max-width: 767px) {
    display:flex;
    justify-content:flex-end;
  }
`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[4]}px;
`

export default ModalActions