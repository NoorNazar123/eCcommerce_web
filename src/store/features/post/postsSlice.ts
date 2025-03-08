import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// ✅ Define Post Type
interface Post {
  id: number;
  title: string;
  body: string;
}

// ✅ Define Initial State
interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// ✅ Fetch Posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(API_URL);
  return response.json();
});

// ✅ Add Post
export const addPosts = createAsyncThunk(
  'posts/addPosts',
  async (postData: Post) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });

    if (!response.ok) throw new Error('Failed to add post');

    return await response.json();
  },
);

// ✅ Delete Post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId: number) => {
    const response = await fetch(`${API_URL}/${postId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete post');

    return postId; // ✅ Returning the deleted post's ID
  },
);

// ✅ Update Post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (updatedPost: Post) => {
    const response = await fetch(`${API_URL}/${updatedPost.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });

    if (!response.ok) throw new Error('Failed to update post');
    console.log('Updated Post Response:', response); // ✅ Debugging response

    return await response.json();
  },
);

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

// ✅ Create Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch posts';
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export default postsSlice.reducer;
