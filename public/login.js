$(document).ready(function() {
    $(".login").on("submit", function(event) {
        event.preventDefault(); 
        if ($("#signUp").is(":checked")) {
            console.log("work");
            this.action = "/signup";
        } else {
            this.action = "/login"; 
        }
        this.submit(); 
    });
});