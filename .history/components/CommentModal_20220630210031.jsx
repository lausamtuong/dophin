import React, { useState } from 'react';
import {useRecoilState} from "recoil"
import {modalState} from "../atom/modalAtom"
const CommentModal = () => {
    const [open,setOpen] = useState(modalState)
    return (
        <div>
            modal
        </div>
    );
}

export default CommentModal;
