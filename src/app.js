document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 30000 },
      { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 30000 },
      { id: 3, name: 'Primo Passo', img: '3.jpg', price: 30000 },
      { id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 30000 },
      { id: 5, name: 'Sumatra Mandheling', img: '5.jpg', price: 30000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada item sama
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika Belum Ada
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barangnya sudah ada, cek apakah barang beda atau sama dengan di cart
        this.items = this.items.map((item) => {
          // Jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah jumlah dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id){
        // ambil item yang mau dikurangi
        const cartItem = this.items.find((item) => item.id === id);

        // Jika item lebih dari 1
        if(cartItem.quantity > 1) {
            // telusuri satu satu
            this.items = this.items.map((item) => {
                // jika bukan barang yang diklik
                if(item.id !== id) {
                    return item;
                } else {
                    item.quantity--;
                    item.total = item.price * item.quantity;
                    this.quantity--;
                    this.total -= item.price;
                    return item;
                }
            })
        } else if (cartItem.quantity === 1) {
            // jika barangnya sisa 1
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
        }
    }
  });
});

// Konversi Mata Uang
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
