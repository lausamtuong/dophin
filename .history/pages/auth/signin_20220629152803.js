import React from 'react';
import GoogleButton from 'react-google-button'
import {signin} from 'next-auth/react'
const Signin = () => {
    return (
        <div>
          <GoogleButton  type="light" onclick/>
        </div>
    );
}

export default Signin;
