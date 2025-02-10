import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { BaseControl, Button, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { productLists, selectedCategory, postPerpage, filterLists } = attributes;

	const [products, setProducts] = useState(Array.isArray(productLists) ? productLists : []);

	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState(filterLists);

	const consumerKey = 'ck_6b8c7c3d15b4ac7ce987f49417e2498782823e7d';
	const consumerSecret = 'cs_8c18bcd04bf0e34fb47bae039af456f82e6a4c00';
	const credentials = btoa(`${consumerKey}:${consumerSecret}`);

	// Function to fetch products
	const fetchProducts = async (categoryId) => {
		try {
			const url = categoryId !== 'all'
				? `/wp-json/wc/v3/products?category=${categoryId}`
				: `/wp-json/wc/v3/products?per_page=100`;
	
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

	// Function to fetch categories
	const fetchCategories = async () => {
		try {
			const response = await fetch(`/wp-json/wc/v3/products/categories`, {
				headers: {
					Authorization: `Basic ${credentials}`
				}
			});
			const data = await response.json();
			setCategories(data);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	// Fetch categories and products on mount
	useEffect(() => {
		fetchCategories();
		fetchProducts(selectedCategory);

	}, [selectedCategory]); // Runs when selectedCategory changes

	// Handle category change
	const handleCategoryChange = (value) => {
		setAttributes({ selectedCategory: value });
		fetchProducts(value);
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('Product Display', 'product-grid')}>
					<SelectControl
						label={__('Select category', 'product-grid')}
						value={selectedCategory}
						options={[
							{ label: 'All', value: 'all' }, // Add "All" option
							...categories.map((cat) => ({ label: cat.name, value: cat.id }))
						]}
						onChange={handleCategoryChange}
					/>
					<TextControl
						label={__('Per page', 'product-grid')}
						value={postPerpage}
						onChange={(value) => setAttributes({ postPerpage: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Filter Options', 'product-grid')}>
					<BaseControl>
						{filterLists.map((filter, index) => (
							<PanelBody key={index} title={filter.label || `Filter ${index + 1}`}>
								<BaseControl>
									<SelectControl
										label={__('Select category', 'product-grid')}
										value={filter.category_id || ''}
										options={[
											{ label: __('Select Category', 'product-grid'), value: '' },
											...categories.map((cat) => ({ label: cat.name, value: cat.id })),
										]}
										onChange={(value) => {
											const selectedCategory = categories.find((cat) => cat.id == value);
											const updatedFilterLists = [...filterLists];

											updatedFilterLists[index] = {
												...updatedFilterLists[index],
												category_id: value,
												label: selectedCategory ? selectedCategory.name : '',
											};

											setAttributes({ filterLists: updatedFilterLists });
										}}
									/>
									<BaseControl>
										<Button
											onClick={() => {
												const updatedFilterLists = filterLists.filter((_, i) => i !== index);
												setAttributes({ filterLists: updatedFilterLists });
											}}
											isDestructive
										>
											{__('Remove Item', 'product-grid')}
										</Button>
									</BaseControl>

								</BaseControl>
							</PanelBody>
						))}
						<Button
							onClick={() => {
								const newfilterLists = [...filterLists, {}];
								setAttributes({ filterLists: newfilterLists });
							}}
							isPrimary
						>
							{__('Add Filter', '')}
						</Button>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div className='product-grid__grid container'>
				<div className='product-grid__sidebar item'>
					<div className='sidebar__heading'>Categories <span>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M6 9L12 15L18 9" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg></span>
					</div>
					<ul className='categories active'>
						{filterLists.map((filter) => (
							<li><input className="category-checkbox" type='checkbox' />{filter.label}</li>
						))}
					</ul>
				</div>
				<div className='item'>
					<div className="product-grid__header">
						<div className='product-grid__product-count'><span>50 Results</span></div>
						<div className="product-grid__filter">
							<div className="sort-by">
								<button className="sort-by-button">Sort By
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g id="Chevron down"><path id="Icon" d="M5 7.5L10 12.5L15 7.5" stroke="#111111" stroke-linecap="round" stroke-linejoin="round" /></g>
									</svg>

								</button>
								<ul className="sort-by-options">
									<li data-value="popular" className="sort-by-option">Popularity</li>
									<li data-value="alphabetically" className="sort-by-option">Alphabetically</li>
									<li data-value="price-low-to-high" className="sort-by-option">Price: Low to high</li>
									<li data-value="price-high-to-low" className="sort-by-option">Price: High to Low</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='product-grid__items'>
						<ul className="product-lists">
						{Array.isArray(productLists) ? productLists.slice(0, postPerpage).map((product) => (
							<li key={product.id}>
								<div className='product-item'>
									<a href={product.permalink}>
										{product.images.length > 0 && (
											<img src={product.images[0].src} alt={product.name} />
										)}
									</a>
									<div className='product-details'>
										<div className='product_name'>{product.name}</div>
										<div className='product_price'>{product.price}</div>
										<button>Add to Cart</button>
									</div>
								</div>
							</li>
						)) : <p>No products available</p>}

						</ul>
						<div class="pagination-container">
							<ul>
								<li class="left-arrow">
									<a href="#" class="disabled">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
											<path d="M15.8334 10.0001H4.16675M4.16675 10.0001L10.0001 15.8334M4.16675 10.0001L10.0001 4.16675" stroke="#111111" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path>
										</svg>
									</a>
								</li>
								<li class="active">
									<a href="#">1</a>
								</li>
								<li class="">
									<a href="#">2</a>
								</li>
								<li class="right-arrow">
									<a href="#">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
											<path d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16675M15.8333 10.0001L9.99996 15.8334" stroke="#111111" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path>
										</svg>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
