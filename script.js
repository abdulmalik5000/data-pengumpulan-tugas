// JavaScript
// Data storage
let aqidahData = [];
let bahasaArabData = [];
let hadistData = [];

// Fungsi untuk tab
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Fungsi untuk generate ID unik
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Fungsi untuk menampilkan data ke tabel
function renderTable(data, tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = '';
    
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>Kelas ${item.kelas}</td>
            <td>${item.judul}</td>
            <td>${item.tanggal}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editData('${item.id}', '${tableBodyId.replace('TableBody', '')}')">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteData('${item.id}', '${tableBodyId.replace('TableBody', '')}')">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi untuk menambahkan data
function addData(formId, dataArray, tableBodyId) {
    const form = document.getElementById(formId);
    const nama = document.getElementById(formId.replace('Form', 'Nama')).value;
    const kelas = document.getElementById(formId.replace('Form', 'Kelas')).value;
    const judul = document.getElementById(formId.replace('Form', 'Judul')).value;
    const deskripsi = document.getElementById(formId.replace('Form', 'Deskripsi')).value;
    const tanggal = document.getElementById(formId.replace('Form', 'Tanggal')).value;
    
    const newData = {
        id: generateId(),
        nama: nama,
        kelas: kelas,
        judul: judul,
        deskripsi: deskripsi,
        tanggal: tanggal
    };
    
    dataArray.push(newData);
    renderTable(dataArray, tableBodyId);
    form.reset();
    
    // Simpan ke localStorage
    localStorage.setItem(formId.replace('Form', 'Data'), JSON.stringify(dataArray));
}

// Fungsi untuk mengedit data
function editData(id, subject) {
    let dataArray;
    let formId;
    
    if (subject === 'aqidah') {
        dataArray = aqidahData;
        formId = 'aqidahForm';
    } else if (subject === 'bahasaArab') {
        dataArray = bahasaArabData;
        formId = 'bahasaArabForm';
    } else if (subject === 'hadist') {
        dataArray = hadistData;
        formId = 'hadistForm';
    }
    
    const dataToEdit = dataArray.find(item => item.id === id);
    if (!dataToEdit) return;
    
    // Isi form dengan data yang akan diedit
    document.getElementById(`${subject}Nama`).value = dataToEdit.nama;
    document.getElementById(`${subject}Kelas`).value = dataToEdit.kelas;
    document.getElementById(`${subject}Judul`).value = dataToEdit.judul;
    document.getElementById(`${subject}Deskripsi`).value = dataToEdit.deskripsi;
    document.getElementById(`${subject}Tanggal`).value = dataToEdit.tanggal;
    
    // Hapus data lama
    deleteData(id, subject);
    
    // Scroll ke form
    document.getElementById(formId).scrollIntoView({ behavior: 'smooth' });
}

// Fungsi untuk menghapus data
function deleteData(id, subject) {
    let dataArray;
    let storageKey;
    let tableBodyId;
    
    if (subject === 'aqidah') {
        dataArray = aqidahData;
        storageKey = 'aqidahData';
        tableBodyId = 'aqidahTableBody';
    } else if (subject === 'bahasaArab') {
        dataArray = bahasaArabData;
        storageKey = 'bahasaArabData';
        tableBodyId = 'bahasaArabTableBody';
    } else if (subject === 'hadist') {
        dataArray = hadistData;
        storageKey = 'hadistData';
        tableBodyId = 'hadistTableBody';
    }
    
    const index = dataArray.findIndex(item => item.id === id);
    if (index !== -1) {
        dataArray.splice(index, 1);
        renderTable(dataArray, tableBodyId);
        
        // Update localStorage
        localStorage.setItem(storageKey, JSON.stringify(dataArray));
    }
}

// Fungsi untuk mencari data di tabel
function searchTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toUpperCase();
    const table = document.getElementById(tableId);
    const tr = table.getElementsByTagName("tr");
    
    for (let i = 1; i < tr.length; i++) {
        let found = false;
        const td = tr[i].getElementsByTagName("td");
        
        for (let j = 0; j < td.length - 1; j++) { // Skip kolom aksi
            if (td[j]) {
                const txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// Event listeners untuk form submission
document.getElementById('aqidahForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addData('aqidahForm', aqidahData, 'aqidahTableBody');
});

document.getElementById('bahasaArabForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addData('bahasaArabForm', bahasaArabData, 'bahasaArabTableBody');
});

document.getElementById('hadistForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addData('hadistForm', hadistData, 'hadistTableBody');
});

// Load data dari localStorage saat halaman dimuat
window.addEventListener('DOMContentLoaded', function() {
    // Aqidah
    const savedAqidahData = localStorage.getItem('aqidahData');
    if (savedAqidahData) {
        aqidahData = JSON.parse(savedAqidahData);
        renderTable(aqidahData, 'aqidahTableBody');
    }
    
    // Bahasa Arab
    const savedBahasaArabData = localStorage.getItem('bahasaArabData');
    if (savedBahasaArabData) {
        bahasaArabData = JSON.parse(savedBahasaArabData);
        renderTable(bahasaArabData, 'bahasaArabTableBody');
    }
    
    // Hadist
    const savedHadistData = localStorage.getItem('hadistData');
    if (savedHadistData) {
        hadistData = JSON.parse(savedHadistData);
        renderTable(hadistData, 'hadistTableBody');
    }
    
    // Set tanggal hari ini sebagai default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('aqidahTanggal').value = today;
    document.getElementById('bahasaArabTanggal').value = today;
    document.getElementById('hadistTanggal').value = today;
});