import React, { useState } from 'react';
import {useRecoilState} from "recoil"
import {modalState} from "../atom/"
const CommentModal = () => {
    const [open,setOpen] = useState(modelState)
    return (
        <div>
            modal
        </div>
    );
}

export default CommentModal;
