import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'

import { Contract } from 'web3-eth-contract'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import { AddIcon, RemoveIcon } from '../../../components/icons'
import IconButton from '../../../components/IconButton'
import Label from '../../../components/Label'
import LabelSub from '../../../components/Label/LabelSub'
import Value from '../../../components/Value'

import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useNotify from '../../../hooks/useNotify'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useGet__decimals from '../../../hooks/useTokenBalance-decimals'

import useUnstake from '../../../hooks/useUnstake'

import { getDisplayBalance, format_Balance_to_K } from '../../../utils/formatBalance'

import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import Deposit from "../../../assets/img/stake/Deposit.svg"
import pool_bg from '../../../assets/img/stake/pool_bg.svg'

interface StakeProps {
  poolContract: Contract,
  tokenContract: Contract,
  tokenName: string,
  cur_language?: any,
  setShowPopup?: any,
  showPopup?: any
}

const Stake: React.FC<StakeProps> = ({ poolContract, tokenContract, tokenName, cur_language, setShowPopup, showPopup }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)

  const [disabledAddAction, setDisabledAddAction] = useState(false)

  const allowance = useAllowance(tokenContract, poolContract)
  const { onApprove } = useApprove(tokenContract, poolContract, setShowPopup, showPopup)

  const tokenBalance = useTokenBalance(tokenContract.options.address)
  const token_decimals = useGet__decimals(tokenContract, tokenContract.options.address)
  // console.log(token_decimals)
  const stakedBalance = useStakedBalance(poolContract)

  const { onStake } = useStake(poolContract, tokenContract, setShowPopup, showPopup)
  const { onUnstake } = useUnstake(poolContract, tokenContract, setShowPopup, showPopup)

  const { num, handleNum } = useNotify();
  // handleNum(123456789);
  // console.log(num);

  // const disabledAddAction = await poolContract.methods.periodFinish().call()

  const [onPresentDeposit] = useModal(
    <DepositModal
      cur_language={cur_language}
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
      token_decimals={token_decimals}
      setShowPopup={setShowPopup}
      showPopup={showPopup}
    />
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      cur_language={cur_language}
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={tokenName}
      token_decimals={token_decimals}
      setShowPopup={setShowPopup}
      showPopup={showPopup}
    />
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  //判断 池子是否到期，到期则禁用 staking 按钮
  const handleDisabledAddAction = useCallback(async () => {
    try {
      if(poolContract){
        const crruteTime = new Date().getTime()
        const  DisabledAddVariable = await poolContract.methods.periodFinish().call()
        const status = (DisabledAddVariable*1000 - crruteTime) > 0 ? false : true
        setDisabledAddAction(status)
      }  
    } catch (e) {
      setDisabledAddAction(true)
      console.log(e)
    }
  }, [poolContract])

  useEffect(() => {
    const timer = setInterval(() => {
      handleDisabledAddAction()
    }, 1000);
    return () => clearInterval(timer);
  }, [poolContract])


  return (
    <StyledCardContentInner>
      <StyledCardHeader>
        <CardIcon noBorder={true}>{<img src={Deposit} height="100" border-radius="100" />}</CardIcon>
        <Value value={format_Balance_to_K(stakedBalance, token_decimals)} />
        <LabelSub cur_language={cur_language} text={`${tokenName}`} />
      </StyledCardHeader>
      <StyledCardActions>
        {
          !allowance.toNumber() ?
            <Button
              cur_language={cur_language}
              disabled={requestedApproval}
              onClick={handleApprove}
              text={`Approve`}
              widthProps={206}
              heightProps={52}
              imageBg={requestedApproval ? 'Harvest_disabled' : 'Stake'}
            />
            :
            <>
              <IconButton onClick={onPresentWithdraw}>
                <RemoveIcon />
              </IconButton>

              <StyledActionSpacer />

              <IconButton onClick={!disabledAddAction && onPresentDeposit} disabledAddAction={disabledAddAction}>
                <AddIcon />
              </IconButton>
            </>
        }
      </StyledCardActions>
    </StyledCardContentInner>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom:43px
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const StyledActionSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  width:270px;
  height:340px;
  padding:41px 32px 32px;
  box-sizing:border-box;
  background:url(${pool_bg});
  background-repeat: no-repeat;
  background-size:100% 100%;
`

export default Stake
