import React from 'react'
import styles from './DefaultButton.css'

type DefaultButtonProps = {
  handleClick: any => void,
  text: string
}

const DefaultButton = ({ handleClick, text }: DefaultButtonProps) => (
  <button className={styles.defaultButton} onClick={handleClick} type="button">
    {text}
  </button>
)

export default DefaultButton
