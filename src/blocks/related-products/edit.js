/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, MediaUpload, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({attributes ,setAttributes}) {
	const {backgroundImage, heading,text,productLists, limit } = attributes;
	const [products, setProducts] = useState(Array.isArray(productLists) ? productLists : []);

	const consumerKey = 'ck_6b8c7c3d15b4ac7ce987f49417e2498782823e7d';
	const consumerSecret = 'cs_8c18bcd04bf0e34fb47bae039af456f82e6a4c00';
	const credentials = btoa(`${consumerKey}:${consumerSecret}`);
	
	const fetchProducts = async () => {
		try {
			const url = `/wp-json/wc/v3/products?per_page=100`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Basic ${credentials}`
				}
			});
			const data = await response.json();
	
			if (Array.isArray(data)) {
				setProducts(data);
				setAttributes({ productLists: data });
			} else {
				console.error("API did not return an array:", data);
				setProducts([]);
				setAttributes({ productLists: [] });
			}
		} catch (error) {
			console.error("Error fetching products:", error);
			setProducts([]);
			setAttributes({ productLists: [] });
		}
	};
	useEffect(() => {
		fetchProducts();
	}, [])
	return (
		<div {...useBlockProps({ style: { backgroundImage: backgroundImage ? `url(${backgroundImage.url})` : 'none' },className:'related-products' })}>
			<div className="related-products-block container">
				<div className="related-products-block__heading"><h1>{heading}</h1></div>
				<InspectorControls >
					<PanelBody title={__('Banner Settings', 'related-products')}>
						<MediaUpload
							onSelect={(media) => (
								setAttributes({ backgroundImage: { url: media.url, id: media.id, alt: media.alt }})
							)}
							allowedTypes={['image']}
							render={({ open }) => (
								<Button onClick={open} variant="primary">
									{__('Upload Background Image', 'shop-banner')}
								</Button>
							)}
						/>
						<TextControl
							label={__('Limit', 'related-products')}
							value={limit}
							onChange={(value) => setAttributes({ limit: value })}
						/>
						<TextControl
							label={__('Heading', 'related-products')}
							value={heading}
							onChange={(value) => setAttributes({ heading: value })}
						/>
						<TextareaControl
							label={__('Text', 'related-products')}
							value={text}
							onChange={(value) => setAttributes({ text: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<div className='related-products-block__text'>
					<p>{text}</p>
				</div>
				<div className="related-products-block__content">
				{Array.isArray(productLists) ? productLists.slice(0, limit).map((product) => (
					<div className="item">
						<img src="http://pendle-hill.test/wp-content/uploads/2025/02/logo-1-1.jpg" alt="" />
						<div className="product-details">
							<div className="product-name">Chicken Pack</div>
							<div className="product-price">
								<p>$80</p>
							</div>
						</div>
						<div className="action">
							<button>Add to cart</button>
						</div>
					</div>
				)): <p>No products available</p>}
				</div>
			</div>
		</div>
	);
}
