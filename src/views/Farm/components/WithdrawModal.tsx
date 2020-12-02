import React, { useCallback, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'

import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'

import { getFullDisplayBalance } from '../../../utils/formatBalance'

interface WithdrawModalProps extends ModalProps {
  max: BigNumber,
  onConfirm: (amount: string, onDismiss: () => void, setShowPopup: () => void, showPopup: any) => void,
  tokenName?: string,
  cur_language?: any,
  token_decimals?: any,
  showPopup?: any,
  setShowPopup?: any
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, showPopup, setShowPopup, max, tokenName = '', cur_language, token_decimals }) => {
  const [val, setVal] = useState('')

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, token_decimals)
  }, [max])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal>
      <ModalTitle
        cur_language={cur_language}
        //  text={`Withdraw_${tokenName}`}
        text1={'Withdraw'}
        text2={tokenName}
      />

      <TokenInput
        cur_language={cur_language}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
      />

      <ModalActions>
        <Button
          widthProps={206} heightProps={52} imageBg={'Stake'}
          cur_language={cur_language} text="Cancel" variant="secondary" onClick={onDismiss} />
        <Button
          widthProps={206} heightProps={52} imageBg={'Stake'}
          cur_language={cur_language} text="Confirm" onClick={() => onConfirm(val, onDismiss, setShowPopup, showPopup)} />
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal