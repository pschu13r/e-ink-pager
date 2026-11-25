// ==UserScript==
// @name         E-Ink Pager
// @namespace    https://github.com/pschu13r/e-ink-pager
// @version      1.2
// @description  Blendet Auf/Ab-Buttons ein und blättert seitenweise ohne Animation. Für Webseiten auf E-Ink-Readern.
// @homepageURL  https://github.com/pschu13r/e-ink-pager
// @match        https://www.heise.de/select/*
// @updateURL    https://raw.githubusercontent.com/pschu13r/e-ink-pager/main/e-ink-pager.user.js
// @downloadURL  https://raw.githubusercontent.com/pschu13r/e-ink-pager/main/e-ink-pager.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

// Weitere Seiten: eigene @match-Zeilen ergänzen oder besser in den
// Script-Einstellungen von Tampermonkey/Violentmonkey als "User matches"
// eintragen. Diese bleiben bei Updates erhalten.

(function () {
  'use strict';

  const OVERLAP = 0.10; // Anteil der Bildschirmhöhe, der nach dem Blättern sichtbar bleibt
  const SIZE = 54;      // Button-Größe in px
  const GAP = 16;       // Abstand zum Rand und zwischen den Buttons

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