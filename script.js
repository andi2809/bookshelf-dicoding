// Informasi Jumlah Buku
const jumlahBukuBelumDibaca = document.getElementById("jumlahBukuBelumDibaca");
const jumlahBukuSudahDibaca = document.getElementById("jumlahBukuSudahDibaca");
const jumlahBukuTotal = document.getElementById("jumlahBukuTotal");

// Ambil data dari localStorage, atau gunakan data default jika tidak ada
const defaultData = [
	{
		id: 1,
		title: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
		year: 1925,
		isComplete: true,
	},
	{
		id: 2,
		title: "To Kill a Mockingbird",
		author: "Harper Lee",
		year: 1960,
		isComplete: false,
	},
	{
		id: 3,
		title: "1984",
		author: "George Orwell",
		year: 1949,
		isComplete: true,
	},
	{
		id: 4,
		title: "Moby Dick",
		author: "Herman Melville",
		year: 1851,
		isComplete: false,
	},
];

// Pastikan data dari localStorage terkonversi menjadi array
const data = JSON.parse(localStorage.getItem("data")) || [];

// ==== Fungsi Tambah ====
const tambahBuku = document.querySelector(".tambah-buku");
const modalTambahBuku = document.querySelector(".modal-tambah-buku");
const closeModal = document.querySelector(".close-modal-tambah-buku");
const closeModal2 = document.querySelector(".close-modal-tambah-buku2");

const containerSudahDibaca = document.getElementById("containerSudahDibaca");
const containerBelumDibaca = document.getElementById("containerBelumDibaca");

// element modal
tambahBuku.addEventListener("click", () => {
	modalTambahBuku.classList.add("active");
});

// Render data berdasarkan status
function renderData(isSearch = null) {
	console.log(isSearch);

	if (isSearch) {
		console.log("Lebih le");

		const dataSudahDibaca = isSearch.filter((book) => book.isComplete === true);
		const dataBelumDibaca = isSearch.filter(
			(book) => book.isComplete === false
		);
		document.getElementById("jumlahBukuBelumDibaca").innerText =
			dataBelumDibaca.length;
		document.getElementById("jumlahBukuSudahDibaca").innerText =
			dataSudahDibaca.length;
		document.getElementById("jumlahBukuTotal").innerText = data.length;

		renderTasks(containerSudahDibaca, dataSudahDibaca);
		renderTasks(containerBelumDibaca, dataBelumDibaca);
	} else {
		console.log("kurang le");

		const dataSudahDibaca = data.filter((book) => book.isComplete === true);
		const dataBelumDibaca = data.filter((book) => book.isComplete === false);
		document.getElementById("jumlahBukuBelumDibaca").innerText =
			dataBelumDibaca.length;
		document.getElementById("jumlahBukuSudahDibaca").innerText =
			dataSudahDibaca.length;
		document.getElementById("jumlahBukuTotal").innerText = data.length;

		renderTasks(containerSudahDibaca, dataSudahDibaca);
		renderTasks(containerBelumDibaca, dataBelumDibaca);
	}
}
// Fungsi untuk menampilkan data di dalam elemen HTML
function renderTasks(container, tasks) {
	if (!container) return;
	container.innerHTML = ""; // Bersihkan isi container

	tasks.forEach((task, index) => {
		const taskElement = document.createElement("tr");
		taskElement.setAttribute("data-bookid", task.id);
		taskElement.setAttribute("data-testid", "bookItem");

		// Set isi HTML elemen tr
		taskElement.innerHTML = `
      <td class="px-3 py-6 td-no">
        <p class="text-neutral-90 text-sm font-semibold">${index + 1}</p>
      </td>
      <td class="px-4 py-6 td-judul">
        <p class="text-neutral-90 text-sm font-semibold" data-testid="bookItemTitle">
          ${task.title}
        </p>
      </td>
      <td class="px-3 py-4 td-nama">
        <p class="text-neutral-100 font-extrabold text-sm mb-1" data-testid="bookItemAuthor">
          ${task.author}
        </p>
        <p class="text-primary-main font-bold text-xs" data-testid="bookItemYear">
          ${task.year}
        </p>
      </td>
      <td class="px-1 td-aksi">
        <div class="flex flex-row items-center justify-center gap-3">
          <button class="btn-action edit-buku" data-testid="bookItemEditButton">
            <img src="assets/Icon-edit.svg" alt="icon edit" />
          </button>
          <button class="btn-action delete-buku" data-testid="bookItemDeleteButton">
            <img src="assets/Icon-delete.svg" alt="icon delete" />
          </button>
        </div>
      </td>
    `;

		// Tambahkan elemen tr ke dalam container
		container.appendChild(taskElement);
	});
	containerSudahDibaca.querySelectorAll(".delete-buku").forEach((button) =>
		button.addEventListener("click", (e) => {
			const bookRow = e.target.closest("tr");
			const bookId = bookRow.getAttribute("data-bookid");
			deleteData(bookId);
		})
	);

	containerBelumDibaca.querySelectorAll(".delete-buku").forEach((button) =>
		button.addEventListener("click", (e) => {
			const bookRow = e.target.closest("tr");
			const bookId = bookRow.getAttribute("data-bookid");
			deleteData(bookId);
		})
	);
}

const submit = document.querySelector(".button-submit");

// inisiasi elemen input
// const title = document.getElementById("judulBuku").value;
// const author = document.getElementById("namaPenulis").value;
// const kategori = document.getElementsByClassName("kategoriJawab").value;
// const year = document.getElementById("tahunTerbit").value;

function addData() {
	const title = document.getElementById("judulBuku").value;
	const author = document.getElementById("namaPenulis").value;
	const year = document.getElementById("tahunTerbit").value;
	const kategori = document.querySelector(
		"input[name='kategoriJawab']:checked"
	);

	if (!title || !author || !kategori) {
		alert("Semua field harus diisi!");
		return;
	}
	if (typeof parseInt(year) != "number") {
		alert("Field tahun harus diisi dengan angka");
		return;
	}

	const newBook = {
		id: data.length ? data[data.length - 1].id + 1 : 1,
		title,
		author,
		year,
		isComplete: kategori.value === "true",
	};

	data.push(newBook);
	localStorage.setItem("data", JSON.stringify(data));
	renderData();
	clearForm();
}

// Fungsi untuk menghapus data berdasarkan id
function deleteData(id) {
	const confirmDelete = confirm("Apakah Anda yakin ingin menghapus data ini?");
	if (!confirmDelete) return;

	// Cari elemen berdasarkan ID dan filter untuk menyisakan elemen lain
	const updatedData = data.filter((book) => book.id !== parseInt(id));

	// Update localStorage dan array data
	data.length = 0;
	data.push(...updatedData);
	localStorage.setItem("data", JSON.stringify(data));

	// Render ulang data
	renderData();
	clearForm();
}

// Fungsi untuk membersihkan form
function clearForm() {
	modalTambahBuku.classList.remove("active");
	document.getElementById("judulBuku").value = "";
	document.getElementById("namaPenulis").value = "";
	document.getElementById("tahunTerbit").value = "";
	document.querySelector("input[name='kategoriJawab']:checked").checked = false;
}
// Event listener untuk tombol submit
document.querySelector(".button-submit").addEventListener("click", addData);

// Event listener untuk tombol close dan batal
document
	.querySelectorAll(".close-modal-tambah-buku")
	.forEach((button) => button.addEventListener("click", clearForm));

const inputSearch = document.getElementById("search");

inputSearch.addEventListener("keyup", (event) => {
	const dataSearch = [];
	data.forEach((element) => {
		if (
			element.author.toLowerCase().includes(event.target.value) ||
			element.title.toLowerCase().includes(event.target.value)
		) {
			dataSearch.push(element);
			console.log(element);
		}
	});
	renderData(dataSearch);

	// console.log(dataSearch.filter((book) => book.isComplete === true));
	// console.log(dataSearch.filter((book) => book.isComplete === false));
});

// Render data saat halaman dimuat
window.addEventListener("load", () => {
	renderData();
	clearForm();
});

// EDIT DATA

// Search Data
