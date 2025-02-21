let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
    cart.push({ productName, price });
    saveCart();
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `${item.productName} - $${item.price}
            <button class="btn btn-danger btn-sm remove-item" data-index="${index}">X</button>`;
        cartItems.appendChild(li);
        total += parseFloat(item.price);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;

    checkoutBtn.disabled = cart.length === 0;

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            removeFromCart(button.getAttribute('data-index'));
        });
    });
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let orderDetails = 'Order Summary:\n';
    cart.forEach(item => {
        orderDetails += `${item.productName} - $${item.price}\n`;
    });
    orderDetails += `\nTotal Price: $${document.getElementById('cart-total').textContent}`;

    alert(orderDetails + '\n\nThank you for your purchase!');

    cart = [];
    saveCart();
    updateCartUI();
}

document.addEventListener('DOMContentLoaded', updateCartUI);

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const price = button.getAttribute('data-price');
        addToCart(productName, price);
    });
});

document.getElementById('checkout-btn').addEventListener('click', proceedToCheckout);