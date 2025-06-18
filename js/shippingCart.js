const url = "https://script.google.com/macros/s/AKfycbwXBD0w1-R6JFgUEbysMZgsuYpuPIBdQOyxzDFBPin1vBVeBtFhoBvEreQhclkcnH4xGg/exec?action=read";

const getCartItems = () => fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");

    
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const filteredData = data.data.filter(item => 
      item.userId === userId || item.userEmail === userEmail
    );
    
    cartItems.innerHTML = ""; 
    filteredData.forEach(item => {
        cartTotal.textContent = filteredData.length;
        console.log(item);
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <div class="cart-item-details container">
            <h3 class="text-center text-decoration-underline">Thank you For Your Order</h3>
          <p class="cart-item-user fw-bold">User Name: <span class="fw-semibold text-primary">${item.userName}</span></p>
          <p class="cart-item-email">User Email: <span class="fw-semibold text-primary">${item.userEmail}</span></p>
          <p class="cart-item-product">Product ID: <span class="fw-semibold text-warning">${item.productId}</span></p>
        
          <p class="cart-item-date">Date: <span class="fw-semibold text-success">${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}</span></p>
         <p> price: <span class="fw-semibold text-success">$${item.productPrice}</span></p>
        </div>
        <button class="btn btn-danger btn-sm" onclick="DeleteCartData('${item.id}')">
          <i class="fas fa-trash"></i> Cancel Order
        </button>
        <hr>
        <p class="text-center">Thank you for shopping with us! I will contact you by your email: <a class="fw-semibold text-primary" href="mailto:${item.userEmail}">${item.userEmail}</a></p>
        <hr>
      `;
      cartItems.appendChild(itemDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  getCartItems();

  function DeleteCartData(id) {
  var url = "https://script.google.com/macros/s/AKfycbywNOb25EKna2chbreFfuFOfn6j0r33x9oXjQ5XodboTGsZSkjDt6nIP2XxWSMg7Svuwg/exec";
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
      getCartItems();
      
    });
}