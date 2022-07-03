import React, { useState } from 'react';
import {useRecoilState} from "recoil"
import {modalState} from "../atom/modalAtom"
import Modal from 'react-modal';
const CommentModal = () => {
    const [open,setOpen] = useRecoilState(modalState)
    return (
        <div>
            
            {open&&
            <Modal isOpen={open}>
                <p>model ne</p>
            </Modal>
            }
        </div>
    );
}

export default CommentModal;
