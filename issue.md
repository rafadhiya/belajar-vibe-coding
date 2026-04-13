# Panduan Implementasi Fitur Registrasi User

Dokumen ini berisi dokumen perencanaan dan panduan teknis bagi programmer atau model AI untuk mengimplementasikan fitur registrasi *user* baru. Proyek ini menggunakan Bun, ElysiaJS, dan Drizzle ORM (PostgreSQL). Harap ikuti spesifikasi dan tahapan di bawah ini dengan teliti.

## 1. Spesifikasi Database (Tabel `users`)
Sesuaikan atau buat skema Drizzle untuk tabel `users` (di dalam `src/db/schema.ts` atau file sejenis) dengan kolom-kolom berikut:
- **`id`**: integer, auto increment (atau serial di PostgreSQL), primary key.
- **`name`**: varchar(255), not null.
- **`email`**: varchar(255), not null, di-*set* sebagai tipe `unique`.
- **`password`**: varchar(255), not null. Mesti cukup panjang karena tabel akan menampung hasil enkripsi (hash) menggunakan `bcrypt`.
- **`created_at`**: timestamp, *default*-nya adalah *current timestamp* (waktu sekarang ketika baris dibuat), not null.

## 2. Struktur Folder & File
Anda wajib memisahkan kode antara *routing* dan logika bisnis (service) di dalam direktori `src`.
- **`src/routes/`**: Tempat meletakkan definisi *endpoint* dari framework ElysiaJS.
  - Aturan penamaan file menggunakan format: *[nama-entitas]-route.ts*.
  - Contoh untuk user: `users-route.ts`.
- **`src/services/`**: Tempat meletakkan *business logic* (akses ke database, proses *hashing* password, validasi unik, dl).
  - Aturan penamaan file menggunakan format: *[nama-entitas]-services.ts*.
  - Contoh untuk user: `users-services.ts`.

## 3. Spesifikasi API
Buat *endpoint* baru dengan rincian berikut:

- **Endpoint URL**: `POST /api/user`
- **Request Body JSON**:
  ```json
  { 
    "name" : "Eko",
    "email" : "eko@DD",
    "password" : "rahasia"
  }
  ```
- **Response JSON (SUKSES)**:
  ```json
  {
    "data" : "ok"
  }
  ```
- **Response JSON (ERROR - Email sudah ada)**:
  Kembalikan HTTP code berjenis *Bad Request* (misalnya 400).
  ```json
  {
    "EROR" : " EMAIL sudah terdaftar"
  }
  ```

## 4. Tahapan / Langkah-Langkah Implementasi
Ikuti langkah-langkah ini secara bertahap saat mengimplementasikannya:

1. **Modifikasi Skema Drizzle**
   - Sesuaikan file `schema.ts`. Gunakan *builder* column dari `drizzle-orm/pg-core` (misalnya `varchar`, `timestamp`, `serial`, `integer`, dll).
   - Pastikan panjang dari string `varchar` diatur sebesar 255.

2. **Instalasi Library Pendukung (Jika belum ada)**
   - Jika project belum memiliki module instalasi `bcrypt`, jalankan perintah `bun add bcrypt` dan `bun add -d @types/bcrypt` (karena *password* mewajibkan tipe *hash bcrypt*).

3. **Buat Logika Layanan (Service)**
   - Buat direktori `src/services` dan file `users-services.ts`.
   - Buat sebuah `function` atau `class` untuk membuat pengguna baru.
   - **Logikanya**:
     - Cek database melalui Drizzle (*select where email = input email*).
     - Jika *email* sudah ada, lemparkan pesan *error* "EMAIL sudah terdaftar".
     - Jika *email* belum pernah ada, lalukan proses *hash* pada *password* menggunakan `bcrypt`.
     - Lakukan proses penyimpanan (*insert*) ke tabel `users` dengan `password` yang sudah dalam bentuk *hash*.

4. **Buat Rute (Routes)**
   - Buat direktori `src/routes` dan file `users-route.ts`.
   - Gunakan instance ElysiaJS baru (`new Elysia()`) untuk membungkus rute.
   - Definisikan metode HTTP `.post()` untuk rute `/api/user`.
   - Tangani proses *request body* dengan memanggil layanan dari `users-services.ts`.
   - Lakukan `try-catch`. Jika terjadi pelemparan kesalahan terkait email dari service, kembalikan objek `{"EROR": " EMAIL sudah terdaftar"}`.
   - Jika service selesai tanpa kendala, kembalikan objek `{"data": "ok"}`.

5. **Daftarkan Rute dan Uji Coba Lintas**
   - Bukalah file utama `src/index.ts`.
   - *Import* instance rute dari `users-route.ts`.
   - Tambahkan *method* `.use()` pada instans Elysia utama supaya endpoint `/api/user` dapat diakses dan direspon dengan baik.
   - Gunakan *tool* migrasi (contoh: `drizzle-kit push`) untuk menerapkan perubahan skema ke dalam bentuk relasi tabel secara riil. 
   - Jalankan server `bun run dev` dan uji endpoint API dengan alat yang kompatibel.
