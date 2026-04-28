import Header from '../components/Header';
import { User, Mail, Globe, MapPin, Camera, Shield, Bell, Palette, Key, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function UserProfilePage() {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header 
        title="Digital Atelier" 
        tabs={['Dashboard', 'Templates', 'Analytics']} 
        activeTab="" 
      />
      
      <div className="flex-1 p-8 overflow-y-auto max-w-6xl mx-auto w-full pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-sm text-gray-500">Manage your personal information, security, and preferences.</p>
        </div>

        <div className="flex gap-8">
          {/* Left Navigation */}
          <div className="w-56 shrink-0">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
                    activeSection === section.id
                      ? 'bg-primary text-white shadow-sm shadow-primary/25'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Cover Banner */}
              <div className="h-32 bg-gradient-to-r from-primary via-purple-500 to-pink-500 relative">
                <button className="absolute bottom-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5">
                  <Camera className="w-3 h-3" />
                  Change Cover
                </button>
              </div>

              <div className="px-8 pb-8">
                {/* Avatar */}
                <div className="relative -mt-12 mb-6 flex items-end justify-between">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-blue-100 border-4 border-white shadow-lg flex items-center justify-center text-blue-700 text-2xl font-bold">
                      HR
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="px-5 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg text-sm transition-colors shadow-sm">
                    Save Changes
                  </button>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Het Rathod"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Username</label>
                    <input
                      type="text"
                      defaultValue="@het510"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> Email Address</span>
                    </label>
                    <input
                      type="email"
                      defaultValue="hetrathod49@gmail.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> Website</span>
                    </label>
                    <input
                      type="url"
                      defaultValue="https://het510.github.io"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Location</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="Gandhinagar, Gujarat, India"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Bio</label>
                    <textarea
                      rows={3}
                      defaultValue="Creative developer and digital artisan. Building beautiful web experiences with modern technologies."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Plan & Usage Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-bold text-gray-900 mb-6">Current Plan</h3>
              <div className="flex items-center justify-between p-5 bg-gradient-to-r from-primary/5 to-purple-50 rounded-xl border border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Key className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      Pro Plan
                      <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full uppercase">Active</span>
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">Unlimited projects, priority support, and all premium features</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  Manage Plan <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Usage Stats */}
              <div className="grid grid-cols-3 gap-6 mt-6">
                {[
                  { label: 'Projects', used: 8, total: '∞', percentage: 15 },
                  { label: 'Storage', used: '2.4 GB', total: '50 GB', percentage: 5 },
                  { label: 'Bandwidth', used: '12 GB', total: '100 GB', percentage: 12 },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</span>
                      <span className="text-xs text-gray-400">{stat.used} / {stat.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${stat.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-bold text-gray-900 mb-6">Connected Accounts</h3>
              <div className="space-y-4">
                {[
                  { name: 'GitHub', status: 'Connected', username: '@Het510', connected: true },
                  { name: 'Google', status: 'Connected', username: 'hetrathod49@gmail.com', connected: true },
                  { name: 'Figma', status: 'Not connected', username: '', connected: false },
                ].map((account) => (
                  <div key={account.name} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                        account.connected ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {account.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{account.name}</p>
                        <p className="text-xs text-gray-500">{account.connected ? account.username : account.status}</p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      account.connected
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}>
                      {account.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
