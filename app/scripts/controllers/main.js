'use strict';

angular.module('self0App', ['codeInsertFactory'])
    .controller('MainCtrl', function ($scope, codeInsertFactory) {
        // var code = '<h2>題</h2>\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc&usp=drive_web#gid=0)-->\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0)-->';
        var code = '<h2>物件概要サンプル</h2>\n     <span>内容はパレステージ金町</span>\n     <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc&usp=drive_web#gid=0)-->';
        code = code.replace(/<br \/>/g, '<br>');
        codeInsertFactory.execute($scope, code);
    });