# Dokumentasi Proyek: Aplikasi Web Toko Online (Lanjutan)

**Nama:** Andi Ahmad Yusup
**NIM:** 2802654246
**Mata Kuliah:** Specialized Platform Development (JSCA)
**Tugas:** Personal Lab Assignment 2 - Week 8

## Cara Menjalankan Aplikasi (Lokal)

### Prasyarat

- Node.js v18+
- MongoDB (lokal) atau akun MongoDB Atlas

### Menjalankan Backend

```bash
cd backend
npm install
```

Buat file `.env` di dalam folder `backend/`:

```env
MONGODB_URI=mongodb://localhost:27017/online-shop
PORT=5000
JWT_SECRET=isi_dengan_secret_key_yang_kuat
```

Jalankan server:

```bash
npm run dev
# Server berjalan di http://localhost:5000
```

### Menjalankan Frontend

```bash
cd frontend
npm install
npm run dev
# Aplikasi berjalan di http://localhost:5173
```
