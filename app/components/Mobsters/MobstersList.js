import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styles from './Mobsters.css'
import avatarImage from '../../assets/avatar.png'
import removeButton from '../../assets/stop.png'

const MobstersList = ({ clickRemoveUser, droppableId, isEditing, users }) => (
  <ul>
    <Droppable droppableId={droppableId}>
      {provided => (
        <div
          {...provided.droppableProps}
          className={styles.droppableWrap}
          ref={provided.innerRef}
        >
          <ul>
            {users &&
              !!users.length &&
              users.map((user, index) => (
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
                        {index === 0 && <span className={styles.driverDot} />}
                        {index === 1 && (
                          <span className={styles.navigatorDot} />
                        )}
                      </div>
                      <div>
                        <p
                          className={styles.name}
                          data-testid={`mobsterslist-name-${index}`}
                        >
                          {user.name}
                        </p>
                        <p
                          className={styles.githubName}
                          data-testid={`mobsterslist-githubName-${index}`}
                        >
                          {user.githubName}
                        </p>
                      </div>

                      {isEditing && (
                        <input
                          alt={`Remove user from ${droppableId}`}
                          className={styles.editButton}
                          data-testid={`mobsterslist-remove-${index}`}
                          onClick={() =>
                            clickRemoveUser(user.name, droppableId)
                          }
                          onKeyDown={e =>
                            e.keyCode === 13 &&
                            clickRemoveUser(user.name, droppableId)
                          }
                          src={removeButton}
                          type="image"
                        />
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
          </ul>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </ul>
)

export default MobstersList
