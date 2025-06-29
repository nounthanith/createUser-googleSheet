const urldetail =
  "https://script.google.com/macros/s/AKfycbwykmWL3mlvjYXGUVC6-cqkgyq8rvYts5Ouu2FLQnC_08lcsr-9cXDosAt9VjMTaH6o/exec";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");


async function loadProduct() {
  try {
    const res = await fetch(`${urldetail}?action=getById&id=${productId}`);
    const data = await res.json();
    const product = data.data && data.data[0];
    // console.log(product);

    const priceProduct = product[3]
    console.log(priceProduct);
    localStorage.setItem("productPrice", priceProduct);


    if (product) {
      document.getElementById("productDetail").innerHTML = `
        <div class="d-flex justify-content-center align-items-center " style="min-height: 70vh;">
            <div class="card shadow-lg p-3" style="max-width: 500px; width: 100%;">
                <img src="${product[5]}" class="card-img-top" alt="${product[1]}" style="border: 1px solid #ddd; object-fit:cover; max-height:300px;">
                <div class="card-body">
                <h2 class="card-title">${product[1]}</h2>
                <p class="card-text mb-2">Description: ${product[2]}</p>
                <p class="fw-bold text-success mb-2" style="font-size: 1.2rem;">Price: ${product[3]}$</p>
                <p class="mb-3"><span class="badge bg-secondary">Category: ${product[4]}</span></p>
                <button class="btn btn-success w-100" onclick="addToCart('${product[0]}')">
                    <i class="fa fa-cart-plus"></i>Buy Now
                </button>
                <button class="btn btn-primary w-100 mt-2" onclick="window.location.href='product.html'">
                    <i class="fa fa-arrow-left"></i> Back to Products
                </button>
                </div>
            </div>
        </div>
      `;
    } else {
      document.getElementById("productDetail").innerHTML =
        "<h2>Product not found</h2>";
    }
  } catch (error) {
    document.getElementById("productDetail").innerHTML =
      "<h2>Error loading product</h2>";
    console.error(error);
  }
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));

  Swal.fire({
    title: "Success",
    text: "Add to cart successfully. Thank you for your purchase!🥺❤️",
    icon: "success",
    confirmButtonText: "Go to Cart",
  }).then(() => {
    window.location.href = "cart.html";
  });

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const productPrice = localStorage.getItem("productPrice");
  // const productName = localStorage.getItem("productName");
  

  // console.log("User ID:", userId);
  // console.log("User Name:", userName);
  // console.log("User Email:", userEmail);
  // console.log("Product added to cart:", productId);
  // console.log("Product Price:", productPrice);
  // console.log("Product Name:", productName);

  const params = {
    action: "insert",
    id: Math.floor(Math.random() * 10000),
    userId: userId,
    userName: userName,
    userEmail: userEmail,
    productId: productId,
    productPrice: productPrice,
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbzND8OwT0Y8tkyApPfgPPPqXprxi0cjRYw8Gef-6DvTBtV7iKv5qoa-vuAZVIqb32xXOw/exec?" +
      new URLSearchParams(params),
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Data sent to Google Sheets:", data);
    })
    .catch((error) => {
      console.error("Error sending to Google Sheets:", error);
    });
}


loadProduct();

