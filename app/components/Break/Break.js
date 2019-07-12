import React from 'react'
import { formatTime } from '../../utils/formatTime'
import styles from './Break.css'

type BreakProps = {
  breakCount: number
}

const Break = ({ breakCount }: BreakProps) => (
  <>
    <div className={styles.breakWrap}>Break time! {formatTime(breakCount)}</div>
  </>
)

export default Break
