<?php

get_header();
if($post->post_type == 'post' || $post->post_type == 'page'):
global $wp_query;

$post_banner_background = get_field('post_banner_background'); 

$banner = get_template_directory_uri() . '/src/images/5175a1c5c226f768a13cc338b8bc2f0e.jpg';
if(!empty($post_banner_background)){
    $banner = $post_banner_background['url'];
}
else{
    $featured_image = get_the_post_thumbnail_url( get_the_ID(), 'full' );

    if($featured_image){
        $banner = $featured_image;
    }
}

$post_banner_title = get_field('post_banner_title');
$banner_title = get_the_title();
if($post_banner_title){
    $banner_title = $post_banner_title;
}

$post_banner_description = get_field('post_banner_description');
$post_excerpt = get_the_excerpt();
if($post_banner_description){
    $post_excerpt = $post_banner_description;
}

$blog_layout = get_field('blog_layout');
$blog_contents = get_field('blog_contents');
$contents = get_the_content();
?>
<div class="banner wp-block-omgwp-banner" id="blog-page-inner-banner"
    style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url('<?php echo $banner;?>') lightgray 0px -11.874px / 100% 114.241% no-repeat;">
    <div class="banner__wrapper">
        <div class="banner__text-section">
            <div class="banner__breadcrumb">
                <?php
                if ( function_exists('yoast_breadcrumb') ) {
                    yoast_breadcrumb( '<p id="breadcrumbs">','</p>' );
                } 
                ?>
            </div>
            <h1 class="banner__title"><?php echo $banner_title;?></h1>
            <div class="post--excerpt">
                <p><?php echo $post_excerpt;?></p>
            </div>
            <div class="post__meta-data">
                <?php
                    $categories = get_the_category( get_the_ID() );
                    if ( ! empty( $categories ) ) {
                        foreach ( $categories as $category ) {
                            if($category->term_id != 1){
                            echo '<a href="' . esc_url( get_category_link( $category->term_id ) ) . '"><img src="'.get_template_directory_uri().'/src/images/_Dot.png" class="icon" alt="' . esc_html( $category->name ) . '">' . esc_html( $category->name ) . '</a> ';
                            }
                        }
                    }
                    ?>
                <?php if(get_field('reading_time')){?>
                <span class="reading-time"><?php echo get_field('reading_time');?></span>
                <?php } ?>
            </div>
        </div>
    </div>
</div>
<div class="posts__container">
    <div class="posts__wrapper">
        <div id="sidebar">
            <?php
            if(!empty($blog_contents)){?>
            <p class="sidebar-title">Table of contents</p>
            <ul>
                <?php foreach($blog_contents as $key => $tb_contents){?>
                <li><a href="#tab-<?php echo $key;?>"><?php echo strtolower($tb_contents['header_title']);?></a></li>
                <?php } ?>
            </ul>
            <?php
            }
            ?>
            <div class="sharethis"><?php echo do_shortcode('[addtoany]');?></div>
        </div>
        <div class="posts__right-contents">
            <div class="post--content <?php if(empty($blog_contents)){?>no-marginb<?php } ?>">
                <?php strip_shortcodes(the_content());?>
            </div>
            <?php if(!empty($blog_contents)){?>
            <div class="post--table-of-contents">
                <?php foreach($blog_contents as $key => $tb_contents){?>
                <div id="tab-<?php echo $key;?>"
                    class="post--table-of-contents-section <?php echo ($tb_contents['padded_background_colored'] == 'yes') ? 'padded' : '';?>">
                    <h2 class="title"><?php echo $tb_contents['header_title'];?></h2>
                    <?php echo $tb_contents['body_contents'];?>
                </div>
                <?php } ?>
            </div>
            <?php
            }
            ?>
        </div>
    </div>
</div>
<a class="copy-btn" href="javascript:;" id="copyButton">
    <span class="a2a_svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M10.5903 15.3024L9.41177 16.4809C7.78459 18.1081 5.1464 18.1081 3.51922 16.4809C1.89203 14.8537 1.89203 12.2155 3.51922 10.5883L4.69773 9.40982M15.3043 10.5883L16.4828 9.40982C18.11 7.78264 18.11 5.14445 16.4828 3.51726C14.8557 1.89008 12.2175 1.89008 10.5903 3.51726L9.41177 4.69577M7.08436 12.9157L12.9177 7.08239"
                stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </span>
</a>
<script>
jQuery("#copyButton").insertBefore(".sharethis .addtoany_shortcode .a2a_button_twitter");

document.getElementById('copyButton').addEventListener('click', function() {
    // Create a temporary input element to hold the current URL
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);

    // Select the input value and copy it to clipboard
    tempInput.select();
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Show success message
    //const successMessage = document.getElementById('successMessage');
    //successMessage.style.display = 'block';

    // Hide the message after 2 seconds
    setTimeout(() => {
        //successMessage.style.display = 'none';
        alert('copied!');
    }, 300);
});
</script>
<?php
get_footer();
endif;
?>