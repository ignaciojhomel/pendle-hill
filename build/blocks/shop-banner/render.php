<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$backgroundImage = $attributes['backgroundImage'];   

?>
<div <?php echo get_block_wrapper_attributes(); ?> style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(<?=$backgroundImage['url'];?>) lightgray 50% / cover no-repeat;;">
	<div class="shop-banner container">
		<div class="shop-banner__content">
			<div class="shop-banner__heading"><h1>Products</h1></div>
			<div class="shop-banner__text">
			
			</div>
		</div>
	</div>
</div>
