import React from 'react'
import styled from 'styled-components'

import { Contract } from 'web3-eth-contract'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'

import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'

import { getDisplayBalance, format_Balance_to_K } from '../../../utils/formatBalance'

import Earn from "../../../assets/img/stake/Earn.svg"
import pool_bg from '../../../assets/img/stake/pool_bg.svg'

interface HarvestProps {
  poolContract: Contract,
  cur_language?: any,
  setShowPopup?: any,
  showPopup?: any
}

const Harvest: React.FC<HarvestProps> = ({ poolContract, cur_language, setShowPopup, showPopup }) => {

  const earnings = useEarnings(poolContract)
  const { onReward } = useReward(poolContract, setShowPopup, showPopup)

  return (
    <StyledCardContentInner>
      <StyledCardHeader>
        <CardIcon noBorder={true}>{<img src={Earn} height="100" border-radius="100" />}</CardIcon>
        <Value value={format_Balance_to_K(earnings)} />
        <Label cur_language={cur_language} text="earn__YUAN" />
      </StyledCardHeader>
      <StyledCardActions>
        <Button
          cur_language={cur_language}
          onClick={onReward}
          text="Harvest"
          disabled={!earnings.toNumber()}
          widthProps={206}
          heightProps={52}
          imageBg={!earnings.toNumber() ? 'Harvest_disabled' : 'Stake'}
        />
      </StyledCardActions>
    </StyledCardContentInner>
  )
}


const StyledCardHeader = styled.div`
align-items: center;
display: flex;
flex-direction: column;
margin-bottom: 43px;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const StyledSpacer = styled.div`
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
  background-size:100%;
`
export default Harvest