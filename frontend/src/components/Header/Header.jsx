import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Craving something delicious? Welcome to Tomato, your one-stop destination for fast, fresh, and reliable food delivery! Whether you're in the mood for local favorites or international cuisines, we've got you covered. Browse menus, track your order in real-time, and satisfy your hunger with just a few taps. Let us bring the flavors you love right to your doorstep!</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header;