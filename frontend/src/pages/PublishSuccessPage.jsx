import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { 
  CheckCircle2, Globe, ExternalLink, 
  Share2, BarChart3, Rocket, Copy, 
  ChevronLeft, Laptop
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export default function PublishSuccessPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success } = useNotification();
  const siteUrl = `atelier.studio/modern-living-${id?.slice(-4) || '24'}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(siteUrl);
    success('URL copied to clipboard!');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      <Header 
        title="Digital Atelier" 
        tabs={['Dashboard', 'Templates', 'Analytics']} 
        activeTab="" 
      />
      
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* Success Card Section */}
          <div className="bg-white rounded-[48px] shadow-2xl shadow-indigo-100/50 border border-indigo-50 overflow-hidden flex mb-12 relative group">
            {/* Left Content */}
            <div className="flex-1 p-16">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 shadow-sm">
                 <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">Your website is live!</h1>
              <p className="text-gray-500 font-medium mb-10 leading-relaxed max-w-sm">
                Your creative vision is now shared with the world. Your atelier is officially open for business.
              </p>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    readOnly 
                    value={siteUrl}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-700 focus:outline-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="absolute inset-y-0 right-4 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <button className="w-full bg-indigo-600 text-white py-5 rounded-[24px] font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                   Visit Website
                </button>

                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline mt-4"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>

            {/* Right Mockup */}
            <div className="flex-1 bg-slate-900 relative flex items-center justify-center p-12 overflow-hidden">
               {/* Decorative Gradients */}
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
               <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

               <div className="relative z-10 w-full group-hover:scale-105 transition-transform duration-1000">
                  <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[300px] w-full shadow-2xl">
                     <div className="h-[26px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                     <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                     <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                     <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                     <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
                        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop" className="w-full h-full object-cover" />
                     </div>
                  </div>
                  {/* Laptop Base */}
                  <div className="relative mx-auto bg-gray-800 rounded-b-xl rounded-t-sm h-[18px] w-full mt-1"></div>
                  <div className="relative mx-auto bg-gray-900 rounded-b-xl h-[10px] w-full -mt-1 shadow-lg"></div>
               </div>

               {/* Pro Tip Overlay */}
               <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                  <p className="text-[8px] font-black text-indigo-300 uppercase tracking-widest mb-1">Pro Tip</p>
                  <p className="text-[10px] text-white/80 leading-relaxed font-medium">Connect your own custom domain in settings to build professional brand authority.</p>
               </div>
            </div>
          </div>

          {/* Bottom Grid Actions */}
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[32px] border border-indigo-50 shadow-sm flex items-center gap-6 group cursor-pointer hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-sm">Share Launch</h3>
                <p className="text-[10px] text-gray-400 font-bold mt-1">Announce your new site on social media channels.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-indigo-50 shadow-sm flex items-center gap-6 group cursor-pointer hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-sm">Track Traffic</h3>
                <p className="text-[10px] text-gray-400 font-bold mt-1">Visit your analytics dashboard to see your visitors.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-indigo-50 shadow-sm flex items-center gap-6 group cursor-pointer hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-sm">SEO Boost</h3>
                <p className="text-[10px] text-gray-400 font-bold mt-1">Optimize your site metadata for better search ranking.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
