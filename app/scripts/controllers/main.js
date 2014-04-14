'use strict';

angular.module('self0App', ['codeInsertFactory'])
    .controller('MainCtrl', function ($scope, codeInsertFactory) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        // $scope.isFirst = true;
        // var aaa = '<h2>題</h2><p>これはサンプル<br />なにか<br />あるかな</p><!-- ここにGS挿入 --><p>これはサンプル<!-- コメント --><br />なにか<br />あるかな</p><!-- ここにGS挿入 -->';
        // var aaa = '<h2>題</h2>\n    <p>これはサンプル<br />なにか<br />あるかな</p><!--insert_gs(0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc)--><p>これはサンプル<br />なにか<br />あるかな</p><!--insert_gs(0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E)-->';
        // var aaa = '<h2>題</h2>\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc)-->\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E)-->';
        var code = '<h2>題</h2>\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc&usp=drive_web#gid=0)-->\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0)-->';
        // var aaa = '<h2>題</h2>\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc&usp=drive_web#gid=0)-->\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0)-->\n    <!--insert_gs_bigin(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0)-->aaa<!--insert_gs_end-->';
        // $scope.source = 'abc';
        // $scope.code = aaa.replace(/<br \/>/g, '<br>');
        code = code.replace(/<br \/>/g, '<br>');
        codeInsertFactory.execute($scope, code);

    });