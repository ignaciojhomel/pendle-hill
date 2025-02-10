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
		className: 'promotion',
	});

	const {
		backgroundImage,
		title,
		titleLevel,
		subtitle,
		subtitleLevel,
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
						label={ __( 'Title Level', 'promotion' ) }
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
						label={ __( 'Text Level', 'promotion' ) }
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
				<PanelBody title={ __( 'Promotion Settings', 'promotion' ) }>
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
												: __( 'Select Background Image', 'promotion' )
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
									{ __( 'Remove Background Image', 'promotion' ) }
								</Button>
							</BaseControl>
						)
					}
					<BaseControl>
						<TextControl
							label={ __( 'Title', 'promotion' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextControl
							label={ __( 'Subtitle', 'promotion' ) }
							value={ subtitle }
							onChange={ ( value ) => setAttributes( { subtitle: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextareaControl
							label={ __( 'Text', 'promotion' ) }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
						/>
					</BaseControl>
					<TextControl
						label={ __( 'Block ID', 'promotion' ) }
						value={ blockID }
						onChange={ ( value ) => setAttributes( { blockID: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={`promotion__overlay`}></div>
			<div className={`container`}>
				<div className={`promotion__wrapper`} style={{ 
						backgroundImage: backgroundImage?.url 
						? `url(${backgroundImage.url})` 
						: 'none' 
					}} >
					<div className={`promotion__text-wrapper`} >
						<RichText
							tagName={ subtitleLevel }
							value={ subtitle }
							onChange={ ( value ) => setAttributes( { subtitle: value } ) }
							allowedFormats={ [] }
							className="promotion__text-wrapper--subtitle"
						/>
						<RichText
							tagName={ titleLevel }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							allowedFormats={ [] }
							className="promotion__text-wrapper--title"
						/>
						<RichText
							tagName={ textLevel }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
							allowedFormats={ [] }
							className="promotion__text-wrapper--text"
						/>
					</div>
					<div className={`promotion__wrapper-overlay`}></div>
				</div>
			</div>
		</div>
	);
}
