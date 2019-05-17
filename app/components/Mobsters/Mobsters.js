import React from 'react'
import styles from './Mobsters.css'
import avatarImage from '../../assets/avatar.png'
import githubButton from '../../assets/github.png'
import addButton from '../../assets/add.png'
import editButton from '../../assets/pencil.png'
import stopEditButton from '../../assets/pencil-red.png'
import removeButton from '../../assets/stop.png'

const Mobsters = ({
  activeUsers,
  clickEditButton,
  clickGitHubButton,
  clickGuestButton,
  clickRemoveUser,
  isEditing,
  setIsEditing,
  setUsername,
  username
}) => (
  <div className={styles.wrap}>
    <div>
      <div>
        <div className={styles.headerWrap}>
          <h4>Mobsters</h4>
          <img
            className={styles.editButton}
            onClick={clickEditButton}
            src={isEditing ? stopEditButton : editButton}
          />
        </div>
      </div>
      <ul>
        {!!activeUsers.length &&
          activeUsers.map(user => (
            <li className={styles.mobster} key={user.name}>
              <img
                className={styles.avatar}
                src={user.avatar ? user.avatar : avatarImage}
              />
              <div>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.githubName}>{user.githubName}</p>
              </div>

              {isEditing && (
                <img
                  className={styles.editButton}
                  onClick={() => clickRemoveUser(user.name)}
                  src={removeButton}
                />
              )}
            </li>
          ))}
      </ul>
    </div>

    <div className={styles.addWrap}>
      <img className={styles.avatar} src={avatarImage} />
      <div>
        <div className={styles.inputWrap}>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Lägg till mobster"
          />
          <img
            className={styles.addButton}
            onClick={clickGuestButton}
            src={addButton}
          />
          <img
            className={styles.addButton}
            onClick={clickGitHubButton}
            src={githubButton}
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
