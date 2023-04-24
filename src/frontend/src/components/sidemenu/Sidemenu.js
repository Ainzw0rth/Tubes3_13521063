import React from 'react'
import './sidemenu.css'

const Sidemenu = () => {
  return (
    <div className='sidemenu'>
        <div className='newbutton'>
          <a className='newchat' href='https://google.com' target='_blank' rel="noreferrer">
            + New Chat
          </a>
        </div>
        <div className='historylist'>
          <div className='histories'>
            <div className='history'>
              history 1
            </div>
            <div className='history'>
            history 2
            </div>
            <div className='history'>
            history 3
            </div>
          </div>
        </div>
        <div className='buttons'>
          <div className='algbutton'>
              <h2>Algorithms</h2>
            <div className='kmpbutton'>
              <input type='checkbox'/>
              KMP
            </div>
            <div className='bmbutton'>
              <input type='checkbox'/>
              BM
            </div>
          </div>
        </div>
      </div>
  )
}

export default Sidemenu