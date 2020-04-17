import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import addDarkButton from '../../assets/add-dark.png'
import removeButton from '../../assets/stop.png'
import styles from './MobsterParty.css'
import { SettingsStoreContext } from '../../store/store'
import * as types from '../../store/actionTypes'

const MobsterParty = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [url, setUrl] = useState('')
  const { dispatch, isConnected } = useContext(SettingsStoreContext)

  const connect = () =>
    dispatch({
      type: types.CONNECT_MOBSTER_PARTY
    })

  const disconnect = () =>
    dispatch({
      type: types.DISCONNECT_MOBSTER_PARTY
    })

  return (
    <div
      className={classnames(styles.wrapper, {
        [styles.wrapperExpanded]: isExpanded
      })}
    >
      {isExpanded ? (
        <>
          <h2 className={styles.header}>Mobster party</h2>
          <FormattedMessage id="addMobsterPartyUrlPlaceholder">
            {msg => (
              <input
                className={styles.urlInput}
                data-e2e="mobster-party-url-input"
                onChange={e => setUrl(e.target.value)}
                placeholder={msg}
                value={url}
              />
            )}
          </FormattedMessage>

          <div className={styles.statusWrapper}>
            {isConnected ? (
              <>
                <FormattedMessage id="mobsterPartyConnected">
                  {msg => <span className={styles.status}>{msg}</span>}
                </FormattedMessage>
                <FormattedMessage id="mobsterPartyDisconnect">
                  {msg => (
                    <button
                      className={styles.connectButton}
                      onClick={() => {
                        disconnect()
                        setIsExpanded(false)
                      }}
                      type="button"
                    >
                      {msg}
                      <img
                        alt={msg}
                        className={styles.buttonImage}
                        src={removeButton}
                      />
                    </button>
                  )}
                </FormattedMessage>
              </>
            ) : (
              <>
                <FormattedMessage id="mobsterPartyDisconnected">
                  {msg => <span className={styles.status}>{msg}</span>}
                </FormattedMessage>
                <FormattedMessage id="mobsterPartyConnect">
                  {msg => (
                    <button
                      className={styles.connectButton}
                      onClick={() => connect()}
                      type="button"
                    >
                      {msg}
                    </button>
                  )}
                </FormattedMessage>
              </>
            )}
          </div>
        </>
      ) : (
        <button
          className={styles.addButton}
          data-e2e="mobster-party-button-collapsed"
          onClick={() => setIsExpanded(true)}
          onKeyDown={e => e.keyCode === 13 && setIsExpanded(true)}
          type="button"
        >
          <span className={styles.addButtonLabel}>Mobster party</span>
          <img alt="" className={styles.buttonImage} src={addDarkButton} />
        </button>
      )}
    </div>
  )
}

export default MobsterParty
