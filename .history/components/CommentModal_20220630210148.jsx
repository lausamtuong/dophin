import React, { useState } from 'react';
import {useRecoilState} from "recoil"
import {modalState} from "../atom/modalAtom"
const CommentModal = () => {
    const [open,setOpen] = useState(modalState)
    return (
        <div>
            modal
            {open&&<h1></h1>}
        </div>
    );
}

export default CommentModal;
