new Vue({
  el: '#app',
  data: {
    prefixes: [
      { code: '39', label: 'Italia (+39)' },
      { code: '1',  label: 'USA/Canada (+1)' },
      { code: '44', label: 'Regno Unito (+44)' },
      { code: '49', label: 'Germania (+49)' },
      { code: '33', label: 'Francia (+33)' },
      { code: '34', label: 'Spagna (+34)' },
      { code: '41', label: 'Svizzera (+41)' },
      { code: '43', label: 'Austria (+43)' },
      { code: '351', label: 'Portogallo (+351)' },
      { code: '31', label: 'Paesi Bassi (+31)' },
      { code: '91', label: 'India (+91)' },
      { code: '81', label: 'Giappone (+81)' }
    ],
    selectedPrefix: '39',
    manualPrefix: '',
    phone: '',
    message: '',
    trimRule: 'none', // 'none' | 'strip-leading-0'
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
    applyTrimRules(localNumber) {
      let out = localNumber;
      if (this.trimRule === 'strip-leading-0') {
        out = out.replace(/^0+/, '');
      }
      return out;
    },
    validate() {
      this.errors = [];
      const prefix = this.getFullPrefix();
      let local = (this.phone || '').trim();
      local = this.applyTrimRules(local);

      if (!prefix) {
        this.errors.push('Inserisci o seleziona un prefisso.');
      } else if (!/^\d{1,4}$/.test(prefix)) {
        this.errors.push('Il prefisso deve essere numerico (max 4 cifre).');
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

      this.phone = local;
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