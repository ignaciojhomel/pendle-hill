import { __ } from '@wordpress/i18n';

import { 
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload
 } from '@wordpress/block-editor';

import { 
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
	SelectControl,
	ResponsiveWrapper,
	BaseControl,
	__experimentalNumberControl as NumberControl

} from '@wordpress/components';

import * as apiFetchModule from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

import {useState, useEffect, useRef} from '@wordpress/element';


import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

import './editor.scss';

export default function Edit( {attributes, setAttributes} ) {

	const blockProps = useBlockProps({
		className: 'testimonials',
	});

	const {
		backgroundImage,
		sectionTitle,
		sectionTitleTag,
		sectionDescription,
		sectionDescriptionTag,
		button,
		numberOfTestimonials,
		blockID
	} = attributes;

	const apiFetch = apiFetchModule.default || apiFetchModule;
	const [testimonials, setTestimonials] = useState(null);

	useEffect(() => {
		apiFetch( { path: addQueryArgs('/wp/v2/testimonial', { per_page: numberOfTestimonials }) } ).
			then( ( fetchedTestimonials ) => {
				return Promise.all( fetchedTestimonials.map( testimonial => {
					if ( testimonial.featured_media === 0 ) {
						return testimonial;
					}
					return apiFetch( { url: testimonial._links['wp:featuredmedia'][0].href } ).
						then( media => {
							testimonial.featured_image_url = media.guid.rendered;
							testimonial.alt_text = media.alt_text;
							return testimonial;
						} );
				}
				) );
			} )
			.then( testimonialsWithImages => {
				setTestimonials( testimonialsWithImages );
			} )
			.catch( error => {
				console.error( 'Error fetching testimonials:', error );
			} );

	}, [ numberOfTestimonials ]);

	const splideRef = useRef(null);
	const splideInstanceRef = useRef(null);
	const prevArrowRef = useRef(null);
	const nextArrowRef = useRef(null);
		
		useEffect(() => {
		// Initialize Splide
		splideInstanceRef.current = new Splide(splideRef.current, {
		type: 'loop',
		arrows: false,
		pagination: true,
		gap: 20,
		}).mount();

		// Set up custom navigation if elements exist
		const prevArrow = prevArrowRef.current;
		const nextArrow = nextArrowRef.current;

		if (prevArrow && nextArrow) {
		prevArrow.addEventListener('click', handlePrevClick);
		nextArrow.addEventListener('click', handleNextClick);
		}

		// Clean up function
		return () => {
		if (prevArrow && nextArrow) {
			prevArrow.removeEventListener('click', handlePrevClick);
			nextArrow.removeEventListener('click', handleNextClick);
		}
		if (splideInstanceRef.current) {
			splideInstanceRef.current.destroy();
		}
		};
	}, [testimonials]); // Reinitialize when products change

	// Handlers for custom navigation
	const handlePrevClick = () => {
		if (splideInstanceRef.current) {
		splideInstanceRef.current.go('<');
		}
	};

	const handleNextClick = () => {
		if (splideInstanceRef.current) {
		splideInstanceRef.current.go('>');
		}
	};

	return (
		<div { ...blockProps } >
			<InspectorControls group='typography'>
				<BaseControl>
					<SelectControl
						label={ __( 'Section Title Tag', 'testimonials' ) }
						value={ sectionTitleTag }
							options={ [
							{ label: 'H1', value: 'h1' },
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
						] }
						onChange={ ( value ) => setAttributes( { sectionTitleTag: value } ) }
					/>
				</BaseControl>
			</InspectorControls>
			<InspectorControls group='typography'>
				<BaseControl>
					<SelectControl
						label={ __( 'Section Description Tag', 'testimonials' ) }
						value={ sectionDescriptionTag }
							options={ [
							{ label: 'H1', value: 'h1' },
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
							{ label: 'P', value: 'p' },
						] }
						onChange={ ( value ) => setAttributes( { sectionDescriptionTag: value } ) }
					/>
				</BaseControl>
			</InspectorControls>
			<InspectorControls>
				<PanelBody title={ __( 'Testimonials Settings', 'testimonials' ) }>
				<BaseControl>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({ backgroundImage: { url: media.url, id: media.id, alt: media.alt } });
							}}
							type="image"
							value={backgroundImage ? backgroundImage.id : ''}
							render={({ open }) => (
									<Button onClick={ open }
										className={ backgroundImage && backgroundImage.id !== 0 ? 'editor-post-featured-image__ptestimonial' : 'editor-post-featured-image__toggle' }
										>
										{ backgroundImage && backgroundImage.id !== 0 ? 
											<ResponsiveWrapper>
												<img src={ backgroundImage ? backgroundImage.url : '' } alt={ __( 'Image', 'overview-slider' ) } /> 
											</ResponsiveWrapper>
												: __( 'Select Background Image', 'image-background-content' )
											}										
										</Button>
							)}
						/>
					</BaseControl>
					{
						backgroundImage && backgroundImage.id !== 0 && (
							<BaseControl>
								<Button
									isLink
									isDestructive
									onClick={ () => setAttributes( { backgroundImage: { url: '', id: 0, alt: '' } } ) }
								>
									{ __( 'Remove Background Image', 'image-background-content' ) }
								</Button>
							</BaseControl>
						)
					}
					<BaseControl>
						<TextControl
							label={ __( 'Section Title', 'testimonials' ) }
							value={ sectionTitle }
							onChange={ ( value ) => setAttributes( { sectionTitle: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextareaControl
							label={ __( 'Section Description', 'testimonials' ) }
							value={ sectionDescription }
							onChange={ ( value ) => setAttributes( { sectionDescription: value } ) }
						/>
					</BaseControl>
					<BaseControl
						label={ __( 'Button', 'testimonials' ) }
					>
						<TextControl
							label={ __( 'Text', 'testimonials' ) }
							value={ button.text }
							onChange={ ( value ) => setAttributes( { button: { ...button, text: value } } ) }
						/>
						<TextControl
							label={ __( 'URL', 'testimonials' ) }
							value={ button.url }
							onChange={ ( value ) => setAttributes( { button: { ...button, url: value } } ) }
						/>
					</BaseControl>
					<BaseControl>
						<NumberControl
							label={ __( 'Number of Testimonials', 'testimonial-slider' ) }
							value={ numberOfTestimonials }
							onChange={ ( value ) => setAttributes( { numberOfTestimonials: value } ) }
						/>
					</BaseControl>
					
					<TextControl
						label={ __( 'Block ID', 'testimonials' ) }
						value={ blockID }
						onChange={ ( value ) => setAttributes( { blockID: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className="testimonials-header__wrapper">
				<div className="testimonials__text-section">
					<RichText
						tagName={ sectionTitleTag }
						value={ sectionTitle }
						onChange={ ( value ) => setAttributes( { sectionTitle: value } ) }
						allowedFormats={ [] }
					/>
					<RichText
						tagName={ sectionDescriptionTag }
						value={ sectionDescription }
						onChange={ ( value ) => setAttributes( { sectionDescription: value } ) }
						allowedFormats={ [] }
					/>
				</div>
				<div class="testimonials__buttons">
					{
						button && (
							<a className="testimonials__button btn btn-secondary testimonials__button--primary"> {button.text} </a>
						)
					}
				</div>
			</div>
			<div class="testimonial-slider__wrapper">
				<div id="testimonial-main-slider" className="testimonial-main-slider testimonial-slider__slider  splide" ref={splideRef}>
					<div className='splide__track'>
						<ul className='splide__list'>
							{
								testimonials && testimonials.map( testimonial => (
									<li className='splide__slide'>
										<div className="testimonial-slider__item">
											<div className="testimonial-slider__item-card">
												<div class="testimonial-slider__item-content">
													
														<div className="testimonial-slider__item-text" dangerouslySetInnerHTML={{ __html: testimonial.content.rendered }}></div>
														<span class="testimonial-slider__item-content-title">{ testimonial.title.rendered } </span>
														
												</div>
											</div>
										</div>
										<div class="testimonial-slider__item-image">
											<img src={ testimonial.featured_image_url } alt={ testimonial.alt_text } />
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
