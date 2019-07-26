import React from 'react'
import { formatTime } from '../../utils/formatTime'
import styles from './Break.css'

type BreakProps = {
  breakTimeLeft: number
}

const Break = ({ breakTimeLeft }: BreakProps) => (
  <>
    <div className={styles.breakWrap}>
      Break time! {formatTime(breakTimeLeft)}
    </div>
  </>
)

export default Break
