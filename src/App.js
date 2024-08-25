import React, { Suspense, lazy, useState, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Container,
  Grid,
  useMediaQuery,
  CssBaseline,
  IconButton,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Box from "@mui/material/Box";

const PostList = lazy(() => import("./components/PostList"));
const PostDetail = lazy(() => import("./components/PostDetail"));

const App = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Container maxWidth="lg">
            <Box
              marginTop={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              justifyItems="center"
            >
              <Typography fontSize={30} color="blue">
                Social Media feed
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              padding={1}
            >
              <IconButton onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
            <Grid container spacing={2} padding={2}>
              <Grid item xs={14} md={isMobile ? 14 : 4}>
                <PostList onSelectPost={setSelectedPostId} />
              </Grid>
              <Grid item xs={12} md={isMobile ? 12 : 8}>
                <PostDetail postId={selectedPostId} />
              </Grid>
            </Grid>
          </Container>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
