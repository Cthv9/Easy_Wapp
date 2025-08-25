new Vue({
  el: '#app',
  data: {
    prefixes: [
	  { code: '39',  flag: '🇮🇹', label: 'Italia (+39)' },
	  { code: '1',   flag: '🇺🇸', label: 'USA/Canada (+1)' },
	  { code: '44',  flag: '🇬🇧', label: 'Regno Unito (+44)' },
	  { code: '49',  flag: '🇩🇪', label: 'Germania (+49)' },
	  { code: '33',  flag: '🇫🇷', label: 'Francia (+33)' },
	  { code: '34',  flag: '🇪🇸', label: 'Spagna (+34)' },
	  { code: '41',  flag: '🇨🇭', label: 'Svizzera (+41)' },
	  { code: '43',  flag: '🇦🇹', label: 'Austria (+43)' },
	  { code: '351', flag: '🇵🇹', label: 'Portogallo (+351)' },
	  { code: '31',  flag: '🇳🇱', label: 'Paesi Bassi (+31)' },
	  { code: '91',  flag: '🇮🇳', label: 'India (+91)' },
	  { code: '81',  flag: '🇯🇵', label: 'Giappone (+81)' },
	  { code: '90',  flag: '🇹🇷', label: 'Turchia (+90)' },
	  { code: '30',  flag: '🇬🇷', label: 'Grecia (+30)' },
	  { code: '385', flag: '🇭🇷', label: 'Croazia (+385)' }
	],
    selectedPrefix: '39',
    manualPrefix: '',
    phone: '',
    message: '',
    errors: [],
    loading: false
  },
  methods: {
    digitsOnly(field) {
      // Consente solo cifre durante la digitazione
      this[field] = (this[field] || '').replace(/\D+/g, '');
    },
    normalizeDigits(val) {
      // Rimuove tutto tranne le cifre (gestisce incolli con +, spazi, parentesi, ecc.)
      return (val || '').toString().replace(/\D+/g, '');
    },
    getFullPrefix() {
      return this.selectedPrefix === 'custom'
        ? this.normalizeDigits(this.manualPrefix)
        : this.selectedPrefix;
    },
    validate() {
      this.errors = [];

      const isCustom = this.selectedPrefix === 'custom';
      const manual = this.normalizeDigits(this.manualPrefix);
      let phoneDigits = this.normalizeDigits(this.phone);

      // Caso A: "Altro" + NESSUN prefisso manuale -> accetto numero internazionale COMPLETO
      if (isCustom && !manual) {
        if (!phoneDigits) {
          this.errors.push('Inserisci un numero di telefono.');
        } else if (!/^\d{8,15}$/.test(phoneDigits)) {
          this.errors.push('Inserisci un numero internazionale valido (8–15 cifre, incluso il prefisso).');
        }
      } else {
        // Caso B: prefisso selezionato O "Altro" + prefisso manuale compilato
        if (isCustom && !manual) {
          this.errors.push('Inserisci un prefisso internazionale oppure incolla il numero completo nel campo numero.');
        }
        if (manual && !/^\d{1,4}$/.test(manual)) {
          this.errors.push('Il prefisso deve essere numerico (1–4 cifre).');
        }

        // Se l'utente ha incollato un numero che contiene già il prefisso scelto, rimuovilo dalla parte locale
        const chosenPrefix = this.getFullPrefix();
        if (chosenPrefix && phoneDigits.startsWith(chosenPrefix)) {
          phoneDigits = phoneDigits.slice(chosenPrefix.length);
        }

        if (!phoneDigits) {
          this.errors.push('Inserisci il numero senza prefisso e senza simboli.');
        } else if (!/^\d{7,11}$/.test(phoneDigits)) {
          this.errors.push('Il numero locale deve contenere tra 7 e 11 cifre.');
        }
      }

      // Messaggio
      if (!(this.message || '').trim()) {
        this.errors.push('Scrivi un messaggio.');
      } else if (this.message.length > 1000) {
        this.errors.push('Messaggio troppo lungo (max 1000 caratteri).');
      }

      // Salvo la versione normalizzata (utile per coerenza UI)
      this.phone = phoneDigits;

      return this.errors.length === 0;
    },
    redirect() {
      if (!this.validate()) return;

      const isCustom = this.selectedPrefix === 'custom';
      const manual = this.normalizeDigits(this.manualPrefix);
      let phoneDigits = this.normalizeDigits(this.phone);
      let fullNumber = '';

      if (isCustom && !manual) {
        // Numero internazionale completo già dentro "phone"
        fullNumber = phoneDigits;
      } else {
        // Componi prefisso + numero locale (evita doppio prefisso)
        const chosenPrefix = this.getFullPrefix();
        if (phoneDigits.startsWith(chosenPrefix)) {
          phoneDigits = phoneDigits.slice(chosenPrefix.length);
        }
        fullNumber = chosenPrefix + phoneDigits;
      }

      const url = 'https://wa.me/' + fullNumber + '?text=' + encodeURIComponent(this.message);
      this.loading = true;
      window.location.href = url;
    }
  }
});