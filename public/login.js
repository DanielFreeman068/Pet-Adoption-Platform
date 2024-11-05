$(document).ready(function() {
    $(".form-group").on("submit", function(event) {
        event.preventDefault(); 
        if($("#signup").is(":checked")) {
            alert("working")
            this.action = "/signup";
        } else {
            this.action = "/login"; 
        }
        this.submit(); 
    });
});