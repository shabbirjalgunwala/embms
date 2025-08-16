document.getElementById("opencart").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("cart").style.display = "block";
});
document.getElementById("close-cart").addEventListener("click", function() {
    document.getElementById("cart").style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
    filterLaptops("all");

    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", addToCart);
    });

    document.querySelector(".btn-buy").addEventListener("click", buyNow);
});

function filterLaptops(brand) {
    let laptops = document.querySelectorAll(".allproducts");
    laptops.forEach(laptop => {
        if (brand === "all" || laptop.getAttribute("data-brand") === brand) {
            laptop.style.display = "block";
        } else {
            laptop.style.display = "none";
        }
    });
}
document.querySelectorAll(".brand-btn").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".brand-btn").forEach(c => c.classList.remove("active"));
        this.classList.add("active");
    });
});


function addToCart(e) {
    const product = e.target.closest(".allproducts");
    if (!product) return;

    const productId = product.id;
    const name = product.getAttribute("data-name");
    const price = parseInt(product.getAttribute("data-price"));
    const img = product.getAttribute("data-image") || product.querySelector("img")?.src || "";

    const existing = document.querySelector(`.cart-box[data-id="${productId}"]`);
    if (existing) {
        alert("Item is already added");
        existing.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.setAttribute("data-id", productId);
    cartBox.innerHTML = `
        <img src="${img}" class="product-image"/>
        <div class="detail-box">
            <div class="product-detail">${name}</div>
            <div class="product-price" data-price="${price}">₹${price.toLocaleString()}</div>
            <input type="number" value="1" min="1" class="product-quantity"/>
        </div>
        <i class="las la-trash cart-remove"></i>
    `;

    document.getElementById("cart-product-box").appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", function () {
        cartBox.remove();
        updateTotal();
    });

    cartBox.querySelector(".product-quantity").addEventListener("change", function () {
        if (this.value <= 0) this.value = 1;
        updateTotal();
    });

    updateTotal();
}

function updateTotal() {
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(box => {
        const price = parseInt(box.querySelector(".product-price").getAttribute("data-price"));
        const qty = parseInt(box.querySelector(".product-quantity").value);
        total += price * qty;
    });
    document.querySelector(".total-price").innerText = "₹" + total.toLocaleString();
}

// function buyNow() {
//     const cartBoxes = document.querySelectorAll(".cart-box");
//     if (cartBoxes.length === 0) {
//         alert("Your cart is empty!");
//         return;
//     }

//     let details = "You bought:\n";
//     let total = 0;
//     cartBoxes.forEach(box => {
//         const name = box.querySelector(".product-detail").innerText;
//         const price = parseInt(box.querySelector(".product-price").getAttribute("data-price"));
//         const qty = parseInt(box.querySelector(".product-quantity").value);
//         total += price * qty;
//         details += `${name}     qty: ${qty}       ₹${(price * qty).toLocaleString()}\n`;
//     });

//     details += `\nTotal: ₹${total.toLocaleString()}`;
//     alert(details);

//     // Clear cart
//     document.getElementById("cart-product-box").innerHTML = "";
//     updateTotal();
// }

function buyNow() {
    const cartBoxes = document.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let customerName = prompt("Enter your Name:");
    if (!customerName) { alert("Name is required!"); return; }

    let address = prompt("Enter your Address:");
    if (!address) { alert("Address is required!"); return; }

    let mobile = prompt("Enter your Mobile Number:");
    if (!mobile) { alert("Mobile Number is required!"); return; }

    let details = `Customer Details:\nName: ${customerName}\nAddress: ${address}\nMobile: ${mobile}\n\nProducts Bought:\n`;
    let total = 0;
    cartBoxes.forEach(box => {
        const name = box.querySelector(".product-detail").innerText;
        const price = parseInt(box.querySelector(".product-price").getAttribute("data-price"));
        const qty = parseInt(box.querySelector(".product-quantity").value);
        total += price * qty;
        details += `${name}     qty: ${qty}     ₹${(price * qty).toLocaleString()}\n`;
    });

    details += `\nTotal Bill: ₹${total.toLocaleString()}`;

    alert(details);

    document.getElementById("cart-product-box").innerHTML = "";
    updateTotal();
}
