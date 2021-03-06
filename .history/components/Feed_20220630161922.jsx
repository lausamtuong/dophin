    import React, { useState,useEffect } from 'react';
    import { SparklesIcon } from "@heroicons/react/outline";
    import Input from "./Input";
import Post from './Post';
import { onSnapshot } from 'firebase/firestore';
    const Feed = () => {
        const [posts ,setPosts]=  useState([])
        useEffect(() => {
          const unsubcribe = onSnapshot()
          return () => {
            cleanup
          };
        }, [input]);
           
            return (
             <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5"/>
         
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
        );
    }
    
    export default Feed;
    