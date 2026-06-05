import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const CITY_CODE_MAP = {
  'paris': 'PAR',
  'new york': 'NYC',
  'london': 'LHR',
  'dubai': 'DXB',
  'tokyo': 'NRT',
  'sydney': 'SYD',
  'maldives': 'MLE'
};

const getCityCode = (city) => {
  const key = city.trim().toLowerCase();
  return CITY_CODE_MAP[key] || '???';
};

function App() {
  // Booking state
  const [fromCity, setFromCity] = useState('Paris');
  const [toCity, setToCity] = useState('New york');
  const [depDate, setDepDate] = useState('2025-12-29');

  // FAQ state
  const [activeFaq, setActiveFaq] = useState(0);

  // Slider indices
  const [teamIdx, setTeamIdx] = useState(0);
  const [newsIdx, setNewsIdx] = useState(0);

  // Refs
  const sliderRef = useRef(null);
  const teamSliderRef = useRef(null);
  const newsSliderRef = useRef(null);
  const teamContainerRef = useRef(null);
  const newsContainerRef = useRef(null);

  // Fade-up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Testimonial slider scroll
  const scrollTestimonials = (direction) => {
    sliderRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  // Crew slider logic
  const updateTeamSlider = useCallback(() => {
    const container = teamContainerRef.current;
    const slider = teamSliderRef.current;
    if (!container || !slider) return;
    const maxIdx = slider.scrollWidth - container.offsetWidth;
    setTeamIdx((prev) => Math.max(0, Math.min(prev, maxIdx)));
  }, []);

  useEffect(() => {
    updateTeamSlider();
    window.addEventListener('resize', updateTeamSlider);
    return () => window.removeEventListener('resize', updateTeamSlider);
  }, [updateTeamSlider]);

  const moveTeam = (direction) => {
    const step = 260 + 28; // card width + gap
    setTeamIdx((prev) => {
      const newIdx = prev + direction * step;
      const container = teamContainerRef.current;
      const slider = teamSliderRef.current;
      if (!container || !slider) return newIdx;
      const maxIdx = slider.scrollWidth - container.offsetWidth;
      return Math.max(0, Math.min(newIdx, maxIdx));
    });
  };

  // News slider logic
  const updateNewsSlider = useCallback(() => {
    const container = newsContainerRef.current;
    const slider = newsSliderRef.current;
    if (!container || !slider) return;
    const maxIdx = slider.scrollWidth - container.offsetWidth;
    setNewsIdx((prev) => Math.max(0, Math.min(prev, maxIdx)));
  }, []);

  useEffect(() => {
    updateNewsSlider();
    window.addEventListener('resize', updateNewsSlider);
    return () => window.removeEventListener('resize', updateNewsSlider);
  }, [updateNewsSlider]);

  const moveNews = (direction) => {
    const step = 280 + 32; // card width + gap
    setNewsIdx((prev) => {
      const newIdx = prev + direction * step;
      const container = newsContainerRef.current;
      const slider = newsSliderRef.current;
      if (!container || !slider) return newIdx;
      const maxIdx = slider.scrollWidth - container.offsetWidth;
      return Math.max(0, Math.min(newIdx, maxIdx));
    });
  };

  // Swap cities handler
  const swapCities = () => {
    setFromCity((prev) => {
      setToCity(prev);
      return toCity;
    });
  };

  // Search handler
  const handleSearch = () => {
    if (!fromCity.trim() || !toCity.trim()) {
      alert('Please enter both departure and arrival cities.');
      return;
    }
    if (!depDate) {
      alert('Please select a departure date.');
      return;
    }
    alert(
      `🔎 Searching flights:\n\n${fromCity} (${getCityCode(fromCity)}) → ${toCity} (${getCityCode(toCity)})\nDeparture: ${depDate}\n\nOur concierge will contact you shortly.`
    );
  };

  // FAQ toggle
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? -1 : index);
  };

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* HERO */}
      <header className="hero" id="main-content">
        <div className="hero-bg" aria-label="Private jet interior" />
        <div className="hero-content">
          <h1 className="hero-text fade-up">SKYVISTA</h1>
          <div className="hero-sub fade-up">
            <div className="hero-brand-card glass">
              <span>• Global Charter Fleet</span>
            </div>
            <div className="hero-counter glass">
              <small>Available Jets →</small>
              <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '2.5rem' }}>27</h2>
            </div>
          </div>
          <p className="hero-desc fade-up">
            Seamless private jet experiences tailored to your world. Fly beyond expectations.
          </p>
          <div className="aircraft-cards fade-up">
            <article className="aircraft-card glass">
              <div className="card-tag">Flagship</div>
              <div className="card-body">Gulfstream G700</div>
              <div className="aircraft-stats">
                <span>7,500 nmi</span>
                <span>19 pax</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                  →
                </button>
              </div>
            </article>
            <article className="aircraft-card glass">
              <div className="card-tag">Ultra‑long</div>
              <div className="card-body">Global 7500</div>
              <div className="aircraft-stats">
                <span>7,700 nmi</span>
                <span>19 pax</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                  →
                </button>
              </div>
            </article>
            <article className="aircraft-card glass">
              <div className="card-tag">Light Jet</div>
              <div className="card-body">Phenom 300E</div>
              <div className="aircraft-stats">
                <span>2,010 nmi</span>
                <span>10 pax</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                  →
                </button>
              </div>
            </article>
          </div>
        </div>
      </header>

      {/* BOOKING WIDGET */}
      <section className="container booking-section fade-up">
        <div className="booking-card glass">
          <div className="booking-options">
            <span>
              <i className="fa-solid fa-user" /> 1 adult
            </span>
            <span>
              <i className="fa-solid fa-plane" /> one-way
            </span>
            <span>
              <i className="fa-regular fa-circle" /> business class
            </span>
          </div>
          <div className="booking-fields">
            <div className="field">
              <small>FROM</small>
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="City or Airport"
              />
              <span id="fromCode">{getCityCode(fromCity)}</span>
            </div>
            <div className="swap" onClick={swapCities}>
              <i className="fa-solid fa-arrow-right-arrow-left" />
            </div>
            <div className="field">
              <small>TO</small>
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="City or Airport"
              />
              <span id="toCode">{getCityCode(toCity)}</span>
            </div>
            <div className="field">
              <small>DEPARTURE</small>
              <input
                type="date"
                value={depDate}
                onChange={(e) => setDepDate(e.target.value)}
              />
              <span>2025</span>
            </div>
            <button className="search-btn" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED IN */}
      <section className="container fade-up" style={{ marginTop: '6rem' }}>
        <div className="section-row">
          <div className="section-label">FEATURED IN</div>
          <div></div>
          <div></div>
        </div>
        <div className="featured-grid">
          <div className="logo-card">
            <div className="logo-mark">R</div>
            <div className="logo-name">Robb Report</div>
          </div>
          <div className="logo-card">
            <div className="logo-mark">B</div>
            <div className="logo-name">Bloomberg</div>
          </div>
          <div className="logo-card">
            <div className="logo-mark">ET</div>
            <div className="logo-name">Executive Traveller</div>
          </div>
          <div className="logo-card">
            <div className="logo-mark">AI</div>
            <div className="logo-name">Aviation International</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container fade-up" style={{ marginTop: '6rem' }}>
        <div className="section-row">
          <div className="section-label">CLIENT VOICES</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>• Seamless. Private. Elevated.</div>
          <div></div>
        </div>
        <div style={{ position: 'relative' }}>
          <button
            className="slider-btn slider-prev"
            onClick={() => scrollTestimonials(-1)}
          >
            ‹
          </button>
          <div className="testimonial-slider" ref={sliderRef} tabIndex={0}>
            <article className="testimonial-card glass">
              <div className="user-row">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="" />
                <div>
                  <h3>Elena Rodriguez</h3>
                  <span className="role">CEO, Apex Capital</span>
                </div>
              </div>
              <p>“From booking to landing, SkyVista delivers perfection.”</p>
            </article>
            <article className="testimonial-card glass">
              <div className="user-row">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                <div>
                  <h3>James Whitfield</h3>
                  <span className="role">Entertainer</span>
                </div>
              </div>
              <p>“Privacy, punctuality, and pure luxury.”</p>
            </article>
            <article className="testimonial-card glass">
              <div className="user-row">
                <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="" />
                <div>
                  <h3>Dr. Mei Lin</h3>
                  <span className="role">Tech Investor</span>
                </div>
              </div>
              <p>“On‑demand availability, the ultimate business tool.”</p>
            </article>
          </div>
          <button
            className="slider-btn slider-next"
            onClick={() => scrollTestimonials(1)}
          >
            ›
          </button>
        </div>
      </section>

      {/* ELITE CREW */}
      <section className="container fade-up" style={{ marginTop: '6rem' }}>
        <div className="crew-header">
          <div className="crew-title">ELITE CREW</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>▪ 5,000+ hours</span>
            <span>▪ 24/7 readiness</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              justifyContent: 'flex-end'
            }}
          >
            <button
              className="slider-btn"
              style={{ position: 'static', transform: 'none' }}
              onClick={() => moveTeam(-1)}
            >
              ‹
            </button>
            <button
              className="slider-btn"
              style={{ position: 'static', transform: 'none' }}
              onClick={() => moveTeam(1)}
            >
              ›
            </button>
          </div>
        </div>
        <div className="crew-slider-wrapper" ref={teamContainerRef}>
          <div
            className="crew-slider"
            ref={teamSliderRef}
            style={{ transform: `translateX(-${teamIdx}px)` }}
          >
            <div className="crew-card">
              <div className="card-top">
                <h3>Capt. Michael Chen</h3>
                <span>CHIEF PILOT</span>
              </div>
              <img src="img/3.webp" alt="" />
            </div>
            <div className="crew-card">
              <div className="card-top">
                <h3>Sarah Voss</h3>
                <span>LEAD FLIGHT ATTENDANT</span>
              </div>
              <img src="img/10.jpg" alt="" />
            </div>
            <div className="crew-card">
              <div className="card-top">
                <h3>Capt. David Okonkwo</h3>
                <span>SENIOR CAPTAIN</span>
              </div>
              <img src="./img/4.jpg" alt="" />
            </div>
            <div className="crew-card">
              <div className="card-top">
                <h3>Elena Müller</h3>
                <span>CABIN MANAGER</span>
              </div>
              <img src="img/5.webp" alt="" />
            </div>
            <div className="crew-card">
              <div className="card-top">
                <h3>Lucas Wright</h3>
                <span>GROUND OPS DIRECTOR</span>
              </div>
              <img src="img/9.jpg" alt="" />
            </div>
            <div className="crew-card">
              <div className="card-top">
                <h3>Isabella Rossi</h3>
                <span>VIP CONCIERGE</span>
              </div>
              <img src="img/77.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container faq-section fade-up">
        <div className="faq-header">
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '2rem', fontWeight: 900 }}>
            FAQ
          </div>
          <div>
            <img src="img/1.png" alt="wing" style={{ width: '60px', borderRadius: '12px' }} />
          </div>
          <div>
            <strong>• Your questions answered</strong>
            <br />
            <span style={{ color: '#6b7280' }}>Everything about private jet charter</span>
          </div>
        </div>
        <div className="faq-container">
          {[
            {
              question: 'How quickly can I book a flight?',
              answer: 'Within 4 hours for most locations. Empty‑leg options in 2 hours.'
            },
            {
              question: 'Which aircraft are available?',
              answer: 'Light jets to ultra‑long range, all with Wi‑Fi and lie‑flat seats.'
            },
            {
              question: 'Safety standards?',
              answer: 'ARG/US Platinum, Wyvern rated, FAA/EASA compliance.'
            },
            {
              question: 'Can I bring my pet?',
              answer: 'Yes, pets are welcome on all charters.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`accordion-item ${activeFaq === idx ? 'active' : ''}`}
            >
              <button
                className="accordion-header"
                aria-expanded={activeFaq === idx}
                onClick={() => toggleFaq(idx)}
              >
                <span>{item.question}</span>
                <span className="accordion-icon">+</span>
              </button>
              <div className="accordion-content">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="container fade-up" style={{ marginTop: '5rem' }}>
        <div className="dest-header">
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '2rem', fontWeight: 900 }}>
            DESTINATIONS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '0.5rem 1rem' }}>
              View all routes
            </span>
            <button
              className="gold-btn"
              style={{
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ➜
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              justifyContent: 'flex-end'
            }}
          >
            <button
              className="slider-btn"
              style={{ position: 'static', transform: 'none' }}
              onClick={() => moveNews(-1)}
            >
              ‹
            </button>
            <button
              className="slider-btn"
              style={{ position: 'static', transform: 'none' }}
              onClick={() => moveNews(1)}
            >
              ›
            </button>
          </div>
        </div>
        <div className="news-slider-wrapper" ref={newsContainerRef}>
          <div
            className="news-slider"
            ref={newsSliderRef}
            style={{ transform: `translateX(-${newsIdx}px)` }}
          >
            <article className="news-card glass">
              <img src="img/3.png" alt="" />
              <h3>St. Tropez to Mykonos</h3>
              <p>weekly route</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span>Daily</span>
                <span>€12,500</span>
              </div>
            </article>
            <article className="news-card glass">
              <img src="img/4.png" alt="" />
              <h3>New York to London</h3>
              <p>sub‑7hrs</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span>Global 7500</span>
                <span>€29,900</span>
              </div>
            </article>
            <article className="news-card glass">
              <img src="img/2.png" alt="" />
              <h3>Dubai to Maldives</h3>
              <p>private paradise</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span>Seaplane</span>
                <span>POA</span>
              </div>
            </article>
            <article className="news-card glass">
              <img src="img/5.png" alt="" />
              <h3>Geneva to Courchevel</h3>
              <p>winter escape</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span>Helicopter</span>
                <span>€18,800</span>
              </div>
            </article>
            <article className="news-card glass">
              <img src="img/6.png" alt="" />
              <h3>Tokyo to Seoul</h3>
              <p>business express</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span>Phenom 300</span>
                <span>€14,200</span>
              </div>
            </article>
            <article className="news-card glass">
              <img src="img/5.png" alt="" />
              <h3>Sydney to Fiji</h3>
              <p>island hopper</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span>G650</span>
                <span>€22,500</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="container" style={{ marginTop: '5rem' }}>
        <div className="booking-card glass" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700 }}>SkyVista</span>{' '}
              <strong>JETS</strong>
            </div>
            <div>
              <input
                type="email"
                placeholder="Your e-mail"
                style={{
                  border: 'none',
                  borderBottom: '1px solid #aaa',
                  background: 'transparent',
                  padding: '0.5rem',
                  width: '200px'
                }}
              />
            </div>
            <button className="gold-btn">SUBSCRIBE</button>
          </div>
        </div>
        <div className="footer-main">
          <div className="footer-col">
            <small style={{ color: '#6b7280' }}>Charter</small>
            <a href="#">Fleet</a>
            <a href="#">Empty Legs</a>
          </div>
          <div className="footer-col">
            <small style={{ color: '#6b7280' }}>Services</small>
            <a href="#">Concierge</a>
            <a href="#">Catering</a>
          </div>
          <div className="footer-col">
            <small style={{ color: '#6b7280' }}>Legal</small>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <div className="footer-col">
            <a href="#">INSTAGRAM ↗</a>
            <a href="#">LINKEDIN ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 SkyVista</span>
          <span>ALL FLIGHTS SUBJECT TO AVAILABILITY</span>
        </div>
                  <div className="footer-skyvista">
          <h1 className="footer-skyvista-text">SKYVISTA</h1>
        </div>
      </footer>
      
    </>
  );
}

export default App;