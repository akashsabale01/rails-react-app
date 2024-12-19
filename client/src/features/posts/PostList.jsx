import { useEffect, useState } from "react";
import { API_URL } from "../../constants";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const json = await response.json();
        setPosts(json);
      } else {
        throw response;
      }
    } catch (e) {
      setError("Error occurred while fetching posts.");
      console.log("Error occurred while fetching posts:", e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="posts-container">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
