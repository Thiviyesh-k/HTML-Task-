var products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Nike", category: "Football", price: 9000, stock: 3 }
];

var tableBody = document.getElementById("productTableBody");
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var addBtn = document.getElementById("addBtn");
var modalOverlay = document.getElementById("modalOverlay");
var saveBtn = document.getElementById("saveBtn");
var cancelBtn = document.getElementById("cancelBtn");

var nameInput = document.getElementById("nameInput");
var categoryInput = document.getElementById("categoryInput");
var priceInput = document.getElementById("priceInput");
var stockInput = document.getElementById("stockInput");


function saveToStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderTable(list) {
  tableBody.innerHTML = "";

  if (list.length === 0) {
    var emptyRow = document.createElement("tr");
    emptyRow.innerHTML = '<td colspan="6" class="empty-msg">No products found.</td>';
    tableBody.appendChild(emptyRow);
    return;
  }

  for (var i = 0; i < list.length; i++) {
    var product = list[i];
    var row = document.createElement("tr");

    row.innerHTML =
      "<td>" + (i + 1) + "</td>" +
      "<td>" + product.name + "</td>" +
      "<td>" + product.category + "</td>" +
      "<td>₹" + product.price + "</td>" +
      "<td>" + product.stock + "</td>" +
      "<td><button class='delete-btn' data-index='" + i + "'>Delete</button></td>";

    tableBody.appendChild(row);
  }
}


function attachDeleteEvents() {
  var deleteButtons = document.querySelectorAll(".delete-btn");
  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      var index = parseInt(this.getAttribute("data-index"));
      products.splice(index, 1);
      saveToStorage();
      renderTable(products);
      attachDeleteEvents();
    });
  }
}

renderTable(products);
attachDeleteEvents();

function doSearch() {
  var query = searchInput.value.toLowerCase().trim();

  if (query === "") {
    renderTable(products);
    attachDeleteEvents();
    return;
  }

  var filtered = [];
  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    if (p.name.toLowerCase().indexOf(query) !== -1 || p.category.toLowerCase().indexOf(query) !== -1) {
      filtered.push(p);
    }
  }

  renderTable(filtered);
  attachDeleteEvents();
}

searchBtn.addEventListener("click", doSearch);

searchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    doSearch();
  }
  if (searchInput.value.trim() === "") {
    renderTable(products);
    attachDeleteEvents();
  }
});

addBtn.addEventListener("click", function () {
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  stockInput.value = "";
  modalOverlay.classList.add("active");
});


cancelBtn.addEventListener("click", function () {
  modalOverlay.classList.remove("active");
});


modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
  }
});

saveBtn.addEventListener("click", function () {
  var name = nameInput.value.trim();
  var category = categoryInput.value.trim();
  var price = priceInput.value.trim();
  var stock = stockInput.value.trim();

  if (name === "" || category === "" || price === "" || stock === "") {
    alert("Please fill in all fields.");
    return;
  }

  products.push({
    name: name,
    category: category,
    price: Number(price),
    stock: Number(stock)
  });

  saveToStorage();
  renderTable(products);
  attachDeleteEvents();

  modalOverlay.classList.remove("active");
});