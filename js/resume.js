if ((location.protocol != "https:") && (location.hostname != "resume.localhost") && (location.hostname != "localhost") && (location.hostname != "127.0.0.1")) {
    location.protocol = "https:";
}

$(document).ready(function() {

    // Hide Javascript required notice
    $("#noJavascript").hide();

    // Load function script
    $.getScript("js/functions.js", function(data) {

        // Load JSON file with data
        $.getJSON("data/resume.json", function(data) {
            // Load template
            var template = $("#template").html();
            var dateTemplate = $("#dateTemplate").html();
            var experienceTemplate = $("#experienceTemplate").html();
            var projectTemplate = $("#projectTemplate").html();
            var organizationTemplate = $("#organizationTemplate").html();
            var skillTemplate = $("#skillTemplate").html();
            var schoolTemplate = $("#schoolTemplate").html();

            // Register partial templates
            Handlebars.registerPartial("date", dateTemplate);
            Handlebars.registerPartial("experience", experienceTemplate);
            Handlebars.registerPartial("project", projectTemplate);
            Handlebars.registerPartial("organization", organizationTemplate);
            Handlebars.registerPartial("skill", skillTemplate);
            Handlebars.registerPartial("school", schoolTemplate);

            // Register helpers
            Handlebars.registerHelper("shortenDate", shortenDate);
            Handlebars.registerHelper("formatPhone", formatPhone);
            Handlebars.registerHelper("formatGPA", formatGPA);
            Handlebars.registerHelper("renderDetail", renderDetail);
            Handlebars.registerHelper("compare", handlebarsCompare);

            // Compile templates
            var output = Handlebars.compile(template)(data);

            // Output result
            $("#resume").append(output);

            // Set layout
            $("h2").css("fontSize", data.layout.html.size.name);
            $("h3").css("fontSize", data.layout.html.size.titles);
            $("div").css("fontSize", data.layout.html.size.paragraph);
            $("li").css("fontSize", data.layout.html.size.details);
            $("#headerColumns").css("fontSize", data.layout.html.size.header);

            // Set page title
            document.title = data.name + " - Resume";

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
});
