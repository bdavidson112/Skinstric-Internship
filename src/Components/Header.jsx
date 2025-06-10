import React from 'react'

function Header() {
  return (
    <div className='header__container'>
      <div className="header__row">
        <div className="header__logo">
            <a className="logo" href='/'>sKINsTRIC</a>
            <p className="intro">[ INTRO ]</p>
        </div>
        <button className="enter__code-btn">ENTER CODE</button>
      </div>
    </div>
  )
}

export default Header
