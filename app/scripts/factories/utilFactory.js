'use strict';

angular.module('utilFactory', [])
    .factory('utilF', function() {
        var value = 'これはutilFactoryの値です';
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