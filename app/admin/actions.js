"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Dipanggil dari Server Component
          }
        },
      },
    }
  );
}

// 1. Fungsi Login Admin
export async function loginAdmin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Email atau password salah." };
  }

  redirect("/admin");
}

// 2. Fungsi Logout Admin
export async function logoutAdmin() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// 3. Fungsi Tambah Produk (Fitur Bonus)
export async function tambahProduk(prevState, formData) {
  const supabase = await getSupabaseServerClient();

  const nama = formData.get("nama");
  const kategori = formData.get("kategori");
  const harga = formData.get("harga");
  const deskripsi = formData.get("deskripsi");
  const foto_url = formData.get("foto_url");

  const { error } = await supabase.from("produk").insert([
    { nama, kategori, harga: Number(harga), deskripsi, foto_url }
  ]);

  if (error) {
    return { error: "Gagal menambah produk: " + error.message };
  }

  redirect("/admin");
}

// 4. Fungsi Hapus Produk (Fitur Bonus)
export async function hapusProduk(id) {
  const supabase = await getSupabaseServerClient();
  await supabase.from("produk").delete().eq("id", id);
  redirect("/admin");
}