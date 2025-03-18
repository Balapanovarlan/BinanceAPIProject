import React from 'react';
import Logo from '../../assets/images/logo.png';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { sidebarData } from './Sidebar.data';

const Sidebar = () => {
    return (
        <aside className={styles.aside}>
            <div className={styles.content}>
                <img
                    src={Logo}
                    alt="Logo"
                    className={styles.logo}
                />
                <nav className={styles.nav}>
                    {sidebarData.map(item => (
                        <Link key={item.label} to={item.path} className={styles.navItem}>
                            {item.icon}
                        </Link>
                    ))}
                </nav>
            </div>

            <button className={styles.logout}>
                <LogOut className={styles.logoutIcon} />
            </button>

        </aside>
    )
}

export default Sidebar