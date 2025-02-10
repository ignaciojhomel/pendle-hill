<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */


$heading = $attributes['heading'] ?? '';
$limit = $attributes['limit'] ?? 4; 
$backgroundImage = $attributes['backgroundImage'] ?? '';
$text = $attributes['text'] ?? '';

$post_id = get_queried_object_id();

if (class_exists('WooCommerce') && !is_admin()) {
    $product = wc_get_product($post_id);
    if ($product) {
        $related_ids = wc_get_related_products($product->get_id(), $limit);
        $args = [
            'post_type'      => 'product',
            'posts_per_page' => $limit,
            'post__in'       => $related_ids,
            'orderby'        => 'post__in',
        ];

        $query = new WP_Query($args);

    }
}
?>

<div <?php echo get_block_wrapper_attributes(); ?> style="background-image:url(<?=$backgroundImage['url'];?>)">
    <div class="related-products-block container">
        <div class="related-products-block__heading"><h1><?=$heading;?></h1></div>
		<div class="related-products-block__text" style="text-align:center;">
			<p><?=$text;?></p>
		</div>
        <div class="related-products-block__content">
            <?php if (!empty($query) && $query->have_posts()) : ?>
                <?php while ($query->have_posts()) : $query->the_post(); 
                    $related_product = wc_get_product(get_the_ID()); ?>
                    <div class="item">
						<a href="<?=the_permalink();?>">
                        	<img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'medium'); ?>" alt="<?php echo esc_attr(get_the_title()); ?>" />
						</a>
                        <div class="product-details">
                            <div class="product-name"><?php echo esc_html(get_the_title()); ?></div>
                            <div class="product-price">
                                <p><?php echo wc_price($related_product->get_price()); ?></p>
                            </div>
                            <div class="product-description">
                                <!-- description -->
                            </div>
                        </div>
                        <div class="action">
                            <a href="<?php echo esc_url($related_product->add_to_cart_url()); ?>" class="button"><?php echo esc_html($related_product->add_to_cart_text()); ?></a>
                        </div>
                    </div>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
            <?php else : ?>
                <p style="text-align:center;">No related products found.</p>
            <?php endif; ?>
        </div>
    </div>
</div>
