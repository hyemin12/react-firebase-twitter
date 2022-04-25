import { authService, firebaseInstance } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

function SocialSign({ newAccount }) {
  const onSocialogin = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className="btn-group">
      <h4>{newAccount ? "Create Account" : "Login"} with social account</h4>
      <button name="google" onClick={onSocialogin}>
        <FontAwesomeIcon icon={faGoogle} size="2x" className="google-logo" />

        <p>Continue With Google</p>
      </button>
      <button name="github" onClick={onSocialogin}>
        <FontAwesomeIcon icon={faGithub} size="2x" />
        <p>Continue With Github</p>
      </button>
    </div>
  );
}
export default SocialSign;
