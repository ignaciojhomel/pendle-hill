<?php
$blockProps = get_block_wrapper_attributes( [
	'class' => 'product-categories',
	'id'    => $attributes['blockID'] ?? '',
] );
 
$title           = $attributes['title'];
$titleLevel      = $attributes['titleLevel'];
$text        	 = $attributes['text'];
$textLevel  	 = $attributes['textLevel'];

?>

<div <?= $blockProps ?> >
	<div class="container">
		<div class="product-categories__text-wrapper">
			<?php echo sprintf( '<%s class="product-categories__text-wrapper--title">%s</%s>', $titleLevel, $title, $titleLevel ); ?>
			<?php if($text) {
				echo sprintf( '<%s class="product-categories__text-wrapper--text">%s</%s>', $textLevel, $text, $textLevel );
			} ?>
		</div>
		<div class="product-categories__wrapper">
			<?php echo do_shortcode(' [product_categories hide_empty="0"] ' ); ?>
		</div>
	</div>
</div>