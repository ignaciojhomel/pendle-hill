<?php
$blockProps = get_block_wrapper_attributes( [
	'class' => 'content-image',
	'id'    => $attributes['blockID'] ?? '',
] );

$image 			 = $attributes['image'];  
$title           = $attributes['title'];
$titleLevel      = $attributes['titleLevel'];
$text       	 = $attributes['text'];
$textLevel 		 = $attributes['textLevel'];
$primaryButton   = $attributes['primaryButton'];
$secondaryButton = $attributes['secondaryButton'];

?>

<div <?= $blockProps ?>>	
	<div class="container">
		<div class="content-image__text-wrapper">
			<div class="content-image__text-wrapper-inner">
				<?php echo sprintf( '<%s class="content-image__text-wrapper--title">%s</%s>', $titleLevel, $title, $titleLevel ); ?>
				<?php if($text) {
					echo sprintf( '<%s class="content-image__text-wrapper--text">%s</%s>', $textLevel, $text, $textLevel );
				} ?>
				<!-- buttons -->
				<?php if ( $primaryButton && isset($primaryButton['url']) && $primaryButton['text'] ) : 
					$primaryUrl = 'javasript:void()';
					if(isset($primaryButton['url']))
						$primaryUrl = $primaryButton['url'];
				?>
				<div class="content-image__text-buttons">
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
					</div> <!-- end of content-image__text-buttons -->
				<?php endif; ?>		
				<!-- end of buttons -->
			</div> <!-- end of content-image__text-wrapper-inner -->
		</div>
		<div class="content-image__image-wrapper" >
			<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" class="content-image__image" />
		</div>
	</div>
</div>