import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "./comment";

type PostProps = {
  post: {
    username: string;
    title: string;
    content: string;
    category: {
      name: string;
      id: number;
    };
    createdAt: string;
    updatedAt: string;
    id: number;
  };
};

type CommentProps = {
  username: string;
  content: string;
  CreatedAt: string;
  id: number;
};

export default function Post({ post: props }: PostProps) {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/posts/${props.id}/comments`
        );
        setComments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [props.id]);

  return (
    <div
      style={{ fontFamily: "EB Garamond, serif" }}
      className=" flex flex-col px-4 py-3 bg-zinc-50 w-11/12 border-blue-100 border-2 rounded text-zinc-700"
    >
      <div className="flex justify-between">
        <div className="text-2xl ">{props.title}</div>
        <div className="flex gap-3">
          <div>{props.createdAt}</div>
          <div className="brightness-95 font-semibold">{props.username}</div>
        </div>
      </div>
      <div className="px-1">kategoria: {props.category.name}</div>
      <div className=" p-2 text-lg">{props.content}</div>
      <div
        className="w-full h-px bg-blue-100 transform-gpu"
        style={{ height: "1.2px", willChange: "transform" }} //kreska ale lepsza!
      />
      {
        //komentarzeeee
      }
      <div className="flex flex-col gap-2 p-3">
        {loading ? (
          <div>ładowańsko</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <Comment comment={comment} key={comment.id} /> // comment.
          ))
        ) : (
          <div></div>
        )}
        <div className=" bg-blue-100 hover:bg-blue-200 hover:cursor-pointer rounded-2xl mx-2 mt-2 px-3 w-fit p-2">
          Dodaj komentarz
        </div>
      </div>

      {
        //komentarzeeee
      }
    </div>
  );
}
