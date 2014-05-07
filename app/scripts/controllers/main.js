'use strict';

angular.module('self0App', ['codeInsertFactory'])
    .controller('MainCtrl', function ($scope, codeInsertFactory) {
        // var code = '<h2>物件概要サンプル</h2>\n     <span>内容はパレステージ金町</span>\n     <!--insert_gs_to_about(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc&usp=drive_web#gid=0)--><h2>物件概要サンプル</h2>\n     <span>内容はパレステージ金町</span>\n     <!--insert_gs_to_modelroom(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0)-->';
        var code = '<h2>パレステージ金町</h2>\n<h3>物件概要</h3>\n<h4>パレステージ金町　[予告]</h4>\n<div class="about-wrapper">\n<!--insert_gs_to_about(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc&usp=drive_web#gid=0)-->\n</div>\n<div class="detail">\n<p>※販売を開始するまでは契約又は予約は一切できませんのであらかじめご了承ください。</p>\n<p>※表示の面積等は、今後の販売対象住戸を対象としております。</p>\n<p>本物件は、今後の販売対象住戸を一括して販売するか、または数期にわけて販売するか確定しておりません。販売戸数及び面積等は本広告にてお知らせいたします。</p>\n</div>';
        code = code.replace(/<br \/>/g, '<br>');
        codeInsertFactory.execute($scope, code);
    });