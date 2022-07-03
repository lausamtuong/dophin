import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { Dropdown, Avatar, Text, Grid, User,Popover,Button } from "@nextui-org/react";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { modalState, postIdState } from "../atom/modalAtom";
import { db, storage } from "../firebase";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { UserCard } from "./UserCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Post({ post, id }) {
  const notify = () => toast("Wow so easy!");
  const router = useRouter();
  const [likes, setLikes] = useState([]);
  const [follower, setFollower] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLikes, setHasLikes] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const {data:session} = useSession();
 console.log(1)
  useEffect(() => {
  
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
      //  if(session?.user?.uid===post?.data().id) notify()
        setLikes(snapshot.docs)
      }
    );

  }, [db]);
  useEffect(() => {
   
    const unsubscribe = onSnapshot(
      collection(db, "contact", session?.user?.uid||"1", "follow"),
      (snapshot) => setFollower(snapshot.docs)
    );
  }, [db]);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);
  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);
  useEffect(() => {
    setHasFollowed(
      follower.findIndex((follow) => follow.id === post?.data()?.id) !== -1
    );
  }, [follower]);
  const handleAction = () =>{
   
    
  }
  async function likePost() {
    if (session) {
      if (hasLikes) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
        await deleteDoc(doc(db, "noti",  post.data().id, "likes_noti", session?.user?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
          username: session?.user?.username,
        });
        await setDoc(doc(db, "noti", post.data().id, "likes_noti", session?.user?.uid), session.user);
      }

    } else {
      signIn();
    }
  }
  const deletePost = async () => {
    if (window.confirm("Bạn đồng ý xóa bài chứ? ")) {
      deleteDoc(doc(db, "posts", id));
      if (post?.data()?.image) deleteObject(ref(storage, `posts/${id}/image`));
    }
    router.push("/");
  };
  const follow = async () => {
    await setDoc(doc(db, "noti", post.data().id, "follows_noti", session?.user?.uid), session.user);
   if(!hasFollowed)
    await setDoc(
      doc(db, "contact", session?.user?.uid, "follow", post?.data().id),
      post.data()
    )
    else  await deleteDoc( doc(db, "contact", session?.user?.uid, "follow", post?.data().id));
  };
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      <Popover >
          <Popover.Trigger>
          <img
              className="h-11 w-11 rounded-full mr-4"
              src={post?.data()?.userImg}
              alt="user-img"
              onClick={handleAction}
            />
          </Popover.Trigger>
          <Popover.Content css={{ px: '$4', py: '$2' }}>
            <UserCard post={post} follow={follow} hasFollowed={hasFollowed} setHasFollowed={setHasFollowed}/>
          </Popover.Content>
        </Popover>
           
         

      {/* right side */}
      <div className="w-full">
        {/* Header */}

        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post?.data()?.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>

          {/* dot icon */}
          {session && session?.user?.uid !== post?.data().id ? (
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
          </Dropdown.Trigger>
          <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              {hasFollowed ? (
                <>
                  <Text b color="success" css={{ d: "flex" }} onClick={follow}>
                    Đã Theo dõi
                  </Text>
                  <Text b color="primary" css={{ d: "flex" }}>
                    @{post?.data().username}
                  </Text>
                </>
              ) : (
                <>
                  {" "}
                  <Text b color="inherit" css={{ d: "flex" }} onClick={follow}>
                    Theo dõi
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    @{post?.data().username}
                  </Text>
                </>
              )}
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              Nhắn tin
            </Dropdown.Item>

            <Dropdown.Item key="logout" color="error" withDivider>
              Chặn
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
      )}
        
        </div>

        {/* post text */}

        <p
          onClick={() => router.push(`/posts/${id}`)}
          className="text-gray-800 text-[15px sm:text-[16px] mb-2"
        >
          {post?.data()?.text}
        </p>

        {/* post image */}

        <img
          onClick={() => router.push(`/posts/${id}`)}
          className="rounded-2xl mr-2"
          src={post?.data()?.image}
          alt=""
        />

        {/* icons */}

        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex  justify-center items-center">
            <ChatIcon
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setPostId(id);
                  setOpen(!open);
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
            {comments.length > 0 && (
              <span className="text-sm">{comments.length}</span>
            )}
          </div>
          {session?.user?.uid === post?.data().id ? (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          ) : (
            ""
          )}
          <div className="flex items-center">
            {hasLikes ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLikes && "text-red-600"} text-sm select-none`}
              >
                {" "}
                {likes.length}
              </span>
            )}
          </div>
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
   
    </div>
  );
}
