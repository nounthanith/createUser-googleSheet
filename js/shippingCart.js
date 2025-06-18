const url = "https://script.google.com/macros/s/AKfycbwXBD0w1-R6JFgUEbysMZgsuYpuPIBdQOyxzDFBPin1vBVeBtFhoBvEreQhclkcnH4xGg/exec?action=read";

fetch(url)
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
    
    filteredData.forEach(item => {
        cartTotal.textContent = `Total: ${filteredData.length} items`;
        console.log(item);
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <div class="cart-item-details">
          <p class="cart-item-user">User: ${item.userName} (${item.userEmail})</p>
          <p class="cart-item-product">Product ID: ${item.productId}</p>
            <p class="cart-item-id">Cart ID: ${item.id}</p>
        </div>
        <button class="btn btn-danger btn-sm" onclick="DeleteCartData('${item.id}')">
          <i class="fas fa-trash"></i> Remove
        </button>
        <hr>
      `;
      cartItems.appendChild(itemDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });