/*eslint-env node, es6*/

/* Module Description */
// Removes references to I-learn "3" and makes it say just "I-Learn"

/* Put dependencies here */
const cheerio = require('cheerio');

module.exports = (course, stepCallback) => {
    course.addModuleReport('ilearn-3-references');

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
        var changed = false;
        // RegEx matches and related actions
        var regs = [{
                ex: /i\s*-?\s*learn\s*3\.?0?/ig, // I-Learn 3.0 References (and variations)
                action: () => {
                    guts = guts.replace(/i\s*-?\s*learn\s*3\.?0?/ig, 'I-Learn');
                }
            },
            {
                ex: /(brightspace)(?!\.com)/ig, // Brightspace References
                action: () => {
                    course.info.brightspaceRefs.push(file.name)
                }
            },
            {
                ex: /brainhoney/ig, // Brainhoney References
                action: () => {
                    course.info.brainhoneyRefs.push(file.name)
                }
            },
            {
                ex: /adobe\s*connect/ig, // Adobe Connect References
                action: () => {
                    course.info.adobeConnectRefs.push(file.name)
                }
            },
            {
                ex: /((google\s*)?hangouts?(\s*on\s*air)?)|(HOA)/ig, // Google Hangout References
                action: () => {
                    course.info.googleHangoutRefs.push(file.name)
                }
            },
            {
                ex: /\<a[^\>]*href=("|')[^"']*\.swf("|')\s*\>/ig, // links to Adobe Flash
                action: () => {
                    course.info.adobeFlashRefs.push(file.name);
                }
            },
            {
                ex: /\<!\[CDATA\[[\s\S]*\]\]\>/g, // inline JavaScript
                action: () => {
                    course.info.inlineJSRefs.push(file.name);
                }
            },
            {
                ex: /\<style\>/g, // style tags
                action: () => {
                    course.info.inlineStyleRefs.push(file.name);
                }
            }
        ];

        function findRegs(callback) {
            regs.forEach(regEx => {
                if (regEx.ex.test(guts)) {
                    regEx.action();
                    changed = true;
                }
            });
            callback();
        }

        // Figure out if it is XML or HTML, then replace I-Learn 3 References
        if (file.ext === '.xml') {
            guts = file.dom.xml();
            findRegs(() => {
                if (changed) {
                    course.success('ilearn-3-references', `Changed references/Stored Reference for ${file.name}`);
                }
                file.dom = cheerio.load(guts, {
                    xmlMode: true,
                    decodeEntities: false
                });
            });
        } else {
            guts = file.dom.html();
            findRegs(() => {
                if (changed) {
                    course.success('ilearn-3-references', `Replaced or Stored Reference for ${file.name}`);
                }
                file.dom = cheerio.load(guts, {
                    decodeEntities: false
                });
            });
        }

    });
    stepCallback(null, course);
};