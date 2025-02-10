<?php 

remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20); // Remove default breadcrumbs
add_action('woocommerce_single_product_summary', 'woocommerce_breadcrumb', 1); // Add breadcrumbs before title

function custom_woocommerce_breadcrumb_defaults($defaults) {
    $defaults['delimiter'] = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6.47135 11.2998L10.276 7.4951L6.47135 3.69043L5.52869 4.6331L8.39069 7.4951L5.52869 10.3571L6.47135 11.2998Z" fill="#111111"/>
    </svg>';
    return $defaults;
}
add_filter('woocommerce_breadcrumb_defaults', 'custom_woocommerce_breadcrumb_defaults');


function custom_theme_assets() {
    // Enqueue CSS
    wp_enqueue_style('theme-style', get_stylesheet_uri());
    wp_enqueue_style('custom-style', get_template_directory_uri() . '/woocommerce/assets/style.css', array(), '1.0.0', 'all');

    // Enqueue JavaScript
    wp_enqueue_script('custom-woo-js', get_template_directory_uri() . '/woocommerce/assets/woo.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'custom_theme_assets');




function custom_woocommerce_breadcrumb_args($defaults) {
    $defaults['wrap_before'] = '<nav class="woocommerce-breadcrumb">';
    $defaults['wrap_after'] = '</nav>';
    $defaults['before'] = '';
    $defaults['after'] = '';

    // Modify the breadcrumb output to wrap the last item in <span>
    $defaults['breadcrumb_last'] = function ($breadcrumb) {
        $last_index = count($breadcrumb) - 1;
        foreach ($breadcrumb as $key => &$crumb) {
            if ($key === $last_index) {
                $crumb[0] = '<span>' . esc_html($crumb[0]) . '</span>'; // Wrap last item
            }
        }
        return $breadcrumb;
    };

    return $defaults;
}
add_filter('woocommerce_breadcrumb_defaults', 'custom_woocommerce_breadcrumb_args');



function custom_buy_now_button() {
    global $product;
    
    if (!$product->is_purchasable() || !$product->is_in_stock()) {
        return; 
    }

    $product_id = $product->get_id();
    $checkout_url = wc_get_checkout_url();
    ?>

    <button type="button" class="buy-now-button button alt" 
        data-product-id="<?php echo esc_attr($product_id); ?>">
        <?php esc_html_e('Buy Now', 'woocommerce'); ?>
    </button>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            document.querySelector(".buy-now-button").addEventListener("click", function() {
                var productId = this.getAttribute("data-product-id");
                var quantity = document.querySelector(".quantity input").value || 1;
                var checkoutUrl = "<?php echo esc_url($checkout_url); ?>";
                
                var form = document.createElement("form");
                form.method = "POST";
                form.action = checkoutUrl;
                
                var inputProductId = document.createElement("input");
                inputProductId.type = "hidden";
                inputProductId.name = "add-to-cart";
                inputProductId.value = productId;
                form.appendChild(inputProductId);

                var inputQuantity = document.createElement("input");
                inputQuantity.type = "hidden";
                inputQuantity.name = "quantity";
                inputQuantity.value = quantity;
                form.appendChild(inputQuantity);
                
                document.body.appendChild(form);
                form.submit();
            });
        });
    </script>

    <?php
}
add_action('woocommerce_after_add_to_cart_button', 'custom_buy_now_button');
// add_action('woocommerce_single_product_summary', 'custom_buy_now_button');
/**
 * Remove tabs
 */
// function remove_woocommerce_product_tabs($tabs) {
//     return array();
// }
// add_filter('woocommerce_product_tabs', 'remove_woocommerce_product_tabs');

/**
 * Remove related products
 */
// function remove_related_products($args) {
//     return array(); 
// }
// add_filter('woocommerce_related_products_args', 'remove_related_products', 100);


function remove_woocommerce_sidebar() {
    remove_action('woocommerce_sidebar', 'woocommerce_get_sidebar', 10);
}
add_action('wp', 'remove_woocommerce_sidebar');


function custom_html_after_single_product() {
    $args = [
        'post_type'      => 'product-template',
        'posts_per_page' => 1,
        'post_status'    => 'publish',
        'title'          => 'Single Product' 
    ];

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        $query->the_post(); 
        
        echo '<div class="custom-single-product-template">';
        echo apply_filters('the_content', get_the_content()); 
        echo '</div>';
    }

    wp_reset_postdata();
}
add_action('woocommerce_after_single_product', 'custom_html_after_single_product');
