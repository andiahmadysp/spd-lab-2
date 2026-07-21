# Dokumentasi Proyek: Aplikasi Web Toko Online (Lanjutan)

**Nama:** Andi Ahmad Yusup
**NIM:** 2802654246
**Mata Kuliah:** Specialized Platform Development (JSCA)
**Tugas:** Personal Lab Assignment 2 - Week 8

---

## Link Proyek

| Keterangan | Link |
|---|---|
| GitHub Repository | [Isi link repo di sini] |
| Live Demo - Frontend | [Isi link Vercel/Netlify di sini] |
| Live Demo - Backend API | [Isi link Render/Heroku di sini] |
| Video Demo (jika ada) | [Isi link video di sini] |

---

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
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/soppu
PORT=5001
JWT_SECRET=isi_dengan_secret_key_yang_kuat
```

Jalankan server:

```bash
npm run dev
# Server berjalan di http://localhost:5001
```

### Menjalankan Frontend

```bash
cd frontend
npm install
npm run dev
# Aplikasi berjalan di http://localhost:5173
```

---

## Screenshot Hasil Aplikasi

### 1. Autentikasi (JWT)

#### Halaman Registrasi

![Halaman Registrasi](screenshots/register.png)

*Halaman registrasi pengguna baru dengan form nama, email, dan password.*

#### Halaman Login

![Halaman Login](screenshots/login.png)

*Halaman login dengan verifikasi credentials ke backend dan penyimpanan JWT di localStorage.*

#### JWT Tersimpan di localStorage

![JWT di localStorage](screenshots/localstorage-jwt.png)

*Token JWT berhasil disimpan di browser setelah login berhasil.*

#### Proteksi Route (Redirect ke Login)

![Protected Route](screenshots/protected-route.png)

*Pengguna yang belum login diarahkan ke halaman login saat mengakses halaman yang diproteksi.*

#### Halaman Daftar Produk (Setelah Login)

![Daftar Produk](screenshots/products-authenticated.png)

*Halaman detail produk (`/product/:id`) hanya dapat diakses setelah pengguna berhasil login.*

---

### 2. Deployment

#### Frontend (Vercel / Netlify)

![Frontend Deployment](screenshots/frontend-deployment.png)

*Frontend berhasil dideploy dan dapat diakses publik.*

#### Backend (Render / Heroku)

![Backend Deployment](screenshots/backend-deployment.png)

*Backend API berhasil dideploy, frontend menggunakan endpoint API dari server yang sudah dideploy.*

---

### 3. Monitoring

#### Dashboard Google Analytics / LogRocket

![Monitoring Dashboard](screenshots/monitoring.png)

*Dashboard monitoring menampilkan aktivitas pengguna secara real-time.*
