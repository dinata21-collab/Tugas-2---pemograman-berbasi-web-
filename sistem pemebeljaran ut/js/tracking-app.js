new Vue({
    el: '#app',
    data: {
        doList: dummyTrackingDO,
        searchDO: '',
        filterStatus: '',
        formDO: {
            noDO: '',
            upbjj: '',
            penerima: '',
            kurir: '',
            status: 'Menunggu Konfirmasi',
            tanggalKirim: new Date().toISOString().slice(0, 10)
        },
        logWatcherStatus: ''
    },
    computed: {
        filteredDOList() {
            return this.doList.filter(item => {
                const matchQuery = item.noDO.toLowerCase().includes(this.searchDO.toLowerCase()) || 
                                   item.penerima.toLowerCase().includes(this.searchDO.toLowerCase());
                const matchStatus = this.filterStatus === '' || item.status === this.filterStatus;
                return matchQuery && matchStatus;
            });
        }
    },
    watch: {
        filterStatus(valBaru) {
            this.logWatcherStatus = valBaru === '' ? 'Filter status diatur ke SEMUA.' : `Filter status diubah menjadi: "${valBaru}".`;
        },
        doList: {
            handler(val) {
                console.log(`Daftar DO diperbarui. Total DO saat ini: ${val.length}`);
            },
            deep: true
        }
    },
    methods: {
        tambahDO() {
            if (!this.formDO.noDO || !this.formDO.penerima) {
                alert('Nomor DO dan Nama Penerima wajib diisi!');
                return;
            }
            this.doList.unshift({ ...this.formDO });
            this.formDO = {
                noDO: '',
                upbjj: '',
                penerima: '',
                kurir: '',
                status: 'Menunggu Konfirmasi',
                tanggalKirim: new Date().toISOString().slice(0, 10)
            };
        }
    }
});