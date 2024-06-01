import "./styles.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(5); // 每次顯示的博客數量

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const loadMoreBlogs = () => {
    if (visibleBlogs < 100) {
      setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 5);
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.slice(0, visibleBlogs).map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
      {visibleBlogs < 100 && <button onClick={loadMoreBlogs}>Get More</button>}
    </div>
  );
};

export default App;
