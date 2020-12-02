import React, { useEffect, useCallback, useMemo, useState }  from 'react'
import {
  // Container,
  // Spacer,
  // Card,
  // CardTitle,
  // CardContent,
  Separator,
  Surface,
  // Button
} from 'react-neu'

import Container from '../../components/Container'
import Spacer from '../../components/Spacer'
import Card from '../../components/Card'
import CardTitle from '../../components/CardTitle'
import CardContent from '../../components/CardContent'
import Button from '../../components/Button'

import { IntlProvider, FormattedMessage } from 'react-intl'
import en_US from '../../i18n/en_US'
import zh_CN from '../../i18n/zh_CN'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Split from '../../components/Split'

import RegisterVoteNotice from '../../views/Home/components/RegisterVoteNotice'
import SeparatorGrid from "./components/SeparatorWithCSS"
import Box from "./components/BoxWithDisplay"
import styled from 'styled-components'

import useGovernance from '../../hooks/useGovernance'
import { useWallet } from 'use-wallet'

import {
  ProposalEntry,
  StyledDescription,
  StyledState,
  StyledButton,
  StyledProposalContentInner
}  from './components/Proposal'

interface GovernanceProps {
  setLanguage?: any
  cur_language?: any
}

// const ASTRONAUTS = [
//   '👨‍🚀',
//   '👨🏻‍🚀',
//   '👨🏼‍🚀',
//   '👨🏽‍🚀',
//   '👨🏾‍🚀',
//   '👩‍🚀',
//   '👩🏻‍🚀',
//   '👩🏼‍🚀',
//   '👩🏽‍🚀',
//   '👩🏾‍🚀‍',
//   '👩🏿‍🚀'
// ]

// const ASTRONAUTS = [
//   'xia',
//   'shang',
//   'zhou',
//   'qin',
//   'han'
// ]

const Governance: React.FC<GovernanceProps> = ({ setLanguage,cur_language }) => {
  const { proposals, isRegistered, onVote, onRegister } = useGovernance();
  // const [astronaut, setAstronaut] = useState('👨‍🚀')


  // const updateAstronaut = useCallback(() => {
  //   const newAstro = ASTRONAUTS[Math.floor(Math.random()*ASTRONAUTS.length)]
  //   console.log("governance",newAstro)
  //   setAstronaut(newAstro)
  // }, [setAstronaut])

  // useEffect(() => {
  //   const refresh = setInterval(updateAstronaut, 1000)
  //   return () => clearInterval(refresh)
  // }, [updateAstronaut])




  return (
    <Page setLanguage={setLanguage} cur_language={cur_language}>
      {/* <PageHeader
        icon={`${astronaut}`}
        subtitle="View and vote on proposals below!"
        title="Govern"
      /> */}

      {/* <h1>{astronaut}</h1> */}

      <PageHeader
        cur_language={cur_language}
        // icon={null}
        subtitle="Viewvote"
        title="Governance"
      />

      <Container>
        <RegisterVoteNotice />
        <Spacer size="md" />
        <Split>
          <Spacer />
          <Button
            text="Forum"
            href="https://forum.1yuan.finance"
            // variant="tertiary"
            cur_language={cur_language}
          />
          <Spacer />
          <Button
            text="OffchainVoting"
            href="https://snapshot.page/#/yuan"
            // variant="tertiary"
            cur_language={cur_language}
          />
          <Spacer />
        </Split>
        <Spacer size="lg"/>
        <Card>
          {/* <CardTitle text="On-chain Proposals" /> */}
          <CardTitle cur_language={cur_language} text="OnchainProposals"/>
          <Spacer size="sm" />
          <CardContent>
            <Box
              display="grid"
              alignItems="center"
              paddingLeft={4}
              paddingRight={4}
              paddingBottom={1}
              row
            >
             <StyledProposalContentInner>
               <StyledDescriptionMain><FormattedMessage id='Description' /></StyledDescriptionMain>
               <SeparatorGrid orientation={'vertical'} stretch={true} gridArea={'spacer1'}/>
               <StyledStateMain><FormattedMessage id='State' /></StyledStateMain>
               <SeparatorGrid orientation={'vertical'} stretch={true} gridArea={'spacer2'}/>
               <StyledButtonMain><FormattedMessage id='Action' /></StyledButtonMain>
             </StyledProposalContentInner>
            </Box>
            <Spacer size="sm"/>
            { (proposals) &&
              (<Surface>
                {
                  proposals.map((prop, i) => {
                    if (i == 0) {
                      return <ProposalEntry key={prop.hash} prop={prop} onVote={onVote} onRegister={onRegister}/>
                    } else {
                      return [<Separator key={prop.id} />, <ProposalEntry key={prop.hash} prop={prop} onVote={onVote} onRegister={onRegister}/>]
                    }
                  })
                }
              </Surface>)
            }
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}


export const StyledButtonMain = styled.div`
  font-weight: 600;
  display: grid;
  grid-area: vote;
  margin-left: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
    min-width: max-content
  }
`

export const StyledDescriptionMain = styled.span`
  font-weight: 600;
  display: grid;
  grid-area: desc;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

export const StyledStateMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: state;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

export default Governance
