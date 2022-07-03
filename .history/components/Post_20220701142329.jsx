import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { Dropdown, Avatar, Text, Grid, User } from "@nextui-org/react";
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
export default function Post({ post, id }) {
  
  const router = useRouter();
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLikes, setHasLikes] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
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
  async function likePost() {
    if (session) {
      if (hasLikes) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
          username: session?.user?.username,
        });
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
    console.log("follow")
    await setDoc(doc(db, "contact", session?.user?.uid,"follow",post?.data().id),post.data());
  };
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      {session&&session?.user?.uid !== post?.data().id ? (
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
            <img
              className="h-11 w-11 rounded-full mr-4"
              src={post?.data()?.userImg}
              alt="user-img"
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }} onClick={follow}>
                Theo dõi
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                @{post?.data().username}
              </Text>
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
        <img
          className="h-11 w-11 rounded-full mr-4"
          src={post?.data()?.userImg}
          alt="user-img"
        />
      )}

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
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
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
