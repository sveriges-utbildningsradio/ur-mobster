import React from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './ResetButton.css'

type ResetButtonProps = {
  handleClick: () => void
  id: string
}

const ResetButton = ({ handleClick, id }: ResetButtonProps) => (
  <button
    className={styles.resetButton}
    data-e2e={id}
    onClick={handleClick}
    type="button"
  >
    <FormattedMessage id={id} />
  </button>
)

export default ResetButton
