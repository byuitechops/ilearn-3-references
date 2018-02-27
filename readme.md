# I-Learn 3 References
### *Package Name*: ilearn-3-references
### *Child Type*: Pre-import
### *Platform*: All
### *Required*: Optional

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose
This child module replaces references to "I-Learn 3." with "I-learn". 

It also collects and stores files that have references to the following:
* Brightspace
* Brainhoney
* Adobe Connect
* Google Hangouts (HOA)
* Inline JS
* Inline CSS
* Adobe Flash instances

## How to Install

```
npm install ilearn-3-references
```

## Run Requirements
This module requires course.content to run.

## Options
None

## Outputs

| Option | Type | Location |
|--------|--------|-------------|
|brightspaceRefs| Array | course.info|
|brainhoneyRefs| Array | course.info|
|adobeConnectRefs| Array | course.info|
|googleHangoutRefs| Array | course.info|
|adobeFlashRefs| Array | course.info|
|inlineJSRefs| Array | course.info|
|inlineStyleRefs| Array | course.info|

## Process
1. Loop through files in course.content
2. For each file, loop through array of tests
3. If a test passes, run the corresponding action

## Log Categories
Categories used in logging data in this module:
- "I-Learn 3.0" Changed to "I-Learn"
- Contains Brightspace References
- Contains Brainhoney References
- Contains Adobe Connect References
- Contains Google Hangouts References
- Contains Adobe Flash References
- Contains Inline Javascript
- Contains Inline CSS (Style Tags)

## Requirements
Replace I learn 3 references to just say 'ILearn'. That way we no longer have to update them all each time we change LMS's.