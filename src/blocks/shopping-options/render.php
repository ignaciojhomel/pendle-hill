<?php
$blockProps = get_block_wrapper_attributes( [
	'class' => 'shopping-options',
	'id'    => $attributes['blockID'] ?? '',
] );

$backgroundImage = $attributes['backgroundImage'];  
$title           = $attributes['title'];
$titleLevel      = $attributes['titleLevel'];
$text       	 = $attributes['text'];
$textLevel 		 = $attributes['textLevel'];
$shoppingList	 = $attributes['shoppingList'];
$primaryButton   = $attributes['primaryButton'];
$secondaryButton = $attributes['secondaryButton'];

?>

<div <?= $blockProps ?>>
	<?php if(!empty($backgroundImage) && isset($backgroundImage['url']) && $backgroundImage['url'] != ""){ ?>
		<style>
			.shopping-options {
				--background-image: url(<?php echo $backgroundImage['url'];?>);
			}
		</style>
	<?php } ?>
	<div class="shopping-options__overlay"></div>
	<div class="container">
		<div class="shopping-options__text-wrapper">
			<?php echo sprintf( '<%s class="shopping-options__text-wrapper--title">%s</%s>', $titleLevel, $title, $titleLevel ); ?>
			<?php if($text) {
				echo sprintf( '<%s class="shopping-options__text-wrapper--text">%s</%s>', $textLevel, $text, $textLevel );
			} ?>
			<?php if ( $primaryButton && isset($primaryButton['url']) && $primaryButton['text'] ) : 
				$primaryUrl = 'javasript:void()';
				if(isset($primaryButton['url']))
					$primaryUrl = $primaryButton['url'];
			?>
			<div class="shopping-options__text-buttons">
				<a href="<?= $primaryUrl ?>" <?php if($primaryButton['target']){?>target="_blank" <?php } ?>
					class="btn btn-primary">
					<?php if(isset($primaryButton['icon']) && $primaryButton['icon'] !== ''){?>
					<img src=<?php echo $primaryButton['icon'];?> alt="<?= $primaryButton['text'] ?>"
						class="btn__icon btn__icon-left" />
					<?php } ?>
					<span><?= $primaryButton['text'] ?></span>
				</a>
				<?php endif; ?>
				<?php if ( $secondaryButton && isset($secondaryButton['url']) && $secondaryButton['text'] ) : 
					$secondaryUrl = 'javasript:void()';
					if(isset($secondaryButton['url']))
						$secondaryUrl = $secondaryButton['url'];
				?>
				<a href="<?= $secondaryUrl ?>" <?php if($secondaryButton['target']){?>target="_blank" <?php } ?>
					class="btn btn-white">
					<?php if(isset($secondaryButton['icon'])){?>
					<img src=<?php echo $secondaryButton['icon'];?> alt="<?= $secondaryButton['text'] ?>"
						class="btn__icon btn__icon-left" />
					<?php } ?>
					<span><?= $secondaryButton['text'] ?></span>
				</a>
			</div>
			<?php endif; ?>
		</div>
		<div class="shopping-options__wrapper" >
		<div class="options__list">
				<?php foreach ( $shoppingList as $option ) { ?>
					<div class="options-item">
						<div class="options-item__icon">
							<img src="<?= $option['image']['url']; ?>" alt="">
						</div>
						<div class="options-item__text">
							<h3 class="options-item__title"><?php echo $option['title']; ?></h3>
							<p class="options-item__description"><?php echo $option['description']; ?></p>
						</div>
					</div>
				<?php } ?>
			</div>
		</div>
	</div>
</div>