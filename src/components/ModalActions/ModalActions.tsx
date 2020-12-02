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
  height: 96px;
  margin: ${props => props.theme.spacing[4]}px ${props => -props.theme.spacing[4]}px ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  justify-content: space-between;

  @media(max-width: 767px) {
    // background: red;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    width: 86%;
    margin-left: 7%;
    flex: 1;
    justify-content: space-between;
  }
`

const StyledModalAction = styled.div`
  // flex: 1;

  @media(max-width: 767px) {
    // background: red;
    padding-top: 23px;
    flex: 1;
  }
`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[4]}px;
`

export default ModalActions