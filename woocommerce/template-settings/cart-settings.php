<?php 

function filter_woocommerce_cart_item_class( $string, $cart_item, $cart_item_key ) {
    // Specific categories: the term name/term_id/slug. Several could be added, separated by a comma
    $categories_1 = array( 63, 15, 'categorie-1' );
    $categories_2 = array( 'categorie-2' );
    
    // Has term (product category)
    if ( has_term( $categories_1, 'product_cat', $cart_item['product_id'] ) ) {
        $string = 'my-class';
    } elseif ( has_term( $categories_2, 'product_cat', $cart_item['product_id'] ) ) {
        $string = 'another-class';
    }

    return $string;
}
add_filter( 'woocommerce_cart_item_class', 'filter_woocommerce_cart_item_class', 10, 3 );