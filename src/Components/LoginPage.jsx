import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { StateContext } from "../Context/StateProvider";
import { useContext } from "react";
import styles from "../Styles/Login.module.css";
export const LoginPage = () => {
    const { toggleAuth, setData } = useContext(StateContext);
    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const { user } = result;
            console.log(user)
            const { displayName, photoURL,uid } = user;
            const initState = {
                userName: displayName,
                profilePic: photoURL,
                uid:uid
            }
            setData(initState)
            toggleAuth()
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            console.log("Err: ", error)
            // ...
        });
    }
    return (
        <div className={styles.LoginDiv}>
            <button onClick={signIn}>Login</button>
        </div>
    )
}