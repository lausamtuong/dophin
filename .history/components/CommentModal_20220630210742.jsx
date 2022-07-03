import React, { useState } from 'react';
import {useRecoilState} from "recoil"
import {modalState} from "../atom/modalAtom"
const CommentModal = () => {
  
    return (
        <div>
            modal
            {open&&<h1>modal is open</h1>}
        </div>
    );
}

export default CommentModal;
