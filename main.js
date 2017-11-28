/*eslint-env node, es6*/

/* Module Description */
// Removes references to I-learn "3" and makes it say just "I-Learn"

/* Put dependencies here */
const cheerio = require('cheerio');

module.exports = (course, stepCallback) => {
    course.addModuleReport('ilearn3References');

    // Go through each file in course.content

    // Do we want to run this on the manifest?

    // Use Regex to replace any references to these:
    /* I-Learn 3.0, I-Learn 3, iLearn 3.0, ILearn 3.0, ILearn 3, etc. */

    // Change them to just "I-Learn"

    course.content.forEach(file => {
        var html = file.dom('*').html();
        var reg = /[iI]\s?-?\s?[lL]earn 3\.?0?/g;
        if (reg.test(html)) {
            html = html.replace(reg, 'I-Learn');
            file.dom = cheerio.load(html);
            console.log(file.dom('*').html());
        }
    });

    stepCallback(null, course);
};
