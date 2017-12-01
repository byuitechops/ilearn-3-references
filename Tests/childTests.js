/* Dependencies */
const tap = require('tap');



function g1Tests(course, callback) {
    // Tap tests for Gauntlet 3 go here
    function testFileContents(regEx, filename) {
        var fileToTest = course.content.find(file => {
            return file.name === filename;
        });
        if (fileToTest.ext === '.xml') {
            return regEx.test(fileToTest.dom.xml());
        } else {
            return regEx.test(fileToTest.dom.html());
        }
    }

    function checkStoredRefs(refArray, filename) {
        return course.info[refArray].includes(filename);
    }

    tap.equals(testFileContents(/i\s*-?\s*learn\s*3\.?0?/ig, 'I-Learn 3.0 References.html'), false);
    tap.equals(testFileContents(/i\s*-?\s*learn\s*3\.?0?/ig, 'I-learn 3.0 References #2.html'), false);
    tap.equals(testFileContents(/i\s*-?\s*learn\s*3\.?0?/ig, 'I-learn 3.0 References #3.html'), false);
    tap.equals(checkStoredRefs('googleHangoutRefs', 'Google Hangout References.html'), true);
    tap.equals(checkStoredRefs('adobeConnectRefs', 'Adobe Connect References.html'), true);
    tap.equals(checkStoredRefs('brainhoneyRefs', 'Brainhoney References.html'), true);
    tap.equals(checkStoredRefs('brightspaceRefs', 'Brightspace References.html'), true);
    callback(null, course);
}

function g2Tests(course, callback) {
    // Tap tests for Gauntlet 3 go here
    callback(null, course);
}

function g3Tests(course, callback) {
    // Tap tests for Gauntlet 3 go here
    callback(null, course);
}

function g4Tests(course, callback) {
    // Tap tests for Gauntlet 3 go here
    callback(null, course);
}

module.exports = {
    gauntlet1: g1Tests,
    gauntlet2: g2Tests,
    gauntlet3: g3Tests,
    gauntlet4: g4Tests,
};
