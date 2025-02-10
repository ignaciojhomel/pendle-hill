<?php
class Wooapi {
    public function __construct() {
        add_filter('single_template', [$this,'override_single_template']);
    }
    public function override_single_template( $template ){
        if (is_singular('product')) {
            echo '<pre>';
            print_r($template);
            echo '<pre>';
            return wc_get_template_part('single-product');
        }
        return $template;
        
    }

    public function get_paginated_products($products, $current_page = 1, $per_page = 10, $categories = [27], $sortBy = 'price-desc') {
        if (!empty($categories)) {
            $products = array_filter($products, function ($product) use ($categories) {
                if (!isset($product['categories']) || !is_array($product['categories'])) {
                    return false;
                }
                foreach ($product['categories'] as $category) {
                    if (in_array($category['id'], $categories)) {
                        return true;
                    }
                }
                return false;
            });
        }
    
        // Sorting products
        usort($products, function ($a, $b) use ($sortBy) {
            switch ($sortBy) {
                case 'price-low-to-high': 
                    return ($a['price'] ?? 0) <=> ($b['price'] ?? 0);
                case 'price-high-to-low': 
                    return ($b['price'] ?? 0) <=> ($a['price'] ?? 0);
                case 'name-asc': // Alphabetical A-Z
                case 'alphabetically': 
                    return strcmp(strtolower($a['name'] ?? ''), strtolower($b['name'] ?? ''));
                case 'name-desc': 
                case 'reverse-alphabetical': 
                    return strcmp(strtolower($b['name'] ?? ''), strtolower($a['name'] ?? ''));
                default:
                    return 0;
            }
        });
    
        // Pagination calculations
        if(count($products) > 0 && !empty($products)):
        $total_items = count($products);
        $total_pages = ceil($total_items / $per_page);
        $current_page = max(1, min($current_page, $total_pages));
    
        $offset = ($current_page - 1) * $per_page;
        $paged_items = array_slice(array_values($products), $offset, $per_page); // Reset array keys
    
        return [
            'data' => $paged_items,
            'count' => $total_items,
            'pagination' => [
                'total_items' => $total_items,
                'total_pages' => $total_pages,
                'current_page' => $current_page,
                'per_page' => $per_page,
                'has_previous' => $current_page > 1,
                'has_next' => $current_page < $total_pages
            ]
        ];
        endif;
        return [];
    }
    
    
    
}
$wooapi = new Wooapi();