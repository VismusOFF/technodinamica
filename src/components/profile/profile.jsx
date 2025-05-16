import AuthDetails from "../pages/auth/AuthDetails";
import RequestHistory from "../Requst/Requesthistory";
import './profile.css';

const Profile = () => {
    return (
        <div className="profileContainer">
            <div className="S33">

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
