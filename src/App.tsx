import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import ChatList from './components/ChatList';
import ChatDetail from './components/ChatDetail';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';
import { Chat } from './data/chats';

type Screen = 'splash' | 'main';
type MainTab = 'chats' | 'calls' | 'rooms' | 'settings';

function CallsScreen() {
  return (
    <div className="flex flex-col h-full bg-black items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </div>
      <p className="text-gray-500 text-sm">No recent calls</p>
    </div>
  );
}

function RoomsScreen() {
  return (
    <div className="flex flex-col h-full bg-black items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <p className="text-gray-500 text-sm">No active rooms</p>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<MainTab>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleEnter = () => {
    setScreen('main');
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as MainTab);
    setSelectedChat(null);
  };

  return (
    <div className="h-screen w-full bg-black flex justify-center">
      <div className="w-full max-w-md h-full bg-black relative overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          {screen === 'splash' && (
            <motion.div
              key="splash"
              className="absolute inset-0"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <SplashScreen onEnter={handleEnter} />
            </motion.div>
          )}

          {screen === 'main' && (
            <motion.div
              key="main"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  {selectedChat ? (
                    <motion.div
                      key="chat-detail"
                      className="h-full"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      <ChatDetail chat={selectedChat} onBack={handleBack} />
                    </motion.div>
                  ) : activeTab === 'chats' ? (
                    <motion.div
                      key="chats"
                      className="h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ChatList onChatSelect={handleChatSelect} />
                    </motion.div>
                  ) : activeTab === 'calls' ? (
                    <motion.div
                      key="calls"
                      className="h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CallsScreen />
                    </motion.div>
                  ) : activeTab === 'rooms' ? (
                    <motion.div
                      key="rooms"
                      className="h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <RoomsScreen />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="settings"
                      className="h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Settings />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!selectedChat && (
                <BottomNav active={activeTab} onChange={handleTabChange} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
