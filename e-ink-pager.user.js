// ==UserScript==
// @name         E-Ink Pager
// @namespace    https://github.com/pschu13r/e-ink-pager
// @version      1.3
// @description  Adds up/down buttons that turn web pages one screen at a time, without scroll animation. For reading on e-ink devices.
// @homepageURL  https://github.com/pschu13r/e-ink-pager
// @match        https://www.heise.de/select/*
// @updateURL    https://raw.githubusercontent.com/pschu13r/e-ink-pager/main/e-ink-pager.user.js
// @downloadURL  https://raw.githubusercontent.com/pschu13r/e-ink-pager/main/e-ink-pager.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

// More sites: add your own @match lines, or better, add them as
// "User matches" in the Tampermonkey/Violentmonkey script settings.
// Those entries are kept on updates.

(function () {
  'use strict';

  const OVERLAP = 0.10; // share of the screen height that stays visible after a page turn
  const SIZE = 54;      // button size in px
  const GAP = 16;       // gap to the screen edge and between the buttons, in px

  function turn(dir) {
    const step = window.innerHeight * (1 - OVERLAP);
    window.scrollBy({ top: dir * step, behavior: 'instant' });
  }

  function addButton(label, bottom, dir) {
    const b = document.createElement('button');
    b.textContent = label;
    Object.assign(b.style, {
      position: 'fixed', right: GAP + 'px', bottom: bottom + 'px',
      zIndex: '2147483647', width: SIZE + 'px', height: SIZE + 'px',
      fontSize: Math.round(SIZE * 0.55) + 'px', lineHeight: '1', padding: '0',
      background: '#fff', color: '#000',
      border: '3px solid #000', borderRadius: '9px',
      opacity: '0.85', touchAction: 'manipulation'
    });
    b.addEventListener('click', e => { e.preventDefault(); turn(dir); });
    document.body.appendChild(b);
  }

  addButton('▲', GAP + SIZE + GAP, -1);
  addButton('▼', GAP, 1);
})();