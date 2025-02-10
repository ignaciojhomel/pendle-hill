<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 * @param object $wooapi
 */

global $post;
$page = (isset($_GET['product-page'])) ? $_GET['product-page'] : null;
$sortByValue = (isset($_GET['sortby'])) ? $_GET['sortby'] : null;
$selectedCategories = isset($_GET['categories']) ? explode(',', $_GET['categories']) : [];
$min_price = isset($_GET['min_price']) ? floatval($_GET['min_price']) : null;
$max_price = isset($_GET['max_price']) ? floatval($_GET['max_price']) : null;

$products = $attributes['productLists'];


$postPerpage = $attributes['postPerpage'];
$filterLists = $attributes['filterLists'];
if(!is_admin(  )){
	require_once get_template_directory().'/woocommerce/wooapi.php';
	$paginatedProducts = $wooapi->get_paginated_products($products, $page, $postPerpage, $selectedCategories, $sortByValue, $min_price, $max_price);
}
$query_params = $_GET;
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class='product-grid__grid container'>
		<?php 
		if (function_exists('wc_print_notices')) {
			wc_print_notices();
		}
		?>
		<div class='product-grid__sidebar item'>
			<div class='sidebar__heading'>Categories <span>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M6 9L12 15L18 9" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg></span>
			</div>
				<ul class='categories <?=(!empty($selectedCategories)) ? 'active': '';?>'>
					<?php foreach($filterLists as $filter):?>
					<li>
						<input class="category-checkbox" type='checkbox' data-category-id="<?=$filter['category_id'];?>" <?=(in_array($filter['category_id'],$selectedCategories)) ? 'checked': '';?>/><?=$filter['label'];?>
					</li>
					<?php endforeach;?>
				</ul>
				<div class="sidebar__heading">Price Range</div>
				<div class="price-range-filter">
					<input type="number" id="min-price" placeholder="Min Price" value="<?= esc_attr($min_price ?? '') ?>">
					<input type="number" id="max-price" placeholder="Max Price" value="<?= esc_attr($max_price ?? '') ?>">
					<button id="apply-price-filter">Apply</button>
				</div>

		</div>
		<div class='item'>
			<div class="product-grid__header">
				<div class='product-grid__product-count'><span><?=$paginatedProducts['count'];?> Results</span></div>
				<div class="product-grid__filter">
					<div class="sort-by">
						<button class="sort-by-button"><?= (!empty($sortByValue)) ? ucwords(str_replace('-', ' ', $sortByValue)) : 'Sort By'; ?>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="Chevron down"><path id="Icon" d="M5 7.5L10 12.5L15 7.5" stroke="#111111" stroke-linecap="round" stroke-linejoin="round"/></g>
							</svg>
							
						</button>
						<ul class="sort-by-options">
							<li data-value="popular" class="sort-by-option">Popularity</li>
							<li data-value="alphabetically" class="sort-by-option">Alphabetically</li>
							<li data-value="price-low-to-high" class="sort-by-option">Price: Low to high</li>
							<li data-value="price-high-to-low" class="sort-by-option">Price: High to Low</li>
						</ul>
					</div>
				</div>
			</div>
			<div class='product-grid__items'>
			<?php if(empty($paginatedProducts['data'])):?>
				<h4 style="text-align: center;">No Results</h4 style="text-align: center;">
			<?php else:?>
				<ul class="product-lists">
					<?php foreach($paginatedProducts['data'] as $product):?>
					<li>
						<?php 
						
						?>
						<div class='product-item' id="">
							<a href="<?=$product['permalink'];?>">
								<img src="<?=$product['images'][0]['src'];?>" alt="Product Image" />
							</a>
							<div class='product-details'>
								<div class='product_name'><?=$product['name'];?></div>
								<div class='product_price'><?=$product['price_html'];?></div>
								<?php
								if (class_exists('WooCommerce') && $post && !is_admin()) : $product = wc_get_product($product['id']);?>
									<button><a href="<?php echo esc_url($product->add_to_cart_url()); ?>" class="button"><?php echo esc_html($product->add_to_cart_text()); ?></a></button>
								<?php endif; ?>
							</div>
						</div>
					</li>
					<?php endforeach;?>
				</ul>
				<div class="pagination-container">
					<?php 
						$total_pages = $paginatedProducts['pagination']['total_pages'];
						$current_page = isset($_GET['product-page']) ? (int)$_GET['product-page'] : 1;

						$prev_page = ($current_page > 1) ? $current_page - 1 : null;
						$next_page = ($current_page < $total_pages) ? $current_page + 1 : null;
					
					?>
					<ul>
						<!-- Previous Page -->
						<li class="left-arrow">
							<?php if ($prev_page): ?>
								<?php $query_params['product-page'] = $prev_page; ?>
								<a href="?<?= http_build_query($query_params); ?>">
							<?php else: ?>
								<a href="#" class="disabled">
							<?php endif; ?>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
									<path d="M15.8334 10.0001H4.16675M4.16675 10.0001L10.0001 15.8334M4.16675 10.0001L10.0001 4.16675" 
										stroke="#111111" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</a>
						</li>

						<!-- Page Numbers -->
						<?php for ($i = 1; $i <= $total_pages; $i++): ?>
							<?php $query_params['product-page'] = $i; ?>
							<li class="<?= ($current_page == $i) ? 'active' : ''; ?>">
								<a href="?<?= http_build_query($query_params); ?>"><?= $i; ?></a>
							</li>
						<?php endfor; ?>

						<!-- Next Page -->
						<li class="right-arrow">
							<?php if ($next_page): ?>
								<?php $query_params['product-page'] = $next_page; ?>
								<a href="?<?= http_build_query($query_params); ?>">
							<?php else: ?>
								<a href="#" class="disabled">
							<?php endif; ?>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
									<path d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16675M15.8333 10.0001L9.99996 15.8334" 
										stroke="#111111" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</a>
						</li>
					</ul>
				</div>
			<?php endif;?>
			</div>
		</div>
	</div>
</div>
<script>
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".category-checkbox");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            let params = new URLSearchParams(window.location.search);
            let selectedCategories = params.get("categories") ? params.get("categories").split(",") : [];
            let value = this.getAttribute("data-category-id"); 

            if (this.checked) {
                if (!selectedCategories.includes(value)) {
                    selectedCategories.push(value);
                }
            } else {

                selectedCategories = selectedCategories.filter(id => id !== value);
            }

            if (selectedCategories.length > 0) {
                params.set("categories", selectedCategories.join(","));
                params.set("product-page", '1');
            } else {
                params.delete("categories");
            }
            window.location.search = params.toString();
        });
    });
	const sidebar = document.querySelector('.sidebar__heading');
	sidebar.addEventListener('click',function(){
		this.classList.toggle('active')
		document.querySelector('ul.categories').classList.toggle('active')
	});
	const sortByButton = document.querySelector('.sort-by-button');
	sortByButton.addEventListener('click',function(){
		document.querySelector('.sort-by-options').classList.toggle('active')
	})
	const sortByElements = document.querySelectorAll('.sort-by-option');
    sortByElements.forEach(sortBy => {
        sortBy.addEventListener('click', function () {
            let params = new URLSearchParams(window.location.search);
            const sortByValue = this.getAttribute('data-value');

            if (sortByValue) {
                params.set("sortby", sortByValue);
            } else {
                params.delete("sortby");
            }

            window.location.search = params.toString();
        });
    });
	
});
function loadUrl(){

}
</script>
<?php 

