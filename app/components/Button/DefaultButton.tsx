import React from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './DefaultButton.css'

type DefaultButtonProps = {
  handleClick: any
  textId: string
}

const DefaultButton = ({ handleClick, textId }: DefaultButtonProps) => (
  <button className={styles.defaultButton} onClick={handleClick} type="button">
    <FormattedMessage id={textId} />
  </button>
)

export default DefaultButton
