# Delli Fruits — Bucurie, la cutie.

Previzualizare de site de prezentare, realizată la 1 noiembrie 2026 pentru Nicu.

[Deschide previzualizarea online](https://delli-fruits-preview-nicu.fundatia-ino-3769.chatgpt.site/)

## Experiența

- Design bento cu blocuri modulare de dimensiuni diferite, colțuri rotunjite, fundal gri deschis și accente lila, lime și coral.
- Tipografie Space Grotesk pentru titluri și Manrope pentru text. Stilurile active sunt în `dist/bento.css`; `dist/styles.css` păstrează varianta inițială.
- Colecție cu filtre, fotografii autentice Delli Fruits și detalii de contact verificate.
- Selector pentru destinatar și amploarea cadoului, formular de personalizare, previzualizarea mesajului și continuare pe WhatsApp.
- Meniu mobil, dialoguri accesibile cu tastatura și animații care respectă preferința pentru mișcare redusă.
- Fără plăți sau preluare automată de comenzi. Utilizatorul confirmă mesajul în WhatsApp. Prețurile și disponibilitatea sunt stabilite în conversația cu echipa Delli.

## Fișiere și rulare locală

Site static fără instalare de dependențe. Fișierele publicabile sunt în `dist/`.

```powershell
python -m http.server 4317 --bind 127.0.0.1 --directory dist
```

Deschide `http://127.0.0.1:4317/`. Verificarea sintaxei JavaScript: `node --check dist/script.js`.

Sursele brandului și ale imaginilor sunt documentate în [research/brand-sources.md](research/brand-sources.md). Originalele sunt păstrate în `research/originals/`. Numele colecțiilor și textele sunt propuneri editoriale; previzualizarea nu presupune aprobarea oficială a brandului.

## Imaginea editorială

Creată prin instrumentul încorporat ImageGen. Fișier final: `dist/assets/hero-fruits.png`, 1536 × 1024 px. Această imagine este ilustrativă și nu reprezintă conținutul exact al unei cutii Delli Fruits. Fotografiile reale din colecție sunt încadrate prin CSS pentru a exclude prețurile campaniilor vechi.

Prompt folosit:

> Use case: product-mockup. Asset type: premium editorial website hero photograph. Landscape 3:2 image. Scene/backdrop: warm pale peach and cream studio backdrop and table, directional sunlight, rich realistic textures and shadows, boutique European gourmet store art direction. Subject: opulent but natural still life of tropical fruits overflowing from a simple unbranded kraft gift box; pineapple crown high right, cut dragonfruit white and magenta, golden mango, passion fruit, figs, grapes, limes and fresh leaves. Foreground sharp, beautiful credible real food, high end photographic detail. Composition: the fruits and box occupy the right two thirds with usable negative space on the left. Constraints: absolutely no text, no logos, no hands, no plastic, no extra decorative props, no watermark. Photograph, not illustration.

## Validare

- Server local: răspuns HTTP 200.
- Sintaxa JavaScript: validată cu Node.
- Verificare vizuală în browser la dimensiunea desktop disponibilă și 390 × 844 px.
- Filtrele colecției, opțiunile destinatarului și dimensiunii, personalizarea, generarea textului și adresa WhatsApp verificate fără trimiterea mesajului.
- Datele de contact și denumirile editoriale revizuite separat.

Redesign bento validat pe desktop și la 390 × 844 px: filtre, meniu mobil, configurator și mesaj WhatsApp funcționale, fără imagini lipsă sau depășire orizontală.

Configurarea și identificatorul Sites sunt în `.openai/hosting.json`. Previzualizarea găzduită pe Sites este privată; vizibilitatea acestui repository se administrează separat în GitHub.
