const urlp =
  "https://script.google.com/macros/s/AKfycbz2gtxp-wFL26T2scW_YIdE8ishMETEC5h8Ci52bgLo7cr9gAtDVSkp77HRvpJ73wnW/exec";

const productData = document.getElementById("productData");
const productDataUser = document.getElementById("productDataUser");
const productCount = document.getElementById("productCount");
const totalPrice = document.getElementById("totalPrice");

async function getdata() {
  try {
    const res = await fetch(urlp + "?action=read");
    const data = await res.json();
    const rows = data.data;
    const role = localStorage.getItem("role");

    if (role === "user") {
      // Show user view
      if (productDataUser) productDataUser.innerHTML = "";

      let userHTML = "";
      for (let row of rows) {
        userHTML += `
            <div class="card" style="width: 18rem;">
              <img src="${row[5]}" class="card-img-top" alt="${row[1]}">
              <div class="card-body">
                <h5 class="card-title">${row[1]}</h5>
                <p class="card-text">${row[2]}</p>
                <p class="text-success fw-bold">${row[3]}$</p>
                <p class="card-text btn btn btn-outline-secondary btn-sm">${row[4]}</p>
              </div>
            </div>
          `;
      }
      productDataUser.innerHTML = userHTML;
      return; // stop here if user
    }

    // Admin view
    if (productData) productData.innerHTML = "";
    let adminHTML = "";

    for (let row of rows) {
      adminHTML += `
          <tr class="align-middle">
            <th>#${row[0]}</th>
            <td><img style="width:50px; height:50px" src="${row[5]}" alt="${row[1]}"></td>
            <td class="fw-bold text-uppercase text-truncate truncate-2-lines" style="max-width: 200px;">${row[1]}</td>
            <td class="text-primary cursor-pointer">${row[2]}</td>
            <td class="text-uppercase">${row[3]}$</td>
            <td>${row[4]}</td>
            <td>${row[6]}</td>
            <td>
              <div class="d-flex gap-2 justify-content-center">
                <button onclick="DeleteData(${row[0]})" class="btn btn-danger btn-sm">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button onclick="detailData(${row[0]})" class="btn btn-primary btn-sm">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
    }

    productData.innerHTML = adminHTML;

    // Set count and total price
    if (productCount) productCount.innerHTML = rows.length;
    if (totalPrice) {
      const total = rows.reduce((sum, item) => sum + parseFloat(item[3]), 0);
      totalPrice.innerHTML = total.toFixed(2) + "$";
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

getdata();

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("nameProduct").value;
  const description = document.getElementById("descriptionProduct").value;
  const price = document.getElementById("priceProduct").value;
  const category = document.getElementById("categoryProduct").value;
  const image = document.getElementById("imageProduct").value;

  const params = {
    action: "insert",
    id: Math.floor(Math.random() * 1000000),
    name: name,
    description: description,
    price: price,
    category: category,
    image_url: image,
    createdAt: new Date().toISOString(),
  };

  console.log("Submitting product data:", params);

  fetch(urlp + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      const role = localStorage.getItem("role");
      if (role === "user") alert("You don't have permission to add products.");
      else {
        if (data.status === "success") {
          document.getElementById("productForm").reset();

          const modal = bootstrap.Modal.getInstance(
            document.getElementById("addProductModal")
          );
          modal.hide();
          alert("Product added successfully!");
          getdata();
        } else {
          alert("Failed to add product.");
        }
      }
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

function DeleteData(id) {
  const params = {
    action: "delete",
    id: id,
  };

  fetch(urlp + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      getdata(); // Refresh table after delete
      console.log(data);
    })
    .catch((error) => {
      console.error("Error deleting product:", error.message);
    });
}

function detailData(id) {
  const params = {
    action: "read",
    id: id,
  };

  fetch(urlp + "?" + new URLSearchParams(params))
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.data.length; i++) {}
    })
    .catch((error) => {
      console.error("Error fetching product details:", error.message);
    });
}
