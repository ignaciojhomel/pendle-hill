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
		className: 'faqs',
	});

	const {
		backgroundImage,
		title,
		titleLevel,
		text,
		textLevel,
		faqList,
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
						label={ __( 'Title Level', 'faqs' ) }
						value={ titleLevel }
							faqs={ [
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
						label={ __( 'Text Level', 'faqs' ) }
						value={ textLevel }
							faqs={ [
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
				<PanelBody title={ __( 'FAQs Settings', 'faqs' ) }>
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
												: __( 'Select Background Image', 'faqs' )
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
									{ __( 'Remove Background Image', 'faqs' ) }
								</Button>
							</BaseControl>
						)
					}
					<BaseControl>
						<TextControl
							label={ __( 'Title', 'faqs' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</BaseControl>
					<BaseControl>
						<TextareaControl
							label={ __( 'Text', 'faqs' ) }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
						/>
					</BaseControl>
					{
						faqList && faqList.map( ( faq, index ) => (
							<PanelBody title={ __( faq.question ?? 'FAQs', 'faqs' ) } initialOpen= {false} >								
								<TextareaControl
									label={ __( 'FAQs Question', 'faqs' ) }
									value={ faq.question }
									onChange={ ( value ) => {
										const newOptions = [ ...faqList ];
										newOptions[ index ].question = value;
										setAttributes( { faqList: newOptions } );
									} }
								/>
								<TextareaControl
									label={ __( 'FAQs Answer', 'faqs' ) }
									value={ faq.answer }
									onChange={ ( value ) => {
										const newOptions = [ ...faqList ];
										newOptions[ index ].answer = value;
										setAttributes( { faqList: newOptions } );
									} }
								/>
								<BaseControl>
									<Button
										onClick={ () => {
											const newOptions = [ ...faqList ];
											newOptions.splice( index, 1 );
											setAttributes( { faqList: newOptions } );
										} }
										isDestructive
									>
										{ __( 'Remove FAQs', 'faqs' ) }
									</Button>
								</BaseControl>
							</PanelBody>
						))
					}
					<BaseControl>
						<Button
							onClick={ () => {
								const newOptions = [ ...faqList, {} ];
								setAttributes( { faqList: newOptions } );
							} }
							isPrimary
						>
							{ __( 'Add FAQs', 'faqs' ) }
						</Button>
					</BaseControl>
					<TextControl
						label={ __( 'Block ID', 'faqs' ) }
						value={ blockID }
						onChange={ ( value ) => setAttributes( { blockID: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={`faqs__overlay`}></div>
			<div className={`container`}>
				<div className={`faqs__text-wrapper`} >
					<RichText
						tagName={ titleLevel }
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						allowedFormats={ [] }
						className="faqs__text-wrapper--title"
					/>
					<RichText
						tagName={ textLevel }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						allowedFormats={ [] }
						className="faqs__text-wrapper--text"
					/>
				</div>
				<div className={`faqs__wrapper`}>
					{
						faqList && (
							<div className="faqs__list">
								{
									faqList.map( ( faq, index ) => (
										<div className="faqs-item">
											<RichText
												className='faqs-item__question'
												tagName='h3'
												value={ faq.question }
												onChange={ ( value ) => {
													const newFeatures = [ ...faqList ];
													newFeatures[ index ].question = value;
													setAttributes( { faqList: newFeatures } );
												} }
											/>
											<RichText
												className='faqs-item__answer'
												tagName='p'
												value={ faq.answer }
												onChange={ ( value ) => {
													const newFeatures = [ ...faqList ];
													newFeatures[ index ].answer = value;
													setAttributes( { faqList: newFeatures } );
												} }
											/>
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
