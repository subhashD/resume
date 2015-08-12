if ((location.protocol != "https:") && (location.hostname != "resume.dev") && (location.hostname != "localhost") && (location.hostname != "127.0.0.1")) {
    location.protocol = "https:";
}

$(document).ready(function() {

    // Hide Javascript required notice
    $("#noJavascript").hide();

    // Load JSON file with data
    $.getJSON("data/resume.json", function(data) {
        // Load template
        var template = $("#template").html();

        // Compile templates
        var output = Handlebars.compile(template)(data);

        // Output result
        $("#index").append(output);

        // Setup Google Analytics
        if (data.analytics) {
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', data.analytics, 'auto');
            ga('send', 'pageview');

            $('a').on('click', function() {
                ga('send', 'event', 'click', this.href);
            });
        }
    })

    // Output error status on failure to load JSON
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    });
});
