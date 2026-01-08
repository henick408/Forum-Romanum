import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  createdAt: string;
  id: number;
};

export default function Post({ post: props }: PostProps) {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const scrollPosRef = useRef(0);

  useEffect(() => {
    setComments([]);
    setPage(0);
    setHasMore(true);
  }, [props.id]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!hasMore || loading) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/api/posts/${props.id}/comments`,
          {
            params: {
              page,
              size: 3,
            },
          }
        );

        const newComments: CommentProps[] = res.data.content;

        setComments((prev) => {
          const ids = new Set(prev.map((c) => c.id));
          const filtered = newComments.filter((c) => !ids.has(c.id));
          return [...prev, ...filtered];
        });

        setHasMore(!res.data.last);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [page, props.id]);

  return (
    <div
      style={{ fontFamily: "EB Garamond, serif" }}
      className="flex flex-col px-4 py-3 bg-zinc-50 w-11/12 border-blue-100 border-2 rounded text-zinc-800"
    >
      <div className="flex justify-between">
        <div className="text-2xl">{props.title}</div>
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
        remarkPlugins={[remarkGfm]}
        className="p-2"
        components={{
          ul: ({ ...props }) => <ul className="list-disc pl-6" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal pl-6" {...props} />,
          li: ({ ...props }) => <li className="mb-1" {...props} />,
        }}
      >
        {props.content}
      </Markdown>

      <div className="w-full h-px bg-blue-100 my-2" />

      {
        //komentarzeeee
      }
      <div className="flex flex-col gap-2 p-3">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

        {loading && <div>ładowańsko</div>}

        {!loading && comments.length === 0 && <></>}

        {hasMore && !loading && (
          <button
            onClick={() => {
              scrollPosRef.current = window.scrollY;
              setPage((prev) => prev + 1);
            }}
            className="bg-blue-100 hover:bg-blue-200 rounded-2xl mx-2 mt-2 px-3 w-fit text-center p-2 hover:cursor-pointer"
          >
            Załaduj więcej komentarzy
          </button>
        )}

        <div
          className="bg-blue-100 hover:bg-blue-200 hover:cursor-pointer rounded-2xl mx-2 mt-2 px-3 w-36 text-center p-2"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {!showForm ? "Dodaj komentarz" : "Anuluj"}
        </div>

        {showForm && <PostCommentForm postId={props.id} />}
      </div>
    </div>
  );
}
