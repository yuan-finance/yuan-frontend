import React, { useMemo } from 'react'
import styled from 'styled-components'

import numeral from 'numeral'

import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'

import { getDisplayBalance, format_Balance_to_K } from '../../../utils/formatBalance'
import BigNumber from 'bignumber.js'
import StatsBg from '../../../assets/img/Page/Stats.svg'
interface StatsProps {
  circSupply?: string,
  curPrice?: number,
  targetPrice?: number,
  totalSupply?: string,
  cur_language?: any
}
const Stats: React.FC<StatsProps> = ({ circSupply, curPrice, targetPrice, totalSupply, cur_language }) => {

  const formattedTotalSupply = useMemo(() => {
    if (totalSupply) {
      // console.log(totalSupply)
      return format_Balance_to_K(new BigNumber(totalSupply));
      // console.log(supplyStr)
      // return supplyStr;
      // return numeral(supplyStr).format('0.0a')
    } else return '--'
  }, [totalSupply])

  return (
    <StyledStats>

      <StyledStat>
        <StyledValue>{curPrice ? `¥ ${getDisplayBalance(new BigNumber(curPrice))}` : '--'}</StyledValue>
        <Label cur_language={cur_language} text={'Current_Price'} />
      </StyledStat>

      <StyledSpacer />

      <StyledStat>
        <StyledValue>{targetPrice ? `¥ ${targetPrice}` : '--'}</StyledValue>
        <Label cur_language={cur_language} text={'Target_Price'} />
      </StyledStat>

      <StyledSpacer />

      <StyledStat>
        <StyledValue>
          {formattedTotalSupply}
          {/* -- */}
        </StyledValue>
        <Label cur_language={cur_language} text={'Total_Supply'} />
      </StyledStat>

    </StyledStats>
  )
}

const StyledStats = styled.div`
  width: 325px;
  @media(max-width: 767px) {
    width:100%
  }
`

const StyledStat = styled.div`
  display: flex;
  flex-direction: column;  
  margin-bottom:40px;
  &:last-child{
    margin-bottom:0
  }
  @media(max-width: 767px) {
    // width:100%;
    width:calc(100vw - 30px);
    height:calc((100vw - 30px)/692*197);
    background: url(${StatsBg}) no-repeat;
    background-size: 100% 100%;
    padding:15px 20px;
    box-sizing:border-box;
    margin-bottom:0;
    line-height:36px
  }
`

const StyledValue = styled.span`
  color: ${props => props.theme.color.grey[600]};
  font-size: 40px;
  font-weight: 700;
  @media(max-width: 767px) {
    width:100%;
    font-size:28px
  }
  font-family: 'dinFont' !important;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  @media(max-width: 767px) {
    height:8px
  }
`

export default Stats