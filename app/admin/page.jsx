import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatRupiah } from "@/lib/format";

export default async function HalamanAdminProduk() {
  const supabase = await createClient();
  const { data: produk, error } = await supabase.from("produk").select("*").order("id", { ascending: true });

  return (
    <div className="space-y-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produk</h1>
        <Link
          href="/admin/tambah"
          className="rounded-lg bg-utama px-4 py-2 text-sm font-semibold text-white hover:bg-utama-gelap"
        >
          Tambah produk
        </Link>
      </div>

      {error && <p className="text-red-600">Gagal memuat produk: {error.message}</p>}

      <div className="overflow-x-auto rounded-xl border border-garis bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-garis bg-permukaan text-xs uppercase text-teks-lembut">
            <tr>
              <th className="p-4">Produk</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Harga</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-garis">
            {produk?.map((item) => (
              <tr key={item.id}>
                <td className="p-4 font-medium flex items-center gap-3">
                  <img src={item.foto_url} alt={item.nama} className="h-10 w-10 rounded-lg object-cover border" />
                  {item.nama}
                </td>
                <td className="p-4 text-teks-lembut">{item.kategori}</td>
                <td className="p-4">{formatRupiah(item.harga)}</td>
                <td className="p-4 text-right space-x-2">
                  <Link href={`/admin/ubah/${item.id}`} className="text-blue-600 hover:underline">
                    Ubah
                  </Link>
                  {/* Tombol Hapus bisa diarahkan ke action hapus */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}