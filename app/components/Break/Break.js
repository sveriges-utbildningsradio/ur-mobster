// @flow

import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { SettingsStoreContext } from '../../store/store'
import { formatTime } from '../../utils/formatTime'
import styles from './Break.css'
import ResetButton from '../Button/ResetButton'

type BreakProps = {
  resetBreak: () => void
}

const Break = ({ resetBreak }: BreakProps) => {
  const { breakDuration, breakTimeLeft } = useContext(SettingsStoreContext)

  const progress = (breakTimeLeft / breakDuration) * 100

  return (
    <div className={styles.breakWrap}>
      <div>
        <CircularProgressbarWithChildren value={progress}>
          <p className={styles.text}>
            <FormattedMessage id="break" />: {formatTime(breakTimeLeft)}
          </p>
        </CircularProgressbarWithChildren>
        <ResetButton handleClick={resetBreak} id="resetBreak" />
      </div>
    </div>
  )
}

export default Break
