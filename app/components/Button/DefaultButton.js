import React from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './DefaultButton.css'

type DefaultButtonProps = {
  handleClick: () => void,
  textId: string
}

const DefaultButton = ({ handleClick, textId }: DefaultButtonProps) => (
  <button
    className={styles.defaultButton}
    data-e2e={textId}
    onClick={handleClick}
    type="button"
  >
    <FormattedMessage id={textId} />
  </button>
)

export default DefaultButton
