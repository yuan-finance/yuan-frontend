import React, { useCallback, useMemo, useState, useEffect } from 'react'

// import { Line } from 'rc-progress';
import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import {
  Button,
  // Modal,
  // ModalActions,
  ModalContent,
  ModalProps,
  // ModalTitle,
  Separator,
  // Spacer,
  Card,
  // CardContent
} from 'react-neu'

// import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent2'
import Modal from '../../../components/Modal2'
import ModalActions from '../../../components/ModalActions2'
import ModalTitle from '../../../components/ModalTitle2'
import Spacer from '../../../components/Spacer2'
// import Button from '../../../components/Button'

import styled from 'styled-components'

import useYam from '../../../hooks/useYam'
import useGovernance from '../../../hooks/useGovernance'
import { useWallet } from 'use-wallet'
import { delegate, didDelegate } from '../../../yam-sdk/utils'

import { Proposal } from "../../../contexts/Governance/types"
import Split from '../../../components/Split'

interface VoteModalProps extends ModalProps {
  prop: Proposal,
  onVote: (proposal: number, side: boolean, onDismiss: () => void) => void,
  isRegistered?:any,
  isRegistering?:any,
  isVoting?:any,
  votingPowers?:any,
  onRegister?:any
}

const VoteModal: React.FC<VoteModalProps> = ({
  prop,
  isOpen,
  onDismiss,
  onVote,
  isRegistered,
  isRegistering,
  isVoting,
  votingPowers,
  onRegister
}) => {
  // const { isRegistered, isRegistering, isVoting, votingPowers, currentPower, onRegister } = useGovernance2();
  // const { isRegistered, isRegistering, isVoting, currentPower, onRegister } = useGovernance();
  console.log(prop)
  const handleVoteClickTrue = useCallback(async () => {
    onVote(prop.id, true, onDismiss);
  }, [onVote])

  const handleVoteClickFalse = useCallback(async () => {
    onVote(prop.id, false, onDismiss);
  }, [onVote])

  const { account } = useWallet()
  const yam = useYam()

  let percFor = prop.forVotes / (prop.forVotes + prop.againstVotes) * 100;
  let percAgainst = prop.againstVotes / (prop.forVotes + prop.againstVotes) * 100;

  let votePower;
  let voted;
  let side;
  if (votingPowers) {
    for (let i = 0; i < votingPowers.length; i++) {
       if (prop.hash == votingPowers[i].hash) {
         let votingPower = votingPowers[i];
         votePower = votingPower.power;
         voted = votingPower.voted;
         side = votingPower.side;
       }
    }
  }
  return (
    <Modal isOpen ={isOpen}>
      <ModalTitle text="Proposal Overview" />
      <ModalContent>
        <CardContent>
        { (voted) && (
          <StyledTitle>
            Your vote:
            <Spacer size="sm" />
            <StyledSubtitle>{side ? '"For"' : '"Against"'} with {numeral(votePower).format('0a')} votes.</StyledSubtitle>
          </StyledTitle>
        ) || (
          <StyledTitle>
            Your vote:
            <Spacer size="sm" />
            <StyledSubtitle>No vote</StyledSubtitle>
          </StyledTitle>
        )}
        </CardContent>
        <Spacer size="md"/>
        <Split>
          <CardContent>
            <Button
              size="sm"
              href={"https://etherscan.io/tx/" + prop.hash}
              text="View On Etherscan"
              variant="tertiary"
             />
            {/* { (prop.more) && (<Spacer size="sm" />) } */}
            { (prop.more) && (
              <Button
               size="sm"
               href={prop.more}
               text="Read More & See Off-Chain Vote"
               variant="tertiary"
              />
            )}
          </CardContent>
          <Card>
            <Spacer size="sm" />
            <CardContent>
              Votes
              <Separator />
              <Spacer size="sm" />
              <StyledLineHolder>
                For: {numeral(prop.forVotes).format('0.a')}
                {/* <Line percent={percFor} strokeWidth={1} strokeColor="#ec0e5c" /> */}
              </StyledLineHolder>
              <Spacer size="sm" />
              <StyledLineHolder>
                Against: {numeral(prop.againstVotes).format('0.a')}
                {/* <Line percent={percAgainst} strokeWidth={1} strokeColor="#ec0e5c" /> */}
              </StyledLineHolder>
            </CardContent>
            <Spacer size="sm" />
          </Card>
        </Split>
        <Spacer size="md"/>
        <Card>
          <Spacer size="sm" />
          <CardContent>
            <Spacer size="sm" />
            <StyledDescription>
              <span>Description:</span>
            </StyledDescription>
            <Spacer size="sm"/>
            <StyledInfo>
              <span>  {prop.description ? prop.description.replace("Kill", "Pause"): ""}</span>
            </StyledInfo>
            <Spacer size="sm"/>
            <Separator />
            <Spacer size="sm"/>
            <StyledDescription>
              <span>Affecting:</span>
            </StyledDescription>
            <Spacer size="sm"/>
            <StyledInfo>
              <span style={{wordBreak: 'break-word'}}>  {prop.targets.join(", ")}</span>
            </StyledInfo>
            <Spacer size="sm"/>
            <Separator />
            <Spacer size="sm"/>
            <StyledDescription>
              <span>Function Calls:</span>
            </StyledDescription>
            <Spacer size="sm"/>
            <StyledInfo>
            <code> {prop.signatures.join(", ")}</code>
            </StyledInfo>
            <Spacer size="sm"/>
            <Separator />
            <Spacer size="sm"/>
            <StyledDescription>
              <span>Inputs:</span>
            </StyledDescription>
            <Spacer size="sm"/>
            <StyledInfo>
              {
                prop.inputs.map((input, i) => {
                  return (<code key={i}>{JSON.stringify(input)}</code>)
                })
              }
            </StyledInfo>
            <Spacer size="sm" />
          </CardContent>
          <Spacer size="sm" />
        </Card>
      </ModalContent>
      <ModalActions>
        { (prop.state == "Active") && (!voted) && (isRegistered) && (votePower && votePower > 0) && (
          //{ (prop.state == "Defeated") && (
          <div style={{display: 'flex',flexDirection: 'row'}}>
            <Button
              disabled={isVoting}
              onClick={handleVoteClickTrue}
              text="For"
            />
            <Spacer size="md"/>
            <Button
              disabled={isVoting}
              onClick={handleVoteClickFalse}
              text="Against"
            />
          </div>) || (prop.state == "Active") && (!voted) && (isRegistered) && (
            <span style={{display:'inline-block',width:'100%',marginBottom:'15px'}}>
              Unable To Vote. You were either not delegating or did not have YUAN in your wallet at the time of this proposal.
            </span>
          ) || (prop.state == "Pending") && (!isRegistered) && (!voted) && (
            // ) || (prop.state == "Defeated") && (
            <Button
              disabled={isRegistering}
              onClick={onRegister}
              text="Register"
            />
          )
        }
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="tertiary"
        />
      </ModalActions>
    </Modal>
  )
}

const StyledTitle = styled.h1`
  color: ${props => props.theme.textColor};
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  @media(max-width: 767px) {
    font-size:20px
  }
`

const StyledSubtitle = styled.b`
  color: ${props => props.theme.textColor};
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  opacity: 0.66;
  padding: 0;
`

const StyledLineHolder = styled.div`
  width: 80%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`

const StyledDescription = styled.div`
  font-weight: 600;
  font-size: 20px;
`

const StyledInfo = styled.div`
  font-size: 14px;
`
export default VoteModal
