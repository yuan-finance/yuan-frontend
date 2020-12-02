import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { useWallet } from 'use-wallet'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'

import useFarms from '../../../hooks/useFarms'

import { Farm } from '../../../contexts/Farms'

import { getPoolStartTime } from '../../../yamUtils'
import pool_bg from '../../../assets/img/stake/pool_bg.svg'
// import stake_btn from '../../../assets/img/stake/stake_btn.svg'
import { IntlProvider, FormattedMessage } from 'react-intl'

import { getAPYContract } from '../../../utils/erc20js'
import { abi } from '../../../utils/apy.json'
import { networks } from '../../../utils/apy.json'
import long_line from '../../../assets/img/Page/long-line.png'
import USDC_ETH from '../../../assets/img/Page/USDC-ETH.svg'
import USDT_ETH from '../../../assets/img/Page/USDT-ETH.svg'
import USDx_ETH from '../../../assets/img/Page/USDx-ETH.svg'
import DAI_ETH from '../../../assets/img/Page/DAI-ETH.svg'
import UNI_ETH from '../../../assets/img/Page/UNI-ETH.svg'
import YFI_ETH from '../../../assets/img/Page/YFI-ETH.svg'
import LINK_ETH from '../../../assets/img/Page/LINK-ETH.svg'
import BAND_ETH from '../../../assets/img/Page/BAND-ETH.svg'
import DF_ETH from '../../../assets/img/Page/DF-ETH.svg'
import YFII_ETH from '../../../assets/img/Page/YFII-ETH.svg'
import YAM_ETH from '../../../assets/img/Page/YAM-ETH.svg'
import AMPL_ETH from '../../../assets/img/Page/AMPL-ETH.svg'
import long_line_left from '../../../assets/img/Page/long-line-left.svg'
import YUAN_USDx from '../../../assets/img/Page/YUAN-USDx.svg'
import YUAN_ETH from '../../../assets/img/Page/YUAN-ETH.svg'


const json_image: any = {
  'USDC_ETH': USDC_ETH,
  'USDT_ETH': USDT_ETH,
  'USDx_ETH': USDx_ETH,
  'DAI_ETH': DAI_ETH,
  'UNI_ETH': UNI_ETH,
  'YFI_ETH': YFI_ETH,
  'LINK_ETH': LINK_ETH,
  'BAND_ETH': BAND_ETH,
  'DF_ETH': DF_ETH,
  'YFII_ETH': YFII_ETH,
  'YAM_ETH': YAM_ETH,
  'AMPL_ETH': AMPL_ETH,
  'YUAN_ETH': YUAN_ETH,
  'YUAN_USDx': YUAN_USDx
}

interface FarmCardsProps {
  cur_language?: any,
  is_staking?: boolean
}
const FarmCards: React.FC<FarmCardsProps> = ({ cur_language, is_staking }) => {
  const [farms] = useFarms()

  const rows = farms.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    // if (newFarmRows[newFarmRows.length - 1].length === 3) {
    //   newFarmRows.push([farm])
    // } else {
    //   newFarmRows[newFarmRows.length - 1].push(farm)
    // }

    newFarmRows[newFarmRows.length - 1].push(farm)
    // console.log(newFarmRows)
    return newFarmRows
  }, [[]])

  return (
    <StyledCards>
      <Farm_header>
        <Farm_header_h1>
          <FormattedMessage id={'select_a_pool'} />
        </Farm_header_h1>
        <Farm_header_p>
          <FormattedMessage id={'select_a_pool__sub'} />
        </Farm_header_p>
      </Farm_header>

      {
        !!rows[0].length ?
          rows.map((farmRow, i) => (
            <>
              {/* 夏 商 周 */}
              {
                is_staking &&
                <>
                  <StyledLong_line>
                    <StyledLong_line__text>
                      <FormattedMessage id={'title_shiqian'} />
                    </StyledLong_line__text>
                  </StyledLong_line>
                  <StyledRow key={i}>
                    {farmRow.map((farm, j) => {
                      if (j > 2) {
                        return <></>;
                      } else {
                        return (
                          <React.Fragment key={j}>
                            <FarmCard farm={farm} cur_language={cur_language} is_staking={is_staking} />
                            {(j === 0 || j === 1) && <StyledSpacer />}
                          </React.Fragment>
                        )
                      }
                    })}
                  </StyledRow>

                  <StyledLong_line>
                    <StyledLong_line__text>
                      <FormattedMessage id={'title_qin'} />
                    </StyledLong_line__text>
                  </StyledLong_line>
                  <StyledRow key={i + 1}>
                    {farmRow.map((farm, j) => {
                      if (j > 2 && j < 7) {
                        return (
                          <React.Fragment key={j}>
                            <FarmCard farm={farm} cur_language={cur_language} show_images={true} is_staking={is_staking} />
                            {(j === 3 || j === 4) && <StyledSpacer />}
                          </React.Fragment>
                        )
                      } else {
                        return <></>
                      }
                    })}
                  </StyledRow>

                  <StyledLong_line>
                    <StyledLong_line__text>
                      <FormattedMessage id={'title_han'} />
                    </StyledLong_line__text>
                  </StyledLong_line>
                  <StyledRow key={i + 2}>
                    {farmRow.map((farm, j) => {
                      if (j > 6 && j < 9) {
                        return (
                          <React.Fragment key={j}>
                            <FarmCard farm={farm} cur_language={cur_language} show_images={true} is_staking={is_staking} />
                            {(j === 6 || j === 7) && <StyledSpacer />}
                          </React.Fragment>
                        )
                      } else {
                        return <></>
                      }
                    })}
                  </StyledRow>

                  <StyledLong_line>
                    <StyledLong_line__text>
                      <FormattedMessage id={'title_tang'} />
                    </StyledLong_line__text>
                  </StyledLong_line>
                  <StyledRow key={i + 3}>
                    {farmRow.map((farm, j) => {
                      if (j > 8 && j < 15) {
                        return (
                          <React.Fragment key={j}>
                            <FarmCard farm={farm} cur_language={cur_language} show_images={true} is_staking={is_staking} />
                            {(j === 9 || j === 10 || j === 12 || j === 13) && <StyledSpacer />}
                          </React.Fragment>
                        )
                      } else {
                        return <></>
                      }
                    })}
                  </StyledRow>
                </>
              }


              {
                !is_staking &&
                <>
                  <StyledLong_line>
                    <StyledLong_line__text>
                      <FormattedMessage id={'zhengcheng'} />
                    </StyledLong_line__text>
                  </StyledLong_line>
                  <StyledRow key={i + 4}>
                    {farmRow.map((farm, j) => {
                      if (j > 14) {
                        return (
                          <React.Fragment key={j}>
                            <FarmCard farm={farm} cur_language={cur_language} show_images={true} is_staking={is_staking} />
                            {(j === 15) && <StyledSpacer />}
                          </React.Fragment>
                        )
                      } else {
                        return <></>
                      }
                    })}
                  </StyledRow>
                </>
              }

            </>
          ))
          :
          <StyledLoadingWrapper>
            <Loader text="Loading" />
          </StyledLoadingWrapper>
      }
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: Farm,
  cur_language?: any,
  show_images?: boolean,
  is_staking?: boolean
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, cur_language, show_images, is_staking }) => {
  const [startTime, setStartTime] = useState(0)
  const [nowapy, setNow_apy] = useState('-')
  const { ethereum, chainId, account } = useWallet()
  const str_token = farm.depositToken.replace('-', '_')
  // console.log(farm)

  const get_now_apy = useCallback(async () => {

    if (farm.contract === null || !ethereum) {
      // console.log('farm.contract === null || !ethereum')
      return false;
    }
    const now_apy = await getAPYContract(ethereum, abi, networks, chainId, farm.contract);
    // console.log(ethereum, abi, networks, chainId, farm.contract)
    setNow_apy(now_apy)
  }, [farm.contract])
  get_now_apy();

  const getStartTime = useCallback(async () => {
    const startTime = await getPoolStartTime(farm.contract)
    setStartTime(startTime)
  }, [farm, setStartTime])

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }

  useEffect(() => {
    if (farm && farm.id === 'ycrv_yam_uni_lp') {
      getStartTime()
    }
  }, [farm, getStartTime])

  const poolActive = startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
      {farm.id === 'ycrv_yam_uni_lp' && (
        <StyledCardAccent />
      )}
      <StyledContent>
        {
          !show_images &&
          <CardIcon noBorder={false} cur_language={cur_language}>
            <FormattedMessage id={farm.icon} />
          </CardIcon>
        }
        {
          show_images &&
          <StyledTokens>
            <img src={json_image[str_token]} alt="" />
          </StyledTokens>
        }
        <StyledDetails>
          <StyledDetail>
            <FormattedMessage id={'Deposit'} />
            <StyledA href={farm.href_link} target='_blank'>{farm.depositToken}</StyledA>
          </StyledDetail>
          <StyledDetail><FormattedMessage id={'Earn'} />{farm.earnToken.toUpperCase()}</StyledDetail>
        </StyledDetails>
        <Button
          cur_language={cur_language}
          disabled={!poolActive || farm.contract === null}
          text={poolActive ? 'Select' : undefined}
          to={
            (!poolActive || farm.contract === null) ?
              "javascript:void(0);"
              :
              is_staking ? `/staking/${farm.id}` : `/distribution/${farm.id}`
          }
          widthProps={206}
          heightProps={52}
          imageBg={(!poolActive || farm.contract === null) ? 'Harvest_disabled' : 'Stake'}
        >
          {!poolActive && <Countdown date={new Date(startTime * 1000)} renderer={renderer} />}
        </Button>

        <StyledAPY>
          <FormattedMessage id={'APY'} />
          <span style={{ fontFamily: 'dinFont' }}>
            {
              nowapy && (farm.contract !== null) && account && ethereum ?
                nowapy === '-' ? '-' : (Number(nowapy) / (1e16)).toFixed(2) + '%'
                :
                '-'
            }
          </span>
        </StyledAPY>
      </StyledContent>
    </StyledCardWrapper>
  )
}


const StyledA = styled.a`
color: #476065 !important;
`

const StyledTokens = styled.div`
margin-top: 20px;
margin-bottom: 14px;
`

const StyledLong_line = styled.div`
margin-top: 50px;
width: 100%;
background: url(${long_line_left}) no-repeat 0 10px;
position: relative;
`
const StyledLong_line__text = styled.div`
  display: inline-block;
  margin-left: 40px;
  text-align: center;
font-size: 30px;
color: #476065;
line-height: 33px;
`

const StyledAPY = styled.div`
height: 22px;
font-size: 20px;
font-weight: normal;
color: rgba(71, 96, 101, 0.8);
line-height: 22px;
margin-top: 16px;
width: 100%;
display: flex;
justify-content: space-between;
@media(max-width: 767px) {
  margin-top: 0px;
}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  z-index: -1;
  @media(max-width: 767px) {
    top: -2px; right: 22px; bottom: -2px; left: 22px;
  }
`
const Farm_header = styled.div`
  margin-top:49px;
  text-align:center;
  color:#476065
`
const Farm_header_h1 = styled.h1`
  font-size:40px;
  line-height:44px;
  margin:0
`
const Farm_header_p = styled.h1`
  font-size:16px;
  line-height:38px;
  margin:0 0 26px 0
`

const StyledCards = styled.div`
  width: 840px;
  @media(max-width: 767px) {
    width:100%;
    flex-direction: column;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[4]}px;
  @media(max-width: 767px) {
    flex-direction: column;
  }
  flex-wrap: wrap;
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((840px - 15px * 2) / 3);
  position: relative;
  @media(max-width: 767px) {
    width:auto;
    padding:0 24px;
  }
`

const StyledTitle = styled.h4`
  color: ${props => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${props => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width:270px;
  height:380px;
  padding:48px 32px 32px;
  box-sizing:border-box;
  background:url(${pool_bg});
  background-repeat: no-repeat;
  background-size:100% 104%;
`

const StyledSpacer = styled.div`
  height: 15px;
  width: 15px;
`

const StyledDetails = styled.div`
  margin-bottom: 20px;
  margin-top: ${props => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: #476065;
  font-size:20px;
  line-height:22px;
  margin-bottom:8px;
  a:visited{
    color:#476065
  }
`
// const Styled__btn = styled.div`
//   background: url(${stake_btn});
//   width: 208px;
//   height:54px;
//   background-size: 100% 100%;
//   text-align: center;
//   line-height: 54px;
//   color: #fff;
//   font-size:18px;
//   cursor: pointer;
//   margin-bottom: 32px;
// `
export default FarmCards
