import React, { useState } from 'react';
import { ShoppingBag, Eye, X, MessageCircle, Heart, Check, Sparkles, Filter } from 'lucide-react';

interface ClothingProduct {
  id: string;
  name: string;
  category: 'festive' | 'saree' | 'casual' | 'men';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  fabric: string;
  sizes: string[];
  description: string;
  badge?: string;
  color: string;
}

export const VogueClothingDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProduct, setActiveProduct] = useState<ClothingProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [savedWishlist, setSavedWishlist] = useState<string[]>([]);
  const [whatsappSent, setWhatsappSent] = useState<string | null>(null);

  const products: ClothingProduct[] = [
    {
      id: 'prod-1',
      name: 'Chanderi Zari Silk Anarkali Set',
      category: 'festive',
      categoryLabel: 'Festive Wear',
      price: 2899,
      originalPrice: 4200,
      fabric: 'Pure Chanderi Silk with Organza Dupatta',
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Handcrafted with intricate golden zari border work, gota patti neckline, and paired with a lightweight flowy organza dupatta.',
      badge: 'Best Seller',
      color: 'Royal Aubergine'
    },
    {
      id: 'prod-2',
      name: 'Tussar Handblock Printed Saree',
      category: 'saree',
      categoryLabel: 'Handloom Saree',
      price: 2199,
      originalPrice: 3200,
      fabric: 'Authentic Bhagalpur Tussar Silk',
      sizes: ['Free Size (6.3m with Blouse)'],
      description: 'Traditional Ajrakh geometric handblock print using organic vegetable dyes. Includes unstitched running blouse piece.',
      badge: 'Handloom Craft',
      color: 'Indigo & Madder'
    },
    {
      id: 'prod-3',
      name: 'Mulmul Cotton Angrakha Kurti',
      category: 'casual',
      categoryLabel: 'Summer Casuals',
      price: 1399,
      originalPrice: 1999,
      fabric: '100% Breathable Jaipur Mulmul',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      description: 'Ultra-soft handspun cotton with authentic tie-up tassels, wooden bead accents, and comfortable side pockets.',
      badge: 'Summer Essential',
      color: 'Ivory Pistachio'
    },
    {
      id: 'prod-4',
      name: 'Raw Silk Nehru Jacket & Kurta',
      category: 'men',
      categoryLabel: 'Menswear',
      price: 3499,
      originalPrice: 4999,
      fabric: 'Raw Textured Silk with Cotton Lining',
      sizes: ['38', '40', '42', '44'],
      description: 'Sophisticated mandarin collar jacket featuring antique brass buttons, worn over a fine crisp cotton kurta.',
      color: 'Slate Charcoal'
    },
    {
      id: 'prod-5',
      name: 'Bandhani Georgette Festive Co-ord',
      category: 'festive',
      categoryLabel: 'Festive Wear',
      price: 2499,
      originalPrice: 3600,
      fabric: 'Crinkled Georgette with Gotta Lace',
      sizes: ['S', 'M', 'L'],
      description: 'Contemporary two-piece silhouette fusing traditional Kutch bandhani dye work with a sleek modern palazzo cut.',
      badge: 'Trending Now',
      color: 'Ruby Crimson'
    },
    {
      id: 'prod-6',
      name: 'Kalamkari Linen Everyday Tunic',
      category: 'casual',
      categoryLabel: 'Summer Casuals',
      price: 1199,
      originalPrice: 1750,
      fabric: 'Pure Organic Linen Blend',
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Pen Kalamkari tree of life motifs with relaxed drop shoulder fitting. Ideal for workwear or casual weekends.',
      color: 'Earthy Sand'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const generateWhatsAppOrderUrl = (product: ClothingProduct, size: string) => {
    const text = encodeURIComponent(
      `Hello VogueVibe Atelier! I would like to order:\n\n• Product: ${product.name}\n• Size: ${size}\n• Price: ₹${product.price}\n• Color: ${product.color}\n\nPlease confirm availability and payment/delivery details.`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <div className="bg-[#0F172A] text-slate-100 font-sans min-h-full">
      {/* Demo Header Notice */}
      <div className="bg-rose-950/70 border-b border-rose-500/20 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-rose-300">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">VogueVibe Atelier</span>
          <span className="text-slate-400">·</span>
          <span>Sample Clothing Catalogue Demo by ZK Web Studio</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>WhatsApp Orders: +91 98765 43210 (Demo)</span>
        </div>
      </div>

      {/* Demo Navbar */}
      <header className="bg-slate-950/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-600/90 flex items-center justify-center font-bold text-white text-base font-serif">
            V
          </div>
          <div>
            <div className="text-base font-bold text-white tracking-widest font-serif">VOGUEVIBE</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Atelier & Pret Couture</div>
          </div>
        </div>

        {/* Filter categories */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md transition ${selectedCategory === 'all' ? 'bg-rose-600 text-white font-medium' : 'text-slate-300 hover:text-white'}`}
          >
            All Collections
          </button>
          <button 
            onClick={() => setSelectedCategory('festive')}
            className={`px-3 py-1.5 rounded-md transition ${selectedCategory === 'festive' ? 'bg-rose-600 text-white font-medium' : 'text-slate-300 hover:text-white'}`}
          >
            Festive Wear
          </button>
          <button 
            onClick={() => setSelectedCategory('saree')}
            className={`px-3 py-1.5 rounded-md transition ${selectedCategory === 'saree' ? 'bg-rose-600 text-white font-medium' : 'text-slate-300 hover:text-white'}`}
          >
            Handloom Sarees
          </button>
          <button 
            onClick={() => setSelectedCategory('casual')}
            className={`px-3 py-1.5 rounded-md transition ${selectedCategory === 'casual' ? 'bg-rose-600 text-white font-medium' : 'text-slate-300 hover:text-white'}`}
          >
            Summer Casuals
          </button>
          <button 
            onClick={() => setSelectedCategory('men')}
            className={`px-3 py-1.5 rounded-md transition ${selectedCategory === 'men' ? 'bg-rose-600 text-white font-medium' : 'text-slate-300 hover:text-white'}`}
          >
            Menswear
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-300 flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Wishlist ({savedWishlist.length})</span>
          </div>
        </div>
      </header>

      {/* Catalogue Hero Sub-banner */}
      <section className="px-6 py-6 bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Festive & Summer 2026 Lookbook
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Authentic Textiles Crafted for Timeless Celebrations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Direct artisan procurement · Free shipping across India on orders above ₹1,999 · Customized tailoring support
          </p>
        </div>
        <div className="shrink-0 text-xs text-slate-300 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl">
          <span className="text-emerald-400 font-semibold">How it works:</span> Browse styles → Click <span className="text-white font-medium">Order via WhatsApp</span> → Chat directly with store owner!
        </div>
      </section>

      {/* Mobile filter buttons */}
      <div className="flex md:hidden overflow-x-auto gap-2 px-6 py-3 border-b border-slate-800 text-xs">
        {['all', 'festive', 'saree', 'casual', 'men'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${selectedCategory === cat ? 'bg-rose-600 text-white font-medium' : 'bg-slate-800 text-slate-300'}`}
          >
            {cat === 'all' ? 'All' : cat === 'festive' ? 'Festive' : cat === 'saree' ? 'Sarees' : cat === 'casual' ? 'Casual' : 'Men'}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div 
              key={p.id}
              onClick={() => { setActiveProduct(p); setSelectedSize(p.sizes[0]); setWhatsappSent(null); }}
              className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition cursor-pointer group flex flex-col justify-between"
            >
              {/* Card visual preview */}
              <div className="relative bg-gradient-to-tr from-slate-950 to-slate-800 aspect-[4/3] p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  {p.badge ? (
                    <span className="text-[10px] font-semibold bg-rose-900/80 text-rose-200 border border-rose-500/40 px-2 py-0.5 rounded">
                      {p.badge}
                    </span>
                  ) : <span />}
                  <button 
                    onClick={(e) => toggleWishlist(p.id, e)}
                    className="p-1.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-rose-400 transition"
                  >
                    <Heart className={`w-4 h-4 ${savedWishlist.includes(p.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                <div className="text-center my-auto">
                  <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-300 font-serif text-lg mb-2">
                    {p.name.charAt(0)}
                  </div>
                  <div className="text-xs text-slate-400">{p.color}</div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 z-10 bg-slate-950/60 backdrop-blur-sm px-2.5 py-1 rounded">
                  <span>{p.categoryLabel}</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Eye className="w-3.5 h-3.5 text-rose-400" /> Click to inspect
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-2.5">
                <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {p.fabric}
                </p>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-base font-bold text-white font-mono">₹{p.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-500 line-through font-mono">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-[11px] text-emerald-400 font-medium font-mono">
                    {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Sizes: {p.sizes.join(', ')}</span>
                  <span className="text-rose-400 font-semibold group-hover:underline">Quick Order →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Product Quick View / WhatsApp Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button 
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs text-rose-400 font-semibold uppercase tracking-wider">{activeProduct.categoryLabel}</span>
              <h2 className="text-lg font-bold text-white font-serif">{activeProduct.name}</h2>
              <div className="text-xs text-slate-400">Color / Edition: {activeProduct.color}</div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-white font-mono">₹{activeProduct.price.toLocaleString('en-IN')}</span>
              <span className="text-sm text-slate-500 line-through font-mono">₹{activeProduct.originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                In Stock (Ready to dispatch)
              </span>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/80 text-xs space-y-1.5">
              <div className="font-semibold text-slate-300">Fabric & Craft Specifications:</div>
              <div className="text-slate-300">{activeProduct.fabric}</div>
              <div className="text-slate-400 pt-1 leading-relaxed">{activeProduct.description}</div>
            </div>

            {/* Size Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">Select Required Size:</label>
              <div className="flex flex-wrap gap-2">
                {activeProduct.sizes.map((s) => (
                  <button 
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition ${selectedSize === s ? 'bg-rose-600 text-white ring-2 ring-rose-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <a 
                href={generateWhatsAppOrderUrl(activeProduct, selectedSize)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setWhatsappSent(activeProduct.name)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                Inquire & Order via WhatsApp
              </a>

              <p className="text-[11px] text-slate-400 text-center">
                Clicking opens WhatsApp with your chosen item <strong className="text-slate-300">({activeProduct.name}, Size {selectedSize})</strong> prefilled. You can send it directly to the store!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
