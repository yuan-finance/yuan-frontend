import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

interface IconButtonProps {
  children?: React.ReactNode,
  disabled?: boolean,
  onClick?: () => void,
  to?: string,
  disabledAddAction?:boolean
}

const IconButton: React.FC<IconButtonProps> = ({ children, disabled, onClick, to, disabledAddAction }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick} disabledAddAction={disabledAddAction}>
      {!!to ? (
        <StyledLink to={to}>{children}</StyledLink>
      ) : children}
    </StyledButton>
  )
}

interface StyledButtonProps {
  disabled?: boolean,
  disabledAddAction?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: #476065;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  font-weight: 700;
  height: 45px;
  justify-content: center;
  letter-spacing: 1px;
  outline: none;
  padding: 0;
  margin: 0;
  pointer-events: ${props => !props.disabled ? undefined : 'none'};
  cursor: ${props => props.disabledAddAction ? 'not-allowed' : 'auto'};
  opacity: ${props => props.disabledAddAction ? '0.5' : '1'};
  text-transform: uppercase;
  width: 45px;
  position: relative;
  &:hover {}

  &::before{
    content:'';
    position: absolute;
    width: 108%;
    height: 108%;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #476065;
    border-radius: 50%;
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default IconButton