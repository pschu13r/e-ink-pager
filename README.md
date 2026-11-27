# E-Ink Pager

Userscript for e-ink readers. It adds two buttons (▲ ▼) and turns web pages one screen at a time, without scroll animation. This avoids stutter and ghosting on e-paper displays. The buttons stay the same size in the bottom-right corner, even when you zoom in.

Originally built to read c't and other heise magazines in the browser on a Boox Go 10.2.

## Demo

<img width="350" alt="demo of the changes" src="https://github.com/user-attachments/assets/e2cba74a-9152-4fb8-9c04-027b63f23503" />


## Installation

1. Use a browser with add-on support, for example Firefox or Fennec for Android.
2. Install [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/) or [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/).
3. Install the script: **[e-ink-pager.user.js](https://raw.githubusercontent.com/pschu13r/e-ink-pager/main/e-ink-pager.user.js)**

The script manager installs updates automatically.

## Supported sites

Active by default on `https://www.heise.de/select/*` (c't, iX, Mac & i, Make, c't Fotografie).

To add more sites, open the script settings in your script manager and add them under **User matches**. These entries are kept on updates.

## Settings

At the top of the script:

| Constant | Default | Meaning |
| --- | --- | --- |
| `OVERLAP` | `0.10` | Share of the screen height that stays visible after a page turn |
| `SIZE` | `72` | Button size in px |
| `GAP` | `16` | Gap to the screen edge and between the buttons, in px |

The next update overwrites changes made directly in the script.

## Tips for Boox

- Set the browser's refresh mode to **HD** or **Balanced**.
- If a fixed page header hides the first line, raise `OVERLAP` to `0.15`.
