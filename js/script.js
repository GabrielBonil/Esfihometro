document.addEventListener("DOMContentLoaded", function () {
    const esfihas = document.querySelectorAll(".esfiha");

    function updateTotal() {
        let grandTotal = 0;

        esfihas.forEach(esfiha => {
            const price = parseFloat(esfiha.dataset.price);
            const quantity = parseInt(esfiha.querySelector(".quantity").textContent);
            const total = price * quantity;

            esfiha.querySelector(".total").textContent = total.toFixed(2);
            grandTotal += total;
        });

        document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
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
});
