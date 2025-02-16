document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", img: "1.jpg", price: 30000 },
      { id: 2, name: "Arabica Blend", img: "2.jpg", price: 30000 },
      { id: 3, name: "Primo Passo", img: "3.jpg", price: 30000 },
      { id: 4, name: "Aceh Gayo", img: "4.jpg", price: 30000 },
      { id: 5, name: "Sumatra Mandheling", img: "5.jpg", price: 30000 },
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
    remove(id) {
      // ambil item yang mau dikurangi
      const cartItem = this.items.find((item) => item.id === id);

      // Jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri satu satu
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});
// Form Validasi (button tidak nyala jika form tidak di isi)
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// Kirim Data ketika tombol checkout klik
checkoutButton.addEventListener('click', async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  // const message = formatMessage(objData);
  // window.open('http://wa.me/6281335629974?text=' + encodeURIComponent(message))

  // minta transaction token menggunakan AJAX/Fetch

  try {
    const response = await fetch('php/placeOrder.php', {
      method: 'POST',
      body: data,
    });
    const token = await response.text();
    console.log(token);
    // window.snap.pay(token);
  } catch (err) {
    console.log(err.message);
  }
});

// Format Pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}
Data Pesanan
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})\n`
  )}
TOTAL: ${rupiah(obj.total)}
Terima Kasih`;
};

// Konversi Mata Uang
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};