if ((location.protocol != "https:") && (location.hostname != "resume.dev") && (location.hostname != "localhost") && (location.hostname != "127.0.0.1")) {
    location.protocol = "https:";
}

$(document).ready(function() {

    // Hide Javascript required notice
    $("#noJavascript").hide();

    // Load JSON file with data
    $.getJSON("resume.json", function(data) {
        // Load template
        var template = $("#template").html();

        // Compile templates
        var output = Handlebars.compile(template)(data);

        // Output result
        $("#index").append(output);
    })

    // Output error status on failure to load JSON
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    });
});
