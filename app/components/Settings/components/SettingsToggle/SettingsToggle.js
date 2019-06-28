// @flow

import React from 'react'
import styled from 'styled-components'
import dot from '../../../../assets/dot-blue.png'

const Wrap = styled.ul`
  display: flex;
  justify-content: space-around;
`

const Option = styled.li`
  align-items: center;
  color: ${({ active }) => (active ? '#2cdbec' : '#fff')};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  font-size: 26px;
  font-weight: 500;
`

const Dot = styled.img`
  margin-top: 20px;
  width: 14px;
`

type OptionType = {
  label: string,
  value: string
}

type SettingsToggleProps = {
  active: string,
  options: OptionType[]
}

const SettingsToggle = ({ active, options }: SettingsToggleProps) => (
  <Wrap>
    {options.map(option => {
      const isActive = active === option.value
      return (
        <Option active={isActive} key={option.value}>
          {option.label}
          {!!isActive && <Dot src={dot} />}
        </Option>
      )
    })}
  </Wrap>
)

export default SettingsToggle
