import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ChevronLeft, Bell, User } from 'lucide-react';
import Search from '../Search/Search';
import ProfilePopover from '../ProfilePopOver/ProfilePopOver';

const Header = ({ heading, proccessBack }) => {
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowProfilePopover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to={proccessBack} className={styles.back}>
          <ChevronLeft className={styles.backIcon} />
        </Link>
        <h4 className={styles.heading}>{heading}</h4>
      </div>
      
      <div className={styles.right} ref={popoverRef}>
        <Search />
        
        <div className={styles.headerBtns}>
          <button className={styles.notification}>
            <Bell className={styles.notificationIcon} width={16} height={16} />
          </button>
          <button 
            className={styles.profile}
            onClick={() => setShowProfilePopover(!showProfilePopover)}
          >
            <User className={styles.profileIcon} width={16} height={16} />
          </button>
        </div>

        {showProfilePopover && (
          <ProfilePopover onClose={() => setShowProfilePopover(false)} />
        )}
      </div>
    </header>
  )
}

export default Header;