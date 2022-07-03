import { SearchIcon } from "@heroicons/react/outline";
import New from "./New";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRecoilState } from "recoil";
import {userState} from"../atom/userAtom"
import { db } from "../firebase";
import { useSession } from "next-auth/react";
export default function Widgets({ newsResults, randomUsersResults }) {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);
  const [listFollow, setListFollow] = useState([]);
  const {data:session} = useSession()
  const [currentUser,setCurrentUser] = useRecoilState(userState)
  useEffect(
    () =>{
      onSnapshot(
        query(collection(db, "contact",currentUser?.uid||"1","follow"), orderBy("timestamp", "desc")),
        (snapshot) => {
     
          setListFollow(snapshot.docs);
        }
        )
      }
        , 
    [db]
    
  );

      const SeeMore = () =>{
          setRandomUserNum(randomUserNum + 3)
      }

  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full bg-red-300 relative">
          <SearchIcon className="h-5 z-50 text-gray-500" />
          <input
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 "
            type="text"
            placeholder="Search Twitter"
          />
        </div>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Tin Tức</h4>

        <AnimatePresence>
          {newsResults.slice(0, articleNum).map((article) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <New key={article.title} article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className=" text-blue-400 pl-4 pb-3 hover:text-blue-400"
        >
          Xem thêm
        </button>
      </div>
      <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Bạn đang theo dõi</h4>
      
        <AnimatePresence>
        {listFollow?.slice(0, randomUserNum).map((follower) => (
           <motion.div
           key={follower.data().id}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
         >
          <div
            key={follower.data().id}
            className="flex items-center px-4 py-2  cursor-pointer hover:bg-gray-200"
          >
            <img
              className="rounded-full"
              width="40"
              src={follower.data().userImg}
              alt=""
            />
            <div className="truncate ml-4 leading-5">
              <h4 className="font-bold hover:underline text-[14px] truncate">
                {follower.data().name}
              </h4>
              <h5 className="text-[13px] text-gray-500 truncate">
                {follower.data().username }
              </h5>
            </div>
            <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
              Nhắn tin
            </button>
          </div>
            </motion.div>
        ))}
          </AnimatePresence>
        <button
          onClick={SeeMore}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
        Xem thêm
        </button>
      </div>
    </div>
  );
}
