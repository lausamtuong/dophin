import React, { useState } from 'react';
import {useRecoilState} from "recoil"
import {modalState} from "../atom/modalAtom"
import Modal from 'react-modal';
const CommentModal = () => {
    const [open,setOpen] = useRecoilState(modalState)
    return (
        <div>
            modal
            {open&&<h1>modal is open</h1>}
        </div>
    );
}

export default CommentModal;
