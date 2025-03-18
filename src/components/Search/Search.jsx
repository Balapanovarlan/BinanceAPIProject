import React from 'react';
import styles from './Search.module.css';
import { SearchIcon } from 'lucide-react';

const Search = () => {
    return (
        <div className={styles.wrapper}>
            <input type="text" className={styles.input} placeholder='Search' />
            <div className={styles.iconWrapper}>
                <SearchIcon className={styles.icon} />
            </div>
        </div>
    )
}

export default Search