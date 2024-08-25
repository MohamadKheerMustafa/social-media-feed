import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";

const PostList = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const memoizedPosts = useMemo(() => posts, [posts]);

  const totalPages = Math.ceil(memoizedPosts.length / postsPerPage);

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return memoizedPosts.slice(startIndex, endIndex);
  }, [currentPage, memoizedPosts]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ overflowY: "auto", maxHeight: "100vh", padding: 0 }}>
      {currentPosts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: 1 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.body.substring(0, 100)}...
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSelectPost(post.id)}
              sx={{ marginTop: 2 }}
            >
              Details
            </Button>
          </CardContent>
        </Card>
      ))}
      <Box
        display="flex"
        justifyContent="center"
        marginTop={2}
        padding={1}
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default React.memo(PostList);
