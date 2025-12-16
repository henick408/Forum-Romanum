import axios from "axios";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Comment from "./comment";
import PostCommentForm from "./postCommentForm";

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
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/posts/${props.id}/comments`
        );
        setComments(res.data.content);
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
      className=" flex flex-col px-4 py-3 bg-zinc-50 w-11/12 border-blue-100 border-2 rounded text-zinc-800"
    >
      <div className="flex justify-between">
        <div className="text-2xl ">{props.title}</div>
        <div className="flex gap-3 whitespace-pre">
          <div>
            {props.createdAt.slice(0, 10) +
              "   " +
              props.createdAt.slice(11, 19)}
          </div>
          <div className="brightness-95 font-semibold">{props.username}</div>
        </div>
      </div>
      <div className="px-1">kategoria: {props.category.name}</div>
      <Markdown
        className="p-2 text-zinc-800"
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => <h1 {...props} className="py-2 text-3xl" />,
          h2: ({ ...props }) => <h2 {...props} className="py-1 text-2xl" />,
          h3: ({ ...props }) => <h3 {...props} className="py-1 text-xl" />,
          p: ({ ...props }) => (
            <p {...props} className="text-lg text-justify mb-2" />
          ),
          ul: ({ ...props }) => (
            <ul {...props} className="list-disc ml-6 mb-2" />
          ),
          ol: ({ ...props }) => (
            <ol {...props} className="list-decimal ml-6 mb-2" />
          ),
          li: ({ ...props }) => <li {...props} className="mb-1" />,
          code: ({ ...props }) => <code {...props} className=" px-1 rounded" />,
          pre: ({ ...props }) => (
            <pre
              {...props}
              className="bg-zinc-100 p-2 rounded overflow-x-auto"
            />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-gray-400 pl-4 italic my-2"
            />
          ),
        }}
      >
        {props.content}
      </Markdown>

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
        <div
          className=" bg-blue-100 hover:bg-blue-200 hover:cursor-pointer rounded-2xl mx-2 mt-2 px-3 w-36 text-center p-2"
          onClick={() => setShowForm(!showForm)}
        >
          {!showForm ? "Dodaj Komentarz" : "Anuluj komentarz"}
        </div>
        {showForm ? <PostCommentForm postId={props.id} /> : <></>}
      </div>

      {
        //komentarzeeee
      }
    </div>
  );
}
