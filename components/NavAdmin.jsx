"use client";

import Link from "next/link";
// Ubah jalur import ke path relatif agar langsung ketemu
import { logoutAdmin } from "../app/admin/actions"; 
// Atau jika folder components berada di dalam app, gunakan: import { logoutAdmin } from "./actions";

export default function NavAdmin() {
  return (
    <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-garis pb-4 text-sm">
      <Link href="/admin" className="font-semibold hover:text-utama">
        Produk
      </Link>
      <Link href="/admin/password" className="font-semibold hover:text-utama">
        Ganti password
      </Link>

      <form action={logoutAdmin} className="ml-auto">
        <button type="submit" className="text-teks-lembut hover:text-bahaya">
          Keluar
        </button>
      </form>
    </nav>
  );
}