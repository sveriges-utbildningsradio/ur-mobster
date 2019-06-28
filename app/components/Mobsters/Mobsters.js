import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styles from './Mobsters.css'
import avatarImage from '../../assets/avatar.png'
import githubButton from '../../assets/github.png'
import addButton from '../../assets/add.png'
import editButton from '../../assets/pencil.png'
import stopEditButton from '../../assets/pencil-red.png'
import MobstersList from './MobstersList'

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
}) => (
  <div className={styles.wrap}>
    <div>
      <div>
        <div className={styles.headerWrap}>
          <h4>Mobsters</h4>
          <span className={styles.editLabel}>
            {isEditing ? 'Spara' : 'Redigera'}
          </span>

          <input
            alt={isEditing ? 'Stop editing mobsters' : 'Edit mobsters'}
            className={styles.editButton}
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
        <h4>Inaktiva mobsters</h4>
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
          <input
            className={styles.userInput}
            onChange={e => setUsername(e.target.value)}
            placeholder="Lägg till mobster"
            value={username}
          />
          <input
            alt="Add user as guest"
            className={styles.addButton}
            disabled={!username.length}
            onClick={clickGuestButton}
            onKeyDown={e => e.keyCode === 13 && clickGuestButton()}
            src={addButton}
            type="image"
          />
          <input
            alt="Add user from GitHub"
            className={styles.addButton}
            disabled={!username.length}
            onClick={clickGitHubButton}
            onKeyDown={e => e.keyCode === 13 && clickGitHubButton()}
            src={githubButton}
            type="image"
          />
        </div>
        <p className={styles.githubName}>
          Skriv namn eller GitHub-användarnamn
        </p>
      </div>
    </div>
  </div>
)

export default Mobsters
