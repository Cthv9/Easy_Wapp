# 📱 Easy_Wapp

[![Install App](https://img.shields.io/badge/⬇️%20Install%20App-Easy__Wapp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://cthv9.github.io/Easy_Wapp/)

**Easy_Wapp** è una Progressive Web App (PWA) che permette di inviare velocemente messaggi WhatsApp senza dover salvare il numero in rubrica.

👉 Live demo: [https://cthv9.github.io/Easy_Wapp/](https://cthv9.github.io/Easy_Wapp/)

---

## ✨ Funzionalità

- Selezione prefisso internazionale (con bandierine / emoji).
- Inserimento manuale del prefisso se non presente in lista.
- Campo per numero e messaggio.
- Validazione input (numero valido e messaggio non vuoto).
- Reindirizzamento automatico a **WhatsApp Web o App**.
- **PWA ready**:
  - Installabile su Android, iOS e desktop.
  - Funziona anche offline (con pagina `offline.html`).
  - Icone e manifest configurati.
- Design ispirato a WhatsApp (dark mode inclusa).

---

## 🛠️ Struttura del progetto

Easy_Wapp/
├── index.html # Pagina principale (UI + PWA banner)
├── app.js # Logica Vue.js (validazioni, redirect)
├── service-worker.js # Cache offline e PWA
├── manifest.json # Configurazione PWA (icone, scope, colori)
├── offline.html # Pagina di fallback offline
├── icons/ # Icone PWA
│ ├── favicon.png
│ ├── icon-192.png
│ └── icon-512.png
└── README.md # Questo file

📲 Come usare

Seleziona il prefisso (es. 🇮🇹 Italia).

Inserisci il numero senza prefisso.

Scrivi il messaggio.

Clicca Invia su WhatsApp → si aprirà WhatsApp Web / App con chat pronta.

📦 Tecnologie usate

Vue.js 2

HTML5 / CSS3 responsive

Service Worker

PWA (manifest, offline, icone)

GitHub Pages
