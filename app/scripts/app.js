'use strict';

angular
    .module('self0App', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        // var code = '<table class="table table-bordered"><tbody><tr><td>1x1</td><td>1x2</td></tr><tr><td>2x1</td><td>2x2</td></tr></tbody></table>';
        // $('.summernote').html(code);
        // angular.module.self0App.MainCtrl.code = code;
        // MainCtrl.code = code;
        /*
        $('.summernote').summernote({
            width: 640,
            height: 320,                  // set editable area's height
            focus: true,                  // set focus editable area after summernote loaded
            tabsize: 2,                   // size of tab
            // disableDragAndDrop: false, // disable drag and drop event
            codemirror: {                 // code mirror options
                theme: 'monokai'
            }
        });
        */
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
