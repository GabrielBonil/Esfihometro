document.addEventListener("DOMContentLoaded", function () {
    const esfihas = document.querySelectorAll(".esfiha");

    function saveToLocalStorage() {
        const data = {};
        esfihas.forEach((esfiha, index) => {
            data[index] = parseInt(esfiha.querySelector(".quantity").textContent);
        });
        localStorage.setItem("esfihaCartQuantities", JSON.stringify(data));
    }

    function loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem("esfihaCartQuantities"));
        if (data) {
            esfihas.forEach((esfiha, index) => {
                const quantity = data[index] || 0;
                esfiha.querySelector(".quantity").textContent = quantity;
            });
        }
        updateTotal();
    }

    function updateTotal() {
        let grandTotal = 0;
        let totalItems = 0;

        esfihas.forEach(esfiha => {
            const price = parseFloat(esfiha.dataset.price);
            const quantity = parseInt(esfiha.querySelector(".quantity").textContent);
            const total = price * quantity;

            esfiha.querySelector(".total").textContent = total.toFixed(2);
            totalItems += quantity;
            grandTotal += total;
        });

        document.getElementById("totalItems").textContent = totalItems;
        document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);

        saveToLocalStorage();
    }

    esfihas.forEach(esfiha => {
        const decreaseBtn = esfiha.querySelector(".decrease");
        const increaseBtn = esfiha.querySelector(".increase");
        const quantityElem = esfiha.querySelector(".quantity");

        decreaseBtn.addEventListener("click", () => {
            let quantity = parseInt(quantityElem.textContent);
            if (quantity > 0) {
                quantityElem.textContent = quantity - 1;
                updateTotal();
            }
        });

        increaseBtn.addEventListener("click", () => {
            let quantity = parseInt(quantityElem.textContent);
            quantityElem.textContent = quantity + 1;
            updateTotal();
        });
    });
    
    loadFromLocalStorage();
});
