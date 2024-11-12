$(document).ready(function() {
    $('.faq-question').click(function() {
        // Toggle the answer section
        $(this).next('.faq-answer').slideToggle();
        
        // Toggle the plus/minus icon
        var toggle = $(this).find('.faq-toggle');
        if (toggle.text() === '+') {
            toggle.text('-');
        } else {
            toggle.text('+');
        }
    });
});