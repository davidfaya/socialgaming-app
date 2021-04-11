import React from 'react';
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg'
export const links = [
  // {
  //   id: 1,
  //   url: '/',
  //   text: 'home',
  // },
  // {
  //   id: 2,
  //   url: '/login',
  //   text: 'login',
  // },
  // {
  //   id: 3,
  //   url: '/signup',
  //   text: 'sign up',
  // },
  
];

export const loggedInLinks = [
    {
      id: 1,
      url: '/',
      text: 'about',
    },
    {
      id: 2,
      url: '/posts',
      text: 'posts',
    },
    {
      id: 3,
      url: '/profile',
      text: 'profile',
    },
    {
      id: 4,
      url: '/logout',
      text: 'logout',
    },
    
  ];

export const social = [
  {
    id: 1,
    url: 'https://github.com/davidfaya',
    icon: <FaGithub />,
  },
  {
    id: 2,
    url: 'https://www.www.linkedin.com/in/david-faya-ab67141/',
    icon: <FaLinkedin />,
  },
  {
    id: 3,
    url: 'https://medium.com/@davidfaya1980',
    icon: <FaMedium />,
  },
  {
    id: 4,
    url: 'https://www.davidfaya.com',
    icon: <CgProfile />,
  },
];
