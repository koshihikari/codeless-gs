'use strict';

angular.module('codeInsertService', [])
    .service('codeInsertService', function() {
        this._timerId = -1;
        this.checkMethod = function() {
            if (window.getGSData) {
                console.log('よし :: this._timerId = ' + this._timerId);
                clearInterval(this._timerId);
            } else {
                console.log('まだ');
            }
        }
        this.execute = function() {
            // this._timerId = setInterval(this.checkMethod, 1000);
                console.log('よし :: this._timerId = ' + this._timerId);
        }
        this.value = 'これはcodeInsertServiceの値です';

        this.getValue = function() {
            return 'codeInsertService';
        }
    });