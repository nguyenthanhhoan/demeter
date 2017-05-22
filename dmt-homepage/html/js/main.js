/**
 * Demeter
 *
 * @copyright Jul 2015
 */

(function () {
    $(document).on('ready', function () {
        $('.btn.register, .btn.register-action').on('click', function (e) {
            e.preventDefault();
            $('.modal').fadeIn(function () {
                $(this).find('input[type="email"]').focus();
            });
        });

        $('.modal .btn.cancel').on('click', function (e) {
            e.preventDefault();
            $('.modal').fadeOut();
        });

        $(document).on('submit', 'form', function (e) {
            if ($('input[type="email"]').val() == '') {
                e.preventDefault();
                $('.modal label').fadeIn();
            } else {
                $('.modal label').fadeOut();
            }
        });

        $('.send').on('click', function () {
            console.log($(this).closest('form'));
            $(this).closest('form')[0].submit();
        });

        $('.c-hamburger').on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });
    });
})();