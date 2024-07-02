import React, { useEffect, useState } from "react";
import { auth } from "../../../assets/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


const AuthDetails = () => {

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        }
    }, [])

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Успешный выход из аккаунта')
        }).catch(error => console.log(error))
    }

    return (
        <div className="flex-column">{ authUser ? <><p>{`Вы вошли в ${authUser.email}`}</p>
        <button className="auth-header-button" onClick={userSignOut}>Выйти</button></> : <>Вы не вошли</> }
        </div>
    )

}

export default AuthDetails;