import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, loggedInLinks, social } from '../utils/navBarItems';
import logo from '../logo.png';
import {AuthContext} from '../context/auth'
import {Link} from 'react-router-dom'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const {user, logout} = useContext(AuthContext)

  const menuLinks = user ? loggedInLinks : links

  //Get current page from url
  //const pathname = window.location.pathname
  //const pagePath = pathname === '/' ? 'home' : pathname.substr(1)
  //const [activeItem, setActiveItem] = useState(pagePath)


  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  const hideLinks = () => {
    console.log('hide')
    setShowLinks(false);
  };
  useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height + 20;
        if (showLinks) {
            linksContainerRef.current.style.height = `${linksHeight}px`;
        } else {
            console.log('hide')
            linksContainerRef.current.style.height = '0px';
        }
  }, [showLinks]);
  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img  src={logo} className='logo' alt='logo' />
          </Link>
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {menuLinks.map((link) => {
              const { id, url, text } = link
              if (url === '/logout')
              {
                return (
                    <li key={id}>
                    <Link to='/' onClick={logout}>{text}</Link>
                    </li>
                )
              }
              else {
                return (
                    <li key={id}>
                    <Link  to={url} onClick={hideLinks}>{text}</Link>
                    </li>
                )}
            })}
          </ul>
        </div>
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
