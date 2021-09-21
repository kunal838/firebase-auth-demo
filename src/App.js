import { useContext, useEffect, useState } from "react";
import { authContext } from "./context/AuthContext";
import { initializeApp } from "firebase/app";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { AuthProvider } from "./context/AuthContext";

//setup firebase
const firebaseConfig = {
  //enter your config
 
 };
const app = initializeApp(firebaseConfig);

//main react function
function App() {
  const [isaAuth, setISAuth] = useState(false);

  const auth = getAuth();
  /*  const [state, setstate] = useContext(authContext) */
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setISAuth(true);
    } else return setISAuth(false);
    
  });

  return (
    <AuthProvider>
      <Router>{isaAuth ? <Dashboard /> : <Login />}</Router>
    </AuthProvider>
  );
}
//components

const Login = () => {
  const [user, setUser] = useContext(authContext);

  const login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        
        
        setUser(result.user.photoURL)

        
      })
      .catch((error) => {
        alert("error")
        
        
      
      });
  };
  

  return (
    <div className="App">
      <h1>hey lets goo</h1>
      <button onClick={login}>login in google</button>
    </div>
  );
};

const Dashboard = () => {
  const [user, setUser] = useContext(authContext);
  
  const auth = getAuth();
  console.log(user);

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <img src={user} a />
      <button
        onClick={() => {
          signOut(auth)
            .then(() => {})
            .catch((error) => {
              alert("error logout");
            });
        }}
      >
        Signout
      </button>
    </div>
  );
};

export default App;
