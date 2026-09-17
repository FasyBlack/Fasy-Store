import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: products, error } = await supabase.from('products').select('*')

  if (error) {
    return <div className="p-8 text-red-500">Gagal mengambil data: {error.message}</div>
  }

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Katalog Toko Online</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <img 
              src={product.image_url || 'https://via.placeholder.com/300'} 
              alt={product.title} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
            <p className="text-gray-600 text-sm my-2 line-clamp-2">{product.description}</p>
            <p className="text-lg font-bold text-green-600">
              Rp {Number(product.price).toLocaleString('id-ID')}
            </p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium">
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}