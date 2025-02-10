document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quantity").forEach(function (quantityContainer) {
        const minusButton = quantityContainer.querySelector(".qty-btn.minus");
        const plusButton = quantityContainer.querySelector(".qty-btn.plus");
        const inputField = quantityContainer.querySelector("input[type='number']");

        minusButton.addEventListener("click", function () {
            let currentValue = parseFloat(inputField.value) || 1;
            let minValue = parseFloat(inputField.min) || 1;
            if (currentValue > minValue) {
                inputField.value = currentValue - 1;
                inputField.dispatchEvent(new Event("change"));
            }
        });

        plusButton.addEventListener("click", function () {
            let currentValue = parseFloat(inputField.value) || 1;
            let maxValue = parseFloat(inputField.max);
            if (!maxValue || currentValue < maxValue) {
                inputField.value = currentValue + 1;
                inputField.dispatchEvent(new Event("change"));
            }
        });
    });
});
