class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(item) {
        this.cart.push(item);
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Product added to cart');
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Product removed from cart', 'error');
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartCount.textContent = this.cart.length;

        // Aggiorna il contatore nel menu
        const existingCount = document.querySelector('.cart-count');
        if (existingCount) {
            existingCount.textContent = this.cart.length;
        } else {
            const cartLink = document.querySelector('a[href="checkout.html"]');
            if (cartLink) {
                cartLink.appendChild(cartCount);
            }
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Aggiungi icona in base al tipo
        const icon = type === 'success' ? '✓' : '✕';
        notification.insertAdjacentHTML('afterbegin', `<span class="notification-icon">${icon}</span> `);
        
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
        }, 100);
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + parseFloat(item.price), 0);
    }
}

// Inizializza il carrello
const cart = new ShoppingCart();

// Event listener per i pulsanti "Buy Now"
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault();
        const button = e.target;
        const item = {
            title: button.dataset.title,
            price: parseFloat(button.dataset.price),
            img: button.dataset.img
        };
        cart.addItem(item);
    }
});
