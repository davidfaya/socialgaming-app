import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {AuthContext} from '../context/auth'

function MenuBar() {
    
    const context = useContext(AuthContext)

    //Get current page from url 
    const pathname = window.location.pathname
    const pagePath = pathname === '/' ? 'home' : pathname.substr(1)
    const [activeItem, setActiveItem] = useState(pagePath)


    const handleItemClick = (e, { name }) => setActiveItem(name)
    const menuBar = context.user ? (
        <Menu pointing secondary size="massive" color="purple">
            <Menu.Item
            name={context.user.username}
            active
            as={Link}
            to='/'
            />
            <Menu.Menu position='right'>
            <Menu.Item
                name='logout'
                active={activeItem === 'login'}
                onClick={context.logout}
            />
            </Menu.Menu>
        </Menu>

        ) : (
    
        <Menu pointing secondary size="massive" color="purple">
            <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
            />
            <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to='/login'
            />
            <Menu.Item
                name='signup'
                active={activeItem === 'signup'}
                onClick={handleItemClick}
                as={Link}
                to='/signup'
            />
            </Menu.Menu>
        </Menu>
        
    )
    return menuBar
  
}

export default MenuBar