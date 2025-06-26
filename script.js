// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
        price: 199.99,
        category: "electronics",
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration. Track your health goals.",
        price: 299.99,
        category: "electronics",
        icon: "⌚"
    },
    {
        id: 3,
        name: "Designer Cotton T-Shirt",
        description: "Comfortable and stylish cotton t-shirt made from premium organic materials. Available in multiple colors.",
        price: 39.99,
        category: "clothing",
        icon: "👕"
    },
    {
        id: 4,
        name: "Leather Messenger Bag",
        description: "Handcrafted genuine leather messenger bag perfect for work or travel. Spacious and durable design.",
        price: 149.99,
        category: "accessories",
        icon: "👜"
    },
    {
        id: 5,
        name: "Wireless Phone Charger",
        description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek and efficient design.",
        price: 49.99,
        category: "electronics",
        icon: "🔌"
    },
    {
        id: 6,
        name: "Casual Denim Jacket",
        description: "Classic denim jacket with modern fit. Perfect for layering and everyday wear. Timeless style.",
        price: 79.99,
        category: "clothing",
        icon: "🧥"
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with exceptional sound quality and long battery life. Perfect for parties.",
        price: 89.99,
        category: "electronics",
        icon: "🔊"
    },
    {
        id: 8,
        name: "Minimalist Wallet",
        description: "Slim and elegant wallet made from premium materials. Holds cards and cash efficiently.",
        price: 24.99,
        category: "accessories",
        icon: "💳"
    },
    {
        id: 9,
        name: "Running Sneakers",
        description: "High-performance running shoes with advanced cushioning and breathable materials. Ideal for athletes.",
        price: 129.99,
        category: "clothing",
        icon: "👟"
    }
];

// Shopping cart
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartCount = document.querySelector('.cart-count');
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const modalAddToCart = document.getElementById('modalAddToCart');
const closeModal = document.querySelector('.close');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
    updateCartCount();
});

// Display products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Add animation delay to cards
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    
    card.innerHTML = `
        <div class="product-image">
            <span style="font-size: 4rem;">${product.icon}</span>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description.substring(0, 100)}...</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})" data-product-id="${product.id}">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `;
    
    // Add click event to open modal (except for button clicks)
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart') && !e.target.closest('.add-to-cart')) {
            openProductModal(product);
        }
    });
    
    return card;
}

// Filter products
function filterProducts(category) {
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filteredProducts);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        showAddToCartAnimation();
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add animation to cart icon
    if (totalItems > 0) {
        cartCount.parentElement.classList.add('cart-bounce');
        setTimeout(() => {
            cartCount.parentElement.classList.remove('cart-bounce');
        }, 500);
    }
}

// Show add to cart animation
function showAddToCartAnimation() {
    // Create a temporary success message
    const message = document.createElement('div');
    message.textContent = 'Added to cart!';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4CAF50;
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        z-index: 3000;
        font-weight: bold;
        animation: fadeInOut 2s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 2000);
}

// Open product modal
function openProductModal(product) {
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    modalImage.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    modalImage.innerHTML = `<span style="font-size: 6rem;">${product.icon}</span>`;
    modalImage.style.display = 'flex';
    modalImage.style.alignItems = 'center';
    modalImage.style.justifyContent = 'center';
    modalImage.style.color = 'white';
    
    modalAddToCart.onclick = () => {
        addToCart(product.id);
        modal.style.display = 'none';
    };
    
    modal.style.display = 'block';
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter products
            const category = button.dataset.filter;
            filterProducts(category);
        });
    });
    
    // Modal close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const message = document.createElement('div');
        message.textContent = 'Message sent successfully!';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #4CAF50;
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            z-index: 3000;
            font-weight: bold;
            animation: fadeInOut 3s ease;
        `;
        
        document.body.appendChild(message);
        contactForm.reset();
        
        setTimeout(() => {
            document.body.removeChild(message);
        }, 3000);
    });
    
    // Cart icon click
    document.querySelector('.cart-icon').addEventListener('click', () => {
        showCartSummary();
    });
}

// Show cart summary
function showCartSummary() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let cartSummary = 'Cart Summary:\n\n';
    let total = 0;
    
    cart.forEach(item => {
        cartSummary += `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        total += item.price * item.quantity;
    });
    
    cartSummary += `\nTotal: $${total.toFixed(2)}`;
    
    const checkout = confirm(cartSummary + '\n\nProceed to checkout?');
    if (checkout) {
        alert('Thank you for your purchase! (This is a demo)');
        cart = [];
        updateCartCount();
    }
}

// Smooth scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    .cart-bounce {
        animation: bounce 0.5s ease;
    }
    
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);