import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LogOut, 
  GraduationCap, 
  Bell, 
  Menu,
  X,
  User as UserIcon
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'Nouveau message de M. Diop', time: '5 min' },
    { id: 2, text: 'Devoir à rendre pour le cours d\'anglais', time: '1 heure' },
    { id: 3, text: 'Réunion des parents prévue', time: '2 heures' }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-all">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                EduTrack
              </span>
            </Link>
          </div>

          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="text-white p-2 rounded-full hover:bg-white/10 transition-colors relative"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 transform translate-x-1/2 -translate-y-1/2"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                    {notifications.map(notification => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm text-gray-900">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">Il y a {notification.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-1.5 rounded-full">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm text-white font-medium">
                  {user.name}
                </span>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          )}

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && user && (
        <div className="md:hidden bg-white/5 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-white/10 p-1.5 rounded-full">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}