import React, { useState, useEffect } from 'react';
import { FaTrash, FaComment, FaThumbsUp, FaThumbsDown, FaBars, FaTimes } from 'react-icons/fa';
import new_trader from "C:/InfyTrade/frontend/infytradefe/src/assests/new_trader.webp";
import market_trend from "C:/InfyTrade/frontend/infytradefe/src/assests/market_trend.png";
import sectors from "C:/InfyTrade/frontend/infytradefe/src/assests/sectors.webp";
import tech_analysis from "C:/InfyTrade/frontend/infytradefe/src/assests/tech_analysis.jpg";
import webinar from "C:/InfyTrade/frontend/infytradefe/src/assests/webinar.jpeg";
import faq from "C:/InfyTrade/frontend/infytradefe/src/assests/faq.jpg";

const communityData = [
  { id: 1, name: "New Traders Forum", image: new_trader },
  { id: 2, name: "Current Market Trends", image: market_trend },
  { id: 3, name: "Market Sectors", image: sectors },
  { id: 4, name: "Technical Analysis Discussion", image: tech_analysis },
  { id: 5, name: "Webinars and Tutorials", image: webinar },
  { id: 6, name: "FAQs", image: faq } 
];

const Community = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(communityData[5]); 
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Balram Kumar",
      content: "What is bid and ask price?",
      date: "2 days ago",
      comments: [
        { id: 1, author: "Alka", content: "The bid price refers to the highest price a buyer will pay for a security. The ask price refers to the lowest price a seller will accept for a security.", date: "1 day ago", likes: 0, dislikes: 0 },
      ]
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
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

  const handleCommunityClick = (community) => {
    setSelectedCommunity(community);
  };

  return (
    <div className="flex-1 p-5 overflow-y-auto flex flex-row-reverse">
      <button
        onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
        className="py-2 px-4 bg-blue-500 text-white rounded md:hidden"
      >
        {isSidePanelOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`flex ${isSidePanelOpen ? 'w-64' : 'w-0'} transition-width duration-300`}>
        <div className={`bg-white border-l overflow-y-auto ${isSidePanelOpen ? 'block' : 'hidden'} md:block`}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-primary">Communities</h2>
            {communityData.map(community => (
              <div key={community.id} onClick={() => handleCommunityClick(community)} className="relative w-full h-24 m-2 cursor-pointer transition duration-300 hover:shadow-xl hover:-translate-y-1">
                <img src={community.image} className="w-full h-full object-cover rounded" alt={community.name} />
                <div className="absolute inset-0 bg-black opacity-40 rounded"></div>
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                  {community.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 p-5">
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

        {selectedCommunity && (
          <div className="relative w-full h-48 mb-4">
            <img src={selectedCommunity.image} className="w-full h-full object-cover rounded" alt={selectedCommunity.name} />
            <div className="absolute inset-0 bg-black opacity-40 rounded"></div>
            <div className="absolute bottom-2 left-2 text-white text-xl font-semibold">
              {selectedCommunity.name}
            </div>
          </div>
        )}

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
    </div>
  );
};

const CreatePost = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onSave({ id: Date.now(), author: "User", content: title, description, date: "Just now", comments: [] });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">Create a new post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border rounded mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 border rounded mb-4"
            rows="5"
          />
          <div className="flex justify-end space-x-4">
            <button onClick={onClose} type="button" className="py-2 px-4 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Pagination = ({ pageNumbers, currentPage, handlePageChange, handleNextPage, handlePreviousPage }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-4">
      <button onClick={handlePreviousPage} className="py-2 px-4 bg-gray-300 rounded">Previous</button>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => handlePageChange(number)} className={`py-2 px-4 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
          {number}
        </button>
      ))}
      <button onClick={handleNextPage} className="py-2 px-4 bg-gray-300 rounded">Next</button>
    </div>
  );
};

const CommentSection = ({ postId, comments, onNewComment, onDeleteComment, onLikeComment, onDislikeComment }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      onNewComment(postId, { id: Date.now(), author: "User", content: comment, date: "Just now", likes: 0, dislikes: 0 });
      setComment('');
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit} className="flex items-center space-x-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Comment</button>
      </form>
      <div className="mt-4">
        {comments.map(comment => (
          <div key={comment.id} className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold">{comment.author}</div>
                <div className="text-gray-500">{comment.date}</div>
              </div>
              <div className="flex items-center space-x-4">
                <FaThumbsUp onClick={() => onLikeComment(postId, comment.id)} className="cursor-pointer text-green-500" />
                <FaThumbsDown onClick={() => onDislikeComment(postId, comment.id)} className="cursor-pointer text-red-500" />
                <FaTrash onClick={() => onDeleteComment(postId, comment.id)} className="cursor-pointer text-red-500" />
              </div>
            </div>
            <div className="mt-2">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
