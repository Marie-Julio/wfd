import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Flag, Clock, User, Search } from 'lucide-react';
import AppBody from '../../components/AppBody';

const ForumScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'tech', name: 'Technology' },
    { id: 'design', name: 'Design' },
    { id: 'dev', name: 'Development' }
  ];

  const discussions = [
    {
      id: 1,
      title: "Building a Real-time Chat Application",
      author: "Sarah Chen",
      category: "dev",
      replies: 23,
      likes: 45,
      timeAgo: "2h ago",
      excerpt: "Looking for best practices in implementing WebSocket..."
    },
    {
      id: 2,
      title: "UI/UX Design Trends 2025",
      author: "Mike Johnson",
      category: "design",
      replies: 15,
      likes: 32,
      timeAgo: "4h ago",
      excerpt: "Let's discuss the upcoming design trends..."
    }
  ];

  const filteredDiscussions = discussions.filter(discussion =>
    (selectedCategory === 'all' || discussion.category === selectedCategory) &&
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppBody titleBanner="Discutez en toute liberte avec vos amis">
        <section className="items-center justify-center min-h-screen w-full md:m-5">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Forum Discussions</h1>
                
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                    type="text"
                    placeholder="Search discussions..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {categories.map(category => (
                    <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                    >
                    {category.name}
                    </button>
                ))}
                </div>

                {/* Discussions List */}
                <div className="space-y-4">
                {filteredDiscussions.map(discussion => (
                    <div
                    key={discussion.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 transform hover:-translate-y-1"
                    >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                            {discussion.title}
                        </h3>
                        <p className="text-gray-600 mt-2">{discussion.excerpt}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-500">
                            <User className="w-4 h-4 mr-1" />
                            <span className="text-sm">{discussion.author}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{discussion.timeAgo}</span>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            <span className="text-sm">{discussion.replies}</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            <span className="text-sm">{discussion.likes}</span>
                        </button>
                        <button className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-500 hover:text-red-600 transition-colors duration-200">
                            <Flag className="w-4 h-4" />
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
    </section>
    </AppBody>
  );
};

export default ForumScreen;