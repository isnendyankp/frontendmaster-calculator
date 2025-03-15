// Buffer untuk menyimpan angka yang sedang diinput
// Diinisialisasi dengan "0" sebagai nilai awal
let buffer = "0";

// runningTotal adalah hasil dari operasi matematika yang sedang berlangsung
// Diinisialisasi runningTotal sebagai 0
let runningTotal = 0;

// previousOperator adalah simbol operasi matematika yang terakhir
// Diinisialisasi previousOperator sebagai null
let previousOperator  = null;

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
    // Memanggil fungsi rerender untuk memperbarui tampilan layar
    rerender();
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

function handleMath(value) {
    // Jika buffer masih "0" (nilai awal)
    // Mengabaikan simbol yang diklik
    if (buffer === "0") {
        // do nothing
        return;
    }
    // Mengkonversi buffer ke angka
    const intBuffer = parseInt(buffer);
    // Untuk menentukan apakah operasi harus dilakukan
    if (runningTotal === 0) {
        runningTotal = intBuffer;
      } else {
        flushOperation(intBuffer);
      }
      // ini di gunakan untuk menyimpan simbol operasi matematika yang terakhir
      previousOperator = value;

      // Mengatur buffer kembali menjadi "0"
      buffer = "0";
}

// Fungsi untuk melakukan operasi matematika berdasarkan operator yang tersimpan
// Parameter intBuffer adalah angka yang baru diinput oleh user
function flushOperation(intBuffer) {
  // Mengecek operator yang tersimpan dan melakukan operasi yang sesuai
  // runningTotal adalah hasil perhitungan sejauh ini
  // intBuffer adalah angka yang baru diinput

  // Jika operator adalah tambah (+)
  if (previousOperator === "+") {
    // Menambahkan angka baru ke hasil sebelumnya
    // Contoh: 5 + 3, runningTotal (5) += intBuffer (3)
    runningTotal += intBuffer;
  } 
  // Jika operator adalah kurang (-)
  else if (previousOperator === "-") {
    // Mengurangi hasil sebelumnya dengan angka baru
    // Contoh: 5 - 3, runningTotal (5) -= intBuffer (3)
    runningTotal -= intBuffer;
  } 
  // Jika operator adalah kali (×)
  else if (previousOperator === "×") {
    // Mengalikan hasil sebelumnya dengan angka baru
    // Contoh: 5 × 3, runningTotal (5) *= intBuffer (3)
    runningTotal *= intBuffer;
  } 
  // Jika operator adalah bagi (÷)
  else {
    // Membagi hasil sebelumnya dengan angka baru
    // Contoh: 6 ÷ 2, runningTotal (6) /= intBuffer (2)
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case "=":
            // Mengecek apakah ada operator yang sudah dipilih sebelumnya
            // previousOperator === null berarti belum ada operator yang dipilih
            // Contoh: User langsung klik "=" tanpa operasi matematika
            if (previousOperator === null) {
                // Keluar dari fungsi karena tidak bisa melakukan perhitungan
                // Butuh dua angka dan satu operator untuk melakukan matematika
                // Contoh yang valid: "5 + 3 ="
                // Contoh yang tidak valid: "5 ="
                return;
              }
            
            // Melakukan perhitungan terakhir saat tombol "=" diklik
            // 1. parseInt(buffer) mengubah string angka menjadi number
            // 2. flushOperation menghitung hasil akhir berdasarkan:
            //    - runningTotal (angka pertama)
            //    - previousOperator (+-×÷)
            //    - buffer (angka kedua)
            // Contoh: "5 + 3 =" → flushOperation(3) → 5 + 3 = 8
            flushOperation(parseInt(buffer));
            previousOperator = null;
            // Setelah perhitungan selesai:
            // 1. runningTotal sekarang berisi hasil perhitungan (misal: 8)
            // 2. buffer akan diupdate dengan hasil ini untuk:
            //    - Menampilkan hasil di layar kalkulator
            //    - Memungkinkan perhitungan lanjutan (misal: 8 + 2)
            // 3. Saat rerender() dipanggil, layar akan menampilkan hasil
            buffer = runningTotal;
            // Mengatur runningTotal menjadi 0 untuk memulai perhitungan baru
            // Ini penting karena:
            // 1. Hasil sudah disimpan di buffer untuk ditampilkan
            // 2. Jika user mulai ketik angka baru, itu akan jadi perhitungan baru
            // 3. Mencegah hasil sebelumnya mempengaruhi perhitungan berikutnya
            // Contoh:
            // - User mengetik "5 + 3 =" → hasil 8 disimpan di buffer
            // - runningTotal = 0 untuk siap perhitungan baru
            // - Jika user ketik "2", ini akan jadi perhitungan baru, bukan "8 + 2"
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
              buffer = "0";
            } else {
              buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(value);
            break;
    }
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