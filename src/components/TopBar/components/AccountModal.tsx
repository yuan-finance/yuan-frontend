import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { yam as yamAddress } from '../../../constants/tokenAddresses'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getDisplayBalance, format_Balance_to_K } from '../../../utils/formatBalance'

import Button from '../../Button'
import CardIcon from '../../CardIcon'
import IconButton from '../../IconButton'
import { AddIcon, RemoveIcon } from '../../icons'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalTitle from '../../ModalTitle'
import Earn from "../../../assets/img/stake/Earn.svg"

const AccountModal: React.FC<ModalProps> = ({ onDismiss, cur_language }) => {
  const { reset,account } = useWallet()

  const handleSignOutClick = useCallback(() => {
    if(account){
      window.sessionStorage.setItem("SignOut","true")
      onDismiss()
      reset()
      window.location.reload()
    }
  }, [reset,onDismiss,account])

  const yamBalance = useTokenBalance(yamAddress)
  const displayBalance = useMemo(() => {
    return format_Balance_to_K(yamBalance)
  }, [yamBalance])

  return (
    <Modal>
      <ModalTitle cur_language={cur_language} text="My_Account" />

      <StyledBalanceWrapper>
        <CardIcon noBorder={true}>{<img src={Earn} height="100" border-radius="100" />}</CardIcon>
        <StyledBalance>
          <StyledValue>{displayBalance}</StyledValue>
          <Label cur_language={cur_language} text="YUAN_Balance" />
        </StyledBalance>

        {/* <StyledBalanceActions>
          <IconButton>
            <RemoveIcon />
          </IconButton>

          <StyledSpacer />

          <IconButton>
            <AddIcon />
          </IconButton>
        </StyledBalanceActions> */}
      </StyledBalanceWrapper>

      <StyledSpacer />

      <Btn__wrap>
        <Button
          cur_language={cur_language}
          onClick={handleSignOutClick}
          text="Sign_out"
          widthProps={354}
          heightProps={62}
          imageBg={'LoginOut'}
        />
        <StyledSpacer />
      </Btn__wrap>
    </Modal>
  )
}

const Btn__wrap = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items:center;
@media(max-width: 767px) {
  transform:scale(0.8);
}
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
  @media(max-width: 767px) {
    height: ${props => props.theme.spacing[2]}px;
    width: ${props => props.theme.spacing[2]}px;
  }
`

const StyledValue = styled.div`
  color: ${props => props.theme.color.grey[600]};
  font-size: 36px;
  font-weight: 700;
  font-family: 'dinFont' !important;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing[4]}px;
  @media(max-width: 767px) {
    margin-bottom: ${props => props.theme.spacing[2]}px;
  }
`

const StyledBalanceIcon = styled.div`
  font-size: 36px;
  margin-right: ${props => props.theme.spacing[3]}px;
`

const StyledBalanceActions = styled.div`
  align-items: center;
  display: flex;
  margin-top: ${props => props.theme.spacing[4]}px;
`

export default AccountModal