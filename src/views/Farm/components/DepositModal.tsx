import React, { useCallback, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'

import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'

import { getFullDisplayBalance } from '../../../utils/formatBalance'

interface DepositModalProps extends ModalProps {
  max: BigNumber,
  onConfirm: (amount: string, onDismiss: () => void, setShowPopup?: any, showPopup?: any) => void,
  tokenName?: string,
  cur_language?: any,
  token_decimals?: any,
  setShowPopup?: any,
  showPopup?: any
}

const DepositModal: React.FC<DepositModalProps> = ({ max, setShowPopup, showPopup, onConfirm, onDismiss, tokenName = '', cur_language, token_decimals }) => {
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
        // text={`Deposit_${tokenName}`}
        text1={'Deposit'}
        text2={tokenName}
      />

      <TokenInput
        cur_language={cur_language}
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
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


export default DepositModal