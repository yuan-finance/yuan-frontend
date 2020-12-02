import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../../assets/metamask-fox.svg'
import walletConnectLogo from '../../../assets/wallet-connect.svg'

import Button from '../../Button'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Modal, { ModalProps } from '../../Modal'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss, cur_language }) => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])
  const connectInjected = ()=>{
    window.sessionStorage.removeItem("SignOut")
    connect('injected')
  }
  const connectWalletconnect = ()=>{
    window.sessionStorage.removeItem("SignOut")
    connect('walletconnect')
  }
  return (
    <Modal>
      <ModalTitle cur_language={cur_language} text="Select_a_wallet_provider" />
      <Spacer />
      <StyledWalletsWrapper>
        <StyledWalletCard>
          <Card>
            <CardContent>
              <CardIcon noBorder={false}>
                <img src={metamaskLogo} style={{ height: 32 }} />
              </CardIcon>
              <CardTitle text="Metamask" />
              <Spacer />
              <Button onClick={connectInjected} text="Select" cur_language={cur_language}/>
            </CardContent>
          </Card>
        </StyledWalletCard>
        <Spacer />
        <StyledWalletCard>
          <Card>
            <CardContent>
              <CardIcon noBorder={false}>
                <img src={walletConnectLogo} style={{ height: 24 }} />
              </CardIcon>
              <CardTitle text="WalletConnect" />
              <Spacer />
              <Button onClick={connectWalletconnect} text="Select" cur_language={cur_language}/>
            </CardContent>
          </Card>
        </StyledWalletCard>
      </StyledWalletsWrapper>
      <Spacer />
      <Button text="Cancel" cur_language={cur_language} onClick={onDismiss} widthProps={480}
          heightProps={52}/> 
      <Spacer />
    </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const StyledWalletCard = styled.div`
width: calc(50% - 12px);
@media(max-width: 767px) {
  width:42%
}
`

export default WalletProviderModal