import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'
import TxButton from './components/TxButton'

import menu__top_bg from '../../assets/img/Page/mune-top-bg.svg'
import LOGO from '../../assets/img/Page/LOGO.png'
import menu__bottom_bg from '../../assets/img/Page/menu-bg_bottom.svg'

import h5_menu__top_bg from '../../assets/img/Page/h5-mune-top-bg.svg'
import h5_menu__bottom_bg from '../../assets/img/Page/h5-mune-bottom-bg.svg'

interface PageProps {
  setLanguage?: any
  cur_language?: any
  showStatus?: boolean,
  setShow?: any
}

const TopBar: React.FC<PageProps> = ({ setLanguage, cur_language, showStatus, setShow }) => {
  return (
    <StyledTopBar showStatus={showStatus}>
      <Container size="lg">
        <StyledTopBarInner>
          <MENU__top_bg></MENU__top_bg>
          {/* <img src={menu__top_bg} width='209' height='39' alt="menu" /> */}
          <PC_only>
            <a style={{ marginTop: '15px' }}>
              <img src={LOGO} width='50' height='74' alt="logo" />
            </a>
            <AccountButton cur_language={cur_language} showStatus={showStatus} />
          </PC_only>
          <Nav setLanguage={setLanguage} cur_language={cur_language} setShow={setShow} />
          <MENU__bottom_bg></MENU__bottom_bg>
          {/* <img src={menu__bottom_bg} width='209' height='246' style={{ marginTop: 'auto' }} alt="menu1" /> */}
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

interface StyledTopBarProps {
  showStatus: boolean,
}

const StyledTopBar = styled.div<StyledTopBarProps>`
display:block;
width:209px;
background:#476065;
z-index:1;
@media(max-width: 767px) {
  display:${props => props.showStatus ? 'block' : 'none'};
  width:100%;
  position:fixed;
  left:0;
  top:70px;
  right:0;
  bottom:0
}
`
const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding-top:10px;
  padding-bottom:10px;
  height: 100%;
  box-sizing: border-box;
  @media(max-width: 767px) {
    padding:15px
  }
`
const MENU__top_bg = styled.div`
width:209px;
height:39px;
// width:calc(100% + 60px);
// height:calc((100% + 60px) / 209 * 39);
background: url(${menu__top_bg}) no-repeat;
background-size: 100% 100%;
@media(max-width: 767px) {
  width:calc(100vw - 30px);
  height:calc((100vw - 30px)/690*39);
  background: url(${h5_menu__top_bg}) no-repeat;
  background-size: 100% 100%;
}
`
const MENU__bottom_bg = styled.div`
width:209px;
height:246px;
// width:calc(100% + 60px);
// height:calc((100% + 60px) / 209 * 246);
background: url(${menu__bottom_bg}) no-repeat;
background-size: 100% 100%;
margin-top:auto;
@media(max-width: 767px) {
  width:calc(100vw - 30px);
  height:calc((100vw - 30px)/677*577);
  background: url(${h5_menu__bottom_bg}) no-repeat;
  background-size: 100% 100%;
}
`
const PC_only = styled.div`
align-items: center;
display: flex;
flex-direction: column;
justify-content: flex-start;
@media(max-width: 767px) {
  display:none
}
`
export default TopBar