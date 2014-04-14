'use strict';

angular.module('utilService', [])
    .service('utilS', function() {
        this.value = 'これはutilServiceの値です';
        this.getValue = function() {
            return this.value;
        }
        this.setValue = function(val) {
            this.value = val;
        }
        this.privateMethod = function() {
            return 'private';
        }
    });