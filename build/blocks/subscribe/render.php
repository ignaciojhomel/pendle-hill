<?php
$blockProps = get_block_wrapper_attributes( [
	'class' => 'subscribe',
	'id'    => $attributes['blockID'] ?? '',
] );

$backgroundImage = $attributes['backgroundImage'];  
$formEmbed	   	 = $attributes['formEmbed'];
$title           = $attributes['title'];
$titleLevel      = $attributes['titleLevel'];
$text       	 = $attributes['text'];
$textLevel 		 = $attributes['textLevel'];
$socialIcons	 = $attributes['socialIcons'];
$primaryButton   = $attributes['primaryButton'];
$secondaryButton = $attributes['secondaryButton'];

?>

<div <?= $blockProps ?>>	
	<?php if(!empty($backgroundImage) && isset($backgroundImage['url']) && $backgroundImage['url'] != ""){ ?>
		<style>
			.subscribe {
				--background-image: url(<?php echo $backgroundImage['url'];?>);
			}
		</style>
	<?php } ?>
	<div class="subscribe__overlay"></div>
	<div class="container">
		<div class="subscribe__text-wrapper">
			<div class="subscribe__text-wrapper-inner">
				<?php echo sprintf( '<%s class="subscribe__text-wrapper--title">%s</%s>', $titleLevel, $title, $titleLevel ); ?>
				<?php if($text) {
					echo sprintf( '<%s class="subscribe__text-wrapper--text">%s</%s>', $textLevel, $text, $textLevel );
				} ?>
				<!-- buttons -->
				<?php if ( $primaryButton && isset($primaryButton['url']) && $primaryButton['text'] ) : 
					$primaryUrl = 'javasript:void()';
					if(isset($primaryButton['url']))
						$primaryUrl = $primaryButton['url'];
				?>
				<div class="subscribe__text-buttons">
					<a href="<?= $primaryUrl ?>" <?php if($primaryButton['target']){?>target="_blank" <?php } ?>
						class="btn btn-outline">
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
				
				<?php endif; ?>

				<?php if ( $primaryButton && isset($primaryButton['url']) && $primaryButton['text'] ) : 
					$primaryUrl = 'javasript:void()';
					if(isset($primaryButton['url']))
						$primaryUrl = $primaryButton['url'];
				?>
					</div> <!-- end of subscribe__text-buttons -->
				<?php endif; ?>		
				<!-- end of buttons -->
			</div> <!-- end of subscribe__text-wrapper-inner -->
			<div class="icons-wrapper">
				<?php foreach ( $socialIcons as $icon ) { ?>
					<div class="icons-item">
						<div class="icons-item__icon">
							<a href="<?php echo $icon['link']; ?>" target="_blank">
								<img src="<?= $icon['image']['url']; ?>" alt="<?php echo $icon['title']; ?>">
							</a>
						</div>
					</div>
				<?php } ?>
			</div> 
		</div>
		<div class="subscribe__form-wrapper" >
			<?php echo do_shortcode($formEmbed); ?>
		</div>
	</div>
</div>