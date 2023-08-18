import styles from "./Header.module.css"
import RegisterForm from "./RegisterForm";
import {useEffect, useState} from "react";
import {GET_USER} from "../queries/userQueries";
import {client} from "../pages/_app";
import {useRouter} from "next/router";
import Link from "next/link";

const Header = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const openRegisterForm = () => {
        setIsRegistering(true);
    }
    const closeRegisterForm = () => {
        setIsRegistering(false);
    }
    const handleUsernameInput = e => {
        setUsername(e.target.value);
    }
    const handlePasswordInput = e => {
        setPassword(e.target.value);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const {data} = await client.query({
            query: GET_USER,
            variables: {
                username: username,
                password: password,
            },
        });

        const user = data?.getUser;
        if (user) {
            localStorage.setItem("username", user.username);
            router.reload();
        } else {
            alert(`Can't find account`);
            setUsername('');
            setPassword('');
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem("username");
        router.reload();
    }

    useEffect(() => {
        if (localStorage.getItem("username")) {
            setIsLoggedIn(true);
        }
    }, [])

    return (
        <>
            <div className={styles.headerContainer}>
                <Link href="/">
                    <div>
                        <h1>My Blog</h1>
                    </div>
                </Link>

                {isLoggedIn ? (
                    <div className={styles.headerLoginForm}>
                        <p>Hi, {localStorage.getItem("username")}</p>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                ) : (
                    <div>
                        <form className={styles.headerLoginForm}>
                            <div>
                                <label htmlFor="username">Username: </label>
                                <input
                                    type="text"
                                    required={true}
                                    value={username}
                                    placeholder="Enter username"
                                    onChange={e => handleUsernameInput(e)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password: </label>
                                <input
                                    type="password"
                                    required={true}
                                    value={password}
                                    placeholder="Enter password"
                                    onChange={e => handlePasswordInput(e)}
                                />
                            </div>
                            <div>
                                <button onClick={e => handleLogin(e)}>Log in</button>
                                <span> or </span>
                                <span onClick={openRegisterForm}>Register</span>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {isRegistering && !isLoggedIn && <RegisterForm closeForm={closeRegisterForm}/>}
        </>

    )
}

export default Header;