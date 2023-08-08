import React from 'react';
import { AiOutlineLinkedin, AiOutlineGithub, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import './footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-icons'>
        <a href='https://www.linkedin.com/in/chris-chan-94567289/' target='_blank' rel='noopener noreferrer'>
          <AiOutlineLinkedin className='footer-icon' />
        </a>
        <a href='https://github.com/ChrisChan8551' target='_blank' rel='noopener noreferrer'>
          <AiOutlineGithub className='footer-icon' />
        </a>
        <a href='mailto:chrischan8551@gmail.com'>
          <AiOutlineMail className='footer-icon' />
        </a>
        <a href='https://chrischan8551.github.io/' target='_blank' rel='noopener noreferrer'>
          <AiOutlineUser className='footer-icon' />
        </a>
      </div>
      {/* <p className='footer-text'>© 2023 Chris Chan. All rights reserved.</p> */}
    </div>
  );
}

export default Footer;
