import Credit from './Credit.jsx'

// Markup of the invitation (converted from the original page).
export default function Page() {
  return (
    <>
      <div id="opening" className="opening v-envelope-opening" aria-label="Tap the wax seal to open the wedding invitation">
        <img className="opening-bg" src="assets/opening-envelope.webp" alt="Cream and gold wedding envelope with a burgundy wax seal" />
        <img className="opening-v-half opening-v-top" src="assets/opening-envelope.webp" alt="" aria-hidden="true" />
        <img className="opening-v-half opening-v-bottom" src="assets/opening-envelope.webp" alt="" aria-hidden="true" />
        <div className="opening-quote">
          Some stories are written in the stars,<br />
          <span>and ours is just beginning.</span>
        </div>
        <button id="openSeal" className="seal-hotspot" aria-label="Tap the seal to open invitation">
          <span className="sr-only">Tap the Seal to Open</span>
        </button>
        <div className="seal-prompt">Tap the Seal<br />to Open</div>
        <div className="opening-hint">{"A celebration of love · Navya Teja & Sirisha"}</div>
      </div>

      <main id="invitation" className="invitation" aria-hidden="true">
        <button id="musicToggle" className="music-toggle" aria-label="Turn music off" title="Turn music off" hidden>
          <span className="music-icon" aria-hidden="true">♫</span>
          <span className="music-state" aria-hidden="true"></span>
        </button>
        <audio id="backgroundMusic" src="assets/wedding-bgm.mp3" preload="auto" loop playsInline></audio>

        <section id="intro" className="section intro" aria-label="Wedding introduction">
          <div className="intro-copy">
            <div className="together">TOGETHER</div>
            <div className="ornament intro-divider">
              <img src="assets/burgundy-lotus-divider.png" alt="" aria-hidden="true" />
            </div>
            <div className="beautiful">A BEAUTIFUL BEGINNING</div>
            <div className="invite-lines">We invite you to<br />celebrate the wedding of</div>
            <h1 className="couple-name intro-name">
              <span className="name-line">Navya Teja</span>
              <span className="amp-line">
                <span className="amp-flourish"></span>
                <span className="amp-char">{"&"}</span>
                <span className="amp-flourish"></span>
              </span>
              <span className="name-line">Sirisha</span>
            </h1>
            <div className="date-rolling" aria-label="November 18 2026">
              <span className="date-label">NOVEMBER</span>
              <span className="rolling-number" data-final="18">00</span>
              <span className="rolling-year" data-final="2026">0000</span>
            </div>

            <div className="wedding-details-intro">
              <p className="wedding-intro-time">WEDNESDAY · MUHURTHAM 9:01 PM</p>
              <p className="wedding-intro-venue">Behara Palace Kalyana Vedika</p>
              <p className="wedding-intro-address">Near Tholi Pavancha, Simhachalam, Vizag</p>
            </div>
          </div>
          <img className="couple-feet" src="assets/couple-feet-transparent.webp" alt="Traditional bride and groom feet illustration" />
          <div className="scroll-cue" aria-hidden="true">{"SCROLL TO EXPLORE "}<span>⌄</span></div>
        </section>

        <section id="blessings" className="section blessings" aria-label="Parents and family blessings">
          <div className="blessings-copy">
            <img className="ganesha" src="assets/ganesha-transparent.webp" alt="Burgundy outline illustration of Lord Ganesha" />
            <div className="eyebrow">WITH THE BLESSINGS OF<br />OUR BELOVED PARENTS</div>
            <p className="parent-names">
              <span className="parent-line">Mr. Matta Venkata Ramana &amp; Mrs. Asha Devi</span>
              <small style={{ display: 'block', fontSize: '0.78em', marginTop: '3px' }}>(Parents of the Groom)</small>
            </p>
            <div className="ornament">
              <img src="assets/burgundy-lotus-divider.png" alt="" aria-hidden="true" />
            </div>
            <p className="parent-names">
              <span className="parent-line">Mr. Vasamsetti Venkateswara Rao &amp; Mrs. Nagaveni</span>
              <small style={{ display: 'block', fontSize: '0.78em', marginTop: '3px' }}>(Parents of the Bride)</small>
            </p>
            <p className="blessing-line">whose love shaped us and whose blessings guide us.</p>
            <div className="ornament">
              <img src="assets/burgundy-lotus-divider.png" alt="" aria-hidden="true" />
            </div>
            <div className="family-couple">
              <span className="name-line">Navya Teja</span>
              <span className="amp-line">{"&"}</span>
              <span className="name-line">Sirisha</span>
            </div>
          </div>
        </section>

        {/* Reception Slide */}
        <section id="reception" className="section reception" aria-label="Wedding reception invitation">
          <div className="sky-copy">
            <div className="eyebrow">TOGETHER WITH OUR FAMILIES<br />WE JOYFULLY INVITE YOU TO OUR</div>
            <h2 className="script-heading reception-heading">Wedding Reception</h2>
            <div className="reception-message">An evening of love, laughter, music,<br />and the start of our forever.</div>
            <div className="ornament">
              <img src="assets/burgundy-lotus-divider.png" alt="" aria-hidden="true" />
            </div>
            <div className="reception-date">
              21<sup>ST</sup>{" NOVEMBER 2026,"}<br />SATURDAY
            </div>
            <div className="reception-time">7:00 PM ONWARDS</div>
            <div className="venue-name">RR Gardens</div>
            <p className="venue-address">Poranki - Nidamanuru Road,<br />Poranki, Vijayawada</p>
            <div className="venue-actions" style={{ marginTop: '0.8rem' }}>
              <a className="directions-button" href="https://maps.app.goo.gl/32kP8CBTdWvRp1af7?g_st=iw" target="_blank" rel="noopener noreferrer">⌖ &nbsp; Tap for Directions</a>
              <a className="directions-button contact-button" href="tel:9666906677">☏ &nbsp; Contact: +91 9666906677</a>
            </div>
          </div>
        </section>

        <section id="closing" className="section closing" aria-label="Closing message">
          <div className="closing-copy">
            <p>{"We can't wait to"}<br />celebrate with you.</p>
            <p>Come with love and<br />leave with sweet memories.</p>
            <div className="ornament">
              <img src="assets/burgundy-lotus-divider.png" alt="" aria-hidden="true" />
            </div>
            <div className="with-love">With love,</div>
            <div className="closing-names">
              <span className="name-line">Navya Teja</span>
              <span className="amp-line">{"&"}</span>
              <span className="name-line">Sirisha</span>
            </div>
          </div>
        </section>

        <footer className="site-footer" aria-label="Invitation credits">
          <p className="footer-credit">Made with love by</p>
          <div style={{ marginTop: '0.2rem', fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--burgundy)', fontFamily: "'Playfair Display', sans-serif", opacity: 0.88 }}>
            <Credit />
          </div>
        </footer>
      </main>
    </>
  )
}
