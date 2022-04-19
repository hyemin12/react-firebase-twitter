import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  function onLogout() {
    authService.signOut();
    navigate("/");
  }
  return (
    <div>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
}

export default Profile;
