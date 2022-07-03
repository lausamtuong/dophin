import React from "react";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import {useSession,signOut} from "next-auth/react"
import {useState,useRef} from 'react'
import {db, storage} from '../firebase'
import { addDoc,collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
const Input = () => {
  const {data:session} = useSession();
  const [input,setInput] = useState('');
  const filePickerRef =useRef(null)
  const [selectedFile,setSelectedFile] = useState(null)
  const sendPost = async () =>{
    const docRef= await addDoc(collection(db,'posts'),{
      id:session.user.uid,
      text:input,
      userImg:session.user.image,
      name:session.user.name,
      username:session.user.username,
      timestamp:serverTimestamp(),
    });
    const imageRef= ref(storage,`posts/${docRef.id}/image`);
    if(setSelectedFile){
      console.loc(1)
      await uploadString(imageRef,selectedFile,"data_url").then(async()=>{
        const downloadURL = await getDownloadURL(imageRef)  
      })
    }
    setInput();
  }
  const addImageToPost = (e) =>{
    const reader = new FileReader()
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) =>{
      setSelectedFile(readerEvent.target.result)
    }
  }
  return (
    <>
    {session &&<div className="flex  border-b border-gray-200 p-3 space-x-3">
      <img
      onClick={signOut}
        src={session.user.image}
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
            rows="2"
            placeholder="What's happening?"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex">
            <div className="a" onClick={()=>filePickerRef.current.click()}>

            <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            <input type="file" hidden ref={filePickerRef} onClick={addImageToPost} />
            
            </div>
            <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
          </div>
          <button onClick={sendPost} disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            Tweet
          </button>
        </div>
      </div>
    </div>
  }
    </>
  );
};

export default Input;