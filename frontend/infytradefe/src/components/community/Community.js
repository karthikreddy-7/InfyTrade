import React, { useState, useEffect} from 'react';
import { FaTrash, FaComment, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import new_trader from "C:/InfyTrade/frontend/infytradefe/src/assests/new_trader.webp";
import market_trend from "C:/InfyTrade/frontend/infytradefe/src/assests/market_trend.png"
import sectors from "C:/InfyTrade/frontend/infytradefe/src/assests/sectors.webp"
import tech_analysis from "C:/InfyTrade/frontend/infytradefe/src/assests/tech_analysis.jpg"
import webinar from "C:/InfyTrade/frontend/infytradefe/src/assests/webinar.jpeg"

const Community = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Balram kumar",
      content: "What is bid and ask price?",
      date: "2 days ago",
      comments: [
        { id: 1, author: "Alka", content: "The bid price refers to the highest price a buyer will pay for a security. The ask price refers to the lowest price a seller will accept for a security.", date: "1 day ago", likes: 0, dislikes: 0 },
      ]
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setIsCreatePostOpen(false);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleNewComment = (postId, newComment) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [newComment, ...post.comments] } : post
    ));
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: post.comments.filter(comment => comment.id !== commentId) } : post
    ));
  };

  const handleLikeComment = (postId, commentId) => {
    setPosts(posts.map(post =>
      post.id === postId ? {
        ...post, comments: post.comments.map(comment =>
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
        )
      } : post
    ));
  };

  const handleDislikeComment = (postId, commentId) => {
    setPosts(posts.map(post =>
      post.id === postId ? {
        ...post, comments: post.comments.map(comment =>
          comment.id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment
        )
      } : post
    ));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex-1 p-5 overflow-y-auto">
      <header className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search for communities or questions"
          className="p-2 border rounded w-1/2"
        />
        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="py-2 px-4 bg-blue-500 text-white rounded"
        >
          New Post
        </button>
      </header>

      <div className="community">
      <div className="flex">
        <div className="relative w-40 h-24 m-2 cursor-pointer transition duration-300 hover:shadow-xl hover:-translate-y-1">
          <img src={new_trader} className="w-full h-full object-cover rounded" />
          <div className="absolute inset-0 bg-black opacity-40 rounded"></div>
          <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
            New Traders Forum
          </div>
        </div>
        <div className="relative w-40 h-24 m-2 cursor-pointer transition duration-300 hover:shadow-xl hover:-translate-y-1">
          <img src={market_trend} className="w-full h-full object-cover rounded" />
          <div className="absolute inset-0 bg-black opacity-40 rounded"></div>
          <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
            Current Market Trends
          </div>
        </div>
        <div className="relative w-40 h-24 m-2 cursor-pointer transition duration-300 hover:shadow-xl hover:-translate-y-1">
          <img src={sectors} className="w-full h-full object-cover rounded" />
          <div className="absolute inset-0 bg-black opacity-40 rounded"></div>
          <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
            Market Sectors
          </div>
        </div>
        <div className="relative w-40 h-24 m-2 cursor-pointer transition duration-300 hover:shadow-xl hover:-translate-y-1">
          <img src={tech_analysis} className="w-full h-full object-cover rounded" />
          <div className="absolute inset-0 bg-black opacity-40 rounded"></div>
          <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
            Technical Analysis Discussion
          </div>
        </div>
        <div className="relative w-40 h-24 m-2 cursor-pointer transition duration-300 hover:shadow-xl hover:-translate-y-1">
          <img src={webinar} className="w-full h-full object-cover rounded" />
          <div className="absolute inset-0 bg-black opacity-40 rounded"></div>
          <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
            Webinars and Tutorials
          </div>
        </div>
      </div>
    </div>

      <div className="grid grid-cols-1 gap-4">
        {currentPosts.map((post) => (
          <div key={post.id} className="bg-white p-5 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold">{post.author}</div>
                <div className="text-gray-500">{post.date}</div>
              </div>
              <div className="flex items-center space-x-4">
                <FaTrash onClick={() => handleDeletePost(post.id)} className="cursor-pointer text-red-500" />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-sm font-semibold">{post.content}</h2>
            </div>
            <div className="mt-4">
              <CommentSection
                postId={post.id}
                comments={post.comments}
                onNewComment={handleNewComment}
                onDeleteComment={handleDeleteComment}
                onLikeComment={handleLikeComment}
                onDislikeComment={handleDislikeComment}
              />
            </div>
          </div>
        ))}
      </div>

      <Pagination
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />

      {isCreatePostOpen && (
        <CreatePost onClose={() => setIsCreatePostOpen(false)} onSave={handleNewPost} />
      )}
    </div>
  );
};

const CreatePost = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const newPost = {
      id: Date.now(),
      author: "Balram Kumar",
      content: title,
      date: "Just now",
      comments: [],
      description: description
    };
    onSave(newPost);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Create New Post</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Post Title</label>
          <input
            type="text"
            className="p-2 border rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Please enter the post title..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Post Description</label>
          <textarea
            className="p-2 border rounded w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type something here..."
            rows="4"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-500 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ postId, comments, onNewComment, onDeleteComment, onLikeComment, onDislikeComment }) => {
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    const newComment = {
      id: Date.now(),
      author: "kartik",
      content: commentText,
      date: "Just now",
      likes: 0,
      dislikes: 0
    };
    onNewComment(postId, newComment);
    setCommentText('');
    setIsCommentBoxVisible(false);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsCommentBoxVisible(!isCommentBoxVisible)}
          className="flex items-center text-sm space-x-2 text-blue-500"
        >
          <FaComment />
          <span>Add Comment</span>
        </button>
        <button
          onClick={() => setIsCommentsVisible(!isCommentsVisible)}
          className="flex items-center text-sm space-x-2 text-blue-500"
        >
          <FaComment />
          <span>{isCommentsVisible ? 'Hide Comments' : `Show Comments (${comments.length})`}</span>
        </button>
      </div>

      {isCommentsVisible && (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="mt-4 bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">{comment.author}</div>
                  <div className="text-gray-500">{comment.date}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaThumbsUp onClick={() => onLikeComment(postId, comment.id)} className="cursor-pointer text-green-500" />
                  <span>{comment.likes}</span>
                  <FaThumbsDown onClick={() => onDislikeComment(postId, comment.id)} className="cursor-pointer text-red-500" />
                  <span>{comment.dislikes}</span>
                  <FaTrash onClick={() => onDeleteComment(postId, comment.id)} className="cursor-pointer text-red-500" />
                </div>
              </div>
              <div className="mt-2">
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isCommentBoxVisible && (
        <div className="mt-2">
          <textarea
            className="p-2 border rounded w-full"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            rows="3"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setIsCommentBoxVisible(false)}
              className="py-2 px-4 bg-gray-500 text-white rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleAddComment}
              className="py-2 px-4 bg-blue-500 text-white rounded"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Pagination = ({ pageNumbers, currentPage, handlePageChange, handleNextPage, handlePreviousPage }) => (
  <div className="flex justify-center mt-5">
    <button
      onClick={handlePreviousPage}
      className="py-2 px-4 mx-1 bg-gray-200"
      disabled={currentPage === 1}
    >
      Previous
    </button>
    {pageNumbers.map(number => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={`py-2 px-4 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        {number}
      </button>
    ))}
    <button
      onClick={handleNextPage}
      className="py-2 px-4 mx-1 bg-gray-200"
      disabled={currentPage === pageNumbers.length}
    >
      Next
    </button>
  </div>
);

export default Community;
