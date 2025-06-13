const urlp =
  "https://script.google.com/macros/s/AKfycbz2gtxp-wFL26T2scW_YIdE8ishMETEC5h8Ci52bgLo7cr9gAtDVSkp77HRvpJ73wnW/exec";

const productData = document.getElementById("productData");
const productDataUser = document.getElementById("productDataUser");

async function getdata() {
  try {
    const res = await fetch(urlp + "?action=read");
    const data = await res.json();
    const rows = data.data;

    if (productData) productData.innerHTML = "";
    if (productDataUser) productDataUser.innerHTML = "";

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      if (productData) {
        productData.innerHTML += `
          <tr class="align-middle">
            <th>#${row[0]}</th>
            <td><img style="width:50px; height:50px" src="${row[5]}" alt="${row[1]}"></td>
            <td class="fw-bold text-uppercase">${row[1]}</td>
            <td class="text-primary cursor-pointer">${row[2]}</td>
            <td class="text-uppercase">${row[3]}$</td>
            <td>${row[4]}</td>
            <td>${row[6]}</td>
            <td>
              <div class="d-flex gap-2 justify-content-center">
                <button onclick="DeleteData(${row[0]})" class="btn btn-danger btn-sm">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button class="btn btn-primary btn-sm">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }

      if (productDataUser) {
        productDataUser.innerHTML += `
          <div class="card" style="width: 18rem;">
            <img src="${row[5]}" class="card-img-top w-100 h-100" alt="${row[1]}">
            <div class="card-body">
              <h5 class="card-title">${row[1]}</h5>
              <p class="card-text">${row[2]}</p>
              <p class="card-text">Price: ${row[3]}$</p>
            </div>
          </div>
        `;
      }
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
      if (data.status === "success") {
        // Optionally refresh product list here
        document.getElementById("productForm").reset();
        // Hide modal
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("addProductModal")
        );
        modal.hide();
        alert("Product added successfully!");
      } else {
        alert("Failed to add product.");
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
