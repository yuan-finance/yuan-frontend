import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import useYam from '../../hooks/useYam'
import Treasury from './components/Treasury'
import Rebase from './components/Rebase'
import Stats from './components/Stats'

import top__bg from '../../assets/img/Page/banner.png'
import m_top__bg from '../../assets/img/Page/m-banner.png'
import rebase__bg from '../../assets/img/Page/main-bg.svg'
import treasuryBg_pc from '../../assets/img/Page/treasuryBg_pc.svg'
import treasuryBg_h5 from '../../assets/img/Page/treasuryBg_h5.svg'
import { OverviewData } from './types'
import { getStats } from './utils'



interface HomeProps {
  setLanguage?: any
  cur_language?: any
}

const Home: React.FC<HomeProps> = ({ setLanguage, cur_language }) => {
  const yam = useYam()
  const [{ circSupply, curPrice, nextRebase, nextRebable, targetPrice, totalSupply }, setStats] = useState<OverviewData>({})
  const fetchStats = useCallback(async () => {
    const statsData = await getStats(yam)
    setStats(statsData)
  }, [yam, setStats])

  useEffect(() => {
    if (yam) {
      fetchStats()
    }
  }, [yam])

  return (
    <Page setLanguage={setLanguage} cur_language={cur_language}>
      <Top__bg></Top__bg>

      <HomeWrap>
        <StyledTreasury>
          <Treasury cur_language={cur_language}/>
        </StyledTreasury>
        <StyledOverview>
          <Rebase cur_language={cur_language} nextRebase={nextRebase} nextRebable={nextRebable} yam={yam}></Rebase>

          <StyledSpacer />

          <Stats
            cur_language={cur_language}
            circSupply={circSupply}
            curPrice={curPrice}
            targetPrice={targetPrice}
            totalSupply={totalSupply}
          />
        </StyledOverview>
      </HomeWrap>
    </Page>
  )
}

const Top__bg = styled.div`
  width:741px;
  height:170px; 
  margin: 49px 0 29px;
  background: url(${top__bg}) no-repeat;
  background-size: 100% 100%;
  @media(max-width: 767px) {
    width:100%;
    height:calc(100vw / 750 * 190);
    margin:64px 0 6px;
    background: url(${m_top__bg}) no-repeat;
    background-size: 100% calc(100vw / 750 * 190);
  }
`

const HomeWrap = styled.div`
  @media(max-width: 767px) {
    width:100%;
    padding:0 15px;
    box-sizing:border-box
  }
`
const StyledTreasury = styled.div`
  align-items: center;
  display: flex;
  width: 840px;
  height:214px;
  background: url(${treasuryBg_pc}) no-repeat;
  background-size: 100%;
  padding-bottom: 20px;
  // padding-left:66px;
  // margin-left:30px;
  margin-bottom:10px;
  box-sizing: border-box;
  @media(max-width: 767px) {
    // width:100%;
    width: calc(100vw - 30px);
    height: calc((100vw - 30px)/692*647);
    flex-direction: column;
    padding:0 15px;
    margin-left:0;
    margin-bottom:calc( 100vw / 750*20 );
    background: url(${treasuryBg_h5}) no-repeat;
    background-size:100%;
    align-items:flex-end
  }
`
const StyledOverview = styled.div`
  align-items: center;
  display: flex;
  width: 840px;
  height:510px;
  background: url(${rebase__bg}) no-repeat;
  background-size: 100% 100%;
  padding-top: 66px;
  padding-bottom: 63px;
  // padding-left:66px;
  box-sizing: border-box;
  justify-content: flex-end;
  @media(max-width: 767px) {
    width:100%;
    height:auto;
    flex-direction: column;
    padding:0;
    background:none;
  }
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: 170px;
  @media(max-width: 767px) {
    height:11px
  }
`

export default Home