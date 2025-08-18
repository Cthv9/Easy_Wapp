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
	  { code: '90', flag: '🇹🇷', label: 'Turchia (+90)' },
	  { code: '30', flag: '🇬🇷', label: 'Grecia (+30)' }
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
      this[field] = (this[field] || '').replace(/\D+/g, '');
    },
    getFullPrefix() {
      return this.selectedPrefix === 'custom' ? this.manualPrefix : this.selectedPrefix;
    },
    validate() {
      this.errors = [];
      const prefix = this.getFullPrefix();
      const local = (this.phone || '').trim();

      if (!prefix) {
        this.errors.push('Seleziona o inserisci un prefisso.');
      } else if (!/^\d{1,4}$/.test(prefix)) {
        this.errors.push('Il prefisso deve essere numerico (1–4 cifre).');
      }

      if (!local) {
        this.errors.push('Inserisci il numero senza prefisso e senza simboli.');
      } else if (!/^\d{7,11}$/.test(local)) {
        this.errors.push('Il numero deve contenere tra 7 e 11 cifre.');
      }

      if (!(this.message || '').trim()) {
        this.errors.push('Scrivi un messaggio.');
      } else if (this.message.length > 1000) {
        this.errors.push('Messaggio troppo lungo (max 1000 caratteri).');
      }

      return this.errors.length === 0;
    },
    redirect() {
      if (!this.validate()) return;
      const prefix = this.getFullPrefix();
      const fullNumber = prefix + this.phone;
      const url = 'https://wa.me/' + fullNumber + '?text=' + encodeURIComponent(this.message);
      this.loading = true;
      window.location.href = url;
    }
  }
});
