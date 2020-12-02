import React from 'react'
import styled from 'styled-components'
import { IntlProvider, FormattedMessage } from 'react-intl'
import en_US from '../../i18n/en_US.js'
import zh_CN from '../../i18n/zh_CN.js'

interface ModalTitleProps {
  text?: string,
  // cur_language?: any,
  // text1?: any,
  // text2?: any,
}

// const ModalTitle: React.FC<ModalTitleProps> = ({ text, cur_language, text1, text2 }) => (
//   <IntlProvider locale={'en'} messages={cur_language === '中文' ? zh_CN : en_US} >
//     <StyledModalTitle>
//       {
//         text1 && text2 &&
//         <>
//           <FormattedMessage id={text1} />
//           {text2}
//         </>
//       }

//       {text && <FormattedMessage id={text} />}
//     </StyledModalTitle>
//   </IntlProvider>
// )
const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
    <StyledModalTitle>
      {/* {
        text1 && text2 &&
        <>
          <FormattedMessage id={text1} />
          {text2}
        </>
      }

      {text && <FormattedMessage id={text} />} */}
      { text }
    </StyledModalTitle>
)

const StyledModalTitle = styled.div`
  align-items: center;
  color: ${props => props.theme.color.grey[600]};
  display: flex;
  font-size: 18px;
  font-weight: 700;
  height: 40px;
  justify-content: center;
  // margin-top: ${props => -props.theme.spacing[4]}px;
  @media(max-width: 767px) {
    // align-item:flex-end;
    height: 40px;
    margin-bottom:-20px
    // display:none
  }
`

export default ModalTitle