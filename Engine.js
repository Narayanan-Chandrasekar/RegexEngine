"use strict";
exports.__esModule = true;
exports.RegexEngine = void 0;
var RegexEngine = /** @class */ (function () {
    function RegexEngine(pattern) {
        this.MAX_SPECIAL_CHARACTER_COUNT = 2;
        this.pattern = pattern;
        this.subPatterns = [];
        this.anotherSubPatterns = [];
        this.subPattern = '';
        this.length = 0;
        this.index = 0;
        this.specialCharacterCount = 0;
    }
    RegexEngine.prototype.match = function () {
        var firstCharacter = this.readCharacter();
        if (this.isSpecialCharacter(firstCharacter)) {
            throw Error('Invalid code');
        }
        else {
            this.length++;
            this.identifyPatterns();
        }
    };
    RegexEngine.prototype.readCharacter = function () {
        return this.pattern[this.index++];
    };
    RegexEngine.prototype.isSpecialCharacter = function (char) {
        return char === '?' || char === '*';
    };
    RegexEngine.prototype.identifyPatterns = function () {
        if (this.specialCharacterCount > this.MAX_SPECIAL_CHARACTER_COUNT) {
            throw Error("Invalid Code");
        }
        var nextCharacter = this.readCharacter();
        if (this.isSpecialCharacter(nextCharacter)) {
            this.specialCharacterCount++;
            this.subPattern = this.subPattern + nextCharacter;
            this.identifyPatterns();
        }
        else {
            nextCharacter ? this.length++ : this.length;
            if (this.subPattern) {
                this.subPatterns.push(this.subPattern);
            }
            this.subPattern = '';
            this.specialCharacterCount = 0;
            if (this.index <= this.pattern.length) {
                this.identifyPatterns();
            }
            else {
                this.evaluatePatterns();
            }
        }
    };
    RegexEngine.prototype.evaluatePatterns = function () {
        var _this = this;
        console.log("evaluate patterns");
        this.subPatterns.forEach(function (v, i, a) { _this.anotherSubPatterns.push(v); });
        this.anotherSubPatterns.forEach(function (a, b, c) {
            console.log(a);
            switch (a) {
                case '?':
                case '*':
                    console.log("Matched All Characters");
                    return;
                case '*?':
                case '??':
                    console.log(_this.length, "before");
                    _this.length--;
                    console.log(_this.length, "after");
                    break;
                default:
                    throw Error("Invalid pattern");
            }
            console.log("outside switch");
        });
        this.length ? console.log("Matched ".concat(this.length, " characters")) : console.log('Matched ' + (Number(this.length) + 1) + ' character');
    };
    return RegexEngine;
}());
exports.RegexEngine = RegexEngine;
