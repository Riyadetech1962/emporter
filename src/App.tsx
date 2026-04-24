import { Star, User, Home, PlusCircle, ArrowRight, X, Palette, Send, Clock, CreditCard, Search, MapPin, Camera, LogIn, Mail, Lock, ShieldCheck, CreditCard as CardIcon } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuItem { id: string; name: string; price: number; description: string; }
interface Review { userName: string; rating: number; comment: string; date: string; }
interface Restaurant { id: string; name: string; description: string; emoji: string; image?: string; status: 'open' | 'closed'; statusText: string; rating: number; menu: MenuItem[]; reviews: Review[]; location: string; }

const initialRestaurants: Restaurant[] = [
  { 
    id: 'casa-bella', 
    name: 'Casa Bella', 
    description: 'أرقى المطاعم الإيطالية في قلب قصر الشلالة، متخصصون في البيتزا والباستا بلمسة جزائرية.', 
    emoji: '🍕',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300',
    status: 'open', 
    statusText: 'مفتوح الآن', 
    rating: 4.9, 
    menu: [
      { id: 'cb1', name: 'بيتزا مارجريتا عائلية', price: 1200, description: 'صوص طماطم إيطالي، موزاريلا طبيعية' },
      { id: 'cb2', name: 'باستا الفريدو بالدجاج', price: 1400, description: 'نودلز مع صوص الكريمة والفطر' },
      { id: 'cb3', name: 'تيراميسو منزلي', price: 600, description: 'حلوى إيطالية كلاسيكية' }
    ], 
    reviews: [{ userName: 'أحمد علي', rating: 5, comment: 'أفضل بيتزا في المنطقة!', date: 'منذ يومين' }], 
    location: 'وسط المدينة - قصر الشلالة' 
  },
  { 
    id: 'hexos', 
    name: 'Hexos', 
    description: 'سيد المشويات واللحوم الطازجة، تجربة فريدة لمحبي الستيك والبورجر.', 
    emoji: '🥩', 
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300',
    status: 'open', 
    statusText: 'مفتوح الآن', 
    rating: 4.2, 
    menu: [
      { id: 'hx1', name: 'صحن ميكس جريل (شواية)', price: 2500, description: 'كباب، شيش كفتة، كبدة مشوية' },
      { id: 'hx2', name: 'بورجر هيكسوس دوبل', price: 950, description: 'قطعتين لحم 200غ، جبن، صوص خاص' },
      { id: 'hx3', name: 'ساندويتش شوارما لحم', price: 650, description: 'شوارما على الفحم مع سلاطة' }
    ], 
    reviews: [], 
    location: 'حي النور - مقابل المسجد' 
  },
  { 
    id: 'ketchen-food', 
    name: 'Kitchen Food', 
    description: 'طعم زمان بنكهة اليوم، أطباق تقليدية جزائرية 100% محيرة للفم.', 
    emoji: '🥘', 
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=300',
    status: 'open', 
    statusText: 'مفتوح الآن', 
    rating: 4.5, 
    menu: [
      { id: 'kf1', name: 'كسكس عاصمي باللحم', price: 1300, description: 'الطبق الوطني مع الخضر الطازجة' },
      { id: 'kf2', name: 'طاجين زيتون ملكي', price: 1100, description: 'دجاج محمر مع زيتون وصوص أبيض' },
      { id: 'kf3', name: 'سطلة محجوبة حارة', price: 450, description: 'أربع قطع محجوبة تقليدية' },
      { id: 'kf4', name: 'صحن قرنطيطة ساخن', price: 300, description: 'مع الكمون والهريسة' }
    ], 
    reviews: [], 
    location: 'حي الاستقلال - وسط المدينة' 
  },
  { 
    id: 'komair', 
    name: 'Komair', 
    description: 'رحلة إلى بلدان شرق آسيا، أفضل أنواع السوشي والرامن في المنطقة.', 
    emoji: '🍣', 
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=300',
    status: 'closed', 
    statusText: 'مغلق حالياً', 
    rating: 4.8, 
    menu: [
      { id: 'km1', name: 'بوكس سوشي (12 قطعة)', price: 2200, description: 'تشكيلة متنوعة من السالمون والكراب' },
      { id: 'km2', name: 'رامن ياباني بالدجاج', price: 1450, description: 'نودلز في مرق غني مع بيض مسلوق' }
    ], 
    reviews: [], 
    location: 'طريق المطار - قصر الشلالة' 
  },
];

const themes = [
  { name: 'Default', bg: 'bg-[#f5f5f0]', text: 'text-stone-900', accent: '#8B4513', glass: 'bg-white/60', border: 'border-stone-200' },
  { name: 'Night', bg: 'bg-stone-950', text: 'text-stone-100', accent: '#D4AF37', glass: 'bg-stone-900/60', border: 'border-stone-800' },
  { name: 'Forest', bg: 'bg-[#1a2e1a]', text: 'text-emerald-50', accent: '#4ade80', glass: 'bg-emerald-950/40', border: 'border-emerald-900' },
  { name: 'Midnight', bg: 'bg-slate-950', text: 'text-slate-100', accent: '#3b82f6', glass: 'bg-slate-900/60', border: 'border-slate-800' },
  { name: 'Rose', bg: 'bg-[#2d1b24]', text: 'text-rose-50', accent: '#f43f5e', glass: 'bg-rose-950/40', border: 'border-rose-900' },
  { name: 'Ocean', bg: 'bg-[#0f172a]', text: 'text-sky-50', accent: '#0ea5e9', glass: 'bg-sky-950/40', border: 'border-sky-900' },
  { name: 'Gold', bg: 'bg-[#1a1a1a]', text: 'text-yellow-100', accent: '#fbbf24', glass: 'bg-neutral-900/80', border: 'border-yellow-900/20' }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [themeIdx, setThemeIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews'>('menu');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [profileImage, setProfileImage] = useState<string | null>("https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300&auto=format&fit=crop");
  const [showPayment, setShowPayment] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('cash');
  const [checkoutData, setCheckoutData] = useState({ name: 'يحيا درويش', location: '', phone: '' });
  const [tempResMenu, setTempResMenu] = useState([{ name: '', price: '' }]);

  const theme = themes[themeIdx];
  const isDark = themeIdx !== 0;

  const addMenuItem = () => setTempResMenu([...tempResMenu, { name: '', price: '' }]);
  const updateTempMenuItem = (idx: number, field: 'name' | 'price', val: string) => {
    const next = [...tempResMenu];
    next[idx][field] = val;
    setTempResMenu(next);
  };

  const updateCart = (itemId: string, delta: number) => {
    setCart(prev => {
      const current = prev[itemId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const calculateTotal = () => {
    if (!selectedRestaurant) return 0;
    return selectedRestaurant.menu.reduce((acc, item) => {
      return acc + (item.price * (cart[item.id] || 0));
    }, 0);
  };

  const hasItems = Object.keys(cart).length > 0;

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen bg-stone-950 flex flex-col items-center justify-center p-6 relative overflow-hidden`} dir="rtl">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-20 blur-sm" />
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-md relative z-10 space-y-10 text-center"
        >
          <div className="space-y-2">
            <h1 className="text-7xl font-black italic text-yellow-500 tracking-tighter uppercase font-sans drop-shadow-[0_10px_30px_rgba(234,179,8,0.3)]">emporter</h1>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[60px] border border-white/10 space-y-8 shadow-2xl">
             <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                  <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pr-14 pl-6 text-white text-lg focus:ring-4 focus:ring-yellow-500/20 focus:outline-none transition-all placeholder:text-stone-600" />
                </div>
                <div className="relative">
                  <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                  <input type="password" placeholder="كلمة المرور" className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pr-14 pl-6 text-white text-lg focus:ring-4 focus:ring-yellow-500/20 focus:outline-none transition-all placeholder:text-stone-600" />
                </div>
             </div>

             <button 
               onClick={() => setIsLoggedIn(true)} 
               className="w-full bg-yellow-500 hover:bg-yellow-400 text-stone-950 font-bold py-5 rounded-3xl text-xl transition-all shadow-[0_10px_40px_rgba(234,179,8,0.3)] active:scale-95 flex items-center justify-center gap-3"
             >
                <LogIn className="w-6 h-6" />
                تسجيل الدخول
             </button>

             <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] bg-white/10 flex-grow" />
                <span className="text-stone-500 text-sm">أو عبر</span>
                <div className="h-[1px] bg-white/10 flex-grow" />
             </div>

             <div className="flex gap-4">
                <button className="flex-1 bg-white/5 border border-white/10 py-4 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all">
                  <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale opacity-50" />
                </button>
                <button className="flex-1 bg-white/5 border border-white/10 py-4 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all">
                   <div className="w-5 h-5 bg-stone-500 rounded-full" /> {/* Placeholder for Apple */}
                </button>
             </div>

             <p className="text-stone-500 text-sm">ليس لديك حساب؟ <span className="text-yellow-500 cursor-pointer hover:underline">أنشئ حساباً جديداً</span></p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 relative overflow-hidden ${theme.bg} ${theme.text}`} dir="rtl">
      <div className="max-w-5xl mx-auto my-4 lg:my-8 flex flex-col min-h-[92vh] relative z-10 p-4 md:p-0">
        
        <header className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              {(selectedRestaurant || activeNav === 'profile') && (
                <motion.button key="back-btn" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onClick={() => { setSelectedRestaurant(null); setActiveNav('home'); }} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${theme.glass} ${theme.border}`}>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
            <h1 className="text-3xl md:text-4xl font-serif font-bold italic">{activeNav === 'profile' ? 'حسابي' : (selectedRestaurant ? selectedRestaurant.name : 'emporter')}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => setThemeIdx((t) => (t + 1) % themes.length)} className={`p-3 rounded-full border transition-all ${theme.glass} ${theme.border} text-[#8B4513] shadow-md`} title="تغيير اللون">
              <Palette className="w-5 h-5" />
            </button>
            {activeNav !== 'profile' && (
              <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 bg-[#8B4513] text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:brightness-110 transition-all">
                <PlusCircle className="w-5 h-5" />
                <span className="hidden sm:inline">أضف مطعمك</span>
              </button>
            )}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeNav === 'profile' ? (
            <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="flex-grow max-w-3xl mx-auto w-full space-y-8 pb-20">
              <div className={`p-10 rounded-[40px] border flex flex-col sm:flex-row gap-8 items-center ${theme.glass} ${theme.border}`}>
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-[#8B4513] flex items-center justify-center text-white text-4xl font-bold font-serif shadow-xl border-4 border-white/20 transition-transform group-hover:scale-105">
                    {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : "يحيا"}
                  </div>
                  <label className="absolute bottom-0 left-0 p-2 bg-white rounded-full shadow-lg border border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors">
                    <Camera className="w-5 h-5 text-[#8B4513]" />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setProfileImage(URL.createObjectURL(file));
                    }} />
                  </label>
                </div>
                <div className="text-center sm:text-right">
                  <h2 className="text-3xl font-serif font-bold italic mb-1">يحيا درويش</h2>
                  <p className="opacity-60 text-sm mb-4">عضو ذهبي • قصر الشلالة</p>
                  <div className="flex gap-4">
                    <div className="px-5 py-3 rounded-2xl bg-[#8B4513]/10 border border-[#8B4513]/20"><span className="block text-[10px] uppercase opacity-50 font-bold mb-1">إجمالي الطلبات</span><span className="font-bold text-2xl">14</span></div>
                    <div className="px-5 py-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/20"><span className="block text-[10px] uppercase opacity-50 font-bold mb-1">التقييمات</span><span className="font-bold text-2xl">8</span></div>
                  </div>
                </div>
              </div>

              {/* Payment Section - Edahabia */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 font-serif italic"><CreditCard className="w-5 h-5" /> المحفظة والدفع</h3>
                <div 
                   onClick={() => setShowPayment(true)}
                   className={`p-8 rounded-[40px] border cursor-pointer group relative overflow-hidden flex flex-col gap-6 ${theme.glass} ${theme.border} hover:shadow-2xl transition-all`}
                >
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="flex justify-between items-start">
                      <div className="bg-yellow-500/20 p-3 rounded-2xl">
                         <CardIcon className="w-8 h-8 text-yellow-600" />
                      </div>
                      <span className="text-[10px] font-bold uppercase p-2 bg-yellow-500/10 text-yellow-600 rounded-lg">البطاقة الذهبية</span>
                   </div>
                   <div>
                      <p className="text-stone-500 text-xs mb-1">سدد فواتيرك بلمسة</p>
                      <h4 className="text-2xl font-serif font-bold italic">ادفع عبر البطاقة الذهبية</h4>
                   </div>
                   <div className="flex justify-between items-center opacity-40">
                      <span className="text-sm">**** **** **** 8842</span>
                      <ShieldCheck className="w-5 h-5" />
                   </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 font-serif italic"><Send className="w-5 h-5" /> تعليقاتي الأخيرة</h3>
                <div className="space-y-4">
                  {[
                    { res: 'Casa Bella', rating: 5, comment: 'أفضل بيتزا في المنطقة بلا منازع، الخدمة سريعة جداً.', date: 'أمس' },
                    { res: 'Hexos', rating: 4, comment: 'اللحم طري والتتبيلة رائعة، أنصح به لمحب المشويات.', date: 'قبل 3 أيام' }
                  ].map((rev, i) => (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className={`p-6 rounded-[28px] border ${theme.glass} ${theme.border}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold font-serif italic text-lg">{rev.res}</span>
                        <div className="flex gap-0.5 text-yellow-500">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className={`w-3 h-3 ${idx < rev.rating ? 'fill-current' : 'opacity-20'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="opacity-70 italic text-sm mb-3">"{rev.comment}"</p>
                      <span className="text-[10px] opacity-30 uppercase font-bold">{rev.date}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : !selectedRestaurant ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col">
              <div className="px-6 md:px-10 mb-8 w-full max-w-2xl mx-auto text-center">
                <div className="relative">
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                  <input type="text" placeholder="ابحث عن مطعمك..." className={`w-full border rounded-full py-5 pr-14 pl-6 focus:ring-4 focus:ring-[#8B4513]/10 font-serif italic ${theme.glass} ${theme.border}`} />
                </div>
              </div>
              <main className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 pt-0">
                {initialRestaurants.map((r) => (
                  <motion.div layoutId={r.id} key={r.id} onClick={() => setSelectedRestaurant(r)} className={`group border p-7 rounded-[40px] flex gap-6 transition-all hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${theme.glass} ${theme.border}`}>
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[32px] overflow-hidden bg-stone-100 flex items-center justify-center shadow-inner group-hover:rotate-6 transition-all">
                      {r.image ? <img src={r.image} className="w-full h-full object-cover" /> : <span className="text-4xl">{r.emoji}</span>}
                    </div>
                    <div className="flex flex-col justify-center flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xl md:text-2xl font-bold font-serif italic group-hover:text-[#8B4513] transition-colors">{r.name}</h3>
                        <div className="flex items-center gap-1 text-[#D4AF37] font-bold"><Star className="w-4 h-4 fill-current" /><span>{r.rating}</span></div>
                      </div>
                      <p className="text-sm opacity-50 line-clamp-2 italic mb-4 leading-relaxed">{r.description}</p>
                      <div className="flex justify-between items-center opacity-60">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${r.status === 'open' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>{r.statusText}</span>
                        <span className="text-[10px] font-bold flex items-center gap-1"><Clock className="w-3" /> 25 دقيقة</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </main>
            </motion.div>
          ) : (
            <motion.main key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="p-6 md:p-10 flex-grow">
              <div className="max-w-3xl mx-auto space-y-12">
                <motion.div layoutId={selectedRestaurant.id} className={`flex flex-col sm:flex-row items-center gap-10 rounded-[56px] p-10 border ${theme.glass} ${theme.border}`}>
                  <div className={`w-40 h-40 rounded-[40px] overflow-hidden flex items-center justify-center shadow-2xl ${isDark ? 'bg-white/5' : 'bg-white/40'}`}>
                    {selectedRestaurant.image ? <img src={selectedRestaurant.image} className="w-full h-full object-cover" /> : <span className="text-7xl">{selectedRestaurant.emoji}</span>}
                  </div>
                  <div className="text-center sm:text-right flex-grow">
                     <h2 className="text-4xl md:text-5xl font-serif font-bold italic mb-4">{selectedRestaurant.name}</h2>
                     <p className="opacity-70 italic mb-6 leading-relaxed text-lg">{selectedRestaurant.description}</p>
                     <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 opacity-80">
                        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-2xl"><Star className="w-6 h-6 fill-current" /><span>{selectedRestaurant.rating}</span></div>
                        <span className="hidden sm:inline opacity-20 text-3xl">|</span>
                        <span className="text-lg font-serif italic">{selectedRestaurant.reviews.length} تقييم</span>
                        <span className="hidden sm:inline opacity-20 text-3xl">|</span>
                        <div className="flex items-center gap-1 text-sm"><MapPin className="w-4 h-4 text-[#8B4513]" /> {selectedRestaurant.location}</div>
                     </div>
                  </div>
                </motion.div>

                <div className="flex gap-12 border-b border-white/10 px-8 font-serif font-bold italic text-xl">
                  {['menu', 'reviews'].map(t => (
                    <button key={t} onClick={() => setActiveTab(t as any)} className={`pb-6 transition-all relative ${activeTab === t ? 'text-[#8B4513]' : 'text-stone-400'}`}>
                      {t === 'menu' ? 'قائمة الطعام' : 'التعليقات'}
                      {activeTab === t && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#8B4513] rounded-full" />}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'menu' ? (
                    <motion.div key="menu" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                      {selectedRestaurant.menu.map((m, i) => (
                        <div key={m.id} className={`p-8 rounded-[32px] border flex flex-col sm:flex-row justify-between items-center gap-6 transition-all hover:bg-stone-500/5 ${theme.glass} ${theme.border}`}>
                          <div className="space-y-1 text-center sm:text-right flex-grow">
                            <span className="font-bold text-2xl block italic font-serif">{m.name}</span>
                            <span className="opacity-50 text-base line-clamp-1">{m.description}</span>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 bg-stone-500/10 p-2 rounded-2xl">
                               <button onClick={() => updateCart(m.id, -1)} className="w-10 h-10 rounded-xl bg-white border border-stone-100 flex items-center justify-center font-bold hover:bg-stone-50 active:scale-95 transition-all">-</button>
                               <span className="w-6 text-center font-bold text-lg font-mono">{cart[m.id] || 0}</span>
                               <button onClick={() => updateCart(m.id, 1)} className="w-10 h-10 rounded-xl bg-[#8B4513] text-white flex items-center justify-center font-bold hover:brightness-110 active:scale-95 transition-all">+</button>
                            </div>
                            <div className="text-left leading-none flex flex-col items-end min-w-[100px]">
                              <span className="text-2xl font-bold text-[#8B4513] font-serif italic block whitespace-nowrap">{m.price} دج</span>
                              <button 
                                onClick={() => { if (cart[m.id] > 0) setShowPayment(true); else updateCart(m.id, 1); }} 
                                className="text-[10px] font-bold bg-[#8B4513]/10 text-[#8B4513] px-5 py-2.5 rounded-xl hover:bg-[#8B4513] hover:text-white transition-all uppercase tracking-widest mt-2"
                              >
                                {cart[m.id] > 0 ? 'اشتري الآن' : 'إضافة للسلة'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {hasItems && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-40"
                        >
                          <button 
                            onClick={() => setShowPayment(true)}
                            className="w-full bg-[#8B4513] text-white py-6 rounded-[30px] font-bold shadow-[0_20px_50px_rgba(139,69,19,0.4)] flex justify-between items-center px-10 hover:scale-[1.02] transition-all"
                          >
                            <span className="text-xl italic font-serif">إتمام الطلب</span>
                            <div className="flex items-center gap-3">
                               <span className="opacity-60 text-sm">الإجمالي:</span>
                               <span className="text-2xl italic font-serif">{calculateTotal()} دج</span>
                            </div>
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div key="reviews" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                      <div className={`p-8 rounded-[40px] border ${theme.glass} ${theme.border}`}>
                        <div className="flex gap-3 mb-6">{[1,2,3,4,5].map(n => <button key={n} onClick={() => setNewReview({ ...newReview, rating: n })}><Star className={`w-8 h-8 ${n <= newReview.rating ? 'text-yellow-500 fill-current' : 'opacity-20'}`} /></button>)}</div>
                        <div className="relative">
                          <textarea rows={3} value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} placeholder="اكتب تجربتك بصراحة..." className={`w-full rounded-[28px] p-6 text-lg focus:ring-4 focus:ring-[#8B4513]/10 border ${isDark ? 'bg-stone-950 border-stone-800' : 'bg-white border-stone-100'}`} />
                          <button className="absolute left-4 bottom-4 p-4 bg-[#8B4513] text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"><Send className="w-5 h-5" /></button>
                        </div>
                      </div>
                      <div className="space-y-8">
                        {selectedRestaurant.reviews.map((v, i) => (
                          <div key={i} className="flex gap-6 items-start">
                            <div className="w-16 h-16 rounded-3xl bg-[#8B4513]/10 flex items-center justify-center font-bold text-[#8B4513] text-2xl">{v.userName[0]}</div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-center mb-1"><span className="font-bold text-xl italic font-serif">{v.userName}</span><span className="text-[11px] opacity-30 mt-1 uppercase tracking-tighter">{v.date}</span></div>
                              <div className="flex gap-1 text-yellow-500 mb-2">{Array.from({length: 5}).map((_, idx) => <Star key={idx} className={`w-4 h-4 ${idx < v.rating ? 'fill-current' : 'opacity-20'}`} />)}</div>
                              <p className="opacity-70 italic leading-relaxed text-lg">{v.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.main>
          )}
        </AnimatePresence>

        <footer className={`mt-auto p-6 md:p-8 flex justify-center gap-20 border-t rounded-b-[40px] items-center ${theme.glass} ${theme.border}`}>
          <NavItem icon={<Home className="w-7 h-7" />} label="الرئيسية" active={activeNav === 'home'} onClick={() => { setActiveNav('home'); setSelectedRestaurant(null); }} />
          <NavItem icon={<User className="w-7 h-7" />} label="حسابي" active={activeNav === 'profile'} onClick={() => setActiveNav('profile')} />
        </footer>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-stone-950/90 backdrop-blur-2xl" onClick={() => setShowAddForm(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[56px] p-10 relative z-20 border shadow-2xl ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}
            >
              <button onClick={() => setShowAddForm(false)} className="absolute top-8 left-8 opacity-30 hover:opacity-100 transition-opacity z-30"><X /></button>
              <h2 className="text-3xl font-serif font-bold italic mb-8">تسجيل منشأة جديدة</h2>
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <Input label="اسم المنشأة" placeholder="مطعم الصفا والمروة" isDark={isDark} />
                <Input label="الموقع" placeholder="قصر الشلالة - الشارع الرئيسي" isDark={isDark} />
                
                <div className="space-y-2 px-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-2">إضافة صورة المطعم</label>
                   <div className={`w-full h-32 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-stone-500/5 transition-all ${isDark ? 'border-stone-700' : 'border-stone-200'}`}>
                      <Camera className="w-8 h-8 opacity-30" />
                      <span className="text-xs opacity-40">اضغط لرفع الشعار أو صورة الواجهة</span>
                   </div>
                </div>

                <div className="space-y-4 px-2">
                   <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">قائمة الطعام</label>
                      <button onClick={addMenuItem} className="text-[10px] font-bold bg-[#8B4513] text-white px-3 py-1.5 rounded-lg hover:brightness-110 active:scale-95 transition-all">+ إضافة طبق</button>
                   </div>
                   <div className="space-y-3">
                      {tempResMenu.map((item, i) => (
                        <div key={i} className="flex gap-2">
                           <input 
                             type="text" 
                             value={item.name} 
                             onChange={(e) => updateTempMenuItem(i, 'name', e.target.value)} 
                             placeholder="اسم الطبق" 
                             className={`flex-grow rounded-xl p-3 text-sm border ${isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-100'}`} 
                           />
                           <input 
                             type="text" 
                             value={item.price} 
                             onChange={(e) => updateTempMenuItem(i, 'price', e.target.value)} 
                             placeholder="السعر (دج)" 
                             className={`w-24 rounded-xl p-3 text-sm border text-center ${isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-100'}`} 
                           />
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-2 px-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-2">وصف قصير</label>
                   <textarea rows={3} placeholder="ما الذي يميز مطعمك؟..." className={`w-full rounded-2xl p-4 border focus:ring-4 focus:ring-[#8B4513]/10 ${isDark ? 'bg-stone-800 border-stone-700 text-white' : 'bg-stone-50 border-stone-100'}`} />
                </div>
                <button onClick={() => { alert('تم إرسال طلبك للمراجعة. سنتصل بك قريباً!'); setShowAddForm(false); }} className="w-full bg-[#8B4513] text-white py-5 rounded-2xl font-bold shadow-2xl text-lg tracking-widest uppercase mt-4">إرسال طلب الانضمام</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-stone-950/90 backdrop-blur-2xl" onClick={() => setShowPayment(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 100 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 100 }} 
              className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[56px] p-10 relative z-20 border shadow-2xl ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}
            >
              <button onClick={() => setShowPayment(false)} className="absolute top-8 left-8 opacity-30 hover:opacity-100 transition-opacity z-30"><X /></button>
              
              <div className="text-center mb-10">
                 <div className="w-24 h-24 bg-yellow-500 rounded-[35px] mx-auto flex items-center justify-center mb-4 shadow-xl rotate-3">
                    <CardIcon className="w-12 h-12 text-stone-950 -rotate-3" />
                 </div>
                 <h2 className="text-4xl font-serif font-bold italic mb-2">إتمام الطلب</h2>
                 <p className="text-stone-500 text-lg">الرجاء إدخال تفاصيل التوصيل</p>
              </div>

              <div className="space-y-8">
                 {/* Item Summary */}
                 <div className="bg-stone-500/5 rounded-3xl p-6 space-y-3">
                    <h4 className="text-sm font-bold opacity-40 uppercase tracking-widest px-2 mb-2">ملخص السلة</h4>
                    {selectedRestaurant && selectedRestaurant.menu.filter(m => cart[m.id] > 0).map(m => (
                      <div key={m.id} className="flex justify-between items-center text-lg italic font-serif">
                         <span>{m.name} (x{cart[m.id]})</span>
                         <span className="font-bold">{m.price * cart[m.id]} دج</span>
                      </div>
                    ))}
                    <div className="h-px bg-stone-200 my-4" />
                    <div className="flex justify-between items-center text-2xl font-bold italic font-serif text-[#8B4513]">
                       <span>الإجمالي</span>
                       <span>{calculateTotal()} دج</span>
                    </div>
                 </div>

                 {/* Delivery Info */}
                 <div className="space-y-5">
                    <Input label="الاسم الكامل" value={checkoutData.name} onChange={(e: any) => setCheckoutData({...checkoutData, name: e.target.value})} placeholder="الاسم الظاهر على الحساب" isDark={isDark} />
                    <Input label="عنوان التوصيل" value={checkoutData.location} onChange={(e: any) => setCheckoutData({...checkoutData, location: e.target.value})} placeholder="مثال: حي 500 مسكن، الطابق الثاني" isDark={isDark} />
                    <Input label="رقم الهاتف" value={checkoutData.phone} onChange={(e: any) => setCheckoutData({...checkoutData, phone: e.target.value})} placeholder="06XXXXXXXX / 07XXXXXXXX" isDark={isDark} />
                 </div>

                 {/* Payment Method */}
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-4">طريقة الدفع</label>
                    <div className="grid grid-cols-2 gap-4">
                       <button 
                         onClick={() => setPaymentMethod('card')}
                         className={`p-6 rounded-[32px] border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-yellow-500 bg-yellow-500/5' : 'border-stone-100 bg-stone-50 grayscale opacity-40'}`}
                       >
                          <CardIcon className="w-8 h-8" />
                          <span className="font-bold">البطاقة الذهبية</span>
                       </button>
                       <button 
                         onClick={() => setPaymentMethod('cash')}
                         className={`p-6 rounded-[32px] border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'cash' ? 'border-emerald-500 bg-emerald-500/5 text-emerald-700' : 'border-stone-100 bg-stone-50 grayscale opacity-40'}`}
                       >
                          <Clock className="w-8 h-8" />
                          <span className="font-bold">عند الاستلام</span>
                       </button>
                    </div>
                 </div>

                 {paymentMethod === 'card' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-5 bg-stone-50 p-8 rounded-[40px] border border-stone-200">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase opacity-40 mx-2">رقم البطاقة الذهبية</label>
                          <input type="text" placeholder="6280 **** **** ****" className="w-full bg-white border border-stone-200 rounded-2xl p-5 text-xl font-mono text-center tracking-[4px] focus:ring-4 focus:ring-yellow-500/10" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="MM/YY" className="w-full bg-white border border-stone-200 rounded-2xl p-5 text-center font-mono" />
                          <input type="password" placeholder="CVV" className="w-full bg-white border border-stone-200 rounded-2xl p-5 text-center font-mono" />
                       </div>
                    </motion.div>
                 )}

                 <button 
                   onClick={() => { alert('تم استلام طلبك بنجاح! شكراً لك.'); setShowPayment(false); setCart({}); }}
                   className="w-full bg-yellow-500 text-stone-950 py-6 rounded-[30px] font-bold shadow-2xl text-xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all"
                 >
                    <ShieldCheck className="w-6 h-6" />
                    تأكيد الطلب بقيمة {calculateTotal()} دج
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Input = ({ label, placeholder, value, onChange, isDark }: any) => (
  <div className="space-y-2 px-2">
    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-2 text-right">{label}</label>
    <input 
      type="text" 
      value={value}
      onChange={onChange}
      placeholder={placeholder} 
      className={`w-full rounded-2xl p-4 border focus:ring-4 focus:ring-[#8B4513]/10 ${isDark ? 'bg-stone-800 border-stone-700 text-white' : 'bg-stone-50 border-stone-100 text-stone-900'}`} 
    />
  </div>
);

function NavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-[#8B4513] scale-110' : 'opacity-40 hover:opacity-100'}`}>
      <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${active ? 'bg-[#8B4513]/10 shadow-[0_0_40px_rgba(139,69,19,0.3)]' : ''}`}>{icon}</div>
      <span className="text-xs font-bold uppercase tracking-widest font-sans">{label}</span>
    </button>
  );
}
