function urlValidator() {
    var urlsToTest = [
        "http://condense.tech",
        "ftp://condense.tech",
        "http:condense.tech",
        "http//condense.tech",
        "http:/condense.tech",
        "http://asdadajksdad.1231239-asdasd",
        "http://asdasd   asdasdad",
        "http://cond,com",
    ];
    var protocolRegex = /^(https?:\/\/)/;
    var domainRegex = /^([a-zA-Z]+|\d+|\.|-|\/)+$/;
    // display test results on console
    console.log("-- Testing URLs: --");
    urlsToTest.forEach(function (url) {
        var hasValidProtocol = protocolRegex.test(url);
        var hasValidDomain = domainRegex.test(url.replace(protocolRegex, ""));
        if (hasValidProtocol && hasValidDomain) {
            console.log("".concat(url, " # => OK"));
        }
        else {
            console.log("".concat(url, " # => NO"));
        }
    });
    console.log("\n");
}
function phoneNumberExtractor() {
    var textsToTest = [
        "My phone number is (039) 02-121212",
        "None of my 32 friends has a phone. One of them gave me the number 123-123123 but it isn't valid",
        "Phone numbers cannot have letters. Numbers like (800) STAR-121212 are not valid",
        "Every country has its own rules for phone numbers. Even a number like (1) 1-2 can be a valid phone number",
    ];
    var phoneRegex = /\(\d{1,3}\) [0-9-]+/g;
    // display test results on console
    console.log("-- Testing phone numbers extraction: --");
    textsToTest.forEach(function (text, index) {
        var matches = text.match(phoneRegex);
        if (matches) {
            matches.forEach(function (phoneNumber) {
                console.log("".concat(index + 1, ". ").concat(phoneNumber, " # => ").concat(phoneNumber));
            });
        }
        else {
            console.log("".concat(index + 1, ". no match"));
        }
    });
    console.log("\n");
}
function htmlTagMatching() {
    var contentToTest = '<a href="https://example.com">Visit Example</a>';
    var regex = /<a[^>]*>(.*?)<\/a>/i;
    var match = contentToTest.match(regex);
    // display test results on console
    console.log("-- Testing HTML tags: --");
    if (match && match[1]) {
        var extractedContent = match[1];
        console.log("".concat(extractedContent));
    }
    else {
        console.log("No match found.");
    }
}
urlValidator();
phoneNumberExtractor();
htmlTagMatching();
