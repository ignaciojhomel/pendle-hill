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
		className: 'brands',
	});

	const {
		title,
		titleLevel,
		text,
		textLevel,
		logos,
		blockID
	} = attributes;

	return (
		<div { ...blockProps } >
			<InspectorControls group='typography'>
				<BaseControl>
					<SelectControl
						label={ __( 'Title Level', 'brands' ) }
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
						label={ __( 'Text Level', 'brands' ) }
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
				<PanelBody title={ __( 'Brands Settings', 'brands' ) }>
					<BaseControl>
						<TextControl
							label={ __( 'Title', 'brands' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextareaControl
							label={ __( 'Text', 'brands' ) }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
						/>
					</BaseControl>
					{
						logos && logos.map( ( option, index ) => (
							<PanelBody title={ __( option.title ?? 'Logo', 'brands' ) } initialOpen= {false} >								
								<BaseControl>
									<MediaUpload
										onSelect={ ( media ) => {
											const newLogos = [ ...logos ];
											newLogos[ index ].image = {url: media.url, id: media.id, alt: media.alt};
											setAttributes( { logos: newLogos } );
										} }
										type="image"
										value={ option.image ? option.image.id : ''}
										render={ ( { open } ) => (
											<Button onClick={ open }
												className= { option.image && option.image.id !==0 ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle'}
											>
												{ option.image && option.image.id !==0 ? 
													<ResponsiveWrapper>
														<img src={ option.image ? option.image.url : '' } /> 
													</ResponsiveWrapper>
													: __( 'Select Image', 'brands' )
												}
											</Button>
										) }
									/>
									<BaseControl>
										<Button 
											isDestructive
											isLink
											onClick={ () => {
												const newLogos = [ ...logos ];
												newLogos[ index ].image = {url: '', id: 0, alt: ''};
												setAttributes( { logos: newLogos } );
											}}
										>
											{ __( 'Remove Image', 'brands' ) }
										</Button>
									</BaseControl>
								</BaseControl>
								<BaseControl>
									<Button
										onClick={ () => {
											const newLogos = [ ...logos ];
											newLogos.splice( index, 1 );
											setAttributes( { logos: newLogos } );
										} }
										isDestructive
									>
										{ __( 'Remove Logo', 'brands' ) }
									</Button>
								</BaseControl>
							</PanelBody>
						))
					}
					<BaseControl>
						<Button
							onClick={ () => {
								const newLogos = [ ...logos, {} ];
								setAttributes( { logos: newLogos } );
							} }
							isPrimary
						>
							{ __( 'Add Logo', 'brands' ) }
						</Button>
					</BaseControl>
					<TextControl
						label={ __( 'Block ID', 'brands' ) }
						value={ blockID }
						onChange={ ( value ) => setAttributes( { blockID: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			
			<div className={`container`}>
				<div className={`brands__text-wrapper`} >
					<RichText
						tagName={ titleLevel }
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						allowedFormats={ [] }
						className="brands__text-wrapper--title"
					/>
					<RichText
						tagName={ textLevel }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						allowedFormats={ [] }
						className="brands__text-wrapper--text"
					/>
				</div>
				<div className={`brands__wrapper`}>
					{
						logos && (
							<div className="brands__list">
								{
									logos.map( ( option, index ) => (
										<div className="brands__item">
											<img src={ option.image ? option.image.url : '' } alt={ option.image ? option.image.alt : '' } />
										</div>
									))
								}
							</div>
						)
					}
				</div>
			</div>
		</div>
	);
}
