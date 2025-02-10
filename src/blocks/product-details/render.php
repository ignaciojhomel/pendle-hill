<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="product-details container">
		<div class="product-details__grid">
			<div class="product-details__grid__item">
				<img src=""/>
			</div>
			<div class="product-details__grid__item">
				<div class="breadcrumbs">
					<p><span>Shop all</span><span>Meat</span><span>Yearling T-Bone Steak - 1kg</span></p>
				</div>
				<div class="title"><h1>Yearling T-Bone Steak - 1kg</h1></div>
				<div class="star-rating">
					<?php for($i =0; $i < 5; $i++):?>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path d="M7.25672 0.53431C7.53172 -0.118859 8.46832 -0.118858 8.74332 0.534311L10.3663 4.38943C10.4823 4.66479 10.7445 4.85293 11.0454 4.87677L15.2582 5.21043C15.9719 5.26696 16.2614 6.14696 15.7175 6.60717L12.5079 9.32339C12.2786 9.51744 12.1784 9.82188 12.2485 10.1119L13.2291 14.1733C13.3952 14.8614 12.6375 15.4053 12.0264 15.0366L8.41965 12.8601C8.16202 12.7046 7.83802 12.7046 7.5804 12.8601L3.9736 15.0366C3.3625 15.4053 2.60477 14.8614 2.77091 14.1733L3.75155 10.1119C3.82159 9.82188 3.72147 9.51744 3.49221 9.32339L0.28245 6.60717C-0.261375 6.14696 0.0280544 5.26696 0.741835 5.21043L4.9547 4.87677C5.25561 4.85293 5.51774 4.66479 5.63367 4.38943L7.25672 0.53431Z" fill="#111111"/>
						</svg>
					<?php endfor;?>
				</div>
				<div class="description">
					<p>Our Australian Yearling T-Bone Steak is the ultimate carnivorous indulgence. 
						With its distinctive T-shaped bone and two types of meat (sirloin and fillet) 
						in one, this cut of steak promises a juicy, flavourful bite in every cut. 
						Perfect for grilling or pan-frying, this cut is sure to become a regular in your dinner rotation.
					</p>
				</div>
				<div class="quantity">
					<div class="group">
						<span>+</span>
						<input type="text" />
						<span>-</span>
					</div>
				</div>
				<div class="actions">
					<button class="add-to-cart">Add to Cart</button>
					<button class="buy-now">Add to Cart</button>
				</div>
			</div>
		</div>
	</div>
</div>
