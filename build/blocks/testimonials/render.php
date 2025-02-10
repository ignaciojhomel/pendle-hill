<?php
$blockProps = get_block_wrapper_attributes( [
	'class' => 'testimonials',
	'id'    => $attributes['blockID'] ?? '',
] );

$backgroundImage 		= $attributes['backgroundImage'];
$sectionTitle			= $attributes['sectionTitle'];
$sectionTitleTag    	= $attributes['sectionTitleTag'];
$sectionDescription			= $attributes['sectionDescription'];
$sectionDescriptionTag    	= $attributes['sectionDescriptionTag'];
$numberOfTestimonials  		= $attributes['numberOfTestimonials'];
$button 					= $attributes['button'];

?>
<div <?= $blockProps ?> >
	<?php if(!empty($backgroundImage) && isset($backgroundImage['url']) && $backgroundImage['url'] != ""){ ?>
		<style>
			.testimonials {
				--background-image: url(<?php echo $backgroundImage['url'];?>);
			}
		</style>
	<?php } ?>
	<div class="testimonials__overlay"></div>
	<div class="container">
		<div class="testimonials-header__wrapper">
			<div class="testimonials__text-section">
				<?php echo sprintf( '<%s class="testimonials__title">%s</%s>', $sectionTitleTag, $sectionTitle, $sectionTitleTag ); ?>
				<?php echo sprintf( '<%s class="testimonials__description">%s</%s>', $sectionDescriptionTag, $sectionDescription, $sectionDescriptionTag ); ?>
			</div>
			<?php if ( $button ) : ?>
				<div class="testimonials__button">
					<?php if ( $button ) : ?>
						<a href="<?= $button['url'] ?>"
						class="btn btn-primary"><?= $button['text'] ?></a>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>
		<div id="testimonial-slider" class="testimonial-slider testimonial-slider__slider splide">
			<div class="splide__track">
				<ul class="splide__list">
					<?php
					$args = array(
						'post_type' => 'testimonial',
						'posts_per_page' => $numberOfTestimonials,
					);
					$query = new WP_Query( $args );
					while ( $query->have_posts() ) {
						$query->the_post();
						?>
						<li class="splide__slide testimonial-slider__item">
							<div class="testimonial-slider__item-content">
								<?php $starRatings = get_field('star_ratings'); ?>
								<div class="testimonials-slider__item-stars">
									<span class="fa fa-star <?php if ($starRatings >= 1) { echo 'checked';}?>"></span>
									<span class="fa fa-star <?php if ($starRatings >= 2) { echo 'checked';}?>"></span>
									<span class="fa fa-star <?php if ($starRatings >= 3) { echo 'checked';}?>"></span>
									<span class="fa fa-star <?php if ($starRatings >= 4) { echo 'checked';}?>"></span>
									<span class="fa fa-star <?php if ($starRatings == 5) { echo 'checked';}?>"></span>
								</div>
								<div class="testimonial-slider__item-text"><?= the_content(); ?></div>
							</div>
							<div class="testimonial-slider__item-author">
								<div class="testimonial-slider__item-author-image">
									<?php $url = wp_get_attachment_url( get_post_thumbnail_id($query->ID), 'thumbnail' ); ?>
									<img src="<?php echo $url ?>" alt="">
								</div>
								<div class="testimonial-slider__item-author-details">
									<span class="testimonial-slider__item-author-name"><?= the_title(); ?></span>
									<span class="testimonial-slider__item-author-date"><?= get_field('date'); ?></span>
								</div>
							</div>
						</li>
					<?php } wp_reset_postdata(); ?>
				</ul>
			</div>
		</div>
	</div>
</div>