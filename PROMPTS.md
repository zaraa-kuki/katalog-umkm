# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:*Baca AGENTS.md dan docs/user-stories.md bagian US-01. Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase. Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.*

**Hasil:*Project berhasil dikoneksikan ke Supabase melalui file lib/supabase/server.js dan daftar produk berhasil dirender secara dinamis di app/page.jsx dari tabel produk.*

**Perbaikan:*Memperbaiki variabel environment di .env.local karena URL SUPABASE_URL kepanjangan (menghapus akhiran /rest/v1/).

Mengganti pengambilan data contoh (lib/data-contoh) menjadi query Supabase Server Component (supabase.from("produk").select("*")).*

## US-02 Detail produk

**Prompt:*Minta bantuan perbaikan kodingan pada halaman detail produk app/produk/[id]/page.jsx untuk mengambil 1 data produk dari database Supabase berdasarkan ID, serta menyatukan jalurnya dengan aset gambar di folder public/produk/.*

**Hasil:*Halaman detail produk mampu menampilkan informasi lengkap (nama, harga, deskripsi, foto) yang diambil langsung dari database Supabase berdasarkan id.*

**Perbaikan:*Mengubah metode pencarian dari fungsi lokal cariProdukContoh(id) menjadi query Supabase dengan filter .eq("id", id).single().*

## US-03 Pesan via WhatsApp

**Prompt:*Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)". Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.*

**Hasil:*Tombol "Pesan via WhatsApp" berhasil mengarahkan pengguna ke tautan WhatsApp Web/Aplikasi dengan format pesan otomatis dan nomor tujuan sesuai konfigurasi lib/toko.js.*

**Perbaikan:*Mengatasi error infoToko is not defined / Export infoToko doesn't exist dengan mencocokkan nama variabel export dari lib/toko.js (toko.whatsapp).

Menggunakan encodeURIComponent untuk format pesan otomatis.*

## US-04 Login admin

**Prompt:*Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04. Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.*

**Hasil:*Form login admin berfungsi menggunakan Supabase Auth dengan penanganan cookie di sisi server. Tombol logout pada navigasi admin berhasil mengakhiri sesi.*

**Perbaikan:*Mengatasi error Module not found: Can't resolve '@/app/admin/actions' dengan membuat file actions.js di folder app/admin/ dan menyesuaikan jalur import relatifnya.

Menambahkan akun admin baru via SQL Editor Supabase Auth untuk pengujian login.*

## US-05 Ganti password

**Prompt:*Buat fitur ganti password admin menggunakan Supabase Auth di app/admin/password/page.jsx. Gunakan Server Action di app/admin/actions.js untuk memperbarui password akun yang sedang login menggunakan supabase.auth.updateUser(). Tampilkan pesan sukses jika password berhasil diubah, atau pesan error jika gagal. Hapus komponen CatatanBelumAktif dari halaman ganti password.*

**Hasil:*Fitur ganti password admin berhasil berfungsi. Admin yang sedang terautentikasi dapat memperbarui password akunnya dan langsung tersimpan di Supabase Auth.*

**Perbaikan:*Memastikan fungsi ganti password memeriksa status sesi login terlebih dahulu sebelum memanggil updateUser.

Menambahkan penanganan pesan umpan balik (sukses/gagal) pada UI form ganti password.*

## US-06 Proteksi halaman admin

**Prompt:*Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06. Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.*

**Hasil:*File proxy.js berhasil dibuat di root proyek untuk memproteksi seluruh rute /admin dan mengalihkannya secara otomatis ke /admin/login jika pengguna belum terautentikasi.*

**Perbaikan:*Menambahkan konfigurasi matcher /admin/:path* dan pengecekan sesi menggunakan supabase.auth.getUser() pada proxy.js.*

## Debugging dan fitur bonus

Penyebab: Format SUPABASE_URL pada .env.local berisi path API lengkap ([https://...supabase.co/rest/v1/](https://...supabase.co/rest/v1/)).

Perbaikan: Mengubah URL hanya sampai domain utama ([https://...supabase.co](https://...supabase.co)).
