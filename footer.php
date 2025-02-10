<?php
$footer = get_field('footer', 'option');     
$phone = $footer['contact_us']['phone_number'];
$address = $footer['contact_us']['address'];
?>        
        <footer class="footer">
            <div class="container">
                <div class="footer__main">
                    <div class="footer__logo">
                        <img src="<?php echo $footer['footer_logo']['url'] ?>" alt="">
                    </div>
                    <div class="footer__menu-wrapper">
                        <div class="footer__menu footer__menu-1">
                            <p class="footer__menu-title">Shop Products</p>
                            <?php if (has_nav_menu('shop-products')) {
                                wp_nav_menu(array(
                                    'theme_location' => 'shop-products',
                                    'container' => 'nav',
                                    'walker' => new Header_Walker_Nav_Menu(),
                                ));
                            } ?>
                        </div>
                        <div class="footer__menu footer__menu-2">
                            <p class="footer__menu-title">Quick Links</p>
                            <?php if (has_nav_menu('quick-links')) {
                                wp_nav_menu(array(
                                    'theme_location' => 'quick-links',
                                    'container' => 'nav',
                                    'walker' => new Header_Walker_Nav_Menu(),
                                ));
                            } ?>
                        </div>
                        <div class="footer__menu footer__menu-3">
                            <p class="footer__menu-title">Contact Us</p>
                            <a href="tel:<?php echo $phone ?>"><?php echo $phone ?></a>
                            <p><?php echo $address ?></p>
                            <div class="footer__menu-socials">
                                <?php if ($footer['socials']) {
                                    foreach ($footer['socials'] as $social) { ?>
                                        <a href="<?php echo $social['url'] ?>" target="_blank">
                                            <img src="<?php echo $social['icon']['url'] ?>" alt="">
                                        </a>
                                    <?php }
                                } ?>
                            </div>
                        </div>
                        <div class="footer__menu footer__menu-4">
                            <p class="footer__menu-title">Trading Hours</p>
                            <?php if ($footer['trading_hours']) {
                                    foreach ($footer['trading_hours'] as $hours) { ?>
                                    <p class="trading-day"><?php echo $hours['day']; ?></p>
                                    <p class="trading-hours"><?php echo $hours['hours']; ?></p>
                                <?php }
                            } ?>
                        </div>
                    </div>
                </div>
                <div class="footer__copyright">
                    <p><?php echo $footer['copyright']; ?></p>
                </div>
            </div>
        </footer>
        <?php wp_footer(); ?>
    </body>
</html>
