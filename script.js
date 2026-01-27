let cart = [];
let total = 0;
let currentCategory = "all";

/* ================= ADD TO CART ================= */
function buyProduct(button, name, price) {
    const card = button.closest(".card");
    const quantity = parseInt(card.querySelector(".quantity").value);

    cart.push({ card, name, price, quantity });
    total += price * quantity;

    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("cart-total").innerText = total.toFixed(2);

    renderCart();
}

/* ================= RENDER CART ================= */
function renderCart() {
    const ul = document.getElementById("cart-items");
    ul.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeItem(${index})">✖</button>
        `;
        ul.appendChild(li);
    });
}

/* ================= REMOVE ITEM ================= */
function removeItem(index) {
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);

    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("cart-total").innerText = total.toFixed(2);

    renderCart();
}

/* ================= CONFIRM PURCHASE ================= */
function confirmPurchase() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    cart.forEach(item => {
        const stockSpan = item.card.querySelector(".stock-value");
        const button = item.card.querySelector("button");

        let stock = parseInt(stockSpan.innerText);
        stock -= item.quantity;

        stockSpan.innerText = stock;

        if (stock <= 0) {
            button.disabled = true;
            button.innerText = "Out of stock";
        }
    });

    alert("✅ Purchase successful!");

    cart = [];
    total = 0;

    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("cart-total").innerText = "0";
    document.getElementById("cart-count").innerText = "0";

    toggleCart();
}

/* ================= CART OPEN / CLOSE ================= */
function toggleCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.style.display =
        cartDiv.style.display === "block" ? "none" : "block";
}

/* ================= FILTER + SEARCH ================= */
function filterProducts(category) {
    currentCategory = category;
    applyFilters();
}

function searchProducts() {
    applyFilters();
}

function applyFilters() {
    const searchValue = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const name = card.querySelector("h3").innerText.toLowerCase();

        const matchCategory =
            currentCategory === "all" ||
            card.classList.contains(currentCategory);

        const matchSearch = name.includes(searchValue);

        card.style.display =
            matchCategory && matchSearch ? "block" : "none";
    });
}
