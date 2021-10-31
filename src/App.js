import "./App.css";
import Anime from "./components/Anime";
import Card from "./components/Card";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./components/Config";
import { useState } from "react";

initializeApp(firebaseConfig);
function App() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    photo: "",
  });
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  // sign in Handler
  const signInhandler = () => {
    signInWithPopup(auth, provider).then((result) => {
      // The signed-in user info.
      const { photoURL, displayName, email } = result.user;
      const loginuser = {
        isLoggedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      };
      setUser(loginuser);
      console.log(displayName, email, photoURL);
    });
  };

  const signedOutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        const out = {
          isLoggedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(out);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <div className="d-flex container">
        {user.isLoggedIn ? (
          <div>
            <button
              className="btn btn-danger text-gray-50"
              onClick={signedOutHandler}
            >
              SingOut
            </button>
            <div className="mt-3">
              <img src={user.photo} alt="loading" />
              <h3>Your Name : {user.name}</h3>
              <h3>Your Email : {user.email}</h3>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-primary text-gray-50 shadow-md"
              onClick={signInhandler}
            >
                 <img
              className="w-8 inline-block"
                src=" https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                alt="google"
              />
              Sign In with Google
            </button>
            <p className="text-muted text-center ">
             
           
              You are not signed in
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
