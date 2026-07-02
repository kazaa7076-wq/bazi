import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Menu, CheckCheck, Send, Gamepad2, Clapperboard } from 'lucide-react';
import { chats, Chat } from '../data/chats';

interface ChatListProps {
  onChatSelect: (chat: Chat) => void;
}

const tabs = [
  { id: 'all', label: 'All', count: 12 },
  { id: 'unread', label: 'Unread' },
  { id: 'groups', label: 'Groups' },
  { id: 'channels', label: 'Channels' },
  { id: 'bots', label: 'Bots' },
];

function getAvatarIcon(chat: Chat) {
  if (chat.name === 'Lumo AI') {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="11" r="1" fill="white" />
          <circle cx="12" cy="11" r="1" fill="white" />
          <circle cx="15" cy="11" r="1" fill="white" />
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    );
  }
  if (chat.name === 'Tech News') {
    return (
      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
        <Send size={20} className="text-white -rotate-45" />
      </div>
    );
  }
  if (chat.name === 'Gaming Zone') {
    return (
      <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
        <Gamepad2 size={20} className="text-white" />
      </div>
    );
  }
  if (chat.name === 'Movie Buffs') {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
        <Clapperboard size={20} className="text-white" />
      </div>
    );
  }
  return (
    <img
      src={chat.avatar}
      alt={chat.name}
      className="w-12 h-12 rounded-full object-cover"
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}&background=random&color=fff`;
      }}
    />
  );
}

export default function ChatList({ onChatSelect }: ChatListProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredChats = chats.filter((chat) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return chat.unread > 0;
    if (activeTab === 'groups') return chat.type === 'group';
    if (activeTab === 'channels') return chat.type === 'channel';
    if (activeTab === 'bots') return chat.type === 'bot';
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header */}
      <div className="shrink-0 pt-12 pb-2 px-4">
        <div className="flex items-center justify-between mb-4">
          <button className="w-10 h-10 flex items-center justify-center text-gray-400">
            <Menu size={22} />
          </button>
          <h1 className="text-xl font-bold">
            <span className="text-purple-400">Lumo</span>
            <span className="text-white">Chat</span>
          </h1>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center text-gray-400">
              <Search size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-gray-400">
              <Plus size={22} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="chatTab"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.label}
                {tab.count && (
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-[10px] flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2">
        <AnimatePresence mode="popLayout">
          {filteredChats.map((chat, index) => (
            <motion.button
              key={chat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onChatSelect(chat)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/5 transition-colors text-left"
            >
              <div className="relative shrink-0">
                {getAvatarIcon(chat)}
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                )}
                {chat.verified && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-white font-semibold text-sm truncate">{chat.name}</h3>
                  <span className="text-gray-500 text-[11px] shrink-0 ml-2">{chat.time}</span>
                </div>
                <p className="text-gray-400 text-[13px] truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 ? (
                <div className="shrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="text-white text-[11px] font-bold">{chat.unread}</span>
                </div>
              ) : chat.type === 'personal' ? (
                <CheckCheck size={16} className="text-purple-400 shrink-0" />
              ) : null}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
