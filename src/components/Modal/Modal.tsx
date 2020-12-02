import React from 'react'
import styled from 'styled-components'

import Card from '../Card'
import CardContent from '../CardContent'
import Container from '../Container'

export interface ModalProps {
  onDismiss?: () => void,
  cur_language?: any
}

const Modal: React.FC = ({ children }) => {
  return (
    <Container size="sm">
      <StyledModal>
        {children}
      </StyledModal>
    </Container>
  )
}

const StyledModal = styled.div`
  border-radius: 12px;
  box-shadow: 24px 24px 48px -24px ${props => props.theme.color.grey[600]};
  position: relative;
  background: #fff;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30vh;

  @media(max-width: 767px) {
    // background: red;
    width: 86%;
    margin-left: 7%;
    padding-left: 0px;
    padding-right: 0px;
  }
`

export default Modal