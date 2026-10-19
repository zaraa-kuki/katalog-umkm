"use client";

import { toko } from "@/lib/toko"; // Pastikan ini sesuai dengan isi export di lib/toko.js kamu
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk }) {
  const handleClick = () => {
    // Format pesan otomatis sesuai instruksi
    const pesan = `Halo, saya mau pesan ${produk.nama} (${formatRupiah(produk.harga)})`;
    
    // Encode teks pesan agar aman di URL
    const pesanEncoded = encodeURIComponent(pesan);
    
    // Ambil nomor WhatsApp dari objek toko
    const nomorWa = toko?.whatsapp || toko?.nomorWa || "";
    
    const urlWhatsApp = `https://wa.me/${nomorWa}?text=${pesanEncoded}`;
    
    // Buka di tab baru
    window.open(urlWhatsApp, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto"
    >
      Pesan via WhatsApp
    </button>
  );
}