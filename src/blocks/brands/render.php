<?php
$blockProps = get_block_wrapper_attributes( [
	'class' => 'brands',
	'id'    => $attributes['blockID'] ?? '',
] );

$title           = $attributes['title'];
$titleLevel      = $attributes['titleLevel'];
$text       	 = $attributes['text'];
$textLevel 		 = $attributes['textLevel'];
$logos	 		 = $attributes['logos'];

?>

<div <?= $blockProps ?>>
	<div class="container">
		<div class="brands__text-wrapper">
			<?php echo sprintf( '<%s class="brands__text-wrapper--title">%s</%s>', $titleLevel, $title, $titleLevel ); ?>
			<?php if($text) {
				echo sprintf( '<%s class="brands__text-wrapper--text">%s</%s>', $textLevel, $text, $textLevel );
			} ?>
		</div>
		<div class="brands__wrapper" >
			<div class="brands__list">
				<?php foreach ( $logos as $logo ) { ?>
					<div class="brands__item">
						<img src="<?= $logo['image']['url']; ?>" alt="">
					</div>
				<?php } ?>
			</div>
		</div>
	</div>
</div>