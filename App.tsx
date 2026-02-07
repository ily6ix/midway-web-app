
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
      className={`px-4 py-2 text-sm font-medium transition-colors relative ${
        activeTab === id ? 'text-amber-600' : 'text-stone-500 hover:text-stone-900'
      }`}
    >
      {label}
      {activeTab === id && (
        <motion.div 
          layoutId="activeTab" 
          className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-600"
        />
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter serif cursor-pointer" onClick={() => setActiveTab('home')}>
            MIDWAY <span className="text-amber-600 underline decoration-stone-200">MEWS</span>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            <NavItem id="home" label="Welcome" />
            <NavItem id="services" label="Services" />
            <NavItem id="portfolio" label="Gallery" />
            <NavItem id="contact" label="Contact" />
            <a 
              href="tel:+27110000000"
              className="ml-4 bg-stone-900 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-amber-600 transition-all shadow-lg uppercase tracking-widest"
            >
              Call To Book
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.section 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-12 md:py-24"
            >
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-amber-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">Midrand • Halfway Gardens • Johannesburg</span>
                  <h1 className="text-6xl md:text-8xl font-bold leading-[1] mb-8 serif">
                    Exquisite <br />
                    <span className="italic font-light text-stone-300">Beauty</span>
                  </h1>
                  <p className="text-lg text-stone-500 mb-10 leading-relaxed max-w-lg">
                    Midway Mews hair beauty salon is your premier destination for hair artistry in Midrand. From intricate braids and locs to luminous balayage, we celebrate every texture.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setActiveTab('services')}
                      className="bg-stone-900 text-white px-10 py-5 rounded-full font-bold hover:bg-amber-600 transition-all shadow-2xl flex items-center space-x-2"
                    >
                      <span>View Services</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                    <button 
                      onClick={() => setActiveTab('contact')}
                      className="border-2 border-stone-200 bg-white text-stone-900 px-10 py-5 rounded-full font-bold hover:bg-stone-50 transition-all"
                    >
                      Find Us
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                  <div className="grid grid-cols-2 gap-4 h-[600px]">
                    <div className="space-y-4 pt-12">
                      <img src="https://images.unsplash.com/photo-1649931754013-176840733d31?auto=format&fit=crop&q=80&w=600" className="w-full h-[45%] object-cover rounded-2xl shadow-lg" alt="Braiding Mastery" />
                      <img src="https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&q=80&w=600" className="w-full h-[45%] object-cover rounded-2xl shadow-lg" alt="Locs Maintenance" />
                    </div>
                    <div className="space-y-4">
                      <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600" className="w-full h-[60%] object-cover rounded-2xl shadow-lg" alt="Professional Color" />
                      <img src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600" className="w-full h-[30%] object-cover rounded-2xl shadow-lg" alt="Curly Hair Styling" />
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-50 rounded-full -z-10 animate-pulse"></div>
                </motion.div>
              </div>
            </motion.section>
          )}

          {activeTab === 'services' && (
            <motion.section 
              key="services"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="px-6 py-20 max-w-7xl mx-auto"
            >
              <div className="text-center mb-20">
                <span className="text-amber-600 font-bold uppercase tracking-widest text-xs">Midrand's Finest</span>
                <h2 className="text-4xl md:text-5xl font-bold serif mt-4 mb-4">Our Specialties</h2>
                <div className="w-20 h-1 bg-amber-600 mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {SERVICES.map((service, idx) => (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100"
                  >
                    <div className="h-72 overflow-hidden relative">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-3 serif">{service.title}</h3>
                      <p className="text-stone-400 text-sm mb-6 leading-relaxed">{service.description}</p>
                      <div className="flex justify-between items-center border-t border-stone-50 pt-6">
                        <span className="text-lg font-bold text-stone-900">{service.price}</span>
                        <a href="tel:+27110000000" className="text-amber-600 text-xs font-bold hover:tracking-widest transition-all flex items-center space-x-2">
                          <span>CALL TO BOOK</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
              className="px-6 py-20 bg-white"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                  <div>
                    <span className="text-amber-600 font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">Style Collective</span>
                    <h2 className="text-4xl md:text-6xl font-bold serif">Signature Gallery</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {galleryTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setGalleryFilter(tag)}
                        className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${
                          galleryFilter === tag 
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xl' 
                          : 'bg-white text-stone-400 border-stone-100 hover:border-amber-200 hover:text-stone-800'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredGallery.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className={`relative group overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all cursor-pointer ${
                          index % 4 === 0 ? 'md:row-span-2' : ''
                        }`}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                          <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2">{item.tag}</span>
                          <h4 className="text-white text-2xl font-bold serif leading-tight">{item.title}</h4>
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
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-24"
            >
              <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden grid md:grid-cols-2">
                <div className="p-12 md:p-20 bg-stone-900 text-white flex flex-col justify-center">
                  <h2 className="text-4xl font-bold serif mb-8">Locate Us</h2>
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-amber-600 uppercase text-xs tracking-widest font-bold mb-2">Address</h4>
                      <p className="text-stone-300">595 Seventh Rd, Halfway Gardens<br />Midrand, 1686, South Africa</p>
                      <a href="https://maps.google.com/?q=595+Seventh+Rd+Halfway+Gardens+Midrand" target="_blank" className="text-amber-400 text-xs font-bold mt-2 inline-block uppercase tracking-widest hover:underline">Get Directions</a>
                    </div>
                    <div>
                      <h4 className="text-amber-600 uppercase text-xs tracking-widest font-bold mb-2">Inquiries</h4>
                      <p className="text-stone-300">Midway Mews hair beauty salon</p>
                      <p className="text-stone-300 mt-1 font-bold">Call to book: (011) XXX-XXXX</p>
                    </div>
                    <div>
                      <h4 className="text-amber-600 uppercase text-xs tracking-widest font-bold mb-2">Opening Times</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs text-stone-400">
                        <div>
                          <p>MONDAY</p>
                          <p>TUE — SAT</p>
                          <p>SUNDAY</p>
                        </div>
                        <div className="text-white font-medium">
                          <p>09:00 — 18:00</p>
                          <p>08:00 — 18:00</p>
                          <p>08:30 — 17:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-12 md:p-20 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold serif mb-8 text-stone-800">Send a Message</h3>
                  <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Your Name</label>
                      <input type="text" className="w-full border-b border-stone-200 py-2 focus:border-amber-600 outline-none transition-colors" placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Treatment of Interest</label>
                      <select className="w-full border-b border-stone-200 py-2 focus:border-amber-600 outline-none transition-colors bg-transparent">
                        <option>Balayage</option>
                        <option>Hair Braiding</option>
                        <option>Locs Maintenance</option>
                        <option>Weaves & Extensions</option>
                        <option>Women's Haircut</option>
                      </select>
                    </div>
                    <div className="pt-6">
                      <button className="w-full bg-stone-900 text-white py-5 rounded-full font-bold hover:bg-amber-600 transition-all shadow-xl">
                        Send Inquiry
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
      <footer className="bg-stone-50 border-t border-stone-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold tracking-tighter serif mb-6">
              MIDWAY <span className="text-amber-600">MEWS</span>
            </div>
            <p className="max-w-md text-stone-400 mb-8 leading-relaxed">
              Experience professional hair care in the heart of Midrand. From modern styles to traditional artistry, Midway Mews hair beauty salon welcomes you.
            </p>
            <div className="flex space-x-8">
              {['FACEBOOK', 'INSTAGRAM', 'TWITTER'].map(social => (
                <a key={social} href="#" className="hover:text-amber-600 transition-colors text-[10px] font-bold uppercase tracking-[0.2em]">{social}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-stone-900 font-bold mb-6 uppercase tracking-widest text-xs">Midrand Community</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><button onClick={() => setActiveTab('services')} className="hover:text-amber-600 transition-colors">Treatments</button></li>
              <li><button onClick={() => setActiveTab('portfolio')} className="hover:text-amber-600 transition-colors">Style Gallery</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-amber-600 transition-colors">Find Us</button></li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm">
            <h4 className="text-stone-900 font-bold mb-4 text-sm">Stay Updated</h4>
            <p className="text-xs text-stone-400 mb-6">Receive beauty tips and seasonal offers directly from our Midrand boutique.</p>
            <div className="relative">
              <input type="email" placeholder="Email Address" className="w-full bg-stone-50 border border-stone-100 rounded-full px-5 py-3 text-xs outline-none focus:border-amber-600" />
              <button className="absolute right-2 top-2 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-stone-100 mt-16 pt-8 text-[10px] font-bold uppercase tracking-widest text-stone-300 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Midway Mews hair beauty salon • Halfway Gardens, Midrand</p>
          <p>Powered by Fresha Community • Johannesburg</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
