$(document).ready(function() { //when doc is ready
    $(".form-group").on("submit", function(event) { //when form is submitted
        event.preventDefault(); //prevent form from being submitted before code is ran
        if($("#signup").is(":checked")) { //if checkbos is checked, post to /signup
            this.action = "/signup";
        } else {
            this.action = "/login";  // else post to /login to login
        }
        this.submit(); //submit form
    });
});