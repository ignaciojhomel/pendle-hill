<?php
require_once( get_template_directory() . '/includes/Setup.php' );
new \OMG\Theme\Setup();

add_theme_support( 'post-thumbnails' );

function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

/**
 * Validation: image
 * Control: text, WP_Customize_Image_Control
 *
 * @uses    wp_check_filetype()        https://developer.wordpress.org/reference/functions/wp_check_filetype/
 * @uses    in_array()                http://php.net/manual/en/function.in-array.php
 */
function ic_sanitize_image( $file, $setting ) {

	$mimes = array(
		'jpg|jpeg|jpe' => 'image/jpeg',
		'gif'          => 'image/gif',
		'png'          => 'image/png',
		'bmp'          => 'image/bmp',
		'tif|tiff'     => 'image/tiff',
		'ico'          => 'image/x-icon',
    'svg'          => 'image/svg+xml'
	);

	//check file type from file name
	$file_ext = wp_check_filetype( $file, $mimes );

	//if file has a valid mime type return it, otherwise return default
	return ( $file_ext['ext'] ? $file : $setting->default );
}

// function redirect_cpt_archive() {
//     if( is_post_type_archive( 'showcase' ) ) {
//         wp_redirect( home_url( 'showcase' ), 301 );
//         exit();
//     }
// }
// add_action( 'template_redirect', 'redirect_cpt_archive' );

function get_services_menu_items_hierarchy() {
    // Get the menu object by its registered slug 'services-menu'
    $menu_object = wp_get_nav_menu_object('services-menu');

    if (!$menu_object) {
        return []; // Return empty array if no menu found
    }

    // Retrieve all menu items by the menu ID
    $menu_items = wp_get_nav_menu_items($menu_object->term_id);

    if (!$menu_items) {
        return []; // Return empty if no menu items found
    }

    // Build the hierarchical menu array
    $menu_hierarchy = [];
    $menu_lookup = [];

    // First pass: Build a lookup array of all menu items by their ID
    foreach ($menu_items as $menu_item) {
        $menu_lookup[$menu_item->ID] = [
            'ID'      => $menu_item->ID,
            'title'   => $menu_item->title,
            'url'     => $menu_item->url,
            'parent'  => $menu_item->menu_item_parent,
            'classes' => implode(' ', $menu_item->classes),
            'children' => [] // Initialize the children array
        ];
    }

    // Second pass: Assign children to their parent items
    foreach ($menu_lookup as $menu_item) {
        if ($menu_item['parent'] == 0) {
            // If no parent, it's a top-level menu item
            $menu_hierarchy[] = &$menu_lookup[$menu_item['ID']];
        } else {
            // If the item has a parent, assign it as a child of the parent
            $menu_lookup[$menu_item['parent']]['children'][] = &$menu_lookup[$menu_item['ID']];
        }
    }

    return $menu_hierarchy;
}

function get_mobile_services_menu_items_hierarchy() {
	// Get the menu object by its registered slug 'services-menu'
	$menu_object = wp_get_nav_menu_object('mobile-menu');

	if (!$menu_object) {
		return []; // Return empty array if no menu found
	}

	// Retrieve all menu items by the menu ID
	$menu_items = wp_get_nav_menu_items($menu_object->term_id);

	if (!$menu_items) {
		return []; // Return empty if no menu items found
	}

	// Build the hierarchical menu array
	$menu_hierarchy = [];
	$menu_lookup = [];

	// First pass: Build a lookup array of all menu items by their ID
	foreach ($menu_items as $menu_item) {
		$menu_lookup[$menu_item->ID] = [
			'ID'       => $menu_item->ID,
			'title'    => $menu_item->title,
			'url'      => $menu_item->url,
			'parent'   => $menu_item->menu_item_parent,
			'classes'  => implode(' ', $menu_item->classes),
			'children' => [], // Initialize the children array
			'level'    => 1 // Initialize the level (default to 1 for top-level)
		];
	}

	// Second pass: Assign children to their parent items and adjust the level
	foreach ($menu_lookup as &$menu_item) {
		if ($menu_item['parent'] == 0) {
			// Top-level menu item, no parent
			$menu_hierarchy[] = &$menu_item;
		} else {
			// Has a parent, find the parent item
			if (isset($menu_lookup[$menu_item['parent']])) {
				// Adjust the level: Parent level + 1
				$menu_item['level'] = $menu_lookup[$menu_item['parent']]['level'] + 1;

				// Assign as a child of the parent item
				$menu_lookup[$menu_item['parent']]['children'][] = &$menu_item;
			} else {
				error_log("Parent menu item with ID {$menu_item['parent']} not found.");
			}
		}
	}

	return $menu_hierarchy;
}

function get_footer_menu_items_hierarchy() {
    // Get the menu object by its registered slug 'services-menu'
    $menu_object = wp_get_nav_menu_object('footer-links');

    if (!$menu_object) {
        return []; // Return empty array if no menu found
    }

    // Retrieve all menu items by the menu ID
    $menu_items = wp_get_nav_menu_items($menu_object->term_id);

    if (!$menu_items) {
        return []; // Return empty if no menu items found
    }

    // Build the hierarchical menu array
    $menu_hierarchy = [];
    $menu_lookup = [];

    // First pass: Build a lookup array of all menu items by their ID
    foreach ($menu_items as $menu_item) {
        $menu_lookup[$menu_item->ID] = [
            'ID'      => $menu_item->ID,
            'title'   => $menu_item->title,
            'url'     => $menu_item->url,
            'parent'  => $menu_item->menu_item_parent,
            'classes' => implode(' ', $menu_item->classes),
            'children' => [] // Initialize the children array
        ];
    }

    // Second pass: Assign children to their parent items
    foreach ($menu_lookup as $menu_item) {
        if ($menu_item['parent'] == 0) {
            // If no parent, it's a top-level menu item
            $menu_hierarchy[] = &$menu_lookup[$menu_item['ID']];
        } else {
            // If the item has a parent, assign it as a child of the parent
            $menu_lookup[$menu_item['parent']]['children'][] = &$menu_lookup[$menu_item['ID']];
        }
    }

    return $menu_hierarchy;
}
/**
 * Summary of customtheme_add_woocommerce_support
 * @return void
 */
function customtheme_add_woocommerce_support() {
    add_theme_support('woocommerce');
}
add_action('after_setup_theme', 'customtheme_add_woocommerce_support');

include get_stylesheet_directory(  ).'/woocommerce/template-settings/single-product-settings.php';
include get_stylesheet_directory(  ).'/woocommerce/template-settings/cart-settings.php';