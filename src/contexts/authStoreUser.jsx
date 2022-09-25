import React from "react";
import { useState } from "react";
//firebase collection get and passwordwithEmail
import { addDoc, collection } from "firebase/firestore";
//email and password
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../services/firebaseConfig";
import { app } from "../services/firebaseConfig";
import { useEffect } from "react";
//start context
export const authUserAccount = React.createContext();

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedAll, setPermitionAll] = useState(null); 
  //state loading
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const checkedInItems = () => {
      //change state for sigin(entrar)
      const usersCurrent = localStorage.getItem('@User-auth-doc-create');
      const usersResgate = localStorage.getItem('@Resgate-user-sigin')
      const emailAndPassword = localStorage.getItem('@User-auth-email-password'); 
      // for change page 
      if (usersCurrent && emailAndPassword) {
        setUser(usersCurrent)
      } else if (emailAndPassword && usersResgate) {
        setPermitionAll(usersCurrent); 
      }
    }
    checkedInItems();
  }, [])

  useEffect(() => {
    const checkedInItems = () => {
      //change state for sigin(entrar)
      const usersCurrent = localStorage.getItem('@User-auth-doc-create');
      const usersResgate = localStorage.getItem('@Resgate-user-sigin')
      const emailAndPassword = localStorage.getItem('@User-auth-email-password'); 
      // for change page 
      if (emailAndPassword && usersResgate) {
        setPermitionAll(usersCurrent); 
      }
    }
    checkedInItems();
  }, [])

  
  const getDataUserStore = async (displayName, email, password) => {
    // create fire store
    try {
      setLoading(true);
      const userSubmit = {
        displayName,
        email,
        password
      }
      // create data of collection
      const docRef = await addDoc(collection(db, "users"), userSubmit);

        if (userSubmit != '') {

          await createUserWithEmailAndPassword(auth, email, password)

          .then((userCredential) => {

            const userCreated = userCredential.user;
            localStorage.setItem("@User-auth-email-password", JSON.stringify(userCreated));
         
            console.log('USER CREATE'+user);
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        }

      //set info in localstorege object
      localStorage.setItem("@User-auth-doc-create", JSON.stringify(userSubmit));
      
   
      setLoading(false);
      window.location.href = '/login';
      
      //test console
      console.log('dados criado:' + userSubmit);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }  

  console.log(user); 

  return (
    <authUserAccount.Provider value={
      { getDataUserStore, loading, isLogged: !!user, isLoggedAll: !!loggedAll }} >
      {children}
    </authUserAccount.Provider>
  )
}

export const UseAuthUserAccount = () => React.useContext(authUserAccount); 