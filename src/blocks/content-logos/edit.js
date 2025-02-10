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
		className: 'content-logos',
	});

	const {
		backgroundImage,
		title,
		titleLevel,
		text,
		textLevel,
		logos,
		primaryButton,
		secondaryButton,
		blockID
	} = attributes;

	return (
		<div { ...blockProps } style={{ 
				backgroundImage: backgroundImage?.url 
				? `url(${backgroundImage.url})` 
				: 'none' 
			}} >
			<InspectorControls group='typography'>
				<BaseControl>
					<SelectControl
						label={ __( 'Title Level', 'content-logos' ) }
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
						label={ __( 'Text Level', 'content-logos' ) }
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
				<PanelBody title={ __( 'Content Logos Settings', 'content-logos' ) }>
					<BaseControl>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({ backgroundImage: { url: media.url, id: media.id, alt: media.alt } });
							}}
							type="image"
							value={backgroundImage ? backgroundImage.id : ''}
							render={({ open }) => (
									<Button onClick={ open }
										className={ backgroundImage && backgroundImage.id !== 0 ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle' }
										>
										{ backgroundImage && backgroundImage.id !== 0 ? 
											<ResponsiveWrapper>
												<img src={ backgroundImage ? backgroundImage.url : '' } alt={ __( 'Image', 'omgwp' ) } /> 
											</ResponsiveWrapper>
												: __( 'Select Background Image', 'content-logos' )
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
									{ __( 'Remove Background Image', 'content-logos' ) }
								</Button>
							</BaseControl>
						)
					}
					<BaseControl>
						<TextControl
							label={ __( 'Title', 'content-logos' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextareaControl
							label={ __( 'Text', 'content-logos' ) }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
						/>
					</BaseControl>
					{
						logos && logos.map( ( option, index ) => (
							<PanelBody title={ __( option.title ?? 'Logo', 'content-logos' ) } initialOpen= {false} >								
								<BaseControl>
									<MediaUpload
										onSelect={ ( media ) => {
											const newOptions = [ ...logos ];
											newOptions[ index ].image = {url: media.url, id: media.id, alt: media.alt};
											setAttributes( { logos: newOptions } );
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
													: __( 'Select Image', 'content-logos' )
												}
											</Button>
										) }
									/>
									<BaseControl>
										<Button 
											isDestructive
											isLink
											onClick={ () => {
												const newOptions = [ ...logos ];
												newOptions[ index ].image = {url: '', id: 0, alt: ''};
												setAttributes( { logos: newOptions } );
											}}
										>
											{ __( 'Remove Image', 'content-logos' ) }
										</Button>
									</BaseControl>
								</BaseControl>
								<BaseControl>
									<Button
										onClick={ () => {
											const newOptions = [ ...logos ];
											newOptions.splice( index, 1 );
											setAttributes( { logos: newOptions } );
										} }
										isDestructive
									>
										{ __( 'Remove Logo', 'content-logos' ) }
									</Button>
								</BaseControl>
							</PanelBody>
						))
					}
					<BaseControl>
						<Button
							onClick={ () => {
								const newOptions = [ ...logos, {} ];
								setAttributes( { logos: newOptions } );
							} }
							isPrimary
						>
							{ __( 'Add Logo', 'content-logos' ) }
						</Button>
					</BaseControl>
					<BaseControl
						label={ __( 'Primary Button', 'content-logos' ) }
					>
						<TextControl
							label={ __( 'Text', 'content-logos' ) }
							value={ primaryButton.text }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, text: value } } ) }
						/>
						<TextControl
							label={ __( 'URL', 'content-logos' ) }
							value={ primaryButton.url }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, url: value } } ) }
						/>
						<SelectControl
							label={ __( 'Primary Button Target', 'content-logos' ) }
							value={ primaryButton.target }
								options={ [
									{ label: 'Inside Link', value: '' },
									{ label: '_blank', value: 'External' },
							] }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, target: value } } ) }
						/>
						<TextControl
							label={ __( 'SVG Icon (Inline or URL)', 'content-logos' ) }
							value={ primaryButton.icon }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, icon: value } } ) }
							help={__('Enter the SVG inline code or the URL to an external SVG file.', 'content-logos')}
						/>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image/svg+xml']}
								onSelect={(media) => setAttributes({ primaryButton: { ...primaryButton, icon: media.url } })}
								render={({ open }) => (
									<Button onClick={ open } isPrimary>
										{ __( 'Upload SVG Icon', 'content-logos' ) }
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</BaseControl>
					<BaseControl
						label={ __( 'Secondary Button', 'content-logos' ) }
					>
						<TextControl
							label={ __( 'Text', 'content-logos' ) }
							value={ secondaryButton.text }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, text: value } } ) }
						/>
						<TextControl
							label={ __( 'URL', 'content-logos' ) }
							value={ secondaryButton.url }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, url: value } } ) }
						/>
						<SelectControl
							label={ __( 'Secondary Button Target', 'content-logos' ) }
							value={ secondaryButton.target }
								options={ [
									{ label: 'Inside Link', value: '' },
									{ label: '_blank', value: 'External' },
							] }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, target: value } } ) }
						/>
						<TextControl
							label={ __( 'SVG Icon (Inline or URL)', 'content-logos' ) }
							value={ secondaryButton.icon }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, icon: value } } ) }
							help={__('Enter the SVG inline code or the URL to an external SVG file.', 'content-logos')}
						/>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image/svg+xml']}
								onSelect={(media) => setAttributes({ secondaryButton: { ...secondaryButton, icon: media.url } })}
								render={({ open }) => (
									<Button onClick={ open } isPrimary>
										{ __( 'Upload SVG Icon', 'content-logos' ) }
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</BaseControl>
					<TextControl
						label={ __( 'Block ID', 'content-logos' ) }
						value={ blockID }
						onChange={ ( value ) => setAttributes( { blockID: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={`content-logos__overlay`}></div>
			<div className={`container`}>
				<div className={`content-logos__text-wrapper`} >
					<RichText
						tagName={ titleLevel }
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						allowedFormats={ [] }
						className="content-logos__text-wrapper--title"
					/>
					<RichText
						tagName={ textLevel }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						allowedFormats={ [] }
						className="content-logos__text-wrapper--text"
					/>
					<div className='content-logos__text-buttons'>
					{
						primaryButton && primaryButton.url && primaryButton.text && (
							<a className="btn btn-primary"> 
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
				<div className={`content-logos__wrapper`}>
					{
						logos && (
							<div className="content-logos__list">
								{
									logos.map( ( option, index ) => (
										<div className="content-logos__item">
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
