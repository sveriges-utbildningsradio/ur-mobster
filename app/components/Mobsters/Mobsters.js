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

          <input
            alt={isEditing ? 'Stop editing mobsters' : 'Edit mobsters'}
            className={styles.editButton}
            onClick={clickEditButton}
            onKeyDown={e => e.keyCode === 13 && clickEditButton()}
            src={isEditing ? stopEditButton : editButton}
            type="image"
          />
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <ul>
          <Droppable droppableId="activeUsers">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ minHeight: '100px' }}
              >
                {activeUsers &&
                  !!activeUsers.length &&
                  activeUsers.map((user, index) => (
                    <Draggable
                      draggableId={user.name}
                      index={index}
                      key={user.id ? user.id : user.name}
                    >
                      {providedDraggable => (
                        <li
                          className={styles.mobster}
                          key={user.id ? user.id : user.name}
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                        >
                          <div className={styles.avatarWrap}>
                            <img
                              alt={user.name}
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
                            <input
                              alt="Remove user from active mobsters"
                              className={styles.editButton}
                              onClick={() =>
                                clickRemoveUser(user.name, 'activeUsers')
                              }
                              onKeyDown={e =>
                                e.keyCode === 13 &&
                                clickRemoveUser(user.name, 'activeUsers')
                              }
                              src={removeButton}
                              type="image"
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
                  <Draggable
                    draggableId={user.name}
                    index={index}
                    key={user.id ? user.id : user.name}
                  >
                    {providedDraggable => (
                      <li
                        className={styles.mobster}
                        key={user.id ? user.id : user.name}
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                      >
                        <div className={styles.avatarWrap}>
                          <img
                            alt={user.name}
                            className={styles.avatar}
                            src={user.avatar ? user.avatar : avatarImage}
                          />
                        </div>
                        <div>
                          <p className={styles.name}>{user.name}</p>
                          <p className={styles.githubName}>{user.githubName}</p>
                        </div>

                        {isEditing && (
                          <input
                            alt="Remove user from inactive mobsters"
                            className={styles.editButton}
                            onClick={() =>
                              clickRemoveUser(user.name, 'inactiveUsers')
                            }
                            src={removeButton}
                            type="image"
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
            onClick={clickGuestButton}
            onKeyDown={e => e.keyCode === 13 && clickGuestButton()}
            src={addButton}
            type="image"
          />
          <input
            alt="Add user from GitHub"
            className={styles.addButton}
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
