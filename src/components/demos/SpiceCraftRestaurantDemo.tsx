import React, { useState } from 'react';
import { Utensils, Clock, MapPin, Phone, Calendar, Users, CheckCircle2, X, Sparkles, Flame } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'tandoor' | 'curries' | 'biryani' | 'desserts';
  price: number;
  isVeg: boolean;
  isChefSpecial?: boolean;
  spicyLevel?: 1 | 2 | 3;
  description: string;
}

export const SpiceCraftRestaurantDemo: React.FC = () => {
  const [activeMenuCat, setActiveMenuCat] = useState<string>('all');
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableReserved, setTableReserved] = useState(false);
  const [reserveForm, setReserveForm] = useState({
    name: '',
    phone: '',
    date: '2026-09-28',
    time: '08:00 PM',
    guests: '2 Guests',
    specialRequest: ''
  });

  const menuItems: MenuItem[] = [
    {
      id: 'm1',
      name: 'Smoked Dahi ke Kebab',
      category: 'starters',
      price: 340,
      isVeg: true,
      isChefSpecial: true,
      description: 'Velvety hung curd blended with crushed cardamom, fresh mint, and pomegranate pearls, pan-crisped in desi ghee.'
    },
    {
      id: 'm2',
      name: 'Galouti Kebab with Sheermal',
      category: 'starters',
      price: 490,
      isVeg: false,
      isChefSpecial: true,
      spicyLevel: 2,
      description: 'Melt-in-mouth Awadhi minced meat smoked over betel leaf with 32 fragrant spices, served over warm saffron sheermal.'
    },
    {
      id: 'm3',
      name: 'Bhatti da Murgh Tikka',
      category: 'tandoor',
      price: 450,
      isVeg: false,
      spicyLevel: 3,
      description: 'Tender chicken morsels marinated in crushed Kashmiri chilies, mustard oil, black pepper, and charred in clay oven.'
    },
    {
      id: 'm4',
      name: 'Paneer Zafrani Tikka',
      category: 'tandoor',
      price: 380,
      isVeg: true,
      description: 'Fresh farmhouse paneer marinated in saffron cream, toasted yellow mustard, and bell peppers.'
    },
    {
      id: 'm5',
      name: 'Dal SpiceCraft (Slow-Cooked 24 Hours)',
      category: 'curries',
      price: 360,
      isVeg: true,
      isChefSpecial: true,
      description: 'Black urad lentils simmered overnight on slow charcoal embers with fresh tomato reduction, white butter, and fenugreek.'
    },
    {
      id: 'm6',
      name: 'Nalli Nihari Gosht',
      category: 'curries',
      price: 580,
      isVeg: false,
      spicyLevel: 2,
      description: 'Slow-braised tender lamb shanks cooked with aromatic spices, bone marrow essence, and fresh ginger juliennes.'
    },
    {
      id: 'm7',
      name: 'Dum Pukht Awadhi Mutton Biryani',
      category: 'biryani',
      price: 520,
      isVeg: false,
      isChefSpecial: true,
      description: 'Long-grain aged basmati rice layered with succulent marinated mutton, sealed with dough in a clay handi.'
    },
    {
      id: 'm8',
      name: 'Subz Nizami Handi Biryani',
      category: 'biryani',
      price: 380,
      isVeg: true,
      description: 'Seasonal heirloom garden vegetables, saffron-infused rice, fried shallots, and fresh mint aroma.'
    },
    {
      id: 'm9',
      name: 'Baked Kesar Phirni with Pistachio Crisp',
      category: 'desserts',
      price: 240,
      isVeg: true,
      description: 'Creamy Kashmiri saffron rice pudding set in traditional earthen clay pots, topped with Iranian pistachio slivers.'
    }
  ];

  const filteredItems = activeMenuCat === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeMenuCat);

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveForm.name || !reserveForm.phone) return;
    setTableReserved(true);
  };

  return (
    <div className="bg-[#0B0F19] text-slate-100 font-sans min-h-full">
      {/* Demo Top Notice */}
      <div className="bg-amber-950/70 border-b border-amber-500/20 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-amber-300">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">SpiceCraft Bistro</span>
          <span className="text-slate-400">·</span>
          <span>Sample Restaurant Demo Website by ZK Web Studio</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Open Daily: 12:30 PM – 11:30 PM IST</span>
        </div>
      </div>

      {/* Demo Navbar */}
      <header className="bg-slate-950/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center font-bold text-white text-base">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base font-bold text-white tracking-wide font-serif">SPICECRAFT</div>
            <div className="text-[10px] text-amber-400/90 uppercase tracking-widest">Artisan Indian Dining & Grills</div>
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-3 text-xs font-medium text-slate-300">
          <button 
            onClick={() => setActiveMenuCat('all')}
            className={`px-3 py-1.5 rounded transition ${activeMenuCat === 'all' ? 'bg-amber-600 text-white font-semibold' : 'hover:text-white'}`}
          >
            Full Menu
          </button>
          <button 
            onClick={() => setActiveMenuCat('starters')}
            className={`px-3 py-1.5 rounded transition ${activeMenuCat === 'starters' ? 'bg-amber-600 text-white font-semibold' : 'hover:text-white'}`}
          >
            Starters
          </button>
          <button 
            onClick={() => setActiveMenuCat('curries')}
            className={`px-3 py-1.5 rounded transition ${activeMenuCat === 'curries' ? 'bg-amber-600 text-white font-semibold' : 'hover:text-white'}`}
          >
            Curries
          </button>
          <button 
            onClick={() => setActiveMenuCat('biryani')}
            className={`px-3 py-1.5 rounded transition ${activeMenuCat === 'biryani' ? 'bg-amber-600 text-white font-semibold' : 'hover:text-white'}`}
          >
            Dum Biryani
          </button>
        </nav>

        <button 
          onClick={() => { setShowTableModal(true); setTableReserved(false); }}
          className="px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-semibold rounded-md shadow transition flex items-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          Reserve a Table
        </button>
      </header>

      {/* Hero Sub-section */}
      <section className="px-6 py-8 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 text-center">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Charcoal Grills & Heritage Recipes
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            A Feast of Royal Flavours & Slow Embers
          </h1>
          <p className="text-xs text-slate-400">
            Hand-ground spice blends, slow-braised gravies, and fragrant basmati dum creations. Freshly prepared to order.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Sector 29, Food Street (Demo)</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-amber-400" /> +91 98765 00000</span>
          </div>
        </div>
      </section>

      {/* Menu Categories on Mobile */}
      <div className="flex sm:hidden overflow-x-auto gap-2 px-6 py-3 border-b border-slate-800 text-xs">
        {['all', 'starters', 'tandoor', 'curries', 'biryani', 'desserts'].map((c) => (
          <button
            key={c}
            onClick={() => setActiveMenuCat(c)}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap capitalize ${activeMenuCat === c ? 'bg-amber-600 text-white font-semibold' : 'bg-slate-800 text-slate-300'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-400" /> Culinary Offerings
          </h2>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border border-emerald-500 bg-emerald-500/20 inline-block" /> Vegetarian
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border border-red-500 bg-red-500/20 inline-block" /> Non-Vegetarian
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* Veg / Non-Veg symbol */}
                    <div className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ${item.isVeg ? 'border-emerald-500' : 'border-red-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    </div>
                    <div className="text-sm font-bold text-white font-serif">{item.name}</div>
                  </div>
                  <div className="text-sm font-bold text-amber-400 font-mono shrink-0">
                    ₹{item.price}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pl-5">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between pl-5 text-[11px]">
                <div className="flex items-center gap-2">
                  {item.isChefSpecial && (
                    <span className="text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Chef's Signature
                    </span>
                  )}
                  {item.spicyLevel && item.spicyLevel > 1 && (
                    <span className="text-red-400 flex items-center gap-0.5">
                      <Flame className="w-3 h-3" /> Spicy
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => { setShowTableModal(true); setTableReserved(false); }}
                  className="text-amber-400 hover:text-amber-300 font-medium"
                >
                  Order at Table →
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Table Reservation Modal */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowTableModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!tableReserved ? (
              <form onSubmit={handleReservation} className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Instant Booking Request</div>
                  <h3 className="text-lg font-bold text-white font-serif">Reserve a Table at SpiceCraft</h3>
                  <p className="text-xs text-slate-400">
                    Complimentary table hold for 15 minutes. We will confirm via WhatsApp message.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Vikram Malhotra" 
                      value={reserveForm.name}
                      onChange={(e) => setReserveForm({...reserveForm, name: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Contact Phone (WhatsApp) *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 98765 43210" 
                      value={reserveForm.phone}
                      onChange={(e) => setReserveForm({...reserveForm, phone: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Date</label>
                      <input 
                        type="date" 
                        value={reserveForm.date}
                        onChange={(e) => setReserveForm({...reserveForm, date: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Time Slot</label>
                      <select 
                        value={reserveForm.time}
                        onChange={(e) => setReserveForm({...reserveForm, time: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option>01:00 PM (Lunch)</option>
                        <option>02:00 PM (Lunch)</option>
                        <option>07:30 PM (Dinner)</option>
                        <option>08:30 PM (Dinner)</option>
                        <option>09:30 PM (Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Party Size</label>
                    <select 
                      value={reserveForm.guests}
                      onChange={(e) => setReserveForm({...reserveForm, guests: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests (Family Table)</option>
                      <option>8+ Guests (Celebration)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded transition"
                >
                  Confirm Table Reservation
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  Demo simulation: This demonstrates customer inquiry capture without complex booking servers.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-serif">Table Requested!</h3>
                  <p className="text-xs text-slate-300">
                    Thank you {reserveForm.name}. A table for {reserveForm.guests} is requested on {reserveForm.date} at {reserveForm.time}.
                  </p>
                </div>
                <button 
                  onClick={() => setShowTableModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded text-slate-200 transition"
                >
                  Back to Restaurant Menu
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
