// ==UserScript==
// @name         E-Ink Pager
// @namespace    https://github.com/pschu13r/e-ink-pager
// @version      1.41
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
  const SIZE = 72;      // button size in px
  const GAP = 16;       // gap to the screen edge and between the buttons, in px

  const vv = window.visualViewport;

  function turn(dir) {
    const height = vv ? vv.height : window.innerHeight;
    window.scrollBy({ top: dir * height * (1 - OVERLAP), behavior: 'instant' });
    place();    // reposition now ...
    schedule(); // ... and again once the browser has settled the viewport
  }

  // The container is a 0x0 anchor at the bottom-right corner of the visible
  // area (visual viewport). On pinch zoom it moves along and scales inversely,
  // so the buttons keep their size and stay in the bottom-right corner.
  // Without zoom it is fixed. With zoom it is absolute in document
  // coordinates: in Gecko (Firefox, Fennec) fixed elements follow the layout
  // viewport, which drifts away from the visible area after a page turn.
  const box = document.createElement('div');
  Object.assign(box.style, {
    position: 'fixed', left: '0', top: '0', width: '0', height: '0',
    zIndex: '2147483647', transformOrigin: '0 0'
  });

  function addButton(label, bottom, dir) {
    const b = document.createElement('button');
    b.textContent = label;
    Object.assign(b.style, {
      position: 'absolute', right: GAP + 'px', bottom: bottom + 'px',
      width: SIZE + 'px', height: SIZE + 'px',
      fontSize: Math.round(SIZE * 0.55) + 'px', lineHeight: '1', padding: '0', margin: '0',
      background: '#fff', color: '#000',
      border: '3px solid #000', borderRadius: Math.round(SIZE / 6) + 'px',
      opacity: '0.85', touchAction: 'manipulation', boxSizing: 'border-box'
    });
    b.addEventListener('click', e => { e.preventDefault(); turn(dir); });
    box.appendChild(b);
  }

  addButton('▲', GAP + SIZE + GAP, -1);
  addButton('▼', GAP, 1);
  document.documentElement.appendChild(box);

  let queued = false;
  function place() {
    queued = false;
    if (vv && Math.abs(vv.scale - 1) > 0.01) {
      const left = vv.pageLeft !== undefined ? vv.pageLeft : window.scrollX + vv.offsetLeft;
      const top = vv.pageTop !== undefined ? vv.pageTop : window.scrollY + vv.offsetTop;
      box.style.position = 'absolute';
      box.style.transform = `translate(${left + vv.width}px, ${top + vv.height}px) scale(${1 / vv.scale})`;
    } else {
      const x = vv ? vv.offsetLeft + vv.width : window.innerWidth;
      const y = vv ? vv.offsetTop + vv.height : window.innerHeight;
      box.style.position = 'fixed';
      box.style.transform = `translate(${x}px, ${y}px)`;
    }
  }
  function schedule() {
    if (!queued) { queued = true; requestAnimationFrame(place); }
  }

  if (vv) {
    vv.addEventListener('resize', schedule);
    vv.addEventListener('scroll', schedule);
  }
  window.addEventListener('resize', schedule);
  window.addEventListener('scroll', schedule, { passive: true });
  place();
})();
