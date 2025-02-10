<?php
$blockProps = get_block_wrapper_attributes( [
	'class' => 'faqs',
	'id'    => $attributes['blockID'] ?? '',
] );

$backgroundImage = $attributes['backgroundImage'];  
$title           = $attributes['title'];
$titleLevel      = $attributes['titleLevel'];
$text       	 = $attributes['text'];
$textLevel 		 = $attributes['textLevel'];
$faqList	 	 = $attributes['faqList'];
?>

<div <?= $blockProps ?>>
	<?php if(!empty($backgroundImage) && isset($backgroundImage['url']) && $backgroundImage['url'] != ""){ ?>
		<style>
			.faqs {
				--background-image: url(<?php echo $backgroundImage['url'];?>);
			}
		</style>
	<?php } ?>
	<div class="faqs__overlay"></div>
	<div class="container">
		<div class="faqs__text-wrapper">
			<?php echo sprintf( '<%s class="faqs__text-wrapper--title">%s</%s>', $titleLevel, $title, $titleLevel ); ?>
			<?php if($text) {
				echo sprintf( '<%s class="faqs__text-wrapper--text">%s</%s>', $textLevel, $text, $textLevel );
			} ?>
		</div>
		<div class="faqs__wrapper" >
		<div class="faqs__list">
				<?php foreach ( $faqList as $faq ) { ?>
					<button class="faqs-item">
						<span><?php echo $faq['question']; ?></span>
					</button>
					<div class="faqs-item__answer">
						<p><?php echo $faq['answer']; ?></p>
					</div>
				<?php } ?>
			</div>
		</div>
	</div>
</div>