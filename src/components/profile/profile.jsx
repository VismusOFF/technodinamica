import AuthDetails from "../pages/auth/AuthDetails"
import './profile.css'

const Profile = () => {

    return (
        <div className="ProfileContainer">
            <div className="ProfilePage">
                <h1>Ваш профиль</h1>

                <div>
                    <AuthDetails></AuthDetails>
                </div>
            </div>
        </div>
    )
}

export default Profile