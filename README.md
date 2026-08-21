# LIFEBOARD

**Your personal command center.** LIFEBOARD adalah PWA personal life management yang ringan, offline-first, dan private. Aplikasi mengelola task, jadwal, keuangan, notes, statistik, reminder, serta backup tanpa akun, backend, analytics, atau cloud.

## Fitur

- Dashboard harian dengan greeting, agenda, priority task, progress, dan finance snapshot
- Task CRUD, complete/uncomplete, priority, category, due date/time, recurring field, search, filter, dan overdue state
- Schedule CRUD dengan Day, Week, Month, agenda responsif, kategori, dan reminder
- Finance CRUD, filter periode, ringkasan balance/income/expense, dan format IDR
- Notes CRUD, search, pin, dan archive
- Statistik produktivitas, keuangan, dan jadwal berbasis data lokal
- Global search (`Ctrl/Cmd + K`), shortcut task baru (`N`), dan tutup modal (`Esc`)
- Light, dark, dan system theme; profil first name; sample data opsional
- Export/import JSON dengan preview serta mode Merge atau Replace
- Double confirmation untuk menghapus seluruh data
- PWA install prompt, network indicator, app-shell cache, dan offline CRUD

## Tech stack

HTML5, modular CSS, Vanilla JavaScript ES modules, IndexedDB, Service Worker, Web App Manifest, Notifications API, dan font Plus Jakarta Sans yang disimpan lokal. Tidak ada dependency runtime atau proses build.

## Struktur

```text
LIFEBOARD/
├── index.html, manifest.json, sw.js, favicon.ico, robots.txt
├── assets/icons/             # SVG source + PNG PWA icons 72–512 px
├── css/                      # reset, tokens, base, layout, components, responsive, utilities
└── js/
    ├── app.js, router.js, db.js, state.js, utils.js
    ├── settings.js, backup.js, notifications.js
    ├── modules/              # dashboard, tasks, schedule, finance, notes, statistics
    └── components/           # modal, toast, nav, search, reusable cards/empty state
```

## Menjalankan

Service worker tidak berjalan melalui `file://`. Dari folder proyek jalankan:

```bash
python -m http.server 8080
```

Buka `http://localhost:8080`. Alternatif: `npx serve .` atau extension static server di editor. Node tidak diperlukan oleh aplikasi; alternatif tersebut hanya server pengembangan.

## Menguji PWA dan offline

1. Buka aplikasi melalui localhost, lalu DevTools → Application.
2. Pastikan manifest dikenali, service worker berstatus activated, dan cache `lifeboard-v1.0.0` terisi.
3. Buat beberapa data, aktifkan Network → Offline, lalu refresh.
4. Pastikan shell terbuka dan create/edit/delete tetap bekerja.
5. Untuk menguji update cache, ubah versi `CACHE` di `sw.js`, refresh, lalu pastikan cache lama terhapus.

## Install

**Android (Chrome/Edge):** buka alamat HTTPS/localhost yang dapat diakses perangkat, gunakan menu browser → *Install app* / *Add to Home screen*, lalu konfirmasi. Untuk perangkat fisik, hosting HTTPS lokal atau deployment static HTTPS diperlukan; `localhost` komputer tidak sama dengan `localhost` ponsel.

**Windows (Chrome/Edge):** buka aplikasi pada HTTPS/localhost, klik ikon install di address bar atau tombol **Install LIFEBOARD** di Settings jika tersedia, lalu konfirmasi.

## Backup dan restore

Export menghasilkan `LIFEBOARD-backup-YYYY-MM-DD.json`, berisi version, metadata, tasks, events, transactions, notes, dan settings. Import memvalidasi JSON dan record penting, menampilkan jumlah data, lalu meminta pilihan:

- **Merge:** record dengan ID sama diperbarui; record lain dipertahankan.
- **Replace:** seluruh store diganti setelah konfirmasi pada layar preview.

Simpan file backup di tempat terpisah sebelum membersihkan data browser atau berpindah perangkat.

## Arsitektur offline

Semua record utama berada di IndexedDB `LIFEBOARD_DB` version 1. Seluruh akses melewati `js/db.js`. Service worker menyimpan app shell dan memakai strategi network-first dengan cache fallback agar aset baru tidak stale selamanya. Data pengguna tidak masuk ke Cache Storage dan tidak pernah dikirim keluar.

## Keterbatasan

- Browser dapat menghapus storage ketika ruang sempit, dalam private mode, atau setelah user membersihkan site data; gunakan backup rutin.
- Reminder berbasis timer paling andal saat aplikasi masih terbuka. Browser/OS tidak menjamin notification ketika PWA benar-benar ditutup tanpa push server/background scheduling.
- Install prompt berbeda antar-browser dan tidak tersedia di semua browser, terutama iOS.
- Tidak ada cloud sync atau kolaborasi lintas perangkat pada V1.
- Recurring task membuat instance berikutnya ketika task saat ini diselesaikan; pengecualian kalender kompleks belum didukung.

## QA checklist

- Routing hash serta back/forward
- CRUD, validasi, filter, completion, overdue untuk task
- CRUD dan Day/Week/Month untuk schedule
- CRUD, periode, total, dan format IDR untuk finance
- CRUD, search, pin, archive untuk notes
- Export, invalid import, preview, Merge, Replace
- Light/dark pada navigation, cards, forms, modal, dan charts
- Layout 360, 390, 412, 768, 1024, 1366, dan 1920 px
- Manifest, icons, service worker activation, reload offline, dan installability
- Keyboard focus, labels, shortcuts, reduced motion, dan modal keyboard handling

## Roadmap

V2 dapat mengevaluasi recurrence generation, richer calendar navigation, notification scheduling yang didukung platform, dan import/export terenkripsi—tanpa mengorbankan prinsip local-first.
