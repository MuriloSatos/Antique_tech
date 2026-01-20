let cart = [];
let total = 0;
let currentCategory = "all";

function buyProduct(button, name, price) {
    const card = button.closest(".card");
    const stockSpan = card.querySelector(".stock-value");
    const quantitySelect = card.querySelector(".quantity");

    let stock = parseInt(stockSpan.innerText);
    let quantity = parseInt(quantitySelect.value);

    if (quantity > stock) {
        alert("Not enough stock available!");
        return;
    }

    // Atualiza estoque
    stock -= quantity;
    stockSpan.innerText = stock;

    // Adiciona ao carrinho
    cart.push({ name, price, quantity });
    total += price * quantity;

    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("cart-total").innerText = total.toFixed(2);

    const li = document.createElement("li");
    li.innerText = `${name} x${quantity} - $${(price * quantity).toFixed(2)}`;
    document.getElementById("cart-items").appendChild(li);

    // Desativa botão se acabar estoque
    if (stock === 0) {
        button.disabled = true;
        button.innerText = "Out of stock";
    }
}

function confirmPurchase() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("✅ Purchase successful!");

    // Limpa carrinho
    cart = [];
    total = 0;

    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("cart-total").innerText = "0";
    document.getElementById("cart-count").innerText = "0";

    toggleCart();
}

function toggleCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.style.display =
        cartDiv.style.display === "block" ? "none" : "block";
}

/* ===== FILTER + SEARCH ===== */
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
