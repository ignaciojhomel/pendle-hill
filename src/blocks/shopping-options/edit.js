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
		className: 'shopping-options',
	});

	const {
		backgroundImage,
		title,
		titleLevel,
		text,
		textLevel,
		shoppingList,
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
						label={ __( 'Title Level', 'shopping-options' ) }
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
						label={ __( 'Text Level', 'shopping-options' ) }
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
				<PanelBody title={ __( 'Shopping Options Settings', 'shopping-options' ) }>
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
												: __( 'Select Background Image', 'shopping-options' )
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
									{ __( 'Remove Background Image', 'shopping-options' ) }
								</Button>
							</BaseControl>
						)
					}
					<BaseControl>
						<TextControl
							label={ __( 'Title', 'shopping-options' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextareaControl
							label={ __( 'Text', 'shopping-options' ) }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
						/>
					</BaseControl>
					{
						shoppingList && shoppingList.map( ( option, index ) => (
							<PanelBody title={ __( option.title ?? 'Shopping Options', 'shopping-options' ) } initialOpen= {false} >								
								<BaseControl>
									<MediaUpload
										onSelect={ ( media ) => {
											const newOptions = [ ...shoppingList ];
											newOptions[ index ].image = {url: media.url, id: media.id, alt: media.alt};
											setAttributes( { shoppingList: newOptions } );
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
													: __( 'Select Image', 'shopping-options' )
												}
											</Button>
										) }
									/>
									<BaseControl>
										<Button 
											isDestructive
											isLink
											onClick={ () => {
												const newOptions = [ ...shoppingList ];
												newOptions[ index ].image = {url: '', id: 0, alt: ''};
												setAttributes( { shoppingList: newOptions } );
											}}
										>
											{ __( 'Remove Image', 'shopping-options' ) }
										</Button>
									</BaseControl>
								</BaseControl>
								<TextControl
									label={ __( 'Shopping Options Title', 'shopping-options' ) }
									value={ option.title }
									onChange={ ( value ) => {
										const newOptions = [ ...shoppingList ];
										newOptions[ index ].title = value;
										setAttributes( { shoppingList: newOptions } );
									} }
								/>
								<TextareaControl
									label={ __( 'Shopping Options Description', 'shopping-options' ) }
									value={ option.description }
									onChange={ ( value ) => {
										const newOptions = [ ...shoppingList ];
										newOptions[ index ].description = value;
										setAttributes( { shoppingList: newOptions } );
									} }
								/>
								<BaseControl>
									<Button
										onClick={ () => {
											const newOptions = [ ...shoppingList ];
											newOptions.splice( index, 1 );
											setAttributes( { shoppingList: newOptions } );
										} }
										isDestructive
									>
										{ __( 'Remove Shopping Options', 'shopping-options' ) }
									</Button>
								</BaseControl>
							</PanelBody>
						))
					}
					<BaseControl>
						<Button
							onClick={ () => {
								const newOptions = [ ...shoppingList, {} ];
								setAttributes( { shoppingList: newOptions } );
							} }
							isPrimary
						>
							{ __( 'Add Shopping Options', 'shopping-options' ) }
						</Button>
					</BaseControl>
					<BaseControl
						label={ __( 'Primary Button', 'shopping-options' ) }
					>
						<TextControl
							label={ __( 'Text', 'shopping-options' ) }
							value={ primaryButton.text }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, text: value } } ) }
						/>
						<TextControl
							label={ __( 'URL', 'shopping-options' ) }
							value={ primaryButton.url }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, url: value } } ) }
						/>
						<SelectControl
							label={ __( 'Primary Button Target', 'shopping-options' ) }
							value={ primaryButton.target }
								options={ [
									{ label: 'Inside Link', value: '' },
									{ label: '_blank', value: 'External' },
							] }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, target: value } } ) }
						/>
						<TextControl
							label={ __( 'SVG Icon (Inline or URL)', 'shopping-options' ) }
							value={ primaryButton.icon }
							onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, icon: value } } ) }
							help={__('Enter the SVG inline code or the URL to an external SVG file.', 'shopping-options')}
						/>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image/svg+xml']}
								onSelect={(media) => setAttributes({ primaryButton: { ...primaryButton, icon: media.url } })}
								render={({ open }) => (
									<Button onClick={ open } isPrimary>
										{ __( 'Upload SVG Icon', 'shopping-options' ) }
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</BaseControl>
					<BaseControl
						label={ __( 'Secondary Button', 'shopping-options' ) }
					>
						<TextControl
							label={ __( 'Text', 'shopping-options' ) }
							value={ secondaryButton.text }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, text: value } } ) }
						/>
						<TextControl
							label={ __( 'URL', 'shopping-options' ) }
							value={ secondaryButton.url }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, url: value } } ) }
						/>
						<SelectControl
							label={ __( 'Secondary Button Target', 'shopping-options' ) }
							value={ secondaryButton.target }
								options={ [
									{ label: 'Inside Link', value: '' },
									{ label: '_blank', value: 'External' },
							] }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, target: value } } ) }
						/>
						<TextControl
							label={ __( 'SVG Icon (Inline or URL)', 'shopping-options' ) }
							value={ secondaryButton.icon }
							onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, icon: value } } ) }
							help={__('Enter the SVG inline code or the URL to an external SVG file.', 'shopping-options')}
						/>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={['image/svg+xml']}
								onSelect={(media) => setAttributes({ secondaryButton: { ...secondaryButton, icon: media.url } })}
								render={({ open }) => (
									<Button onClick={ open } isPrimary>
										{ __( 'Upload SVG Icon', 'shopping-options' ) }
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</BaseControl>
					<TextControl
						label={ __( 'Block ID', 'shopping-options' ) }
						value={ blockID }
						onChange={ ( value ) => setAttributes( { blockID: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={`shopping-options__overlay`}></div>
			<div className={`container`}>
				<div className={`shopping-options__text-wrapper`} >
					<RichText
						tagName={ titleLevel }
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						allowedFormats={ [] }
						className="shopping-options__text-wrapper--title"
					/>
					<RichText
						tagName={ textLevel }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						allowedFormats={ [] }
						className="shopping-options__text-wrapper--text"
					/>
					<div className='shopping-options__text-buttons'>
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
				<div className={`shopping-options__wrapper`}>
					{
						shoppingList && (
							<div className="options__list">
								{
									shoppingList.map( ( option, index ) => (
										<div className="options-item">
											<div className="options-item__icon">
												<img src={ option.image ? option.image.url : '' } alt={ option.image ? option.image.alt : '' } />
											</div>
											<div className="options-item__text">
												<RichText
													className='options-item__title'
													tagName='h3'
													value={ option.title }
													onChange={ ( value ) => {
														const newFeatures = [ ...shoppingList ];
														newFeatures[ index ].title = value;
														setAttributes( { shoppingList: newFeatures } );
													} }
												/>
												<RichText
													className='options-item__description'
													tagName='p'
													value={ option.description }
													onChange={ ( value ) => {
														const newFeatures = [ ...shoppingList ];
														newFeatures[ index ].description = value;
														setAttributes( { shoppingList: newFeatures } );
													} }
												/>
											</div>
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
