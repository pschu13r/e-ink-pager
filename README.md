# E-Ink Pager

Userscript für E-Ink-Reader. Es blendet zwei Buttons (▲ ▼) ein und blättert Webseiten seitenweise ohne Scroll-Animation. Das vermeidet Ruckeln und Ghosting auf E-Paper-Displays.

Ursprünglich gebaut, um die c't und andere heise-Magazine auf einem Boox Go 10.2 im Browser zu lesen.

## Installation

1. Browser mit Add-on-Support verwenden, zum Beispiel Firefox oder Fennec für Android.
2. [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/) oder [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) installieren.
3. Script installieren: **[e-ink-pager.user.js](https://raw.githubusercontent.com/pschu13r/e-ink-pager/main/e-ink-pager.user.js)**

Updates kommen automatisch über den Script-Manager.

## Unterstützte Seiten

Standardmäßig aktiv auf `https://www.heise.de/select/*` (c't, iX, Mac & i, Make, c't Fotografie).

Weitere Seiten fügst du in den Script-Einstellungen deines Script-Managers unter **User matches** hinzu. Diese Einträge bleiben bei Updates erhalten.

## Anpassen

Am Anfang des Scripts:

| Konstante | Standard | Bedeutung |
| --- | --- | --- |
| `OVERLAP` | `0.10` | Anteil der Bildschirmhöhe, der nach dem Blättern sichtbar bleibt |
| `SIZE` | `54` | Button-Größe in px |
| `GAP` | `16` | Abstand zum Rand und zwischen den Buttons in px |

Änderungen direkt im Script werden beim nächsten Update überschrieben.

## Tipps für Boox

- Refresh-Modus für den Browser auf **HD** oder **Balanced** stellen.
- Verdeckt ein fester Seiten-Header die erste Zeile, `OVERLAP` auf `0.15` erhöhen.
