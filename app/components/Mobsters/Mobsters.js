// @flow

import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import type { OnDragEndResponder } from 'react-beautiful-dnd'
import { FormattedMessage } from 'react-intl'
import type { User } from '../../types'
import styles from './Mobsters.css'
import avatarImage from '../../assets/avatar.png'
import githubButton from '../../assets/github.png'
import addButton from '../../assets/add.png'
import editButton from '../../assets/pencil.png'
import stopEditButton from '../../assets/pencil-red.png'
import MobstersList from './MobstersList'

type MobstersProps = {
  activeUsers: User[],
  clickEditButton: () => void,
  clickGitHubButton: () => void,
  clickGuestButton: () => void,
  clickRemoveUser: () => void,
  inactiveUsers: User[],
  isEditing: boolean,
  onDragEnd: OnDragEndResponder,
  setUsername: (value: string) => void,
  username?: string
}

const Mobsters = ({
  activeUsers,
  clickEditButton,
  clickGitHubButton,
  clickGuestButton,
  clickRemoveUser,
  inactiveUsers,
  isEditing = false,
  onDragEnd,
  setUsername,
  username = ''
}: MobstersProps) => (
  <div className={styles.wrap}>
    <div>
      <div>
        <div className={styles.headerWrap}>
          <h4>Mobsters</h4>
          <span className={styles.editLabel}>
            {isEditing ? (
              <FormattedMessage id="save" />
            ) : (
              <FormattedMessage id="edit" />
            )}
          </span>

          <input
            alt={isEditing ? 'Stop editing mobsters' : 'Edit mobsters'}
            className={styles.editButton}
            data-e2e="mobsters-edit-button"
            data-testid="mobsters-edit-button"
            onClick={clickEditButton}
            onKeyDown={e => e.keyCode === 13 && clickEditButton()}
            src={isEditing ? stopEditButton : editButton}
            type="image"
          />
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <MobstersList
          clickRemoveUser={clickRemoveUser}
          droppableId="activeUsers"
          isEditing={isEditing}
          users={activeUsers}
        />
        <FormattedMessage id="inactiveMobsters" tagName="h4" />
        <MobstersList
          clickRemoveUser={clickRemoveUser}
          droppableId="inactiveUsers"
          isEditing={isEditing}
          users={inactiveUsers}
        />
      </DragDropContext>
    </div>

    <div className={styles.addWrap}>
      <img alt="Default avatar" className={styles.avatar} src={avatarImage} />
      <div>
        <div className={styles.inputWrap}>
          <FormattedMessage id="addMobsterPlaceholder">
            {msg => (
              <input
                className={styles.userInput}
                data-e2e="mobsters-add-input"
                onChange={e => setUsername(e.target.value)}
                placeholder={msg}
                value={username}
              />
            )}
          </FormattedMessage>

          <input
            alt="Add user as guest"
            className={styles.addButton}
            data-e2e="mobsters-add-by-name"
            disabled={!username.length}
            onClick={clickGuestButton}
            onKeyDown={e => e.keyCode === 13 && clickGuestButton()}
            src={addButton}
            type="image"
          />
          <input
            alt="Add user from GitHub"
            className={styles.addButton}
            data-e2e="mobsters-add-by-github-username"
            disabled={!username.length}
            onClick={clickGitHubButton}
            onKeyDown={e => e.keyCode === 13 && clickGitHubButton()}
            src={githubButton}
            type="image"
          />
        </div>
        <p className={styles.githubName}>
          <FormattedMessage id="addMobsterLabel" />
        </p>
      </div>
    </div>
  </div>
)

Mobsters.defaultProps = {
  username: ''
}

export default Mobsters
