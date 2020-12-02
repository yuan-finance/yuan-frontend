import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import useModal from '../../../hooks/useModal'
import { formatAddress } from '../../../utils'

import Button from '../../Button'

import AccountModal from './AccountModal'
import WalletProviderModal from './WalletProviderModal'

import btn__bg from '../../../assets/img/Page/btn-bg.svg'
import { IntlProvider, FormattedMessage } from 'react-intl'


interface AccountButtonProps {
  cur_language?: any,
  showStatus?: boolean
}


const AccountButton: React.FC<AccountButtonProps> = ({ cur_language,showStatus }) => {
  const [onPresentAccountModal] = useModal(<AccountModal cur_language={cur_language} />)
  // const [onPresentWalletProviderModal] = useModal(<WalletProviderModal cur_language={cur_language} />)
  const { account, connect } = useWallet()
  const connectInjected = ()=>{
    window.sessionStorage.removeItem("SignOut")
    connect('injected')
  }
  if(showStatus === undefined){
    return (<></>)
  }
  return (
    <StyledAccountButton showStatus={showStatus}>
      {
        !account ?
          // <Styled__btn onClick={onPresentWalletProviderModal}>
          <Styled__btn onClick={connectInjected}>
            <FormattedMessage id={'Connect'} />
          </Styled__btn>
          :
          <Styled__btn onClick={onPresentAccountModal}>
            <FormattedMessage id={'My_Wallet'} />
          </Styled__btn>
      }
    </StyledAccountButton>
  )
}

const Styled__btn = styled.div`
background: red;
background: url(${btn__bg});
width: 160px;
height:38px;
background-size: 100% 100%;
text-align: center;
line-height: 38px;
font-size:16px;
margin:58px auto 60px;
cursor: pointer;
color: #ffffff;
@media(max-width: 767px) {
  margin:0 auto
}
`

interface StyledAccountButtonProps {
  showStatus?: boolean,
}
const StyledAccountButton = styled.div<StyledAccountButtonProps>`
@media(max-width: 767px) {
  display:${props => props.showStatus ? 'block' : 'none'};
}
`

export default AccountButton