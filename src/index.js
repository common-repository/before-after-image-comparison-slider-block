import "./index.scss"
import { TextControl, Button } from "@wordpress/components"
import { InspectorControls, BlockControls, AlignmentToolbar, MediaPlaceholder } from "@wordpress/block-editor"


// Check required image for save the post
(function () {
    let locked = false
    wp.data.subscribe(function () {
      const results = wp.data
        .select("core/block-editor")
        .getBlocks()
        .filter(function (block) {return block.name == "bais/before-after-image-comparison-slider"})
        .filter(function (block) {return block.attributes.beforeImgUrl == undefined || block.attributes.afterImgUrl == undefined})
  
      if (results.length && locked == false) {
        locked = true
        wp.data.dispatch("core/editor").lockPostSaving("noanswer")
      }
  
      if (!results.length && locked) {
        locked = false
        wp.data.dispatch("core/editor").unlockPostSaving("noanswer")
      }
    })
})()

// Register BlockType
wp.blocks.registerBlockType("bais/before-after-image-comparison-slider", {
  title: "Before After Image Slider",
  icon: "image-flip-horizontal",
  category: "common",
  attributes: {
    beforeText: { type: "string", default: "Before" },
    beforeImgUrl: { type: "string" },
    beforeImgAlt: { type: "string" },
    beforeImgId: { type: "number" },
    afterText: { type: "string", default: "After" },
    afterImgUrl: { type: "string" },
    afterImgAlt: { type: "string" },
    afterImgId: { type: "number" }
  },
  description: "Add two image to see the comparison",
  example: {
      attributes: {
            beforeImgUrl: "https://via.placeholder.com/300",
            afterImgUrl: "https://via.placeholder.com/300"
      }
  },
  edit: EditComponent,
  save: function (props) {
    return null
  }
})


// Editor Component
function EditComponent(props) {

    const updateAfterText = (value) => {
        props.setAttributes({ afterText: value })
    }

    const updateBeforeText = (value) => {
        props.setAttributes({ beforeText: value })
    }

    const onBeforeRemoveImage = () => {
        props.setAttributes({ 
            beforeImgUrl: null,
            beforeImgAlt: null,
            beforeImgId: null
        })
    }
    
    const onAfterRemoveImage = () => {
        props.setAttributes({ 
            afterImgUrl: null,
            afterImgAlt: null,
            afterImgId: null
        })
    }

    return (
        <div className="bais-wrap-edit-block">

            {/* Before Image Upload Section */}
            <div className="before-image-upload-wrapper image-upload">
                <TextControl label="Before Text:" value={props.attributes.beforeText} onChange={updateBeforeText} style={{ fontSize: "16px" }} />
                {
                    ( props.attributes.beforeImgUrl ) ? ( 
                        <div className="img-upload-wrapper">
                            <img 
                                src={props.attributes.beforeImgUrl} 
                                alt={props.attributes.beforeImgAlt} 
                            /> 
                            { props.isSelected ? (
                                <>
                                    <Button isPrimary onClick={onBeforeRemoveImage}>
                                        Remove Before Image
                                    </Button> 
                                </>
                            ) : null } 
                        </div>
                    ) : (
                        <MediaPlaceholder
                            onSelect = {( media ) => {props.setAttributes( { 
                                beforeImgUrl: media.url,
                                beforeImgAlt: media.alt,
                                beforeImgId: media.id
                            } );}}
                            allowedTypes = { [ 'image' ] }
                            multiple = { false }
                            labels = { { title: 'Before Image' } }
                        />
                    )
                }
            </div>

            {/* After Image Upload Section */}
            <div className="after-image-upload-wrapper image-upload">
                <TextControl label="After Text:" value={props.attributes.afterText} onChange={updateAfterText} style={{ fontSize: "16px" }} />
                {
                    ( props.attributes.afterImgUrl ) ? ( 
                        <div className="img-upload-wrapper">
                            <img 
                                src={props.attributes.afterImgUrl} 
                                alt={props.attributes.afterImgAlt} 
                            /> 
                            { props.isSelected ? (
                                <>
                                    <Button isPrimary onClick={onAfterRemoveImage}>
                                        Remove After Image
                                    </Button> 
                                </>
                            ) : null } 
                        </div>
                    ) : (
                        <MediaPlaceholder
                            onSelect = {( media ) => {props.setAttributes( { 
                                afterImgUrl: media.url,
                                afterImgAlt: media.alt,
                                afterImgId: media.id
                            } );}}
                            allowedTypes = { [ 'image' ] }
                            multiple = { false }
                            labels = { { title: 'After Image' } }
                        />
                    )
                }
            </div>
        </div>
    )
}
