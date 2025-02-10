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
		className: 'subscribe',
	});

	const {
		backgroundImage,
		formEmbed,
		title,
		titleLevel,
		text,
		textLevel,
		socialIcons,
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
						label={ __( 'Title Level', 'subscribe' ) }
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
						label={ __( 'Text Level', 'subscribe' ) }
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
				<PanelBody title={ __( 'Content Image Settings', 'subscribe' ) }>
					<BaseControl>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({ backgroundImage: { url: media.url, id: media.id, alt: media.alt } });
							}}
							type="backgroundImage"
							value={backgroundImage ? backgroundImage.id : ''}
							render={({ open }) => (
									<Button onClick={ open }
										className={ backgroundImage && backgroundImage.id !== 0 ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle' }
										>
										{ backgroundImage && backgroundImage.id !== 0 ? 
											<ResponsiveWrapper>
												<img src={ backgroundImage ? backgroundImage.url : '' } alt={ __( 'Image', 'omgwp' ) } /> 
											</ResponsiveWrapper>
												: __( 'Select Background Image', 'subscribe' )
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
									{ __( 'Remove Background Image', 'subscribe' ) }
								</Button>
							</BaseControl>
						)
					}
					<BaseControl>
						<TextControl
							label={ __( 'Form Embed Code', 'subscribe' ) }
							value={ formEmbed }
							onChange={ ( value ) => setAttributes( { formEmbed: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextControl
							label={ __( 'Title', 'subscribe' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextareaControl
							label={ __( 'Text', 'subscribe' ) }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
						/>
					</BaseControl>
					{
						socialIcons && socialIcons.map( ( option, index ) => (
							<PanelBody title={ __( option.title ?? 'Social Icons', 'subscribe' ) } initialOpen= {false} >								
								<BaseControl>
									<MediaUpload
										onSelect={ ( media ) => {
											const newIcons = [ ...socialIcons ];
											newIcons[ index ].image = {url: media.url, id: media.id, alt: media.alt};
											setAttributes( { socialIcons: newIcons } );
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
													: __( 'Select Icon', 'subscribe' )
												}
											</Button>
										) }
									/>
									<BaseControl>
										<Button 
											isDestructive
											isLink
											onClick={ () => {
												const newIcons = [ ...socialIcons ];
												newIcons[ index ].image = {url: '', id: 0, alt: ''};
												setAttributes( { socialIcons: newIcons } );
											}}
										>
											{ __( 'Remove Icon', 'subscribe' ) }
										</Button>
									</BaseControl>
								</BaseControl>
								<TextControl
									label={ __( 'Social Icons Title', 'subscribe' ) }
									value={ option.title }
									onChange={ ( value ) => {
										const newIcons = [ ...socialIcons ];
										newIcons[ index ].title = value;
										setAttributes( { socialIcons: newIcons } );
									} }
								/>
								<TextareaControl
									label={ __( 'Social Icons Link', 'subscribe' ) }
									value={ option.link }
									onChange={ ( value ) => {
										const newIcons = [ ...socialIcons ];
										newIcons[ index ].link = value;
										setAttributes( { socialIcons: newIcons } );
									} }
								/>
								<BaseControl>
									<Button
										onClick={ () => {
											const newIcons = [ ...socialIcons ];
											newIcons.splice( index, 1 );
											setAttributes( { socialIcons: newIcons } );
										} }
										isDestructive
									>
										{ __( 'Remove Social Icons', 'subscribe' ) }
									</Button>
								</BaseControl>
							</PanelBody>
						))
					}
					<BaseControl>
						<Button
							onClick={ () => {
								const newIcons = [ ...socialIcons, {} ];
								setAttributes( { socialIcons: newIcons } );
							} }
							isPrimary
						>
							{ __( 'Add Social Icons', 'subscribe' ) }
						</Button>
					</BaseControl>
					<BaseControl
						label={ __( 'Primary Button', 'subscribe' ) }
					>
						<TextControl
							label={ __( 'Text', 'subscribe' ) }
							value={ primaryButton.text }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, text: value } } ) }
						/>
						<TextControl
							label={ __( 'URL', 'subscribe' ) }
							value={ primaryButton.url }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, url: value } } ) }
						/>
						<SelectControl
							label={ __( 'Primary Button Target', 'subscribe' ) }
							value={ primaryButton.target }
								options={ [
									{ label: 'Inside Link', value: '' },
									{ label: '_blank', value: 'External' },
							] }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, target: value } } ) }
						/>
						<TextControl
							label={ __( 'SVG Icon (Inline or URL)', 'subscribe' ) }
							value={ primaryButton.icon }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, icon: value } } ) }
							help={__('Enter the SVG inline code or the URL to an external SVG file.', 'subscribe')}
						/>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image/svg+xml']}
								onSelect={(media) => setAttributes({ primaryButton: { ...primaryButton, icon: media.url } })}
								render={({ open }) => (
									<Button onClick={ open } isPrimary>
										{ __( 'Upload SVG Icon', 'subscribe' ) }
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</BaseControl>
					<BaseControl
						label={ __( 'Secondary Button', 'subscribe' ) }
					>
						<TextControl
							label={ __( 'Text', 'subscribe' ) }
							value={ secondaryButton.text }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, text: value } } ) }
						/>
						<TextControl
							label={ __( 'URL', 'subscribe' ) }
							value={ secondaryButton.url }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, url: value } } ) }
						/>
						<SelectControl
							label={ __( 'Secondary Button Target', 'subscribe' ) }
							value={ secondaryButton.target }
								options={ [
									{ label: 'Inside Link', value: '' },
									{ label: '_blank', value: 'External' },
							] }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, target: value } } ) }
						/>
						<TextControl
							label={ __( 'SVG Icon (Inline or URL)', 'subscribe' ) }
							value={ secondaryButton.icon }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, icon: value } } ) }
							help={__('Enter the SVG inline code or the URL to an external SVG file.', 'subscribe')}
						/>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image/svg+xml']}
								onSelect={(media) => setAttributes({ secondaryButton: { ...secondaryButton, icon: media.url } })}
								render={({ open }) => (
									<Button onClick={ open } isPrimary>
										{ __( 'Upload SVG Icon', 'subscribe' ) }
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</BaseControl>
					<TextControl
						label={ __( 'Block ID', 'subscribe' ) }
						value={ blockID }
						onChange={ ( value ) => setAttributes( { blockID: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={`subscribe__overlay`}></div>
			<div className={`container`}>
				<div className={`subscribe__text-wrapper`} >
					<div className={`subscribe__text-wrapper-inner`} >
						<RichText
							tagName={ titleLevel }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							allowedFormats={ [] }
							className="subscribe__text-wrapper--title"
						/>
						<RichText
							tagName={ textLevel }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
							allowedFormats={ [] }
							className="subscribe__text-wrapper--text"
						/>
						<div className='subscribe__text-buttons'>
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
					{
						socialIcons && (
							<div className="icons-wrapper">
								{
									socialIcons.map( ( option, index ) => (
										<div className="icons-item">
											<a href="{ option.link }" className="icons-item__icon" target="_blank">
												<img src={ option.image ? option.image.url : '' } alt={ option.image ? option.image.alt : option.title } />
											</a>
										</div>
									))
								}
							</div>
						)
					}
					</div>
				</div>
				<div className={`subscribe__form-wrapper`}>
					{ formEmbed }
				</div>
			</div>
		</div>
	);
}
