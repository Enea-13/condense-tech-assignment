function urlValidator() {
  const urlsToTest: string[] = [
    "http://condense.tech",
    "ftp://condense.tech",
    "http:condense.tech",
    "http//condense.tech",
    "http:/condense.tech",
    "http://asdadajksdad.1231239-asdasd",
    "http://asdasd   asdasdad",
    "http://cond,com",
  ];

  const protocolRegex: RegExp = /^(https?:\/\/)/;
  const domainRegex: RegExp = /^([a-zA-Z]+|\d+|\.|-|\/)+$/;

  // display test results on console
  console.log("-- Testing URLs: --");
  urlsToTest.forEach((url: string) => {
    const hasValidProtocol = protocolRegex.test(url);
    const hasValidDomain = domainRegex.test(url.replace(protocolRegex, ""));

    if (hasValidProtocol && hasValidDomain) {
      console.log(`${url} # => OK`);
    } else {
      console.log(`${url} # => NO`);
    }
  });
  console.log("\n");
}

function phoneNumberExtractor() {
  const textsToTest: string[] = [
    "My phone number is (039) 02-121212",
    "None of my 32 friends has a phone. One of them gave me the number 123-123123 but it isn't valid",
    "Phone numbers cannot have letters. Numbers like (800) STAR-121212 are not valid",
    "Every country has its own rules for phone numbers. Even a number like (1) 1-2 can be a valid phone number",
    "Should this ( 1) 1- 22 be a valid phone number?",
  ];

  const phoneRegex: RegExp = /\(\d{1,3}\) [0-9-]+/g;

  // display test results on console
  console.log("-- Testing phone numbers extraction: --");
  textsToTest.forEach((text, index) => {
    const matches: RegExpMatchArray | null = text.match(phoneRegex);
    if (matches) {
      matches.forEach((phoneNumber) => {
        console.log(`${index + 1}. ${phoneNumber} # => ${phoneNumber}`);
      });
    } else {
      console.log(`${index + 1}. no match`);
    }
  });
  console.log("\n");
}

function htmlTagMatching() {
  const contentToTest = '<a href="https://example.com">Visit Example</a>';
  const regex = /<a[^>]*>(.*?)<\/a>/i;

  const match = contentToTest.match(regex);

  // display test results on console
  console.log("-- Testing HTML tags: --");
  if (match && match[1]) {
    const extractedContent = match[1];
    console.log(`${extractedContent}`);
  } else {
    console.log("No match found.");
  }
}

urlValidator();
phoneNumberExtractor();
htmlTagMatching();
