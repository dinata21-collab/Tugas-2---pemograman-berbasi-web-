new Vue({
    el: '#app',
    data: {
        stokList: dummyStokBahanAjar,
        searchQuery: '',
        selectedKategori: '',
        formBaru: { kode: '', nama: '', edisi: '', kategori: '', stok: 0, harga: 0 },
        pesanNotifikasi: ''
    },
    computed: {
        filteredStok() {
            return this.stokList.filter(item => {
                const matchQuery = item.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                                   item.kode.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchKategori = this.selectedKategori === '' || item.kategori === this.selectedKategori;
                return matchQuery && matchKategori;
            });
        },
        daftarKategori() {
            return [...new Set(this.stokList.map(item => item.kategori))];
        }
    },
    watch: {
        searchQuery(valNew, valOld) {
            console.log(`Pencarian berubah dari "${valOld}" menjadi "${valNew}"`);
        },
        stokList: {
            handler(newList) {
                this.pesanNotifikasi = `Total data stok diperbarui. Jumlah total item: ${newList.length} bahan ajar.`;
            },
            deep: true
        }
    },
    methods: {
        formatRupiah(angka) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
        },
        tambahBahanAjar() {
            if (!this.formBaru.kode || !this.formBaru.nama) {
                alert('Kode dan Nama Matakuliah wajib diisi!');
                return;
            }
            this.stokList.push({ ...this.formBaru });
            this.formBaru = { kode: '', nama: '', edisi: '', kategori: '', stok: 0, harga: 0 };
        }
    }
});