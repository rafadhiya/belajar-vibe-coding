# Setup Proyek Baru dengan Bun, ElysiaJS, dan Drizzle

## Deskripsi Tugas
Tugas ini adalah untuk menginisialisasi proyek backend baru di direktori saat ini menggunakan **Bun** sebagai runtime/package manager, **ElysiaJS** sebagai framework web, dan **Drizzle ORM** dengan database **PostgreSQL**.

## Tech Stack Utama
- **Bun** (Runtime lingkungan eksekusi utama)
- **ElysiaJS** (Web framework)
- **Drizzle ORM** (Database ORM)
- **PostgreSQL** (Gunakan koneksi melalui URL / Connection String)

## Langkah Implementasi (High-Level)
Silakan ikuti instruksi berikut untuk melakukan inisialisasi dan konfigurasi dasar:

1. **Inisialisasi Proyek**
   Lakukan inisialisasi proyek standar menggunakan perintah bawaan Bun (`bun init`) di direktori ini.

2. **Instalasi Dependency & Tools**
   - Install package inti untuk framework web: `elysia`.
   - Install package untuk database: `drizzle-orm` dan driver PostgreSQL yang kompatibel dengan Bun (seperti `postgres`).
   - Install tools untuk migrasi database: `drizzle-kit` sebagai dependency development.

3. **Konfigurasi Environment Database**
   Siapkan file environment (misal: `.env`) dan tambahkan sebuah *environment variable* (misal: `DATABASE_URL`) yang akan menampung Connection URL untuk PostgreSQL.

4. **Konfigurasi Drizzle ORM**
   Buat file `drizzle.config.ts` (atau ekstensi sejenis) untuk mengatur konfigurasi Drizzle agar mengarah ke kredensial database yang ada di dalam *environment variable*.

5. **Setup Server Utama**
   - Buat *entry point* aplikasi (misal `src/index.ts` atau `server.ts`).
   - Inisialisasi koneksi dari Drizzle ke PostgreSQL menggunakan driver yang telah di-install.
   - Buat instance ElysiaJS dan jalankan server pada port default (atau port pilihan).
   - Tambahkan minimal satu *endpoint* / rute sederhana (seperti `GET /` atau ping) untuk memverifikasi bahwa server sudah berjalan dengan sukses.

6. **Konfigurasi Skrip (Opsional tapi disarankan)**
   Tambahkan *script commands* pada file `package.json` untuk mempermudah menjalankan server dalam mode *watch* (development) dan command untuk migrasi Drizzle.
