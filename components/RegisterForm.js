import {useState} from "react";
import styles from './RegisterForm.module.css';
import {ADD_USER} from "../mutations/userMutations";
import {useMutation} from "@apollo/client";

const RegisterForm = ({closeForm}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [addUser] = useMutation(ADD_USER);

    const handleUsernameInput = e => {
        setUsername(e.target.value)
    }
    const handlePasswordInput = e => {
        setPassword(e.target.value)
    }
    const handleConfirmPasswordInput = e => {
        setConfirmPassword(e.target.value)
    }

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        await addUser({
            variables: {
                username: username,
                password: password,
                confirmPassword: confirmPassword,
            }
        })
        closeForm();
    }

    return (
        <div className={styles.registerFormContainer}>
            <form className={styles.registerForm}>
                <div className={styles.registerFormLabel}>
                    <label htmlFor="username">Username: </label>
                    <input
                        className={styles.formInput}
                        type="text"
                        required={true}
                        value={username}
                        placeholder={"Enter username"}
                        onChange={e => {handleUsernameInput(e)}}
                    />
                </div>

                <div className={styles.registerFormLabel}>
                    <label htmlFor="username">Password: </label>
                    <input
                        className={styles.formInput}
                        type="password"
                        required={true}
                        value={password}
                        placeholder={"Enter Password"}
                        onChange={e => handlePasswordInput(e)}
                    />
                </div>

                <div className={styles.registerFormLabel}>
                    <label htmlFor="username">Re-Enter Password: </label>
                    <input
                        className={styles.formInput}
                        type="password"
                        required={true}
                        value={confirmPassword}
                        placeholder={"Re-Enter Password"}
                        onChange={e => handleConfirmPasswordInput(e)}
                    />
                </div>

                <div className={styles.formButtonGroup}>
                    <button type='submit' onClick={handleFormSubmission}>Submit</button>
                    <button onClick={e => closeForm(e)}>Cancel</button>
                </div>
            </form>

        </div>
    )
}

export default RegisterForm