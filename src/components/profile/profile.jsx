import AuthDetails from "../pages/auth/AuthDetails";
import RequestHistory from "../Requst/Requesthistory";
import './profile.css';
import { useAuth } from '../context/authContext'
import Chat from '../Chat/Chat'

const Profile = () => {

    const { authUser  } = useAuth();

    return (
        <div className="profileContainer">
            <div className="S33">
                {authUser  ? (
                <Chat authUser ={authUser } />
                ) : (
                    <div>Пожалуйста, войдите в систему, чтобы начать чат.</div>
                )}
            </div>

            <div className="S33">
                <AuthDetails />
            </div>

            <div className="S33">
                <RequestHistory></RequestHistory>
            </div>
        </div>
    );
};

export default Profile;
