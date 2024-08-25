import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";

const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      const fetchPostDetails = async () => {
        try {
          setLoading(true);
          const [postResponse, commentsResponse] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
            fetch(
              `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
            ),
          ]);
          const postData = await postResponse.json();
          const commentsData = await commentsResponse.json();
          setPost(postData);
          setComments(commentsData);
        } catch (error) {
          console.error("Error fetching post details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPostDetails();
    }
  }, [postId]);

  const memoizedComments = useMemo(() => comments, [comments]);

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

  if (!post) {
    return <Typography>Select a post to view details</Typography>;
  }

  return (
    <Grid container spacing={2} padding={2}>
      {post ? (
        <>
          <Grid item xs={12}>
            <Typography variant="h6"> Post Details </Typography>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Comments</Typography>
            {memoizedComments.map((comment) => (
              <TextField
                key={comment.id}
                label="Comment"
                fullWidth
                multiline
                variant="outlined"
                margin="normal"
                value={comment.body}
                InputProps={{
                  readOnly: true,
                }}
              />
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="h6">Loading post...</Typography>
      )}
    </Grid>
  );
};

export default React.memo(PostDetail);
