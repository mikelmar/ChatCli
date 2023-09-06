import React, { useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import LogOut from "./LogOut";

const style = {
  nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
  heading: `text-white text-3xl`
};

const Navbar = ({ currentChatId, setCurrentChatId }) => {
  const [user] = useAuthState(auth);

  const headingText = currentChatId ? currentChatId : "ChatApp";

  const handleSignOut = () => {
    setCurrentChatId(null);
  };

  

  return (
    <div className={style.nav}>
      <h1 className={style.heading}>{headingText}</h1>
      <div>
        
        {user ? <LogOut onSignOut={handleSignOut} /> : <SignIn />}
      </div>
      
    </div>
  );
};

export default Navbar;

/*
import React, { useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import LogOut from "./LogOut";

const style = {
  nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
  heading: `text-white text-3xl`
};

const Navbar = ({ currentChatId, setCurrentChatId }) => {
  const [user] = useAuthState(auth);

  const headingText = currentChatId ? currentChatId : "ChatApp";

  const handleSignOut = () => {
    setCurrentChatId(null);
  };

  

  return (
    <div className={style.nav}>
      <h1 className={style.heading}>{headingText}</h1>
      <div>
        
        {user ? <LogOut onSignOut={handleSignOut} /> : <SignIn />}
      </div>
      
    </div>
  );
};

export default Navbar;
*/