import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Shield,
  Bell,
  MessageCircle,
  Database,
  Smartphone,
  Palette,
  Globe,
  Info,
  ChevronRight,
  Plus,
  ArrowLeft,
  Lock,
  Eye,
  SmartphoneNfc,
  HardDrive,
  Wifi,
  Moon,
  Sun
} from 'lucide-react';

type ViewType = 
  | 'main' 
  | 'account' 
  | 'privacy' 
  | 'notifications' 
  | 'chats' 
  | 'data' 
  | 'devices' 
  | 'appearance' 
  | 'language' 
  | 'about';

const settingsItems = [
  { icon: User, label: 'Account', id: 'account', hasArrow: true },
  { icon: Shield, label: 'Privacy & Security', id: 'privacy', hasArrow: true },
  { icon: Bell, label: 'Notifications', id: 'notifications', hasArrow: true },
  { icon: MessageCircle, label: 'Chats', id: 'chats', hasArrow: true },
  { icon: Database, label: 'Data and Storage', id: 'data', hasArrow: true },
  { icon: Smartphone, label: 'Devices', id: 'devices', hasArrow: true },
  { icon: Palette, label: 'Appearance', id: 'appearance', hasArrow: true },
  { icon: Globe, label: 'Language', id: 'language', value: 'English', hasArrow: true },
  { icon: Info, label: 'About LumoChat', id: 'about', hasArrow: true },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-purple-500' : 'bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

function SettingItem({ 
  icon: Icon, label, value, onClick, hasArrow = true 
}: { 
  icon?: any; label: string; value?: string; onClick: () => void; hasArrow?: boolean 
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-white/5 transition-colors text-left"
    >
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
          <Icon size={18} />
        </div>
      )}
      <span className="flex-1 text-white text-sm font-medium">{label}</span>
      {value && <span className="text-gray-500 text-sm">{value}</span>}
      {hasArrow && <ChevronRight size={16} className="text-gray-600" />}
    </button>
  );
}

function SettingSwitch({ 
  icon: Icon, label, description, defaultChecked = false 
}: { 
  icon?: any; label: string; description?: string; defaultChecked?: boolean 
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors">
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
          <Icon size={18} />
        </div>
      )}
      <div className="flex-1">
        <div className="text-white text-sm font-medium">{label}</div>
        {description && <div className="text-gray-500 text-xs mt-0.5">{description}</div>}
      </div>
      <Toggle checked={checked} onChange={() => setChecked(!checked)} />
    </div>
  );
}

// --- Sub Views ---

function PrivacyView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center gap-4 px-4 pt-12 pb-4 border-b border-white/5 shrink-0 bg-black/80 backdrop-blur-xl">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Privacy & Security</h1>
      </div>
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="mt-4 mb-2 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Security</div>
        <div className="bg-gray-900/50 mx-3 rounded-2xl overflow-hidden border border-white/5">
          <SettingItem icon={Lock} label="Passcode Lock" value="Off" onClick={() => {}} />
          <div className="h-px bg-white/5 ml-16" />
          <SettingItem icon={Shield} label="Two-Step Verification" value="On" onClick={() => {}} />
          <div className="h-px bg-white/5 ml-16" />
          <SettingItem icon={SmartphoneNfc} label="Active Sessions" value="3 Devices" onClick={() => {}} />
        </div>

        <div className="mt-6 mb-2 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Privacy</div>
        <div className="bg-gray-900/50 mx-3 rounded-2xl overflow-hidden border border-white/5">
          <SettingItem icon={Eye} label="Last Seen & Online" value="Nobody" onClick={() => {}} />
          <div className="h-px bg-white/5 ml-16" />
          <SettingItem icon={User} label="Profile Photo" value="My Contacts" onClick={() => {}} />
          <div className="h-px bg-white/5 ml-16" />
          <SettingItem icon={MessageCircle} label="Forwarded Messages" value="Everybody" onClick={() => {}} />
          <div className="h-px bg-white/5 ml-16" />
          <SettingItem icon={Bell} label="Calls" value="My Contacts" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

function NotificationsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center gap-4 px-4 pt-12 pb-4 border-b border-white/5 shrink-0 bg-black/80 backdrop-blur-xl">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Notifications</h1>
      </div>
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="mt-4 mb-2 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Message Notifications</div>
        <div className="bg-gray-900/50 mx-3 rounded-2xl overflow-hidden border border-white/5">
          <SettingSwitch label="Private Chats" description="Notifications from individuals" defaultChecked={true} />
          <div className="h-px bg-white/5 mx-4" />
          <SettingSwitch label="Groups" description="Notifications from group chats" defaultChecked={true} />
          <div className="h-px bg-white/5 mx-4" />
          <SettingSwitch label="Channels" description="Notifications from channels" defaultChecked={false} />
        </div>

        <div className="mt-6 mb-2 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">In-App Notifications</div>
        <div className="bg-gray-900/50 mx-3 rounded-2xl overflow-hidden border border-white/5">
          <SettingSwitch label="In-App Sounds" defaultChecked={true} />
          <div className="h-px bg-white/5 mx-4" />
          <SettingSwitch label="In-App Vibrate" defaultChecked={false} />
          <div className="h-px bg-white/5 mx-4" />
          <SettingSwitch label="In-App Preview" defaultChecked={true} />
        </div>
        
        <div className="mt-6 mx-3">
          <button className="w-full py-3 bg-gray-900/50 hover:bg-gray-800 rounded-2xl text-red-400 text-sm font-medium border border-white/5 transition-colors">
            Reset All Notifications
          </button>
        </div>
      </div>
    </div>
  );
}

function DataView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center gap-4 px-4 pt-12 pb-4 border-b border-white/5 shrink-0 bg-black/80 backdrop-blur-xl">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Data & Storage</h1>
      </div>
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="mt-4 mx-3 p-4 bg-gray-900/50 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <HardDrive size={20} className="text-purple-400" />
              <span className="text-white text-sm font-medium">Storage Usage</span>
            </div>
            <span className="text-gray-400 text-sm">2.4 GB</span>
          </div>
          <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden flex">
            <div className="bg-purple-500 w-[50%]" title="Media"></div>
            <div className="bg-blue-500 w-[20%]" title="Documents"></div>
            <div className="bg-green-500 w-[10%]" title="Other"></div>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500" /> Media</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Files</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /> Other</div>
          </div>
        </div>

        <div className="mt-6 mb-2 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Automatic Media Download</div>
        <div className="bg-gray-900/50 mx-3 rounded-2xl overflow-hidden border border-white/5">
          <SettingSwitch icon={Wifi} label="When Using Cellular" description="Photos, Audio" defaultChecked={true} />
          <div className="h-px bg-white/5 ml-16" />
          <SettingSwitch icon={Wifi} label="When Connected to Wi-Fi" description="Photos, Videos, Files" defaultChecked={true} />
          <div className="h-px bg-white/5 ml-16" />
          <SettingSwitch icon={Wifi} label="When Roaming" description="No Media" defaultChecked={false} />
        </div>
      </div>
    </div>
  );
}

function AppearanceView({ onBack }: { onBack: () => void }) {
  const colors = [
    { id: 'purple', bg: 'bg-purple-500' },
    { id: 'blue', bg: 'bg-blue-500' },
    { id: 'green', bg: 'bg-green-500' },
    { id: 'pink', bg: 'bg-pink-500' },
    { id: 'orange', bg: 'bg-orange-500' },
  ];
  const [activeColor, setActiveColor] = useState('purple');
  const [theme, setTheme] = useState('dark');

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex items-center gap-4 px-4 pt-12 pb-4 border-b border-white/5 shrink-0 bg-black/80 backdrop-blur-xl">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Appearance</h1>
      </div>
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="mt-4 mb-2 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Theme</div>
        <div className="flex gap-4 px-4 mb-6">
          <button 
            onClick={() => setTheme('dark')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 bg-gray-900/50'}`}
          >
            <Moon size={24} className={`mx-auto mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-gray-400'}`} />
            <div className={`text-sm font-medium text-center ${theme === 'dark' ? 'text-purple-400' : 'text-gray-400'}`}>Dark</div>
          </button>
          <button 
            onClick={() => setTheme('light')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 bg-gray-900/50'}`}
          >
            <Sun size={24} className={`mx-auto mb-2 ${theme === 'light' ? 'text-purple-400' : 'text-gray-400'}`} />
            <div className={`text-sm font-medium text-center ${theme === 'light' ? 'text-purple-400' : 'text-gray-400'}`}>Light</div>
          </button>
        </div>

        <div className="mb-2 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Accent Color</div>
        <div className="bg-gray-900/50 mx-3 rounded-2xl p-4 border border-white/5 mb-6">
          <div className="flex items-center justify-between">
            {colors.map(color => (
              <button
                key={color.id}
                onClick={() => setActiveColor(color.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${color.bg} ${activeColor === color.id ? 'scale-110 ring-4 ring-white/20' : 'hover:scale-105'}`}
              >
                {activeColor === color.id && <div className="w-3 h-3 bg-white rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Chat Settings</div>
        <div className="bg-gray-900/50 mx-3 rounded-2xl overflow-hidden border border-white/5">
          <SettingItem label="Chat Background" onClick={() => {}} />
          <div className="h-px bg-white/5 mx-4" />
          <SettingItem label="Text Size" value="14pt" onClick={() => {}} />
          <div className="h-px bg-white/5 mx-4" />
          <SettingSwitch label="Animations" defaultChecked={true} />
        </div>
      </div>
    </div>
  );
}

// --- Main Settings Component ---

export default function Settings() {
  const [activeView, setActiveView] = useState<ViewType>('main');

  const handleBack = () => setActiveView('main');

  return (
    <div className="h-full bg-black relative overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        {activeView === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            <div className="shrink-0 pt-12 pb-4 px-4 bg-black/80 backdrop-blur-xl border-b border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-white">Settings</h1>
                <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full">
                  <Plus size={20} />
                </button>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?u=amirreza"
                    alt="AmirReza"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=AmirReza&background=random&color=fff';
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">AmirReza</h2>
                  <p className="text-gray-400 text-sm font-medium">+98 912 345 6789</p>
                  <p className="text-purple-400 text-xs mt-0.5">@amirreza_dev</p>
                </div>
              </div>
            </div>

            {/* Settings List */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <div className="bg-gray-900/50 rounded-2xl overflow-hidden border border-white/5">
                {settingsItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setActiveView(item.id as ViewType)}
                        className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-white/5 transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-400 shadow-inner border border-white/5">
                          <Icon size={18} />
                        </div>
                        <span className="flex-1 text-white text-sm font-medium">{item.label}</span>
                        {item.value && (
                          <span className="text-gray-500 text-sm">{item.value}</span>
                        )}
                        {item.hasArrow && (
                          <ChevronRight size={16} className="text-gray-600" />
                        )}
                      </button>
                      {index < settingsItems.length - 1 && (
                        <div className="h-px bg-white/5 ml-16" />
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 mb-6 flex flex-col items-center justify-center text-center">
                <h3 className="text-white font-bold text-lg mb-1">
                  <span className="text-purple-400">Lumo</span>Chat
                </h3>
                <p className="text-gray-500 text-xs">Version 1.0.0 (Build 42)</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'privacy' && (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <PrivacyView onBack={handleBack} />
          </motion.div>
        )}

        {activeView === 'notifications' && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <NotificationsView onBack={handleBack} />
          </motion.div>
        )}

        {activeView === 'data' && (
          <motion.div
            key="data"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <DataView onBack={handleBack} />
          </motion.div>
        )}

        {activeView === 'appearance' && (
          <motion.div
            key="appearance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <AppearanceView onBack={handleBack} />
          </motion.div>
        )}

        {/* Fallback for un-implemented views */}
        {['account', 'chats', 'devices', 'language', 'about'].includes(activeView) && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex flex-col h-full bg-black"
          >
            <div className="flex items-center gap-4 px-4 pt-12 pb-4 border-b border-white/5 shrink-0 bg-black/80 backdrop-blur-xl">
              <button onClick={handleBack} className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-lg font-bold text-white capitalize">{activeView}</h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center pb-20">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-500 mb-4">
                <Info size={32} />
              </div>
              <h2 className="text-white text-lg font-semibold mb-2">Coming Soon</h2>
              <p className="text-gray-500 text-sm">This section is under development.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
