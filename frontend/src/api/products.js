import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/products';

// Fallback demo data if backend is offline during testing
const fallbackProducts = [
  { id: "1", name: "Lampu Meja Arc", cat: "Pencahayaan", price: 349000, material: "Besi & aluminium", dimensi: "18 x 40 x 52 cm", berat: "1.4 kg", garansi: "12 bulan", sku: "MDL-LMP-001", desc: "Lampu meja dengan lengan besi solid dan dimmer sentuh, memberi pencahayaan hangat yang stabil untuk sesi kerja panjang.", imageUrl: "https://picsum.photos/seed/lampu-meja/600/400" },
  { id: "2", name: "Kursi Ergonomis Kiri", cat: "Furnitur", price: 2150000, material: "Mesh & aluminium", dimensi: "62 x 62 x 118 cm", berat: "14 kg", garansi: "24 bulan", sku: "MDL-KRS-002", desc: "Sandaran mesh yang mengikuti lekuk punggung dan sandaran tangan yang bisa diatur lima arah.", imageUrl: "https://picsum.photos/seed/kursi-kerja/600/400" },
  { id: "3", name: "Keyboard Mekanik Compact", cat: "Elektronik", price: 875000, material: "Aluminium & PBT", dimensi: "29 x 10 x 3 cm", berat: "0.6 kg", garansi: "12 bulan", sku: "MDL-KBD-003", desc: "Layout 75 persen dengan switch hot-swap dan casing aluminium CNC.", imageUrl: "https://picsum.photos/seed/keyboard-mekanik/600/400" },
  { id: "4", name: "Notebook Berlapis Kulit", cat: "Alat Tulis", price: 210000, material: "Kulit tersamak & kertas daur ulang", dimensi: "14.8 x 21 cm", berat: "0.3 kg", garansi: "-", sku: "MDL-NTB-004", desc: "180 halaman kertas bertekstur dengan sampul kulit yang makin bagus seiring pemakaian.", imageUrl: "https://picsum.photos/seed/notebook-kulit/600/400" },
  { id: "5", name: "Mug Keramik Matte", cat: "Aksesori", price: 95000, material: "Keramik stoneware", dimensi: "9 x 9 x 10 cm", berat: "0.35 kg", garansi: "-", sku: "MDL-MUG-005", desc: "Glasir matte tahan gores dengan pegangan yang dibentuk untuk genggaman lama.", imageUrl: "https://picsum.photos/seed/mug-keramik/600/400" },
  { id: "6", name: "Headphone Peredam Bising", cat: "Elektronik", price: 1290000, material: "Aluminium & memory foam", dimensi: "18 x 8 x 20 cm", berat: "0.28 kg", garansi: "12 bulan", sku: "MDL-HPN-006", desc: "ANC adaptif dengan baterai 30 jam dan bantalan memory foam bertekstur kain.", imageUrl: "https://picsum.photos/seed/headphone-audio/600/400" },
  { id: "7", name: "Meja Lipat Kayu", cat: "Furnitur", price: 1480000, material: "Kayu jati solid", dimensi: "100 x 55 x 74 cm", berat: "11 kg", garansi: "24 bulan", sku: "MDL-MJA-007", desc: "Rangka kaki lipat dengan permukaan kayu jati yang dilapis minyak alami.", imageUrl: "https://picsum.photos/seed/meja-kayu/600/400" },
  { id: "8", name: "Organizer Kabel Magnetik", cat: "Aksesori", price: 65000, material: "Silikon & magnet neodymium", dimensi: "6 x 3 x 2 cm (per unit)", berat: "0.05 kg", garansi: "-", sku: "MDL-ORG-008", desc: "Set enam klip magnetik untuk merapikan kabel charger dan mouse di meja kerja.", imageUrl: "https://picsum.photos/seed/kabel-organizer/600/400" }
];

export const getProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.warn("Backend API not reachable at", API_BASE_URL, "- using fallback data.", error.message);
    return fallbackProducts;
  }
};

export const getProductById = async (id) => {
  const token = localStorage.getItem('shoppu_token');
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response.data;
  } catch (error) {
    console.warn(`Backend API not reachable for ID ${id} - using fallback data.`, error.message);
    const item = fallbackProducts.find(p => p.id === id || p.id === String(id) || p._id === id);
    return item || fallbackProducts[0];
  }
};

