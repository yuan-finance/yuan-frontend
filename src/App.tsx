import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useWallet, UseWalletProvider } from 'use-wallet'

import DisclaimerModal from './components/DisclaimerModal'
import { IntlProvider, FormattedMessage } from 'react-intl'
import en_US from './i18n/en_US.js'
import zh_CN from './i18n/zh_CN.js'

import { BalancesProvider } from './contexts/Balances'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import YamProvider from './contexts/YamProvider'
import TransactionProvider from './contexts/Transactions'

import { MigrationProvider } from './contexts/Migration'
// import { VestingProvider } from './contexts/Vesting'
import { GovernanceProvider } from './contexts/Governance'

import useModal from './hooks/useModal'

import Farms from './views/Farms'
import Home from './views/Home'
import Governance from './views/Governance'

import theme from './theme'

const App: React.FC = () => {
  const storageLanguage = window.localStorage.getItem('local-language') || (navigator.language.toLowerCase() === 'zh-cn' ? '中文' : 'English');
  const [cur_language, setCurLanguage] = useState(storageLanguage)
  // console.log(cur_language)

  function setCurLanguage__before() {
    console.log(cur_language)
    if (cur_language === '中文') {
      setCurLanguage('English')
      window.localStorage.setItem('local-language', 'English')
      document.body.style.fontFamily = 'Microsoft YaHei'
    } else if (cur_language === 'English') {
      setCurLanguage('中文')
      window.localStorage.setItem('local-language', '中文')
      document.body.style.fontFamily = 'yuanFont'
    }
  }

  const setFontFamily = useCallback(() => {
    let lang = window.localStorage.getItem('local-language');
    console.log(lang)

    if (lang === 'English') {
      document.body.style.fontFamily = 'Microsoft YaHei'
    } else if (lang === '中文') {
      document.body.style.fontFamily = 'yuanFont'
    }
  }, [cur_language])
  setFontFamily();

  return (
    <Providers>
      <IntlProvider locale={'en'} messages={cur_language === '中文' ? zh_CN : en_US} >
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home setLanguage={setCurLanguage__before} cur_language={cur_language} />
            </Route>

            <Route path="/distribution">
              <Farms setLanguage={setCurLanguage__before} cur_language={cur_language} is_staking={true} />
            </Route>

            <Route path="/staking">
              <Farms setLanguage={setCurLanguage__before} cur_language={cur_language} is_staking={false} />
            </Route>

            <Route exact path="/governance">
              <Governance setLanguage={setCurLanguage__before} cur_language={cur_language} />
            </Route>
          </Switch>
        </Router>
        {/* <div onClick={()=>{setCurLanguage('English')}}>
          <FormattedMessage id='goldx_detail' />
        </div> */}
        <Disclaimer />
      </IntlProvider>
    </Providers>
  )
}


const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        // (to be change)
        chainId={1}
        connectors={{
          walletconnect:
            // { rpcUrl: 'https://kovan.eth.aragon.network/' },
            // { rpcUrl: 'https://kovan.infura.io/v3/320bfd13dfd54d19959f78a61e43dd0d' },
            { rpcUrl: 'https://mainnet.infura.io/v3/320bfd13dfd54d19959f78a61e43dd0d' },
        }}
      >
        <YamProvider>
          <TransactionProvider>
            <ModalsProvider>
              <BalancesProvider>
                <FarmsProvider>
                  <MigrationProvider>
                    {/* <VestingProvider> */}
                      <GovernanceProvider>
                        {children}
                      </GovernanceProvider>
                    {/* </VestingProvider> */}
                  </MigrationProvider>
                </FarmsProvider>
              </BalancesProvider>
            </ModalsProvider>
          </TransactionProvider>
        </YamProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {

  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  // const [onPresentDisclaimerModal] = useModal(<DisclaimerModal onConfirm={markSeen} />)

  // useEffect(() => {
  //   const seenDisclaimer = localStorage.getItem('disclaimer')
  //   if (!seenDisclaimer) {
  //     onPresentDisclaimerModal()
  //   }
  // }, [])

  return (
    <div />
  )
}

export default App
