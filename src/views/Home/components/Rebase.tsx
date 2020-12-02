import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import Countdown, { CountdownRenderProps } from 'react-countdown'

import Button from '../../../components/Button'
import Dial from '../../../components/Dial'
import Label from '../../../components/Label'
import Rebase1 from '../../../assets/img/Page/Rebase1.svg'
import Popup from '../../../components/Popup'

interface RebaseProps {
  nextRebase?: number,
  nextRebable?: boolean,
  yam: any,
  cur_language?: any
}

const Rebase: React.FC<RebaseProps> = ({ nextRebase, nextRebable, yam, cur_language }) => {
  const [showPopup, setShowPopup] = useState({ show: false, status: '', hash: '', text: '' })
  const { account, reset } = useWallet()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds, total } = countdownProps
    // if (total === 0) {
    //   reset()
    // }
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }


  const handleRebase = useCallback(async () => {
    try {
      await yam.contracts.rebaser.methods.rebase().send({ from: account })
        // metamask 点击 confirm
        .on('transactionHash', function (hash: string) {
          console.log('transactionHash', hash)
          setShowPopup({ show: true, status: 'pendding', hash: hash, text: 'Rebase' })
        })
        // tx 交易成功
        .on('receipt', function (receipt: any) {
          console.log(receipt);
          setShowPopup({ show: true, status: 'success', hash: showPopup.hash, text: 'Rebase' })
          setTimeout(() => {
            setShowPopup({ show: false, status: 'success', hash: showPopup.hash, text: 'Rebase' })
          }, 3000)
          reset();
        })
        // click cancel
        .on('error', function (error: any) {
          console.log('error', error)
          setShowPopup({ show: true, status: 'fail', hash: showPopup.hash, text: 'Rebase' })
          setTimeout(() => {
            setShowPopup({ show: false, status: 'fail', hash: showPopup.hash, text: 'Rebase' })
          }, 3000)
        });

      // .on('confirmation', function (confirmationNumber: any, receipt: any) {
      //   console.log(confirmationNumber, receipt)
      // })
    } catch (e) {
      console.log(e)
    }
  }, [account, yam])

  // to be update
  // const dialValue = nextRebase / (1000 * 60 * 60 * 12) * 100
  // const dialValue = nextRebase / (1000 * 1800) * 100
  // get second timestamp.
  let curTime = (new Date().getTime()) - (new Date().getTime() % 1000)
  return (
    <StyledRebase>

      <Popup showPopup={showPopup} cur_language={cur_language} />

      <Dial disabled={!nextRebase} size={232} value={nextRebase ? nextRebase : 0}>
        <StyledCountdown>
          <StyledCountdownText>
            {!nextRebase ? '--' : (
              <Countdown date={new Date(Date.now() + nextRebase)} renderer={renderer} />
            )}
          </StyledCountdownText>
          <Label cur_language={cur_language} text="Next_Rebase" />
        </StyledCountdown>
      </Dial>

      <StyledSpacer />

      <Button
        cur_language={cur_language}
        disabled={!nextRebable}
        onClick={handleRebase}
        text="Rebase"
        widthProps={274}
        heightProps={52}
        imageBg={!nextRebable ? 'Rebase_disabled' : 'Rebase'}
      />

    </StyledRebase>
  )
}


const StyledRebase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media(max-width: 767px) {
    width:calc(100vw - 30px);
    height:calc((100vw - 30px)/692*537);
    background: url(${Rebase1}) no-repeat;
    background-size: cover;
    box-sizing:border-box
  }
`

const StyledCountdown = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledCountdownText = styled.span`
  color: ${props => props.theme.color.grey[600]};
  font-size: 40px;
  font-weight: 700;
  @media(max-width: 767px) {
    font-size:24px
  }

  font-family: 'dinFont' !important;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  @media(max-width: 767px) {
    height:0;
    margin:8px auto
  }
`

export default Rebase