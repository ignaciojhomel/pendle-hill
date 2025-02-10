<?php

get_header();

$current_category = get_queried_object();
$title = $current_category->name; 
$order_by = get_field('order_by', 'category_' . $current_category->term_id); 
$order = get_field('order', 'category_' . $current_category->term_id);

    echo do_blocks('<!-- wp:omgwp/banner {"showBreadcrumb":true,"title":"'.$title.'","blockID":"blog-page-banner"} /-->');

    echo do_blocks('<!-- wp:omgwp/blog-listing {"orderBy":"'.$order_by.'","order":"'.$order.'"} /-->');

get_footer();

?>