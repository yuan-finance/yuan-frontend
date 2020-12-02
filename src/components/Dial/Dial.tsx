import React, { useContext,useState,useEffect} from 'react'
import styled, { ThemeContext } from 'styled-components'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import {interval} from '../../yamUtils'
import img__bg from '../../assets/img/Page/bg-repeat.svg'

interface DialProps {
  children?: React.ReactNode,
  disabled?: boolean,
  size?: number,
  value?: number
}

const Dial: React.FC<DialProps> = ({ children, disabled, size = 256, value}) => {
  const { color } = useContext(ThemeContext)
  const [calculateValue, setacalculateValue] = useState(value / (1000 * interval) * 100)
  let num =0
  useEffect(() => {
    const timerId = setInterval(async ()=>{
      num++
      if(value - 1000*num <=0){
        num=0
        setacalculateValue(0)
        clearInterval(timerId)
      }else{
        // setacalculateValue((value - 1000*num) / (1000 * 1800) * 100)
        // console.log(value,(value - 1000*num) / (1000 * 1800) * 100)
        setacalculateValue((value - 1000*num) / (1000 * interval) * 100)
      }
      
    },1000)
    return () => {
      clearInterval(timerId)
    }
  }, [value])
  return (
    <StyledDial size={size}>
      <StyledOuter>
        <CircularProgressbar
          value={calculateValue}
          styles={buildStyles({
            strokeLinecap: 'round',
            // pathColor: !disabled ? 'color.secondary.main' : color.grey[400],
            pathColor: !disabled ? '#476065' : '#d9d7d7',
            pathTransitionDuration: 1,
          })}
        />
      </StyledOuter>

      <StyledInner size={size}>
        {children}
      </StyledInner>
    </StyledDial>
  )
}

interface StyledInnerProps {
  size: number
}

const StyledDial = styled.div<StyledInnerProps>`
  padding: 14px;
  position: relative;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  margin:0 auto;
  @media(max-width: 767px) {
    // padding:30px;
    width:130px;
    height:130px;
    margin-top:25px
  }
`

const StyledInner = styled.div<StyledInnerProps>`
  align-items: center;
  // background-color: ${props => props.theme.color.grey[200]};
  // background: url(${img__bg});
  border-radius: ${props => props.size}px;
  display: flex;
  justify-content: center;
  position: relative;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  @media(max-width: 767px) {
    border-radius: 130px;
    width:130px;
    height:130px
  }
`

const StyledOuter = styled.div`
  background-color: #d9d7d7;
  border-radius: 10000px;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
`

export default Dial