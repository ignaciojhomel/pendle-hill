import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, Button } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { heading, text, backgroundImage } = attributes;

    return (
        <div {...useBlockProps({ style: { backgroundImage: backgroundImage ? `url(${backgroundImage.url})` : 'none' },className:'product-grid' })}>
            <InspectorControls>
                <PanelBody title={__('Banner Settings', 'shop-banner')}>
                    <TextControl
                        label={__('Heading', 'shop-banner')}
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                    />
                    <TextareaControl
                        label={__('Text', 'shop-banner')}
                        value={text}
                        onChange={(value) => setAttributes({ text: value })}
                    />
                    {<img src={backgroundImage.url}/>}
                    <MediaUpload
                        onSelect={(media) => (
                            setAttributes({ backgroundImage: { url: media.url, id: media.id, alt: media.alt }})
                        )}
                        allowedTypes={['image']}
                        render={({ open }) => (
                            <Button onClick={open} variant="primary">
                                {__('Upload Background Image', 'shop-banner')}
                            </Button>
                        )}
                    />
                </PanelBody>
            </InspectorControls>
        
            <div className="shop-banner container">
                <div className="shop-banner__content">
                    <div className="shop-banner__heading"><h1>{heading}</h1></div>
                    <div className="shop-banner__text">
                        <RichText
                            tagName="p"
                            value={text}
                            onChange={(value) => setAttributes({ text: value })}
                            placeholder={__('Enter text...', 'shop-banner')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
