import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { api } from "../services/api";

type Post = {
  title: string;
};
export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    async function getPosts() {
      const response = await api.get<Post[]>("posts", {
        headers: {
          Authorization: user?.token,
        },
      });

      setPosts(response.data);
    }
    getPosts();
  }, []);
  const { logout } = useAuth();
  return (
    <div>
      <h1> Dashboard</h1>
      {posts.map((post) => (
        <h1>{post.title}</h1>
      ))}
      <button onClick={logout}>Sair</button>
    </div>
  );
}
