import React from 'react'
import "../styles/message.css"

export const Message = ({msg, type}) => {
  return (
    <div className={`pokemon-message-container ${type}`}>
        <div className="pokemon-message-content">
            <p dangerouslySetInnerHTML={{ __html: msg }} />
        </div>
    </div>
  )
}
