'use strict';

angular.module('util', [])
    .factory('utilService', function() {
        var value = 'これはutilServiceの値です';
        function getValue() {
            return value;
        }
        function setValue(val) {
            value = val;
        }
        function privateMethod() {
            return 'private';
        }
        return {
            getValue    : getValue,
            setValue    : setValue
        }
    });