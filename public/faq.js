$(document).ready(function() { //confirm document is ready for jquery
    $('.faq-question').click(function() { //on question click
        $(this).next('.faq-answer').slideToggle(); // open the answer panel of the question panel clicked on using .this
        var toggle = $(this).find('.faq-toggle');  // set answer panel to variable
        if (toggle.text() === '+') { //change the + to a - when the answer panel is open
            toggle.text('-');
        } else {
            toggle.text('+');
        }
    });
});