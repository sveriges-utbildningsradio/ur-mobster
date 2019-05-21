import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
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
  inactiveUsers,
  isEditing,
  onDragEnd,
  setUsername,
  username
}) => (
  <div className={styles.wrap}>
    <div>
      <div>
        <div className={styles.headerWrap}>
          <h4>Mobsters</h4>
          <span className={styles.editLabel}>
            {isEditing ? 'Spara' : 'Redigera'}
          </span>
          <img
            className={styles.editButton}
            onClick={clickEditButton}
            src={isEditing ? stopEditButton : editButton}
          />
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <ul>
          <Droppable droppableId="activeUsers">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {!!activeUsers.length &&
                  activeUsers.map((user, index) => (
                    <Draggable
                      key={index}
                      draggableId={user.name}
                      index={index}
                    >
                      {provided => (
                        <li
                          className={styles.mobster}
                          key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className={styles.avatarWrap}>
                            <img
                              className={styles.avatar}
                              src={user.avatar ? user.avatar : avatarImage}
                            />
                            {index === 0 && (
                              <span className={styles.driverDot} />
                            )}
                            {index === 1 && (
                              <span className={styles.navigatorDot} />
                            )}
                          </div>
                          <div>
                            <p className={styles.name}>{user.name}</p>
                            <p className={styles.githubName}>
                              {user.githubName}
                            </p>
                          </div>

                          {isEditing && (
                            <img
                              className={styles.editButton}
                              onClick={() =>
                                clickRemoveUser(user.name, 'activeUsers')
                              }
                              src={removeButton}
                            />
                          )}
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
        <h4>Inaktiva mobsters</h4>
        <Droppable droppableId="inactiveUsers">
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: '100px' }}
            >
              {inactiveUsers &&
                !!inactiveUsers.length &&
                inactiveUsers.map((user, index) => (
                  <Draggable key={index} draggableId={user.name} index={index}>
                    {provided => (
                      <li
                        className={styles.mobster}
                        key={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className={styles.avatarWrap}>
                          <img
                            className={styles.avatar}
                            src={user.avatar ? user.avatar : avatarImage}
                          />
                        </div>
                        <div>
                          <p className={styles.name}>{user.name}</p>
                          <p className={styles.githubName}>{user.githubName}</p>
                        </div>

                        {isEditing && (
                          <img
                            className={styles.editButton}
                            onClick={() =>
                              clickRemoveUser(user.name, 'inactiveUsers')
                            }
                            src={removeButton}
                          />
                        )}
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
