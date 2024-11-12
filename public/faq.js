$(document).ready(function() {
    $('.faq-question').click(function() {
        $(this).next('.faq-answer').slideToggle();
        var toggle = $(this).find('.faq-toggle');
        if (toggle.text() === '+') {
            toggle.text('-');
        } else {
            toggle.text('+');
        }
    });
});