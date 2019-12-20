// @flow

import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { FormattedMessage } from 'react-intl'
import type { User } from '../../types'
import styles from './Mobsters.css'
import avatarImage from '../../assets/avatar.png'
import removeButton from '../../assets/stop.png'

type MobstersListProps = {
  clickRemoveUser: (name: string, id: string) => void,
  droppableId: string,
  isEditing: boolean,
  users: User[]
}

const MobstersList = ({
  clickRemoveUser,
  droppableId,
  isEditing,
  users
}: MobstersListProps) => (
  <ul>
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        /* eslint-disable react/jsx-props-no-spreading */
        <div
          {...provided.droppableProps}
          className={styles.droppableWrap}
          style={{
            backgroundColor: snapshot.isDraggingOver
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgb(17, 6, 54)'
          }}
          ref={provided.innerRef}
        >
          <ul data-e2e="mobsters-list-draggable-wrapper">
            {users && !!users.length ? (
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
                        {index === 0 && droppableId === 'activeUsers' && (
                          <span className={styles.driverDot} />
                        )}
                        {index === 1 && droppableId === 'activeUsers' && (
                          <span className={styles.navigatorDot} />
                        )}
                      </div>
                      <div>
                        <p
                          className={styles.name}
                          data-e2e={`mobsterslist-name-${index}`}
                          data-testid={`mobsterslist-name-${index}`}
                        >
                          {user.name}
                        </p>
                        <p
                          className={styles.githubName}
                          data-e2e={`mobsterslist-githubName-${index}`}
                          data-testid={`mobsterslist-githubName-${index}`}
                        >
                          {user.githubName}
                        </p>
                      </div>

                      {isEditing && (
                        <input
                          alt={`Remove user from ${droppableId}`}
                          className={styles.editButton}
                          data-e2e="mobsterslist-remove-user"
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
              ))
            ) : (
              <FormattedMessage id="noMobstersListItem" tagName="li" />
            )}
          </ul>
          {provided.placeholder}
        </div>
        /* eslint-enable react/jsx-props-no-spreading */
      )}
    </Droppable>
  </ul>
)

export default MobstersList
