<?php
$blockProps = get_block_wrapper_attributes( [
	'class' => 'promotion',
	'id'    => $attributes['blockID'] ?? '',
] );

$backgroundImage = $attributes['backgroundImage'];  
$subtitle           = $attributes['subtitle'];
$subtitleLevel      = $attributes['subtitleLevel']; 
$title           = $attributes['title'];
$titleLevel      = $attributes['titleLevel'];
$text        = $attributes['text'];
$textLevel  = $attributes['textLevel'];

?>

<div <?= $blockProps ?> >
	<div class="promotion__overlay"></div>
	<div class="container">
		<div class="promotion__wrapper" <?php if(!empty($backgroundImage) && isset($backgroundImage['url']) && $backgroundImage['url'] != ""){ ?>
		style="--background-image: url(<?php echo $backgroundImage['url'];?>)"
		<?php } ?>>
			<div class="promotion__text-wrapper">
				<?php if($subtitle) {
					echo sprintf( '<%s class="promotion__text-wrapper--subtitle">%s</%s>', $subtitleLevel, $subtitle, $subtitleLevel );
				} ?>
				<?php echo sprintf( '<%s class="promotion__text-wrapper--title">%s</%s>', $titleLevel, $title, $titleLevel ); ?>
				<?php if($text) {
					echo sprintf( '<%s class="promotion__text-wrapper--text">%s</%s>', $textLevel, $text, $textLevel );
				} ?>
			</div>
			<div class="promotion__wrapper-overlay"></div>
		</div>
	</div>
</div>