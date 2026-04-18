import React, { useState } from 'react';
import './index.css';

function App() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle Kit (ConvertKit) Newsletter Signup
  const handleKitSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Success! Check your inbox for the first chapter.');
        setEmail('');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Stripe Checkout
  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout failed', data);
        alert('Checkout is not available right now. Please try again in a moment.');
      }
    } catch (error) {
      console.error('Checkout error', error);
      alert('Error connecting to the payment server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-wrapper">
      {/* Header */}
      <header className="main-header">
        <div className="container header-flex">
          <div className="logo">Tristian Walker</div>
          <nav className="nav-links">
            <a href="#book" className="nav-link">The Book</a>
            <a href="#advisory" className="btn btn-outline btn-sm">Advisory</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container grid-2">
          <div className="hero-text">
            <div className="creds-hero">
              Sydney Opera House • Carnegie Hall
            </div>
            <h1 className="h1-hero">
              The Quiet Line<span className="accent">.</span>
            </h1>
            <p className="hero-hook">
              From drift to direction — one honest reckoning at a time.
            </p>
            <p className="hero-subtext">
              Navigate your professional landscape with natural authority. Build real human connection and own your career path.
            </p>

            <div className="hero-ctas">
              <a href="#chapter" className="btn btn-primary">Read First Chapter Free</a>
              <div className="secondary-ctas">
                <span className="or-text">Or order from:</span>
                <div className="retailer-links">
                  <button onClick={handleStripeCheckout} className="btn-link" disabled={loading}>Order from Tristian</button>
                  <a href="https://amazon.com" target="_blank" rel="noopener noreferrer">Amazon</a>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-image-area">
            <div className="book-shadow-box">
              <img src="/assets/actual_book_cover.png" alt="The Quiet Line Book Cover" className="hero-book-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Logo Bar */}
      <div className="trust-bar">
        <div className="container trust-flex">
          <div className="trust-item">
            <span className="trust-val">15+</span>
            <span className="trust-label">Years of Strategic Leadership</span>
          </div>
          <div className="trust-item">
            <span className="trust-val">Advisor</span>
            <span className="trust-label">To Industry Executives</span>
          </div>
        </div>
      </div>

      {/* Premise Section */}
      <section id="book" className="section-py premise-section">
        <div className="container">
          <div className="max-w-800">
            <span className="tagline">The Premise</span>
            <h2 className="section-title">Some careers don't collapse — they quietly drift.</h2>
            <div className="premise-content">
              <p>One compromise, one missed signal, one season of "keeping your head down," and suddenly you're somewhere you never chose to be. <em>The Quiet Line</em> follows one man's honest reckoning with professional drift, the relationships he neglected, and the slow, unglamorous work of finding his way back.</p>
              <p>It reads like fiction. It lands like a mirror. If you've ever felt capable but disconnected—succeeding by every external metric but failing the internal one—this story is for you.</p>

              <div className="who-it-is-for">
                <h3>Who this is for:</h3>
                <p>The high-performer who feels like they've lost their "natural authority" in a transactional world.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Ideas */}
      <section className="section-py ideas-section">
        <div className="container">
          <div className="ideas-grid">
            <div className="idea-card">
              <span className="idea-num">01</span>
              <h3>Professional Drift</h3>
              <p>How we slowly trade our agency for comfort, and how to spot the "Quiet Line" before it's too late.</p>
            </div>
            <div className="idea-card">
              <span className="idea-num">02</span>
              <h3>Natural Authority</h3>
              <p>Why true leadership isn't about volume or title, but about the depth of your presence and connection.</p>
            </div>
            <div className="idea-card">
              <span className="idea-num">03</span>
              <h3>Disciplined Range</h3>
              <p>Lessons from the world's most iconic stages applied to the modern professional landscape.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-py reviews-section">
        <div className="container">
          <h2 className="section-title text-center">Early Reader Reckonings.</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <p className="review-text">"The first book that actually made me look at my career path and go 'Wait, how did I get here?' A profound mirror for any modern professional."</p>
              <div className="reviewer">
                <strong>— Sarah J.</strong>
                <span>Healthcare Executive</span>
              </div>
            </div>
            <div className="review-card">
              <p className="review-text">"Tristian's perspective on connection is the antidote to the transactional networking culture that's burning us all out."</p>
              <div className="reviewer">
                <strong>— Michael R.</strong>
                <span>Strategic Partnerships</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio / Story Section */}
      <section className="section-py story-section" id="story">
        <div className="container grid-2">
          <div className="story-image">
             <img src="/assets/tristian-portrait.jpg" alt="Tristian Walker" className="author-img" />
          </div>
          <div className="story-content">
            <span className="tagline">About Tristian Walker</span>
            <h2 className="section-title">A Life of Discipline & Range.</h2>
            <p className="story-p">
              Tristian Walker is a seasoned executive with deep experience in strategic partnerships across the healthcare industry. He operates at the intersection of operations, growth, and relationship development, helping organizations navigate complex systems with clarity and alignment.
            </p>
            <p className="story-p">
              Beyond the boardroom, Tristian has performed as a professional vocalist on the world's most iconic stages, including the Sydney Opera House and Carnegie Hall. This range allows him to bring emotional intelligence and composure to high-stakes professional moments.
            </p>
            <a href="mailto:tristian@tristianwalker.com" className="btn btn-outline">Inquire About Advisory</a>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section id="chapter" className="lead-capture-section section-py">
        <div className="container">
          <div className="capture-card">
            <div className="capture-text">
              <h2 className="h2-card">Read the first chapter free.</h2>
              <p>No commitment. No pitch. Just the start of the story. Deliver it directly to your inbox.</p>
            </div>
            <form className="capture-form" onSubmit={handleKitSignup}>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Me Chapter One'}
              </button>
            </form>
            {message && <p className={`status-msg ${message.includes('Success') ? 'success' : 'error'}`}>{message}</p>}
            <p className="privacy-note">Private & secure. I value your inbox as much as my own.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer section-py">
        <div className="container">
          <div className="footer-flex">
            <div className="footer-brand">
              <div className="logo-footer">Tristian Walker</div>
              <p>Guiding professionals to natural self-agency.</p>
            </div>
            <div className="footer-contact">
              <a href="mailto:tristian@tristianwalker.com">tristian@tristianwalker.com</a>
              <div className="social-links">
                <a href="https://linkedin.com">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <nav className="footer-nav">
              <a href="/privacy">Privacy Policy</a>
              <a href="/contact">Contact</a>
            </nav>
            <p>&copy; 2026 Tristian Walker. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .site-wrapper { min-height: 100vh; }
        .max-w-800 { max-width: 800px; margin: 0 auto; }
        .text-center { text-align: center; }

        .main-header { padding: 1.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .header-flex { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.25rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .btn-sm { padding: 0.5rem 1.25rem; font-size: 0.85rem; }

        .hero-section { background: linear-gradient(135deg, #fff 0%, #fcf9f5 100%); padding: 6rem 0; }
        .hero-text { max-width: 600px; }
        .accent { color: var(--accent-primary); }
        .hero-hook { font-size: 1.35rem; font-style: italic; color: var(--accent-primary); margin-bottom: 1.5rem; font-family: var(--font-heading); }
        .hero-subtext { font-size: 1.15rem; color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.8; }

        .hero-ctas { display: flex; flex-direction: column; gap: 1.5rem; }
        .secondary-ctas { display: flex; align-items: center; gap: 1rem; }
        .or-text { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); }
        .retailer-links { display: flex; gap: 1rem; font-weight: 700; font-size: 0.9rem; align-items: center; }
        .btn-link { background: none; border: none; padding: 0; color: inherit; text-decoration: underline; font: inherit; cursor: pointer; transition: color 0.2s; }
        .btn-link:hover { color: var(--accent-primary); }
        .btn-link:disabled { opacity: 0.5; cursor: not-allowed; }

        .hero-image-area { display: flex; justify-content: center; }
        .book-shadow-box {
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
          border-radius: 4px;
          transition: transform 0.4s ease;
          max-width: 400px;
        }
        .book-shadow-box:hover { transform: translateY(-10px); }

        .trust-bar { background: var(--bg-dark); padding: 3rem 0; color: white; border-top: 5px solid var(--accent-primary); }
        .trust-flex { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 2rem; }
        .trust-item { text-align: center; }
        .trust-val { display: block; font-size: 2.5rem; font-weight: 300; font-family: var(--font-heading); margin-bottom: 0.25rem; }
        .trust-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: #A8A196; }

        .premise-content p { font-size: 1.2rem; margin-bottom: 1.5rem; line-height: 1.8; color: var(--text-muted); }
        .who-it-is-for { background: var(--bg-surface); padding: 2rem; border-left: 4px solid var(--accent-primary); margin-top: 3rem; }
        .who-it-is-for h3 { margin-bottom: 0.5rem; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .who-it-is-for p { font-size: 1.1rem; margin: 0; }

        .ideas-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; }
        .idea-card { padding: 3rem; background: white; border-radius: 12px; box-shadow: var(--shadow-sm); border: 1px solid rgba(0,0,0,0.03); }
        .idea-num { display: block; font-size: 0.9rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 1rem; opacity: 0.5; }
        .idea-card h3 { margin-bottom: 1rem; }
        .idea-card p { color: var(--text-muted); font-size: 1rem; }

        .reviews-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 4rem; }
        .review-card { padding: 3rem; background: var(--bg-surface); border-radius: 12px; font-style: italic; }
        .review-text { font-size: 1.15rem; margin-bottom: 2rem; line-height: 1.8; }
        .reviewer { display: flex; flex-direction: column; font-style: normal; }
        .reviewer strong { color: var(--text-main); font-size: 1rem; }
        .reviewer span { font-size: 0.85rem; color: var(--text-muted); }

        .author-img { border-radius: 12px; box-shadow: var(--shadow-lg); }
        .story-p { margin-bottom: 1.5rem; color: var(--text-muted); line-height: 1.8; }

        .lead-capture-section { background: var(--accent-warm); }
        .capture-card {
          background: white;
          padding: 4rem;
          border-radius: 16px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          box-shadow: var(--shadow-md);
        }
        .h2-card { margin-bottom: 1rem; font-size: 2.5rem; }
        .capture-form { display: flex; gap: 1rem; margin: 2rem 0; justify-content: center; }
        .status-msg { margin-bottom: 1rem; font-weight: 700; font-size: 0.9rem; }
        .status-msg.success { color: #2e7d32; }
        .status-msg.error { color: #d32f2f; }
        .input-field {
          padding: 1rem 1.5rem;
          border: 1.5px solid #ddd;
          border-radius: 6px;
          min-width: 300px;
          font-family: var(--font-main);
        }
        .privacy-note { font-size: 0.85rem; color: var(--text-muted); }

        .footer { background: #24211D; color: #A8A196; border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-flex { display: flex; justify-content: space-between; margin-bottom: 4rem; }
        .logo-footer { color: white; margin-bottom: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2rem; display: flex; justify-content: space-between; font-size: 0.85rem; }
        .footer-nav { display: flex; gap: 2rem; }

        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hero-text { text-align: center; }
          .hero-ctas { align-items: center; }
          .secondary-ctas { flex-direction: column; }
          .capture-form { flex-direction: column; }
          .input-field { min-width: 100%; }
          .footer-flex { flex-direction: column; gap: 3rem; text-align: center; }
          .footer-bottom { flex-direction: column; gap: 1.5rem; text-align: center; }
          .footer-nav { justify-content: center; }
        }
      `}</style>
    </div>
  );
}

export default App;
