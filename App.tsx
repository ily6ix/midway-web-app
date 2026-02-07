
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SERVICES, GALLERY_ITEMS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'portfolio' | 'contact'>('home');
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredGallery = galleryFilter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.tag === galleryFilter);

  const galleryTags = ['All', ...new Set(GALLERY_ITEMS.map(item => item.tag))];

  const NavItem = ({ id, label }: { id: typeof activeTab, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-medium transition-all relative ${
        activeTab === id ? 'text-gold-500' : 'text-stone-400 hover:text-obsidian'
      }`}
    >
      {label}
      {activeTab === id && (
        <motion.div 
          layoutId="activeTab" 
          className="absolute bottom-0 left-4 right-4 h-[1px] bg-gold-500"
        />
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold-100 selection:text-gold-900 overflow-x-hidden bg-parchment">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)] py-4' : 'bg-transparent py-8'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter serif cursor-pointer group" onClick={() => setActiveTab('home')}>
            MIDWAY <span className="text-gold-500 group-hover:text-obsidian transition-colors">MEWS</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <NavItem id="home" label="Welcome" />
            <NavItem id="services" label="Services" />
            <NavItem id="portfolio" label="Gallery" />
            <NavItem id="contact" label="Contact" />
            <a 
              href="tel:+27110000000"
              className="ml-6 border border-obsidian text-obsidian px-8 py-2.5 rounded-full text-[11px] font-bold hover:bg-obsidian hover:text-white transition-all shadow-sm uppercase tracking-[0.2em]"
            >
              Call To Book
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.section 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-20 md:py-32"
            >
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <span className="text-gold-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block">Johannesburg • Midrand</span>
                  <h1 className="text-7xl md:text-9xl font-bold leading-[0.9] mb-10 serif text-obsidian">
                    Timeless <br />
                    <span className="italic font-light text-stone-300">Artistry</span>
                  </h1>
                  <p className="text-lg text-stone-500 mb-12 leading-relaxed max-w-md font-light">
                    Midway Mews is a boutique hair sanctuary where tradition meets contemporary innovation. We craft bespoke looks that honor your unique natural beauty.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <button 
                      onClick={() => setActiveTab('services')}
                      className="bg-obsidian text-white px-12 py-5 rounded-full font-bold hover:bg-gold-500 transition-all shadow-xl flex items-center space-x-3 text-xs tracking-[0.2em]"
                    >
                      <span>EXPLORE SERVICES</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                    <button 
                      onClick={() => setActiveTab('contact')}
                      className="border border-stone-200 bg-transparent text-obsidian px-12 py-5 rounded-full font-bold hover:border-obsidian transition-all text-xs tracking-[0.2em]"
                    >
                      OUR LOCATION
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  className="relative group"
                >
                  <div className="grid grid-cols-2 gap-6 h-[650px]">
                    <div className="space-y-6 pt-16">
                      <div className="overflow-hidden rounded-3xl shadow-2xl h-[45%]">
                        <img src="https://images.unsplash.com/photo-1649931754013-176840733d31?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" alt="Braiding Mastery" />
                      </div>
                      <div className="overflow-hidden rounded-3xl shadow-2xl h-[45%]">
                        <img src="https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" alt="Locs Maintenance" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="overflow-hidden rounded-3xl shadow-2xl h-[60%]">
                        <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" alt="Professional Color" />
                      </div>
                      <div className="overflow-hidden rounded-3xl shadow-2xl h-[30%]">
                        <img src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" alt="Curly Hair Styling" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gold-50/50 rounded-full -z-10 blur-3xl animate-pulse"></div>
                </motion.div>
              </div>
            </motion.section>
          )}

          {activeTab === 'services' && (
            <motion.section 
              key="services"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="px-6 py-24 max-w-7xl mx-auto"
            >
              <div className="text-center mb-24">
                <span className="text-gold-500 font-bold uppercase tracking-[0.5em] text-[10px] block mb-6">The Rituals</span>
                <h2 className="text-5xl md:text-6xl font-bold serif mt-4 mb-6 text-obsidian">Curated Treatments</h2>
                <div className="w-16 h-[1px] bg-gold-300 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {SERVICES.map((service, idx) => (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 border border-stone-50"
                  >
                    <div className="h-80 overflow-hidden relative">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-transparent transition-colors duration-700"></div>
                    </div>
                    <div className="p-10">
                      <h3 className="text-2xl font-bold mb-4 serif text-obsidian">{service.title}</h3>
                      <p className="text-stone-400 text-sm mb-8 leading-relaxed font-light">{service.description}</p>
                      <div className="flex justify-between items-center pt-6 border-t border-stone-50">
                        <span className="text-lg font-bold text-obsidian">{service.price}</span>
                        <a href="tel:+27110000000" className="group/btn relative overflow-hidden text-gold-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                          <span className="relative z-10">BOOK VISIT</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 'portfolio' && (
            <motion.section 
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-24 bg-white"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
                  <div>
                    <span className="text-gold-500 font-bold uppercase tracking-[0.6em] text-[10px] block mb-6">Collections</span>
                    <h2 className="text-5xl md:text-7xl font-bold serif text-obsidian">Aesthetic Portfolio</h2>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {galleryTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setGalleryFilter(tag)}
                        className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase transition-all border ${
                          galleryFilter === tag 
                          ? 'bg-obsidian text-white border-obsidian shadow-lg' 
                          : 'bg-transparent text-stone-400 border-stone-100 hover:border-gold-200 hover:text-obsidian'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[350px]"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredGallery.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className={`relative group overflow-hidden rounded-[2.5rem] bg-stone-100 ${
                          index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                        }`}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                          <span className="text-gold-400 text-[9px] font-black uppercase tracking-[0.5em] mb-3">{item.tag}</span>
                          <h4 className="text-white text-3xl font-bold serif leading-tight">{item.title}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.section>
          )}

          {activeTab === 'contact' && (
            <motion.section 
              key="contact"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-32"
            >
              <div className="max-w-6xl mx-auto bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden grid md:grid-cols-2">
                <div className="p-16 md:p-24 bg-obsidian text-white flex flex-col justify-center">
                  <span className="text-gold-500 font-bold uppercase tracking-[0.5em] text-[10px] block mb-10">THE BOUTIQUE</span>
                  <h2 className="text-5xl font-bold serif mb-12">Connect With Us</h2>
                  <div className="space-y-12">
                    <div className="group">
                      <h4 className="text-stone-500 uppercase text-[10px] tracking-[0.4em] font-bold mb-4 group-hover:text-gold-500 transition-colors">OUR ADDRESS</h4>
                      <p className="text-stone-300 font-light leading-relaxed">595 Seventh Rd, Halfway Gardens<br />Midrand, 1686, South Africa</p>
                      <a href="https://maps.google.com/?q=595+Seventh+Rd+Halfway+Gardens+Midrand" target="_blank" className="text-gold-500 text-[10px] font-bold mt-4 inline-block uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all">Open In Maps</a>
                    </div>
                    <div>
                      <h4 className="text-stone-500 uppercase text-[10px] tracking-[0.4em] font-bold mb-4">INQUIRIES</h4>
                      <p className="text-gold-500 text-2xl font-bold mb-1">(011) XXX-XXXX</p>
                      <p className="text-stone-400 text-sm font-light italic">Call to secure your session</p>
                    </div>
                    <div>
                      <h4 className="text-stone-500 uppercase text-[10px] tracking-[0.4em] font-bold mb-6">TRADING HOURS</h4>
                      <div className="grid grid-cols-2 gap-8 text-[11px] text-stone-400">
                        <div className="space-y-2">
                          <p>MONDAY</p>
                          <p>TUE — SAT</p>
                          <p>SUNDAY</p>
                        </div>
                        <div className="text-white font-medium space-y-2">
                          <p>09:00 — 18:00</p>
                          <p>08:00 — 18:00</p>
                          <p>08:30 — 17:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-16 md:p-24 flex flex-col justify-center bg-parchment/30">
                  <h3 className="text-3xl font-bold serif mb-10 text-obsidian">Reserve Your Time</h3>
                  <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">YOUR NAME</label>
                      <input type="text" className="w-full border-b border-stone-200 bg-transparent py-3 focus:border-gold-500 outline-none transition-colors font-light placeholder:text-stone-300" placeholder="E.g. Alexander McQueen" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">TREATMENT</label>
                      <select className="w-full border-b border-stone-200 bg-transparent py-3 focus:border-gold-500 outline-none transition-colors font-light appearance-none">
                        <option>Balayage & Styling</option>
                        <option>Bespoke Braiding</option>
                        <option>Locs Maintenance</option>
                        <option>Professional Cut</option>
                      </select>
                    </div>
                    <div className="pt-10">
                      <button className="w-full bg-obsidian text-white py-6 rounded-full font-bold hover:bg-gold-500 transition-all shadow-2xl text-[11px] tracking-[0.3em] uppercase">
                        SUBMIT INQUIRY
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-obsidian text-white py-24 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold tracking-tighter serif mb-8">
              MIDWAY <span className="text-gold-500">MEWS</span>
            </div>
            <p className="max-w-sm text-stone-400 mb-12 leading-relaxed font-light text-sm italic">
              "Redefining the standard of beauty in Midrand since 1995. Our commitment to excellence is reflected in every mirror."
            </p>
            <div className="flex space-x-10">
              {['INSTAGRAM', 'FACEBOOK', 'X'].map(social => (
                <a key={social} href="#" className="text-stone-500 hover:text-gold-500 transition-colors text-[10px] font-bold uppercase tracking-[0.4em]">{social}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-gold-500 font-bold mb-8 uppercase tracking-[0.3em] text-[10px]">DIRECTORY</h4>
            <ul className="space-y-5 text-stone-400 text-xs font-light tracking-wider">
              <li><button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors">SERVICES MENU</button></li>
              <li><button onClick={() => setActiveTab('portfolio')} className="hover:text-white transition-colors">CLIENT GALLERY</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">THE BOUTIQUE</button></li>
              <li><a href="#" className="hover:text-white transition-colors">CAREERS</a></li>
            </ul>
          </div>
          <div className="bg-stone-900/50 p-10 rounded-[2.5rem] border border-stone-800">
            <h4 className="text-white font-bold mb-6 text-xs tracking-[0.2em] uppercase">PRIVATE CIRCLE</h4>
            <p className="text-[11px] text-stone-400 mb-8 font-light leading-relaxed">Join our mailing list for seasonal invitations and style previews.</p>
            <div className="relative">
              <input type="email" placeholder="YOUR EMAIL" className="w-full bg-stone-900 border-b border-stone-700 py-3 text-[10px] outline-none focus:border-gold-500 text-white placeholder:text-stone-600 tracking-widest" />
              <button className="absolute right-0 top-2 text-gold-500 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-stone-800/50 mt-20 pt-10 text-[9px] font-bold uppercase tracking-[0.5em] text-stone-600 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2026 MIDWAY MEWS SALON • MIDRAND SOUTH AFRICA</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-stone-400">PRIVACY</a>
            <a href="#" className="hover:text-stone-400">TERMS</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
