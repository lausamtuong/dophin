import React from 'react';
import GoogleButton from 'react-google-button'
import {signIn} from 'next-auth/react'
const Signin = () => {
    return (
        <div>
          <GoogleButton  type="light" onClick={()=>signIn}/>
        </div>
    );
}

export default Signin;
