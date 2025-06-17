const urlp =
  "https://script.google.com/macros/s/AKfycbwykmWL3mlvjYXGUVC6-cqkgyq8rvYts5Ouu2FLQnC_08lcsr-9cXDosAt9VjMTaH6o/exec";

const productData = document.getElementById("productData");
const productDataUser = document.getElementById("productDataUser");
const productCount = document.getElementById("productCount");
const totalPrice = document.getElementById("totalPrice");

async function getProduct() {
  try {
    const res = await fetch(urlp + "?action=read");
    const data = await res.json();
    const rows = data.data;
    const role = localStorage.getItem("role");

    if (role === "user") {
      // user view
      if (productDataUser) productDataUser.innerHTML = "";

      let userHTML = "";

      for (let row of rows) {
        userHTML += `
          <div class="col">
            <div class="card h-100 shadow-sm" style="cursor:pointer" onclick="window.location.href='product-detail.html?id=${row[0]}'">
              <img src="${row[5]}" class="card-img-top" alt="${row[1]}">
              <div class="card-body">
                <h5 class="card-title">${row[1]}</h5>
                
                <p class="card-text text-success fw-bold">Price: ${row[3]}$</p>
                
              </div>
            </div>
          </div>
        `;
      }
      document.getElementById("productDataUser").innerHTML = userHTML;

      productDataUser.innerHTML = userHTML;
      return;
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
            <td class="text-truncate truncate-2-lines" style="max-width: 200px;">${row[2]}</td>
            <td class="text-uppercase text-primary cursor-pointer">${row[3]}$</td>
            <td>${row[4]}</td>
            <td>${row[6]}</td>
            <td>
              <div class="d-flex gap-2 justify-content-center">
                <button onclick="DeleteProduct(${row[0]})" class="btn btn-danger btn-sm">
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

getProduct();

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
          // Swal.fire({
          //   title: "Success",
          //   text: "Product add successfully.🙏",
          //   icon: "success",
          //   confirmButtonText: "Back",
          // });
          location.reload();
          getProduct();
        } else {
          // alert("Failed to add product.");
          Swal.fire({
            title: "Fail",
            text: "Fail to add!!!",
            icon: "error",
            confirmButtonText: "Back",
          });
        }
      }
    })
    .catch((error) => {
      Swal.fire({
        title: "Fail",
        text: error.message,
        icon: "error",
        confirmButtonText: "Back",
      });
    });
});

function DeleteProduct(id) {
  const params = {
    action: "delete",
    id: id,
  };

  fetch(urlp + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      getProduct();
      Swal.fire({
        title: "Delete",
        text: "Delete successfully.",
        icon: "success",
        confirmButtonText: "Back",
      });
      // console.log(data);
    })
    .catch((error) => {
      console.error("Error deleting product:", error.message);
    });
}

function detailData(id) {
  const params = {
    action: "getById", // Use the correct action
    id: id,
  };

  fetch(urlp + "?" + new URLSearchParams(params))
    .then((response) => response.json())
    .then((data) => {
      const product = data.data[0];
      if (product) {
        document.getElementById("nameProduct").value = product[1];
        document.getElementById("descriptionProduct").value = product[2];
        document.getElementById("priceProduct").value = product[3];
        document.getElementById("categoryProduct").value = product[4];
        document.getElementById("imageProduct").value = product[5];

        const modal = new bootstrap.Modal(
          document.getElementById("addProductModal")
        );
        modal.show();
      } else {
        Swal.fire("Product not found", "", "error");
      }
    })
    .catch((error) => {
      Swal.fire("Error fetching product details", error.message, "error");
    });
}

  fetch(urlp + "?" + new URLSearchParams(params))
    .then((response) => response.json())
    .then((data) => {
      const product = data.data[0];
      if (product) {
        document.getElementById("nameProduct").value = product[1];
        document.getElementById("descriptionProduct").value = product[2];
        document.getElementById("priceProduct").value = product[3];
        document.getElementById("categoryProduct").value = product[4];
        document.getElementById("imageProduct").value = product[5];

        const modal = new bootstrap.Modal(
          document.getElementById("addProductModal")
        );
        modal.show();
      } else {
        Swal.fire("Product not found", "", "error");
      }
    })
    .catch((error) => {
      Swal.fire("Error fetching product details", error.message, "error");
    });



function addToCart(productId) {
 
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
 
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));

  if (typeof Swal !== "undefined") {
    Swal.fire("Added to cart!", "", "success");
  } else {
    alert("Added to cart!");
  }
}