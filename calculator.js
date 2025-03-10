// Buffer untuk menyimpan angka yang sedang diinput
// Diinisialisasi dengan "0" sebagai nilai awal
let buffer = "0";

// Mengambil referensi ke elemen layar kalkulator
const screen = document.querySelector('.screen');

// Fungsi untuk menangani semua klik tombol pada kalkulator
// Parameter 'value' adalah teks dari tombol yang diklik (misal: "1", "+", "C")
function buttonClick(value) {
    // Mengecek apakah nilai yang diklik BUKAN angka
    // isNaN = "is Not a Number"
    // parseInt mencoba mengubah value menjadi angka
    if (isNaN(parseInt(value))) { 
        // Jika bukan angka (misal: "+", "-", "C"), panggil handleSymbol
        handleSymbol(value);
    } else {
        // Jika angka (0-9), panggil handleNumber
        handleNumber(value);
    }
}

// Fungsi untuk menangani input angka
// Parameter 'number' adalah string angka yang diklik (0-9)
function handleNumber(number) {
    // Jika buffer masih "0" (nilai awal)
    // Ganti dengan angka yang baru diklik
    if (buffer === "0") {
        buffer = number;
    } else {
        // Jika buffer sudah berisi angka lain
        // Tambahkan angka baru di belakangnya (concatenate)
        // Contoh: buffer "1" + number "2" = "12"
        buffer += number;
    }
}

function handleSymbol(symbol) {

}

// Fungsi init() digunakan untuk menginisialisasi kalkulator
// Fungsi ini akan dijalankan saat halaman pertama kali dimuat
function init() {
    // Mencari elemen dengan class 'calc-buttons' yang berisi semua tombol kalkulator
    document
      .querySelector(".calc-buttons")
      // Menambahkan event listener untuk menangkap klik pada area tombol
      .addEventListener("click", function (event) {
        // Ketika tombol diklik, ambil teks dari tombol (misal: "1", "+", "=")
        // dan kirim ke fungsi buttonClick untuk diproses
        buttonClick(event.target.innerText);
      });
  }

  // Fungsi untuk memperbarui tampilan kalkulator
  // Mengubah teks pada layar kalkulator sesuai dengan nilai di buffer
  function rerender() {
    // Mengupdate tampilan layar dengan nilai terbaru dari buffer
    // Contoh: Jika buffer = "123", layar akan menampilkan "123"
    screen.innerText = buffer;
  }

  // Memanggil fungsi init() untuk menginisialisasi kalkulator
  init();