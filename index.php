<?php
/*
  Plugin Name: Before After Image Comparison Slider Block
  Description: It's a simple before after image comparison Gutenberg Block Plugin.
  Version: 1.0
  Author: Meraj
  Author URI: https://alinoor-meraj.github.io/portfolio/
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class BeforeAfterImageSlider {
  function __construct() {
    add_action('init', array($this, 'adminAssets'));
  }

  // Enqueue Editor CSS & Blocks
  function adminAssets() {
    wp_register_style('baiseditcss', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_register_script('baisblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    register_block_type('bais/before-after-image-comparison-slider', array(
      'editor_script' => 'baisblocktype',
      'editor_style' => 'baiseditcss',
      'render_callback' => array($this, 'frontEnd')
    ));
  }

  // Enqueue Frontend part 
  function frontEnd($attributes) {
    if (!is_admin()) {
      wp_enqueue_script('baisSave', plugin_dir_url(__FILE__) . 'build/save.js', array('wp-element'));
      wp_enqueue_style('baisSaveStyles', plugin_dir_url(__FILE__) . 'lib/css/comparison-slider.css');
      wp_enqueue_script('baisSaveMainJS', plugin_dir_url(__FILE__) . 'lib/js/comparison-slider.js', array(), '1.0.0', true );
    }    

    ob_start(); ?>
    <div class="before-after-image-wrapper"><pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre></div>
    <?php return ob_get_clean();
  }
}
  
$beforeAfterImageSlider = new BeforeAfterImageSlider();