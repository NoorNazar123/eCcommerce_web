'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/index';
import {
  fetchPosts,
  addPosts,
  deletePost,
  updatePost,
} from '@/store/features/post/postsSlice';
import { RootState, AppDispatch } from '@/store/store';

const Posts = () => {
  const dispatch = useAppDispatch<AppDispatch>();
  const { posts, status, error } = useAppSelector(
    (state: RootState) => state.posts,
  );
  const [editingPost, setEditingPost] = useState<{
    id: number;
    title: string;
    body: string;
  } | null>(null);

  const handleAddPost = () => {
    const payload = {
      id: Date.now(),
      title: 'New Post',
      body: 'This is a test post.',
    };
    dispatch(addPosts(payload));
  };

  const handleDeletePost = (postId: number) => {
    dispatch(deletePost(postId));
  };

  const handleUpdatePost = () => {
    if (editingPost) {
      dispatch(updatePost(editingPost));
      setEditingPost(null);
    }
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Posts (Testing Redux Toolkit) <PostProduct />
      </h1>

      {status === 'loading' && <p className="text-center">Loading...</p>}
      {status === 'failed' && (
        <p className="text-red-500 text-center">Error: {error}</p>
      )}

      {status === 'succeeded' && Array.isArray(posts) && posts.length > 0 && (
        <div className="flex flex-wrap gap-6 justify-center">
          {posts
            .slice()
            .sort((a: { id: number }, b: { id: number }) => b.id - a.id)
            .map((post) => (
              <div
                key={post.id}
                className="w-96 p-5 border rounded-lg shadow-md bg-white relative"
              >
                <p>{post.id}</p>
                <h3 className="text-lg font-semibold line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-gray-600">{post.body}</p>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
                <button
                  className="mt-2 ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setEditingPost(post)}
                >
                  Edit
                </button>
              </div>
            ))}
        </div>
      )}

      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Container */}
          <div className="bg-white w-[450px] rounded-lg shadow-lg p-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-xl font-semibold">Edit Post</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setEditingPost(null)}
              >
                ✕
              </button>
            </div>

            {/* Title Input */}
            <textarea
              value={editingPost.title}
              onChange={(e) =>
                setEditingPost({ ...editingPost, title: e.target.value })
              }
              className="block border p-2 w-full rounded h-12 overflow-auto focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter post title..."
            ></textarea>

            {/* Body Textarea */}
            <textarea
              value={editingPost.body}
              onChange={(e) =>
                setEditingPost({ ...editingPost, body: e.target.value })
              }
              className="block border p-2 w-full mt-3 rounded h-24 overflow-auto focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter post content..."
            />

            {/* Action Buttons */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                onClick={() => setEditingPost(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleUpdatePost}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;

const PostProduct = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addPosts({ id: Date.now(), title, body }));
    setTitle('');
    setBody('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter body"
          required
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

// 'use client';

// import { useState, useEffect, useCallback, memo } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaShoppingBag,
// } from 'react-icons/fa';

// const images = [
//   '/images/models.png',
//   '/images/model2.png',
//   '/images/model3.png',
//   '/images/model4.png',
// ];

// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('M');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full max-w-[90%] mx-auto h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20">
//       {/* Left Section */}
//       <motion.div className="w-full md:w-1/2 text-center md:text-left">
//         <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight">
//           Redefining Fashion,{' '}
//           <span className="text-blue-500">Redefining You</span>
//         </h1>
//         <p className="mt-4 text-lg md:text-xl text-gray-300">
//           Discover the latest fashion trends curated just for you.
//         </p>

//         {/* CTA Buttons */}
//         <div className="mt-6 flex gap-4">
//           <button className="px-6 py-3 bg-[#FFD79E] text-black font-semibold rounded-lg flex items-center gap-2 hover:bg-[#FFC966] transition">
//             <FaShoppingBag className="text-lg" /> Shop Now
//           </button>
//           <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition">
//             Explore Trends
//           </button>
//         </div>

//         {/* Social Icons */}
//         <div className="mt-8 flex gap-6 text-white text-2xl">
//           <a href="#" className="hover:text-blue-400 transition">
//             <FaFacebookF />
//           </a>
//           <a href="#" className="hover:text-pink-400 transition">
//             <FaInstagram />
//           </a>
//           <a href="#" className="hover:text-blue-500 transition">
//             <FaTwitter />
//           </a>
//         </div>
//       </motion.div>

//       {/* Right Section: Image Slider */}
//       <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
//         <motion.div
//           key={currentSlide}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="relative w-[320px] h-[450px] overflow-hidden"
//         >
//           <Image
//             src={images[currentSlide]}
//             alt="Fashion Model"
//             fill
//             sizes="100vw"
//             priority
//             className="object-cover object-top rounded-xl"
//           />
//         </motion.div>

//         {/* Progress Bar */}
//         {/* <div className="mt-4 w-full max-w-xs h-3 bg-gray-700 rounded-full overflow-hidden">
//           <motion.div
//             className="h-full bg-green-500"
//             initial={{ width: '0%' }}
//             animate={{ width: '80%' }}
//             transition={{ duration: 2 }}
//           ></motion.div>
//         </div> */}

//         {/* Thumbnail Navigation */}
//         <div className="mt-4 flex gap-2">
//           {images.map((src, index) => (
//             <button
//               key={index}
//               className={`w-14 h-14 border rounded-lg overflow-hidden transition-all ${
//                 currentSlide === index ? 'border-blue-500' : 'border-gray-500'
//               }`}
//               onClick={() => setCurrentSlide(index)}
//             >
//               <Image
//                 src={src}
//                 alt={`Thumbnail ${index + 1}`}
//                 width={56}
//                 height={56}
//                 className="object-cover rounded-md"
//               />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default memo(HeroSection);
