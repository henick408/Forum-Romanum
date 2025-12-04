"use client";
import Header from "./_components/header";
import SideMenu from "./_components/sideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./_components/post";

export default function Home() {
  type PostProps = {
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
  const [cat, setCat] = useState(-1);

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCat = (data: number) => {
    setCat(data); // aktualizujemy stan w komponencie wyżej
    console.log(cat);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div className="min-h-screen bg-zinc-50 cursor-default">
      <Header />
      <div className="flex justify-between w-full">
        <SideMenu sendCat={handleCat} />

        <div className="w-full flex flex-col items-center">
          {loading ? (
            <div>ładowańsko</div>
          ) : posts.length === 0 ? (
            <div>Brak postów</div>
          ) : (
            posts
              .filter((post) => cat === -1 || post.category.id === cat)
              .map((post) => (
                <div
                  key={post.id}
                  className="w-full mt-2 rounded flex flex-col items-center gap-5"
                >
                  <Post post={post} />
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
