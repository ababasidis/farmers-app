angular.module("onScreenKeyboard", ["ngSanitize"]).directive("onScreenKeyboard", ["$timeout", "$document", function(a, b) {
    "use strict";
    return {
        restrict: "E",
        bindToController: !0,
        controllerAs: "ctrl",
        scope: {
            rows: "=?",
            uppercaseAllWords: "@"
        },
        controller: ["$sce", function(a) {
            var b = this;
            b.rows || (b.rows = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", {
                type: "erase",
                colspan: 2,
                text: "&lArr;"
            }], ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "@"], [{
                type: "shift"
            }, "a", "s", "d", "f", "g", "h", "j", "k", "l", "-", "_", {
                type: "shift"
            }], [ {
                type: "space",
                colspan: 2,
                text: " "
            }, "z", "x", "c", "v", "b", "n", "m", ",", ".", {
                type: "space",
                colspan: 2,
                text: " "
            }]]),
            b.getText = function(b) {
                if ("margin" === b.type)
                    return "";
                if ("shift" === b.type)
                    return "&dArr;";
                var c = b.text || b;
                return c && c.indexOf("&") > -1 ? a.trustAsHtml(c) : c
            }
        }
        ],
        link: function(c, d, e) {
            var f = c.ctrl;
            d.bind("contextmenu", function(a) {
                return a.preventDefault(),
                !1
            }),
            f.isUpperCase = !1,
            f.lastInputCtrl = null ,
            f.startPos = null ,
            f.endPos = null ,
            f.printKeyStroke = function(a) {
                if (f.lastInputCtrl) {
                    var b = angular.element(a.target || a.srcElement);
                    if (b.hasClass("erase"))
                        return void f.eraseKeyStroke();
                    if (b.hasClass("shift"))
                        return void f.inverseCase();
                    var c = angular.element(f.lastInputCtrl)
                      , d = c.val()
                      , e = d.substring(0, f.startPos)
                      , g = d.substring(f.endPos, d.length);
                    c.val(e + b.text() + g),
                    c.triggerHandler("change"),
                    f.startPos++,
                    f.endPos++,
                    f.setKeyboardLayout()
                }
            }
            ,
            f.inverseCase = function() {
                var a = d[0].querySelectorAll(".letter");
                angular.forEach(a, function(a) {
                    var b = angular.element(a);
                    f.isUpperCase ? b.text(b.text().toString().toLowerCase()) : b.text(b.text().toString().toUpperCase())
                }),
                angular.forEach(d[0].querySelectorAll(".shift"), function(a) {
                    f.isUpperCase ? angular.element(a).html("&dArr;") : angular.element(a).html("&uArr;")
                }),
                f.isUpperCase = !f.isUpperCase
            }
            ,
            f.refocus = function() {
                f.lastInputCtrl.focus()
            }
            ,
            f.eraseKeyStroke = function() {
                if (f.lastInputCtrl) {
                    var a = f.startPos !== f.endPos
                      , b = angular.element(f.lastInputCtrl)
                      , c = b.val()
                      , d = c.substring(0, a ? f.startPos : f.startPos - 1)
                      , e = c.substring(f.endPos, c.length);
                    b.val(d + e),
                    b.triggerHandler("change"),
                    a ? f.endPos = f.startPos : (f.startPos--,
                    f.endPos--),
                    f.lastInputCtrl.selectionStart = f.startPos,
                    f.lastInputCtrl.selectionEnd = f.startPos,
                    f.setKeyboardLayout(),
                    f.refocus()
                }
            }
            ,
            f.setKeyboardLayout = function() {
                return f.lastInputCtrl ? void (f.lastInputCtrl.className && f.isUpperCase ? f.inverseCase() : 0 === angular.element(f.lastInputCtrl).val().length ? f.isUpperCase || (f.isUpperCase = !1,
                f.inverseCase()) : " " === angular.element(f.lastInputCtrl).val().slice(-1) && !f.isUpperCase && e.hasOwnProperty("uppercaseAllWords") ? f.inverseCase() : (f.isUpperCase = !0,
                f.inverseCase())) : (f.isUpperCase = !1,
                void f.inverseCase())
            }
            ,
            b.find("input").bind("blur focus", function() {
                f.setKeyboardLayout(),
                f.lastInputCtrl = this,
                f.lastInputCtrl && "checkbox" && "submit" != f.lastInputCtrl.type && (f.startPos = f.lastInputCtrl.selectionStart,
                f.endPos = f.lastInputCtrl.selectionEnd)
            }).bind("keydown", function() {
                f.startPos = f.lastInputCtrl.selectionStart,
                f.endPos = f.lastInputCtrl.selectionEnd
            }),
            a(function() {
                f.inverseCase()
            }, 0)
        },
        templateUrl: "/templates/angular-on-screen-keyboard.html"
    }
}
]);
;angular.module('onScreenKeyboard').run(['$templateCache', function($templateCache) {
    'use strict';
    $templateCache.put('/templates/angular-on-screen-keyboard.html', "<div class=keyboard><table><tr ng-repeat=\"row in ctrl.rows\"><td ng-repeat=\"key in row\" ng-click=ctrl.printKeyStroke($event) colspan=\"{{key.colspan || 1}}\" ng-class=\"{'button': key.type !== 'margin', 'letter': key.type !== 'margin'}\" class={{key.type}} ng-bind-html=ctrl.getText(key)></td></tr></table></div>");
}
]);
