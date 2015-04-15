if ((location.protocol != "https:") && (location.hostname != "resume.dev")) {
    location.protocol = "https:";
  }

$(document).ready(function() {

  // Hide Javascript required notice
  $("#noJavascript").hide();

  // Load JSON file with data
  $.getJSON("resume.json", function(data) {
    // Load template
    var template = $("#template").html();
    var experienceTemplate = $("#experienceTemplate").html();
    var schoolTemplate = $("#schoolTemplate").html();

    // Register helpers
    Handlebars.registerHelper("shortenDate", shortenDate);
    Handlebars.registerHelper("formatPhone", formatPhone);
    Handlebars.registerHelper("compare", handlebarsCompare);

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

// Function for comparing data in Handlebars
function handlebarsCompare(lvalue, operator, rvalue, options) {
  var operators, result;
  
  if (arguments.length < 3) {
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }
  
  if (options === undefined) {
    options = rvalue;
    rvalue = operator;
    operator = "===";
  }
  
  operators = {
    '==': function (l, r) { return l == r; },
    '===': function (l, r) { return l === r; },
    '!=': function (l, r) { return l != r; },
    '!==': function (l, r) { return l !== r; },
    '<': function (l, r) { return l < r; },
    '>': function (l, r) { return l > r; },
    '<=': function (l, r) { return l <= r; },
    '>=': function (l, r) { return l >= r; },
    'typeof': function (l, r) { return typeof l == r; }
  };
  
  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }
  
  result = operators[operator](lvalue, rvalue);
  
  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
