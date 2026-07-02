import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MoreVertical,
  Mic,
  Paperclip,
  Smile,
  Play,
  Pause,
  CheckCheck,
} from 'lucide-react';
import { Chat, Message } from '../data/chats';

interface ChatDetailProps {
  chat: Chat;
  onBack: () => void;
}

function VoiceMessage({ duration, isMe }: { duration: string; isMe: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (playing) {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 0;
          }
          return p + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl max-w-[280px] ${
        isMe
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 rounded-br-md'
          : 'bg-gray-800 rounded-bl-md'
      }`}
    >
      <button
        onClick={() => setPlaying(!playing)}
        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"
      >
        {playing ? (
          <Pause size={14} className="text-white" />
        ) : (
          <Play size={14} className="text-white ml-0.5" />
        )}
      </button>
      <div className="flex-1">
        <div className="flex items-end gap-1 h-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-white/40"
              style={{
                height: `${Math.max(4, Math.sin(i * 0.8) * 12 + 16)}px`,
                opacity: playing && i < (progress / 100) * 20 ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
      <span className="text-white/70 text-xs shrink-0">{duration}</span>
    </div>
  );
}

function MessageBubble({ msg, chat }: { msg: Message; chat: Chat }) {
  const isMe = msg.isMe;

  if (msg.type === 'summary') {
    return (
      <div className="flex justify-start mb-4">
        <div className="bg-gray-800/80 rounded-2xl rounded-bl-md px-4 py-3 max-w-[300px]">
          <p className="text-purple-400 text-xs font-semibold mb-2">Chat Summary</p>
          <div className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
            {msg.text}
          </div>
        </div>
      </div>
    );
  }

  if (msg.type === 'voice') {
    return (
      <div className={`flex mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
        <VoiceMessage duration={msg.voiceDuration || '0:15'} isMe={isMe} />
      </div>
    );
  }

  return (
    <div className={`flex mb-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className="flex flex-col max-w-[300px]">
        {!isMe && chat.type !== 'personal' && (
          <span className="text-purple-400 text-xs font-medium mb-1 ml-1">{msg.sender}</span>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isMe
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md'
              : 'bg-gray-800 text-gray-200 rounded-bl-md'
          }`}
        >
          {msg.text}
        </div>
        {msg.reactions && msg.reactions.length > 0 && (
          <div className="flex items-center gap-1 mt-1 ml-1">
            {msg.reactions.map((r, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 bg-gray-800 rounded-full text-xs flex items-center gap-0.5"
              >
                <span>{r.emoji}</span>
                <span className="text-gray-400 text-[10px]">{r.count}</span>
              </span>
            ))}
          </div>
        )}
        <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end mr-1' : 'justify-start ml-1'}`}>
          <span className="text-gray-500 text-[10px]">{msg.time}</span>
          {isMe && <CheckCheck size={12} className="text-purple-400" />}
        </div>
      </div>
    </div>
  );
}

export default function ChatDetail({ chat, onBack }: ChatDetailProps) {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const isBot = chat.type === 'bot';

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header */}
      <div className="shrink-0 pt-12 pb-3 px-4 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={22} />
            </button>
            <div className="relative">
              {chat.avatar ? (
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}&background=random&color=fff`;
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{chat.name[0]}</span>
                </div>
              )}
              {chat.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
              )}
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">{chat.name}</h2>
              {chat.type === 'group' && (
                <p className="text-gray-500 text-xs">12 members, 3 online</p>
              )}
              {chat.type === 'bot' && <p className="text-gray-500 text-xs">Online</p>}
              {chat.type === 'personal' && chat.online && (
                <p className="text-gray-500 text-xs">Online</p>
              )}
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-gray-400">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {isBot && (
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="11" r="1" fill="#60a5fa" />
                <circle cx="12" cy="11" r="1" fill="#a78bfa" />
                <circle cx="15" cy="11" r="1" fill="#f472b6" />
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  stroke="url(#grad2)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="grad2" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6" />
                    <stop offset="0.5" stopColor="#a855f7" />
                    <stop offset="1" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        )}

        {chat.messages?.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} chat={chat} />
        ))}
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 py-3 bg-black/80 backdrop-blur-xl border-t border-white/5">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-300">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 flex items-center bg-gray-900 rounded-full px-4 py-2.5 border border-white/5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message"
              className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
            />
            <button className="text-gray-500 hover:text-gray-300 ml-2">
              <Smile size={20} />
            </button>
          </div>
          <button className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
            {inputValue.trim() ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            ) : (
              <Mic size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
