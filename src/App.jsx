import React, { useState } from 'react';
import './index.css';

function App() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const year = new Date().getFullYear();

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
          <div className="logo" aria-label="Tristian Walker">Tristian Walker</div>
          <nav className="nav-links" aria-label="Primary">
            <a href="#book" className="nav-link">The Book</a>
            <a href="#reviews" className="nav-link">Reviews</a>
            <a href="#author" className="nav-link">About</a>
            <a href="#chapter" className="btn btn-outline btn-sm">Chapter One, Free</a>
          </nav>
        </div>
      </header>

      {/* Hero Section — updated copy from the UI kit */}
      <section className="hero-section">
        <div className="container grid-2">
          <div className="hero-text">
            <div className="creds-hero">
              Sydney Opera House · Carnegie Hall
            </div>
            <h1 className="h1-hero">
              Some careers don't collapse —<br />
              they <span className="accent-italic">quietly drift</span>.
            </h1>
            <p className="hero-hook">
              A book for the operator who still shows up — and can't remember the last meeting that moved her.
            </p>
            <p className="hero-subtext">
              Read it in an evening; spend a season coming back from the line you didn't know you crossed.
            </p>

            <div className="hero-ctas">
              <a href="#chapter" className="btn btn-primary">Read Chapter One, Free</a>
              <div className="secondary-ctas">
                <span className="or-text">Or order from:</span>
                <div className="retailer-links">
                  <button
                    onClick={handleStripeCheckout}
                    className="btn-link"
                    disabled={loading}
                    type="button"
                  >
                    Order from Tristian
                  </button>
                  <a href="https://amazon.com" target="_blank" rel="noopener noreferrer">Amazon</a>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-image-area">
            <div className="book-shadow-box">
              <img
                src="/assets/actual_book_cover.jpg"
                alt="The Quiet Line — a book by Tristian Walker"
                className="hero-book-cover"
                width="1066"
                height="1600"
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar — 20 / 20 / 4 pillars with coda */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-flex">
            <div className="trust-item">
              <span className="trust-val">20<span className="trust-unit">yrs</span></span>
              <span className="trust-label">In hospitality</span>
            </div>
            <div className="trust-item">
              <span className="trust-val">20<span className="trust-unit">yrs</span></span>
              <span className="trust-label">In the Executive Suite</span>
            </div>
            <div className="trust-item">
              <span className="trust-val">4<span className="trust-unit">yrs</span></span>
              <span className="trust-label">Spent on this book</span>
            </div>
          </div>
          <p className="trust-coda">Two careers, one equation — and a book four years in the making.</p>
        </div>
      </div>

      {/* Manuscript Excerpt */}
      <section className="excerpt-section">
        <div className="container container-narrow">
          <div className="excerpt-meta">
            <span className="excerpt-eyebrow">Manuscript Excerpt</span>
            <span className="excerpt-page">p. 14</span>
          </div>
          <div className="excerpt-body">
            <div className="excerpt-margin-note">— the part I had to stop and re-read twice.</div>
            <blockquote className="excerpt-quote">
              "The drift never announces itself. It just arrives <em>one email at a time</em>, one nod in a meeting you didn't actually attend, until the person your calendar describes is no longer the person you meant to be."
            </blockquote>
            <div className="excerpt-sig">Page 14 · Chapter One</div>
          </div>
        </div>
      </section>

      {/* Premise */}
      <section id="book" className="section-py premise-section">
        <div className="container">
          <div className="grid-2 premise-grid">
            <div>
              <span className="tagline">The Premise</span>
              <h2 className="section-title">
                The foundation <span className="accent-italic">is character</span>.
              </h2>
            </div>
            <div className="premise-content">
              <p>There is a quiet line most high-performers cross without noticing. On one side, you are engaged — opinionated, present, trusted. On the other, you are capable but disconnected. Competent, but absent.</p>
              <p>This book is not about burnout. It is about drift. And how to come back from it.</p>

              <div className="who-it-is-for">
                <h3>Who this is for</h3>
                <p>The high-performer who feels like they've lost their "natural authority" in a transactional world.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segments of the Book */}
      <section className="section-py segments-section">
        <div className="container">
          <div className="segments-head">
            <span className="tagline">Inside the Book</span>
            <h2 className="section-title">
              Three segments. One <span className="accent-italic">honest reckoning</span>.
            </h2>
          </div>
          <div className="segments-grid">
            <div className="segment-card">
              <span className="segment-num">Segment 01</span>
              <h3>Professional Drift</h3>
              <p>How we slowly trade our agency for comfort. Spot the quiet line before it's too late to see it.</p>
            </div>
            <div className="segment-card">
              <span className="segment-num">Segment 02</span>
              <h3>The Surgical Distinction</h3>
              <p>Motion is when you are tired. Movement is when you are somewhere new at the end of it.</p>
            </div>
            <div className="segment-card">
              <span className="segment-num">Segment 03</span>
              <h3>The Reframe</h3>
              <p>Natural authority. Disciplined range. The return to the part of you that knew why you started.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey — Drift / Collapse / Return */}
      <section className="section-py journey-section">
        <div className="container">
          <div className="journey-head">
            <span className="tagline">The Transformation</span>
            <h2 className="section-title">
              Watch Terrence's <span className="accent-italic">journey</span> unfold.
            </h2>
            <p className="journey-sub">One year. Three reckonings. A man confronting who he's become.</p>
          </div>
          <div className="journey-grid">
            <div className="journey-panel">
              <div className="journey-img">
                <img
                  src="/assets/executive-flatlay.jpg"
                  alt="A pressed cream shirt, leather portfolio, gold watch, phone, and whiskey glass laid out on a warm wood desk."
                  loading="lazy"
                  decoding="async"
                  width="1408"
                  height="768"
                />
              </div>
              <div className="journey-label">The Drift</div>
              <p>The calendar looked full. The suit was pressed. The glass was always within reach. Terrence had everything a man was supposed to want — and somewhere inside all of it, quietly, he stopped being able to feel any of it.</p>
            </div>
            <div className="journey-panel">
              <div className="journey-img">
                <img
                  src="/assets/reckoning-window.jpg"
                  alt="A man in a hospital gown standing at a window, palms pressed against the glass, looking out at the world still moving without him."
                  loading="lazy"
                  decoding="async"
                  width="1264"
                  height="848"
                />
              </div>
              <div className="journey-label">The Collapse</div>
              <p>He woke up in a room he did not choose, breathing on a schedule he did not set. Outside the window, the world was still moving. He pressed his hands against the glass and measured the distance.</p>
            </div>
            <div className="journey-panel">
              <div className="journey-img">
                <img
                  src="/assets/drift-doorway.jpg"
                  alt="A man in loungewear standing in an open front doorway in the morning light, a child's backpack hanging on the hook beside him."
                  loading="lazy"
                  decoding="async"
                  width="1264"
                  height="848"
                />
              </div>
              <div className="journey-label">The Return</div>
              <p>Return is not a moment. It is a Tuesday morning. An open door. The particular weight of a child's backpack hanging on a hook beside you. Terrence learned that survival was not the reward. What he came back to was.</p>
            </div>
          </div>
          <p className="journey-coda">From drift to collapse to return — a story of triumph through presence.</p>
        </div>
      </section>

      {/* Reviews — richer grid from the UI kit */}
      <section id="reviews" className="section-py reviews-section">
        <div className="container">
          <div className="reviews-head">
            <span className="tagline">Early Readers</span>
            <h2 className="section-title">
              What the <span className="accent-italic">advance copies</span> said.
            </h2>
          </div>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-outlet">★★★★★ · Advance review</div>
              <blockquote>"A rare book about working life that refuses both the cheerleading and the cynicism. Walker writes the way a good doctor talks — calmly, precisely, and as though he has actually seen the thing he is describing."</blockquote>
              <div className="review-who">Advance reader</div>
              <div className="review-role">Early galley</div>
            </div>
            <div className="review-card">
              <div className="review-outlet">Editorial</div>
              <blockquote>"The Quiet Line names a thing most managers have felt and almost none have been willing to write down. It will be in a lot of suitcases this summer."</blockquote>
              <div className="review-who">Pilita Clark</div>
              <div className="review-role">Editor · Work &amp; Careers</div>
            </div>
            <div className="review-card">
              <div className="review-outlet">Podcast</div>
              <blockquote>"I annotated the margins of my galley so aggressively my partner asked who I was fighting with."</blockquote>
              <div className="review-who">Adam Grant</div>
              <div className="review-role">Organizational psychologist</div>
            </div>
            <div className="review-card">
              <div className="review-outlet">Private note</div>
              <blockquote>"I gave this to three people on my leadership team before it was even bound. Two of them have quietly, productively, changed how they run their departments since."</blockquote>
              <div className="review-who">Dr. Aisha N. Okafor</div>
              <div className="review-role">Chief of Surgery</div>
            </div>
            <div className="review-card">
              <div className="review-outlet">Advance reader</div>
              <blockquote>"There are career books that teach you to perform better. This one asks, more quietly, whether you've forgotten what you were performing for."</blockquote>
              <div className="review-who">Rufus Griscom</div>
              <div className="review-role">Publisher &amp; host</div>
            </div>
            <div className="review-card">
              <div className="review-outlet">Podcast</div>
              <blockquote>"Walker's 'motion versus movement' distinction rewired how I ran my own week inside of 48 hours. I don't say that about many books."</blockquote>
              <div className="review-who">Amy Gallo</div>
              <div className="review-role">Contributing editor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio / Story */}
      <section className="section-py story-section" id="author">
        <div className="container grid-2">
          <div className="story-image">
            <img src="/assets/tristian-portrait.jpg" alt="Tristian Walker, author of The Quiet Line" className="author-img" width="800" height="1000" loading="lazy" />
          </div>
          <div className="story-content">
            <span className="tagline">About Tristian Walker</span>
            <h2 className="section-title">
              A career of leading, now a book of <span className="accent-italic">listening</span>.
            </h2>
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

      {/* FAQ */}
      <section className="section-py faq-section">
        <div className="container container-narrow">
          <div className="faq-head">
            <span className="tagline">Frequently Asked</span>
            <h2 className="section-title">
              What <span className="accent-italic">readers usually ask</span> before ordering.
            </h2>
          </div>
          <div className="faq-list">
            <details open>
              <summary>Is this another book about burnout?</summary>
              <div className="faq-ans">No. Burnout is the body giving up. <strong>Drift is the part of you that leads the body giving up first.</strong> This book is about the season before the crash — the one most operator-types are living in right now and don't have a word for.</div>
            </details>
            <details>
              <summary>How long is it, and how is it structured?</summary>
              <div className="faq-ans">A short read — designed to be finished in a single afternoon, or a single strong-reader session. It is meant to captivate your attention briefly, hold it, and invite you back to re-read and sit with the story again. The margins are intentionally wide; the book is written to be written in.</div>
            </details>
            <details>
              <summary>Is there an audiobook, an ebook, or a hardcover?</summary>
              <div className="faq-ans"><strong>Ebook:</strong> available now. <strong>Audiobook:</strong> in production. <strong>Hardcover:</strong> coming soon.</div>
            </details>
            <details>
              <summary>Do you do bulk orders for teams or leadership offsites?</summary>
              <div className="faq-ans">Yes. For bulk orders for teams or leadership offsites, please reach out directly to <a href="mailto:speaker@quietlinebook.com">speaker@quietlinebook.com</a>.</div>
            </details>
            <details>
              <summary>I'm a journalist or podcaster. Is there a press kit?</summary>
              <div className="faq-ans">Yes — high-res cover, three author portraits, a PDF galley, and a one-sheet available on request. <a href="mailto:tristian@tristianwalker.com">tristian@tristianwalker.com</a>; replies within two business days.</div>
            </details>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section id="chapter" className="lead-capture-section section-py">
        <div className="container">
          <div className="capture-card">
            <div className="capture-text">
              <h2 className="h2-card">Start with the <span className="accent-italic">first chapter</span>.</h2>
              <p>The 22-page opening chapter, delivered as a PDF to your inbox in under a minute. No follow-up sequence. I value your inbox as much as my own.</p>
            </div>
            <form className="capture-form" onSubmit={handleKitSignup} noValidate>
              <label htmlFor="chapter-email" className="visually-hidden">Your email address</label>
              <input
                id="chapter-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
                inputMode="email"
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Me Chapter One'}
              </button>
            </form>
            {message && (
              <p
                className={`status-msg ${message.includes('Success') ? 'success' : 'error'}`}
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}
            <p className="privacy-note">Private &amp; secure. I value your inbox as much as my own.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer section-py">
        <div className="container">
          <div className="footer-flex">
            <div className="footer-brand">
              <div className="logo-footer">Tristian Walker</div>
              <p>"From drift to direction — one honest reckoning at a time."</p>
            </div>
            <div className="footer-contact">
              <a href="mailto:tristian@tristianwalker.com">tristian@tristianwalker.com</a>
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <nav className="footer-nav" aria-label="Footer">
              <a href="/privacy">Privacy Policy</a>
              <a href="/contact">Contact</a>
            </nav>
            <p>© {year} Tristian Walker. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .site-wrapper { min-height: 100vh; }

        /* Header */
        .main-header { padding: 1.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .header-flex { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.25rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-link {
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-muted);
        }
        .nav-link:hover { color: var(--accent-primary); }

        /* Hero */
        .hero-section { background: linear-gradient(135deg, #fff 0%, #fcf9f5 100%); padding: 6rem 0; }
        .hero-text { max-width: 600px; }
        .h1-hero { text-wrap: balance; letter-spacing: -0.01em; }
        .hero-hook {
          font-size: 1.35rem;
          font-style: italic;
          color: var(--accent-primary);
          margin: 1.5rem 0 1rem;
          font-family: var(--font-heading);
          line-height: 1.4;
        }
        .hero-subtext {
          font-size: 1.15rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          line-height: 1.8;
          max-width: 520px;
        }
        .hero-ctas { display: flex; flex-direction: column; gap: 1.5rem; }
        .secondary-ctas { display: flex; align-items: center; gap: 1rem; }
        .or-text { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); }
        .retailer-links { display: flex; gap: 1rem; font-weight: 700; font-size: 0.9rem; align-items: center; }
        .btn-link {
          background: none; border: none; padding: 0;
          color: inherit; text-decoration: underline;
          font: inherit; cursor: pointer;
          transition: color 0.2s;
        }
        .btn-link:hover { color: var(--accent-primary); }
        .btn-link:disabled { opacity: 0.5; cursor: not-allowed; }
        .hero-image-area { display: flex; justify-content: center; }
        .book-shadow-box {
          box-shadow: var(--shadow-book);
          border-radius: 4px;
          transition: transform 0.4s ease;
          max-width: 400px;
          overflow: hidden;
        }
        .book-shadow-box:hover { transform: translateY(-10px); }

        /* Trust bar */
        .trust-bar {
          background: var(--bg-dark);
          padding: 3rem 0;
          color: white;
          border-top: 5px solid var(--accent-primary);
        }
        .trust-flex {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 2.5rem;
        }
        .trust-item { text-align: center; }
        .trust-val {
          display: inline-block;
          font-size: 3rem;
          font-weight: 300;
          font-family: var(--font-heading);
          line-height: 1;
          color: white;
        }
        .trust-unit {
          font-family: var(--font-main);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-left: 6px;
          vertical-align: 0.9em;
        }
        .trust-label {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-on-dark);
        }
        .trust-coda {
          max-width: 720px;
          margin: 2rem auto 0;
          text-align: center;
          font-family: var(--font-heading);
          font-style: italic;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.78);
        }

        /* Manuscript excerpt */
        .excerpt-section {
          background: var(--bg-parchment);
          padding: 5rem 0;
          border-top: 1px solid rgba(0,0,0,0.04);
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .excerpt-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .excerpt-eyebrow { color: var(--accent-primary); font-weight: 700; }
        .excerpt-body { position: relative; }
        .excerpt-margin-note {
          font-family: var(--font-heading);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--text-muted);
          border-left: 2px solid var(--accent-primary);
          padding-left: 1rem;
          margin-bottom: 1.5rem;
          max-width: 180px;
        }
        .excerpt-quote {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2.4vw, 1.8rem);
          line-height: 1.5;
          color: var(--text-main);
          border: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }
        .excerpt-quote em {
          color: var(--accent-primary);
          font-style: italic;
        }
        .excerpt-sig {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-subtle);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .excerpt-sig::before {
          content: "";
          width: 40px;
          height: 1px;
          background: var(--accent-primary);
          opacity: 0.5;
        }

        /* Premise */
        .premise-grid { align-items: start; }
        .premise-content p {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .who-it-is-for {
          background: var(--bg-surface);
          padding: 2rem;
          border-left: 4px solid var(--accent-primary);
          margin-top: 2rem;
        }
        .who-it-is-for h3 {
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--accent-primary);
        }
        .who-it-is-for p { font-size: 1.05rem; margin: 0; color: var(--text-main); }
        .section-title { font-size: clamp(2rem, 4vw, 3rem); }
        .section-title :global(.accent-italic) { color: var(--accent-primary); font-style: italic; }

        /* Segments */
        .segments-section { padding-top: 0; }
        .segments-head { text-align: center; margin-bottom: 3rem; }
        .segments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .segment-card {
          padding: 3rem;
          background: var(--bg-surface);
          border-radius: 12px;
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(0,0,0,0.03);
          transition: var(--transition-slow);
        }
        .segment-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }
        .segment-num {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 1rem;
        }
        .segment-card h3 { margin-bottom: 0.75rem; font-size: 1.35rem; }
        .segment-card p { color: var(--text-muted); line-height: 1.7; }

        /* Journey */
        .journey-section { background: var(--bg-parchment); }
        .journey-head { text-align: center; margin-bottom: 3rem; }
        .journey-sub {
          color: var(--text-muted);
          font-size: 1.05rem;
          margin-top: 0.5rem;
        }
        .journey-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        .journey-panel { display: flex; flex-direction: column; }
        .journey-img {
          aspect-ratio: 3 / 4;
          border-radius: 2px;
          overflow: hidden;
          position: relative;
          box-shadow:
            0 20px 40px -20px rgba(45,41,37,0.28),
            0 4px 12px -4px rgba(45,41,37,0.15);
          margin-bottom: 1.25rem;
          background: linear-gradient(160deg, #b89a7a 0%, #7a5f47 55%, #3d2f23 100%);
        }
        .journey-img::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(180deg,
            rgba(188,116,78,0.06) 0%,
            transparent 35%,
            rgba(45,41,37,0.22) 100%);
          pointer-events: none;
        }
        .journey-img img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.2s var(--ease-levitate);
        }
        .journey-panel:hover .journey-img img { transform: scale(1.03); }
        .journey-label {
          font-family: var(--font-main);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 0.75rem;
        }
        .journey-panel p {
          color: var(--text-muted);
          line-height: 1.7;
          font-size: 0.95rem;
        }
        .journey-coda {
          text-align: center;
          margin-top: 3rem;
          font-family: var(--font-heading);
          font-style: italic;
          color: var(--text-muted);
          font-size: 1.05rem;
        }

        /* Reviews */
        .reviews-head { text-align: center; margin-bottom: 3rem; }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.75rem;
        }
        .review-card {
          padding: 2.5rem;
          background: var(--bg-surface);
          border-radius: 12px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
        }
        .review-outlet {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 1rem;
        }
        .review-card blockquote {
          font-size: 1rem;
          font-style: italic;
          line-height: 1.7;
          color: var(--text-main);
          margin: 0 0 1.5rem;
          padding: 0;
          border: none;
          flex: 1;
        }
        .review-who { font-weight: 700; font-size: 0.95rem; color: var(--text-main); }
        .review-role { font-size: 0.85rem; color: var(--text-muted); margin-top: 2px; }

        /* Story */
        .story-section { background: var(--bg-warm); }
        .author-img { border-radius: 12px; box-shadow: var(--shadow-lg); }
        .story-p { margin-bottom: 1.25rem; color: var(--text-muted); line-height: 1.8; }

        /* FAQ */
        .faq-head { text-align: center; margin-bottom: 3rem; }
        .faq-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .faq-list details {
          background: var(--bg-surface);
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .faq-list summary {
          padding: 1.25rem 1.5rem;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .faq-list summary::after {
          content: "+";
          color: var(--accent-primary);
          font-weight: 300;
          font-size: 1.5rem;
          transition: transform 0.2s;
        }
        .faq-list details[open] summary::after { transform: rotate(45deg); }
        .faq-list summary::-webkit-details-marker { display: none; }
        .faq-ans {
          padding: 0 1.5rem 1.5rem;
          color: var(--text-muted);
          line-height: 1.7;
        }
        .faq-ans a { color: var(--accent-primary); text-decoration: underline; }

        /* Lead capture */
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
        .h2-card { margin-bottom: 1rem; font-size: clamp(1.8rem, 3vw, 2.5rem); }
        .capture-form { display: flex; gap: 1rem; margin: 2rem 0 0.5rem; justify-content: center; }
        .status-msg { margin: 1rem 0 0; font-weight: 700; font-size: 0.9rem; }
        .status-msg.success { color: #2e7d32; }
        .status-msg.error { color: #d32f2f; }
        .input-field {
          padding: 1rem 1.5rem;
          border: 1.5px solid #ddd;
          border-radius: 6px;
          min-width: 300px;
          font-family: var(--font-main);
          font-size: 1rem;
          background: #fff;
        }
        .input-field:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px var(--accent-soft);
        }
        .privacy-note { font-size: 0.85rem; color: var(--text-muted); margin-top: 1rem; }

        /* Footer */
        .footer { background: #24211D; color: var(--text-on-dark); border-top: 1px solid rgba(255,255,255,0.05); padding: 4rem 0 2rem; }
        .footer-flex { display: flex; justify-content: space-between; margin-bottom: 3rem; }
        .logo-footer {
          color: white;
          margin-bottom: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        .footer-brand p { font-style: italic; font-family: var(--font-heading); }
        .footer-contact { display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-end; }
        .social-links { display: flex; gap: 1.25rem; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }
        .footer-nav { display: flex; gap: 2rem; }

        /* Responsive */
        @media (max-width: 900px) {
          .reviews-grid, .segments-grid { grid-template-columns: 1fr; }
          .journey-grid { grid-template-columns: 1fr; gap: 3rem; }
          .premise-grid { text-align: left; }
          .footer-contact { align-items: flex-start; }
        }
        @media (max-width: 768px) {
          .nav-links { gap: 1rem; }
          .nav-link { display: none; }
          .hero-text { text-align: center; margin: 0 auto; }
          .hero-subtext { margin-left: auto; margin-right: auto; }
          .hero-ctas { align-items: center; }
          .secondary-ctas { flex-direction: column; }
          .capture-form { flex-direction: column; }
          .input-field { min-width: 100%; }
          .footer-flex { flex-direction: column; gap: 2rem; text-align: center; }
          .footer-contact { align-items: center; }
          .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
          .footer-nav { justify-content: center; }
          .capture-card { padding: 2.5rem 1.5rem; }
        }
      `}</style>
    </div>
  );
}

export default App;
