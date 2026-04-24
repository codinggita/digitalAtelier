import Header from '../components/Header';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Eye, MousePointerClick, TrendingUp, Globe, Clock } from 'lucide-react';

const data = [
  { name: 'Mon', visitors: 4000, pageViews: 2400 },
  { name: 'Tue', visitors: 3000, pageViews: 1398 },
  { name: 'Wed', visitors: 2000, pageViews: 9800 },
  { name: 'Thu', visitors: 2780, pageViews: 3908 },
  { name: 'Fri', visitors: 1890, pageViews: 4800 },
  { name: 'Sat', visitors: 2390, pageViews: 3800 },
  { name: 'Sun', visitors: 3490, pageViews: 4300 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header 
        title="My Online Boutique" 
        tabs={['Dashboard', 'Templates', 'Analytics']} 
        activeTab="Analytics" 
      />
      
      <div className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full pb-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
            <p className="text-sm text-gray-500">Track your website traffic, user behavior, and global reach.</p>
          </div>
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/20">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-4 gap-6 mb-8">
           {[
             { title: 'Total Visitors', value: '24,592', change: '+12.5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
             { title: 'Page Views', value: '89,431', change: '+24.1%', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
             { title: 'Bounce Rate', value: '42.3%', change: '-2.4%', icon: MousePointerClick, color: 'text-green-600', bg: 'bg-green-50' },
             { title: 'Avg Session', value: '3m 42s', change: '+1.2%', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
           ].map(stat => (
             <div key={stat.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-green-100 text-green-700'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
             </div>
           ))}
        </div>

        {/* Main Chart Area */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-900">Traffic Overview</h3>
             <div className="flex gap-4 text-sm font-medium">
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary"></div> Visitors</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-400"></div> Page Views</span>
             </div>
           </div>
           <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#4338ca" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#4338ca" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dx={-10} />
                 <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Area type="monotone" dataKey="visitors" stroke="#4338ca" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                 <Area type="monotone" dataKey="pageViews" stroke="#60a5fa" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
               <Globe className="w-5 h-5 text-gray-400" /> Top Countries
             </h3>
             <div className="space-y-4">
               {[
                 { name: 'United States', value: '45%', amount: '11,066' },
                 { name: 'United Kingdom', value: '15%', amount: '3,688' },
                 { name: 'Germany', value: '12%', amount: '2,951' },
                 { name: 'India', value: '8%', amount: '1,967' },
               ].map(country => (
                 <div key={country.name}>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-gray-700">{country.name}</span>
                     <span className="text-gray-500 font-medium">{country.amount}</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-2">
                     <div className="bg-primary h-2 rounded-full" style={{ width: country.value }}></div>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-gray-400" /> Top Traffic Sources
             </h3>
             <div className="space-y-4 text-sm">
               {[
                 { source: 'Direct', visitors: '12,490', percentage: '50.8%' },
                 { source: 'Organic Search (Google)', visitors: '6,204', percentage: '25.2%' },
                 { source: 'Social Media (Instagram)', visitors: '3,450', percentage: '14.0%' },
                 { source: 'Referral', visitors: '2,448', percentage: '10.0%' },
               ].map((item, i) => (
                 <div key={item.source} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                   <div className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">{i+1}</div>
                     <span className="font-medium text-gray-700">{item.source}</span>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="font-bold text-gray-900">{item.visitors}</span>
                     <span className="text-xs text-gray-500 w-12 text-right">{item.percentage}</span>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
