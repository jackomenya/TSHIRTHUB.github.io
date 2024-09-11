// Sample T-shirt products
const products = [
    { id: 1, name: 'JCOLE TEE', price: 20, image: 'images/images.png' },
    { id: 2, name: 'V-Neck Tee', price: 25, image: 'images/2.jpg' },
    { id: 3, name: 'Graphic Tee', price: 30, image: 'images/3.jpg' },
    { id: 4, name: 'Long Sleeve Tee', price: 35, image: 'images/4.jpg' },
    { id: 5, name: 'Long Sleeve Tee', price: 35, image: 'images/5.jpeg' },
    { id: 6, name: 'Long Sleeve Tee', price: 35, image: 'images/6.jpeg' },
    { id: 7, name: 'Long Sleeve Tee', price: 35, image: 'images/7.jpeg' },
    { id: 8, name: 'Long Sleeve Tee', price: 35, image: 'images/8.jpeg' },
    { id: 9, name: 'Long Sleeve Tee', price: 35, image: 'images/9.jpeg' },
    { id: 10, name: 'Long Sleeve Tee', price: 35, image: 'images/10.jpeg' },
    { id: 11, name: 'Long Sleeve Tee', price: 35, image: 'images/11.jpeg' },
    { id: 12, name: 'Long Sleeve Tee', price: 35, image: 'images/12.jpeg' }
   

];

let cart = [];

// Display products with View More button
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';  // Clear previous items if any
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="viewMore(${product.id})">View More</button>
        `;
        productList.appendChild(productItem);
    });
}

// Function to view more details (opens modal)
function viewMore(productId) {
    const product = products.find(p => p.id === productId);

    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductPrice').textContent = `$${product.price}`;

    // Show the modal
    document.getElementById('productModal').style.display = "block";

    // Save product ID for adding to cart
    document.getElementById('productModal').dataset.selectedProductId = productId;
}

// Function to add selected product with options to the cart
function addToCartWithOptions() {
    const productId = parseInt(document.getElementById('productModal').dataset.selectedProductId);
    const product = products.find(p => p.id === productId);

    const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(el => el.value);
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(el => el.value);

    if (selectedSizes.length === 0 || selectedColors.length === 0) {
        alert('Please select size and color.');
        return;
    }

    const selectedProduct = {
        ...product,
        sizes: selectedSizes,
        colors: selectedColors
    };

    cart.push(selectedProduct);

    // Store the updated cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();

    // Close the modal
    document.getElementById('productModal').style.display = "none";
}

// Display cart items with selected options
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <p>Size: ${item.sizes.join(', ')}</p>
            <p>Color: ${item.colors.join(', ')}</p>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Confirmation popup
    const confirmation = confirm("Do you want to proceed with the checkout?");
    if (confirmation) {
        // Prepare the cart details for WhatsApp
        let message = "HEY ARE THIS ITEMS AVAILABLE?%0AOrder Details:%0A";
        cart.forEach(item => {
            message += `Product: ${item.name}%0ASize: ${item.sizes.join(', ')}%0AColor: ${item.colors.join(', ')}%0A%0A`;
        });

        // Add a custom note (e.g., total price)
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);
        message += `Total Price: $${totalPrice}%0A%0AThank you for your purchase!`;

        // WhatsApp URL with pre-filled message
        const phoneNumber = "+254746809914";  // Replace with the actual WhatsApp number (international format)
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
    }
}

// Load cart from local storage on page load
window.onload = () => {
    displayProducts();
    displayCart();
};

// Close the modal when the user clicks on (x)
const modal = document.getElementById('productModal');
document.getElementsByClassName('close')[0].onclick = function() {
    modal.style.display = 'none';
};

// Scroll to products when "Shop Now" is clicked
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('checkoutButton').onclick = checkout;
