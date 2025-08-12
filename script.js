document.getElementById("opencart").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent page reload
    document.getElementById("cart").style.display = "block";
});

document.getElementById("close-cart").addEventListener("click", function() {
    document.getElementById("cart").style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
    filterLaptops("all");
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