import React from 'react';
import { FaBehance, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
export const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
  },
  {
    id: 2,
    url: '/signup',
    text: 'sign up',
  },
  {
    id: 3,
    url: '/login',
    text: 'login',
  },
  
];

export const loggedInLinks = [
    {
      id: 1,
      url: '/',
      text: 'home',
    },
    {
      id: 2,
      url: '/profile',
      text: 'profile',
    },
    {
      id: 3,
      url: '/logout',
      text: 'logout',
    },
    
  ];

export const social = [
  {
    id: 1,
    url: 'https://www.twitter.com',
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: 'https://www.twitter.com',
    icon: <FaLinkedin />,
  },
  {
    id: 4,
    url: 'https://www.twitter.com',
    icon: <FaBehance />,
  },
];
