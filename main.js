/* Module Description */
/* Removes references to I-learn "3" and makes it say just "I-Learn"

/* Put dependencies here */
const cheerio = require('cheerio');

module.exports = (course, stepCallback) => {

    course.newInfo('brightspaceRefs', []);
    course.newInfo('brainhoneyRefs', []);
    course.newInfo('adobeConnectRefs', []);
    course.newInfo('googleHangoutRefs', []);
    course.newInfo('adobeFlashRefs', []);
    course.newInfo('inlineJSRefs', []);
    course.newInfo('inlineStyleRefs', []);

    course.content.forEach(file => {
        if (file.name === 'imsmanifest.xml' ||
            file.canEdit === false) {
            return true;
        }
        var guts = '';

        /* RegEx matches and related actions */
        var regs = [{
            ex: /i\s*-?\s*learn\s*3\.?0?/ig, // I-Learn 3.0 References (and variations)
            action: () => {
                guts = guts.replace(/i\s*-?\s*learn\s*3\.?0?/ig, 'I-Learn');
                course.log('"I-Learn 3.0" Changed to "I-Learn"', {
                    'File Name': file.name
                });
            }
        },
        {
            ex: /(brightspace)(?!\.com)/ig, // Brightspace References
            action: () => {
                course.log('Contains Brightspace References', {
                    'File Name': file.name
                });
            }
        },
        {
            ex: /brainhoney/ig, // Brainhoney References
            action: () => {
                course.log('Contains Brainhoney References', {
                    'File Name': file.name
                });
            }
        },
        {
            ex: /adobe\s*connect/ig, // Adobe Connect References
            action: () => {
                course.log('Contains Adobe Connect References', {
                    'File Name': file.name
                });
            }
        },
        {
            ex: /((google\s*)?hangouts?(\s*on\s*air)?)|(HOA)/ig, // Google Hangout References
            action: () => {
                course.log('Contains Google Hangouts References', {
                    'File Name': file.name
                });
            }
        },
        {
            ex: /<a[^>]*href=("|')[^"']*\.swf("|')\s*>/ig, // links to Adobe Flash
            action: () => {
                course.log('Contains Adobe Flash References', {
                    'File Name': file.name
                });
            }
        },
        {
            ex: /<!\[CDATA\[[\s\S]*\]\]>/g, // inline JavaScript
            action: () => {
                course.log('Contains Inline Javascript', {
                    'File Name': file.name
                });
            }
        },
        {
            ex: /<style>/g, // style tags
            action: () => {
                course.log('Contains Inline CSS (Style Tags)', {
                    'File Name': file.name
                });
            }
        }
        ];

        /* Runs the regex tests on the file's contents */
        function findRegs(callback) {
            regs.forEach(regEx => {
                if (regEx.ex.test(guts)) {
                    regEx.action();
                }
            });
            callback();
        }

        /* Figure out if it is XML or HTML, then replace I-Learn 3 References */
        if (file.ext === '.xml') {
            guts = file.dom.xml();
            findRegs(() => {
                file.dom = cheerio.load(guts, {
                    xmlMode: true,
                    decodeEntities: false
                });
            });
        } else {
            guts = file.dom.html();
            findRegs(() => {
                file.dom = cheerio.load(guts, {
                    decodeEntities: false
                });
            });
        }

    });
    stepCallback(null, course);
};