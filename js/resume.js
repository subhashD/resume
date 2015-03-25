$(document).ready(function() {

  // Load JSON file with data
  $.getJSON("resume.json", function(data) {
    // Load template
    var template = $("#template").html();
    var experienceTemplate = $("#experienceTemplate").html();
    var schoolTemplate = $("#schoolTemplate").html();

    // Register helpers
    Handlebars.registerHelper("shortenDate", shortenDate);
    Handlebars.registerHelper("formatPhone", formatPhone);

    // Register partial templates
    Handlebars.registerPartial("experience", experienceTemplate);
    Handlebars.registerPartial("school", schoolTemplate);

    // Compile templates
    var output = Handlebars.compile(template)(data);

    // Output result
    $("body").append(output);
  })

  // Output error status on failure to load JSON
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log("Error: " + textStatus);
  });

});

// Function for shortening dates (e.g. 2014 -> '14)
function shortenDate(input) {
  if (isNaN(input)) {
    return input.substr(0,3);
  }

  return "'" + input.toString().substr(2,2);
}

// Function for formatting telephone number (e.g. +1 (123) 456-7890 -> 1-123-456-7890)
function formatPhone(input) {
  input = input.replace(/[+()]/g, "");
  input = input.replace(/\s/g, "-");

  return input;
}
