import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'

import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'

import Harvest from './components/Harvest'
import Stake from './components/Stake'
import Popup from '../../components/Popup'


interface HomeProps {
  cur_language?: any
}

const Farm: React.FC<HomeProps> = ({ cur_language }) => {
  const [showPopup, setShowPopup] = useState({ show: false, status: '', hash: '', text: '' })
  const { farmId } = useParams()
  const { contract, depositToken, depositTokenAddress, earnToken, name, icon, } = useFarm(farmId) || {
    depositToken: '',
    depositTokenAddress: '',
    earnToken: '',
    name: '',
    icon: ''
  }

  const { ethereum } = useWallet()

  const tokenContract = useMemo(() => {
    return getContract(ethereum as provider, depositTokenAddress)
  }, [ethereum, depositTokenAddress])

  const { onRedeem } = useRedeem(contract, setShowPopup, showPopup)

  const depositTokenName = useMemo(() => {
    return depositToken.toUpperCase()
  }, [depositToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <>
      <PageHeader
        src_logo={depositTokenName === 'YUAN-USDX' || depositTokenName === 'YUAN-ETH' ? true : false}
        icon={icon}
        cur_language={cur_language}
        // subtitle={`Deposit_${depositTokenName}__earn_${earnTokenName}`}
        deposit_tit1={'Deposit'}
        deposit_tit2={depositTokenName}
        deposit_tit3={'Earn'}
        deposit_tit4={earnTokenName}
      />
      <StyledFarm>
        <Popup showPopup={showPopup} cur_language={cur_language} />

        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest cur_language={cur_language} poolContract={contract} setShowPopup={setShowPopup} showPopup={showPopup} />
          </StyledCardWrapper>

          <Spacer />

          <StyledCardWrapper>
            <Stake
              cur_language={cur_language}
              poolContract={contract}
              tokenContract={tokenContract}
              tokenName={depositToken.toUpperCase()}
              setShowPopup={setShowPopup}
              showPopup={showPopup}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <Button
          cur_language={cur_language}
          onClick={onRedeem}
          text="Harvest__Withdraw"
          widthProps={274}
          heightProps={52}
          imageBg={'Rebase'}
        />
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media(max-width: 767px) {
    width:100%
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  @media(max-width: 767px) {
    width:100%;
    flex-direction: column;
    padding:24px;
    box-sizing:border-box
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Farm
