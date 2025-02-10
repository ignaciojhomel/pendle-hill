<?php
$blockProps = get_block_wrapper_attributes( [
	'class' => 'content-logos',
	'id'    => $attributes['blockID'] ?? '',
] );

$backgroundImage = $attributes['backgroundImage'];  
$title           = $attributes['title'];
$titleLevel      = $attributes['titleLevel'];
$text       	 = $attributes['text'];
$textLevel 		 = $attributes['textLevel'];
$logos	 		 = $attributes['logos'];
$primaryButton   = $attributes['primaryButton'];
$secondaryButton = $attributes['secondaryButton'];

?>

<div <?= $blockProps ?>>
	<?php if(!empty($backgroundImage) && isset($backgroundImage['url']) && $backgroundImage['url'] != ""){ ?>
		<style>
			.content-logos {
				--background-image: url(<?php echo $backgroundImage['url'];?>);
			}
		</style>
	<?php } ?>
	<div class="content-logos__overlay"></div>
	<div class="container">
		<div class="content-logos__text-wrapper">
			<?php echo sprintf( '<%s class="content-logos__text-wrapper--title">%s</%s>', $titleLevel, $title, $titleLevel ); ?>
			<?php if($text) {
				echo sprintf( '<%s class="content-logos__text-wrapper--text">%s</%s>', $textLevel, $text, $textLevel );
			} ?>
			<?php if ( $primaryButton && isset($primaryButton['url']) && $primaryButton['text'] ) : 
				$primaryUrl = 'javasript:void()';
				if(isset($primaryButton['url']))
					$primaryUrl = $primaryButton['url'];
			?>
			<div class="content-logos__text-buttons">
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
		<div class="content-logos__wrapper" >
			<div class="content-logos__list">
				<?php foreach ( $logos as $logo ) { ?>
					<div class="content-logos__item">
						<img src="<?= $logo['image']['url']; ?>" alt="">
					</div>
				<?php } ?>
			</div>
		</div>
	</div>
</div>