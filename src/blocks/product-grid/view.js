/**
 * Use this file for JavaScript code that you want to run in the front-end 
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any 
 * JavaScript running in the front-end, then you should delete this file and remove 
 * the `viewScript` property from `block.json`. 
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
 
/* eslint-disable no-console */
/* eslint-enable no-console */
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const priceFilterButton = document.getElementById("apply-price-filter");

    if (priceFilterButton) {
        priceFilterButton.addEventListener("click", function () {
            let params = new URLSearchParams(window.location.search);

            const minPrice = minPriceInput.value.trim();
            const maxPrice = maxPriceInput.value.trim();

            if (minPrice) {
                params.set("min_price", minPrice);
            } else {
                params.delete("min_price");
            }

            if (maxPrice) {
                params.set("max_price", maxPrice);
            } else {
                params.delete("max_price");
            }

            params.set("product-page", "1"); // Reset to page 1
            window.location.search = params.toString();
        });
    }

