import { MessageCircle, Phone, Users, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavProps {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  { id: 'chats', label: 'Chats', icon: MessageCircle },
  { id: 'calls', label: 'Calls', icon: Phone },
  { id: 'rooms', label: 'Rooms', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div className="shrink-0 h-20 bg-black/80 backdrop-blur-xl border-t border-white/5 px-4 pb-2">
      <div className="flex items-center justify-around h-full">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex flex-col items-center gap-1 py-2 px-4"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNav"
                  className="absolute -top-1 w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon
                  size={22}
                  className={`transition-colors ${
                    isActive ? 'text-purple-400' : 'text-gray-500'
                  }`}
                />
                {tab.id === 'chats' && isActive && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-purple-600 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    12
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? 'text-purple-400' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
