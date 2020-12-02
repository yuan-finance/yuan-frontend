import React from 'react'
import styled from 'styled-components'
import { Route, Switch, useRouteMatch, } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import farmer from '../../assets/img/farmer.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'

interface HomeProps {
  setLanguage?: any
  cur_language?: any
  is_staking?: boolean
}

const Farms: React.FC<HomeProps> = ({ setLanguage, cur_language, is_staking }) => {
  const { path } = useRouteMatch()
  const { account, connect } = useWallet()
  return (
    <Switch>
      <Page setLanguage={setLanguage} cur_language={cur_language}>
        {
          // !!account &&
          <>
            <Farm__wrap>
              <Route exact path={path}>
                <FarmCards cur_language={cur_language} is_staking={is_staking} />
              </Route>

              <Route path={`${path}/:farmId`}>
                <Farm cur_language={cur_language} />
              </Route>
            </Farm__wrap>
          </>
          // <div style={{ alignItems: 'center', display: 'flex', flex: 1, justifyContent: 'center' }}>
          //   <Button
          //     cur_language={cur_language}
          //     onClick={() => connect('injected')}
          //     text="Connect"
          //   />
          // </div>
        }
      </Page>
    </Switch>
  )
}

const Farm__wrap = styled.div`

`


export default Farms