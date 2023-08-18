import {useEffect, useState} from "react";
import styles from './AddBlogIcon.module.css';
import Link from "next/link";

const AddBlogIcon = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("username")) {
            setIsLoggedIn(true);
        }
    }, [])

    if (!isLoggedIn) return null;

    return (
        <Link href={'/new-blog'}>
            <div className={styles.addBlogIconContainer}>
                <span>+</span>
            </div>
        </Link>
    )
}

export default AddBlogIcon;