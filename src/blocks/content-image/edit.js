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
		className: 'content-image',
	});

	const {
		image,
		title,
		titleLevel,
		text,
		textLevel,
		primaryButton,
		secondaryButton,
		blockID
	} = attributes;

	return (
		<div { ...blockProps } >
			<InspectorControls group='typography'>
				<BaseControl>
					<SelectControl
						label={ __( 'Title Level', 'content-image' ) }
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
						label={ __( 'Text Level', 'content-image' ) }
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
				<PanelBody title={ __( 'Content Image Settings', 'content-image' ) }>
					<BaseControl>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({ image: { url: media.url, id: media.id, alt: media.alt } });
							}}
							type="image"
							value={image ? image.id : ''}
							render={({ open }) => (
									<Button onClick={ open }
										className={ image && image.id !== 0 ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle' }
										>
										{ image && image.id !== 0 ? 
											<ResponsiveWrapper>
												<img src={ image ? image.url : '' } alt={ __( 'Image', 'omgwp' ) } /> 
											</ResponsiveWrapper>
												: __( 'Select Background Image', 'content-image' )
											}										
										</Button>
							)}
						/>
					</BaseControl>
					{
						image && image.id !== 0 && (
							<BaseControl>
								<Button
									isLink
									isDestructive
									onClick={ () => setAttributes( { image: { url: '', id: 0, alt: '' } } ) }
								>
									{ __( 'Remove Background Image', 'content-image' ) }
								</Button>
							</BaseControl>
						)
					}
					<BaseControl>
						<TextControl
							label={ __( 'Title', 'content-image' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextareaControl
							label={ __( 'Text', 'content-image' ) }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
						/>
					</BaseControl>
					
					<BaseControl
						label={ __( 'Primary Button', 'content-image' ) }
					>
						<TextControl
							label={ __( 'Text', 'content-image' ) }
							value={ primaryButton.text }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, text: value } } ) }
						/>
						<TextControl
							label={ __( 'URL', 'content-image' ) }
							value={ primaryButton.url }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, url: value } } ) }
						/>
						<SelectControl
							label={ __( 'Primary Button Target', 'content-image' ) }
							value={ primaryButton.target }
								options={ [
									{ label: 'Inside Link', value: '' },
									{ label: '_blank', value: 'External' },
							] }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, target: value } } ) }
						/>
						<TextControl
							label={ __( 'SVG Icon (Inline or URL)', 'content-image' ) }
							value={ primaryButton.icon }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, icon: value } } ) }
							help={__('Enter the SVG inline code or the URL to an external SVG file.', 'content-image')}
						/>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image/svg+xml']}
								onSelect={(media) => setAttributes({ primaryButton: { ...primaryButton, icon: media.url } })}
								render={({ open }) => (
									<Button onClick={ open } isPrimary>
										{ __( 'Upload SVG Icon', 'content-image' ) }
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</BaseControl>
					<BaseControl
						label={ __( 'Secondary Button', 'content-image' ) }
					>
						<TextControl
							label={ __( 'Text', 'content-image' ) }
							value={ secondaryButton.text }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, text: value } } ) }
						/>
						<TextControl
							label={ __( 'URL', 'content-image' ) }
							value={ secondaryButton.url }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, url: value } } ) }
						/>
						<SelectControl
							label={ __( 'Secondary Button Target', 'content-image' ) }
							value={ secondaryButton.target }
								options={ [
									{ label: 'Inside Link', value: '' },
									{ label: '_blank', value: 'External' },
							] }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, target: value } } ) }
						/>
						<TextControl
							label={ __( 'SVG Icon (Inline or URL)', 'content-image' ) }
							value={ secondaryButton.icon }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, icon: value } } ) }
							help={__('Enter the SVG inline code or the URL to an external SVG file.', 'content-image')}
						/>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image/svg+xml']}
								onSelect={(media) => setAttributes({ secondaryButton: { ...secondaryButton, icon: media.url } })}
								render={({ open }) => (
									<Button onClick={ open } isPrimary>
										{ __( 'Upload SVG Icon', 'content-image' ) }
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</BaseControl>
					<TextControl
						label={ __( 'Block ID', 'content-image' ) }
						value={ blockID }
						onChange={ ( value ) => setAttributes( { blockID: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			
			<div className={`container`}>
				<div className={`content-image__text-wrapper`} >
					<div className={`content-image__text-wrapper-inner`} >
						<RichText
							tagName={ titleLevel }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							allowedFormats={ [] }
							className="content-image__text-wrapper--title"
						/>
						<RichText
							tagName={ textLevel }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
							allowedFormats={ [] }
							className="content-image__text-wrapper--text"
						/>
						<div className='content-image__text-buttons'>
						{
							primaryButton && primaryButton.url && primaryButton.text && (
								<a className="btn btn-outline"> 
									{primaryButton.icon && primaryButton.icon.includes('.svg') && (
										<img src={primaryButton.icon} alt="Button Icon" className="two-col-text-buttons__icon" />
									)}
									{primaryButton.text} 
								</a>
							)
						}
						{
							secondaryButton && secondaryButton.url && secondaryButton.text && (
								<a className="btn btn-white"> 
									{secondaryButton.icon && secondaryButton.icon.includes('.svg') && (
										<img src={secondaryButton.icon} alt="Button Icon" className="two-col-text-buttons__icon" />
									)}
									{secondaryButton.text} 
								</a>
							)
						}
						</div>
					</div>
				</div>
				<div className={`content-image__image-wrapper`}>
					<img src={ image.url } alt={ image.alt } className={`content-image__image`} />
				</div>
			</div>
		</div>
	);
}
