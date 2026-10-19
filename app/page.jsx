import KartuProduk from "@/components/KartuProduk"; // Komponen kartu produk sesuai instruksi
import { createClient } from "@/lib/supabase/server";

export default async function HalamanKatalog() {
  const supabase = createClient();
  const { data: produk, error } = await supabase.from("produk").select("*");

  // Jika gagal ambil data dari Supabase
  if (error) {
    return (
      <div className="py-12 text-center text-merah">
        Gagal mengambil data produk: {error.message}
      </div>
    );
  }

  // Jika tabel di Supabase masih kosong
  if (!produk || produk.length === 0) {
    return (
      <div className="py-12 text-center text-teks-lembut">
        Belum ada produk
      </div>
    );
  }

  // Tampilkan daftar produk menggunakan KartuProduk
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-8">
      {produk.map((item) => (
        <KartuProduk key={item.id} produk={item} />
      ))}
    </div>
  );
}