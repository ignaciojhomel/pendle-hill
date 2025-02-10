import { __ } from '@wordpress/i18n';

import { 
	useBlockProps,
	InspectorControls,
	RichText,
    URLInput,
    MediaUpload,
    MediaUploadCheck
 } from '@wordpress/block-editor';

import { 
	Button, 
	TextControl,
	TextareaControl,
	BaseControl,
	SelectControl,
	PanelBody,
	ResponsiveWrapper,
	ToggleControl
} from '@wordpress/components';

import './editor.scss';

export default function Edit( {attributes, setAttributes} ) {

	const blockProps = useBlockProps({
		className: 'product-categories',
	});

	const {
		title,
		titleLevel,
		text,
		textLevel,
		productsList,
		blockID
	} = attributes;

	return (
		<div { ...blockProps } >
			<InspectorControls group='typography'>
				<BaseControl>
					<SelectControl
						label={ __( 'Title Level', 'product-categories' ) }
						value={ titleLevel }
							options={ [
							{ label: 'H1', value: 'h1' },
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
						] }
						onChange={ ( value ) => setAttributes( { titleLevel: value } ) }
					/>
				</BaseControl>
			</InspectorControls>
			<InspectorControls group='typography'>
				<BaseControl>
					<SelectControl
						label={ __( 'Text Level', 'product-categories' ) }
						value={ textLevel }
							options={ [
							{ label: 'H1', value: 'h1' },
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
							{ label: 'P', value: 'p' },
						] }
						onChange={ ( value ) => setAttributes( { textLevel: value } ) }
					/>
				</BaseControl>
			</InspectorControls>
			<InspectorControls>
				<PanelBody title={ __( 'Product Categories Settings', 'product-categories' ) }>
					<BaseControl>
						<TextControl
							label={ __( 'Title', 'product-categories' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextareaControl
							label={ __( 'Text', 'product-categories' ) }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
						/>
					</BaseControl>
					<TextControl
						label={ __( 'Block ID', 'product-categories' ) }
						value={ blockID }
						onChange={ ( value ) => setAttributes( { blockID: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			
			<div className={`container`}>
				<div class="product-categories__text-wrapper">
					<RichText
						tagName={ titleLevel }
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						allowedFormats={ [] }
						className="product-categories__text-wrapper--title"
					/>
					<RichText
						tagName={ textLevel }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						allowedFormats={ [] }
						className="product-categories__text-wrapper--text"
					/>
				</div>
				<div className={`product-categories__wrapper`} >
					
				</div>
			</div>
		</div>
	);
}
