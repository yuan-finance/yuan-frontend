import React from 'react'
import styled from 'styled-components'

import Card from '../Card'
import CardContent from '../CardContent'
import Container from '../Container'

export interface ModalProps {
  onDismiss?: () => void,
  cur_language?: any,
  isOpen?:boolean,
  // isRegistered?:any;
  // isRegistering?:any;
  // isVoting?:any;
  // votingPowers?:any;
  // onRegister?:any
}

const Modal: React.FC<ModalProps> = ({ children,isOpen }) => {
  return (
    <Container size="sm">
        <StyledModal isOpen={isOpen}>
          {children}
        </StyledModal>
    </Container>
  )
}

interface StyledModalProps{
  isOpen?: boolean,
}

const StyledModal = styled.div<StyledModalProps>`
  border-radius: 12px;
  position: absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  background: #fff;
  z-index:1000;
  min-width: 600px;
  // display: ${props => props.isOpen ? 'block' : 'none'};
  @media(max-width: 767px) {
    // background: red;
    width: 100%;
    min-width:100%;
    min-height:100vh;
    overflow:auto;
    border-radius: 0;
    padding-left: 0px;
    padding-right: 0px;
    bottom:0;
    right:0;
    // display: ${props => props.isOpen ? 'block' : 'none'};
  }
`
export default Modal