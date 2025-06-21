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
                <button 
                  class="btn btn-primary btn-sm" 
                  data-bs-toggle="modal" 
                  data-bs-target="#editProductModal"
                  onclick="loadProductForEdit('${row[0]}')">
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
function getCartData() {
  fetch(
    "https://script.google.com/macros/s/AKfycbzND8OwT0Y8tkyApPfgPPPqXprxi0cjRYw8Gef-6DvTBtV7iKv5qoa-vuAZVIqb32xXOw/exec?action=read"
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log("Cart data:", data);
      const cartData = data.data;
      const cartTable = document.getElementById("cartTable");
      const cartCount = document.getElementById("cartCount");
      let totalPriceIncome;
      let income = document.getElementById("income");
      let totalPriceElement = document.getElementById("totalPriceIncome");
      // console.log("Cart data length:", cartData.length);
      // console.log("Cart data content:", cartData[0].userId);
      cartTable.innerHTML = "";
      for (let i = 0; i < cartData.length; i++) {
        cartCount.innerHTML = cartData.length;
        const row = cartData[i];

        cartTable.innerHTML += `
          <tr>
            <td class="fw-bold">#${i + 1}</td>
            <td >${row.userId}</td>
            <td class="text-success fw-bold">${row.userName}</td>
            <td class="text-primary cursor-pointer"><a href="mailto:${
              row.userEmail
            }">${row.userEmail}</a></td>
            <td class="text-danger">${row.productId}</td>
            <td class="text-success fw-bold">${row.productPrice}$</td>
            <td><button class="btn btn-danger btn-sm" onclick="DeleteCartData('${
              row.id
            }')"><icon class="fas fa-trash"></icon></button></td>
          </tr>
        `;
      }
      totalPriceIncome = cartData.reduce(
        (sum, item) => sum + parseFloat(item.productPrice),
        0
      );

      
      // income
      income.innerHTML = totalPriceIncome.toFixed(2) + "$";

      let totalIncomeTable = document.getElementById("totalIncomeTable");
      totalIncomeTable.innerHTML = totalPriceIncome.toFixed(2) + "$";

    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
    });
}

const role = localStorage.getItem("role");
if (role === "admin") {
  getCartData();
}

function DeleteCartData(id) {
  var url =
    "https://script.google.com/macros/s/AKfycbywNOb25EKna2chbreFfuFOfn6j0r33x9oXjQ5XodboTGsZSkjDt6nIP2XxWSMg7Svuwg/exec";
  var params = {
    action: "delete",
    id: id,
  };

  fetch(url + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire({
        title: "Delete",
        text: "Delete successfully.",
        icon: "success",
        confirmButtonText: "Back",
      });
      getCartData();
    });
}

// function saveUpdatedProduct() {
//   const id = document.getElementById("productId").value; // You should store the editing product's ID in a hidden field
//   const name = document.getElementById("nameProduct").value;
//   const description = document.getElementById("descriptionProduct").value;
//   const price = document.getElementById("priceProduct").value;
//   const category = document.getElementById("categoryProduct").value;
//   const image = document.getElementById("imageProduct").value;

//   const params = {
//     action: "update",
//     id: id,
//     name: name,
//     description: description,
//     price: price,
//     category: category,
//     image_url: image,
//   };

//   fetch(urlp + "?" + new URLSearchParams(params), {
//     method: "POST",
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.status === "success") {
//         Swal.fire("Success", "Product updated successfully!", "success");
//         getProduct();

//         const modal = bootstrap.Modal.getInstance(
//           document.getElementById("addProductModal")
//         );
//         modal.hide();
//       } else {
//         Swal.fire("Failed", "Product update failed!", "error");
//       }
//     })
//     .catch((error) => {
//       Swal.fire("Error", error.message, "error");
//     });
// }

// function loadProductForEdit(id) {
//   const params = {
//     action: "getById",
//     id: id,
//   };

//   fetch(urlp + "?" + new URLSearchParams(params))
//     .then((response) => response.json())
//     .then((data) => {
//       const product = data.data[0];
//       if (product) {
//         document.getElementById("productId").value = product[0]; // set ID
//         document.getElementById("nameProduct").value = product[1];
//         document.getElementById("descriptionProduct").value = product[2];
//         document.getElementById("priceProduct").value = product[3];
//         document.getElementById("categoryProduct").value = product[4];
//         document.getElementById("imageProduct").value = product[5];

//         const modal = new bootstrap.Modal(
//           document.getElementById("addProductModal")
//         );
//         modal.show();
//       } else {
//         Swal.fire("Product not found", "", "error");
//       }
//     })
//     .catch((error) => {
//       Swal.fire("Error fetching product details", error.message, "error");
//     });
// }
