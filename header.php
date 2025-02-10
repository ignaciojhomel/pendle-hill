<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="https://use.typekit.net/mum0lub.css">
    <?php wp_head(); ?>
    <title><?php the_title(); ?></title>

    
</head>

<body <?php body_class(); ?>>
    <header class="header">
        <div class="container">
            <div class="header__left">
                <div class="header__logo">
                    <?php echo get_custom_logo(); ?>
                </div>
                <div class="header__nav">
                    <?php if (has_nav_menu('main-nav')) {
                        wp_nav_menu(array(
                            'theme_location' => 'main-nav',
                            'container' => 'nav',
                            'walker' => new Header_Walker_Nav_Menu(),
                        ));
                    } ?>
                </div>
            </div>
            <div class="header__cta">
                <a href="/shop" class="btn btn-primary">Shop Online</a>
            </div>
        </div>
    </header>