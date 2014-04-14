'use strict';

angular.module('self0App', ['util'])
    .controller('MainCtrl', function ($scope, utilService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        // $scope.isFirst = true;
        // var aaa = '<h2>題</h2><p>これはサンプル<br />なにか<br />あるかな</p><!-- ここにGS挿入 --><p>これはサンプル<!-- コメント --><br />なにか<br />あるかな</p><!-- ここにGS挿入 -->';
        // var aaa = '<h2>題</h2>\n    <p>これはサンプル<br />なにか<br />あるかな</p><!--insert_gs(0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc)--><p>これはサンプル<br />なにか<br />あるかな</p><!--insert_gs(0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E)-->';
        // var aaa = '<h2>題</h2>\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc)-->\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E)-->';
        var aaa = '<h2>題</h2>\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc&usp=drive_web#gid=0)-->\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0)-->';
        // var aaa = '<h2>題</h2>\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc&usp=drive_web#gid=0)-->\n    <p>これはサンプル<br />なにか<br />あるかな</p>\n    <!--insert_gs(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0)-->\n    <!--insert_gs_bigin(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0)-->aaa<!--insert_gs_end-->';
        // $scope.source = 'abc';
        $scope.code = aaa.replace(/<br \/>/g, '<br>');
        $scope.wysiwygCode = '';
        $scope.gsData = {};

// https://docs.google.com/spreadsheet/ccc
// key=0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc&usp=drive_web
// #gid=0
        $scope.getGSInfo = function(code) {
            // console.log('');
            // console.log('getGSInfo');
            // console.log('------------------');
            var retArr = [], tmpArr0 = [], tmpArr1 = [], tmpArr2 = [], tmpArr3 = [];
            var info = '';
            var result = code.match(/<!--insert_gs\(.+?\)-->/g);
            if (result !== null) {
                for (var i=0,len=result.length; i<len; i++) {
                    code.match(/<!--insert_gs\((.+?)\)-->/);
                    console.log(RegExp.$1);
                    tmpArr0 = RegExp.$1.split('?');
                    console.log("tmpArr0");
                    console.log(tmpArr0);
                    tmpArr1 = tmpArr0[1].split('#gid=');
                    console.log("tmpArr1");
                    console.log(tmpArr1);
                    tmpArr2 = tmpArr1[0].split('&');
                    console.log("tmpArr2");
                    console.log(tmpArr2);
                    var tmpObj = {
                        url         : tmpArr0[0],
                        gid         : tmpArr1[1]
                    };
                    for (var j=0, len2=tmpArr2.length; j<len2; j++) {
                        tmpArr3 = tmpArr2[j].split('=');
                        tmpObj[tmpArr3[0]] = tmpArr3[1];
                    }
                    if (tmpObj) {
                        retArr.push(tmpObj);
                    }
                    // console.log("retArr");
                    // console.log(retArr);
                    // console.log('');
                    code = code.replace(/<!--insert_gs\((.+?)\)-->/, "$1");
                }
            }
            // console.log('------------------');
            return retArr;
        }

        // codeにgsData内に保持されているGoogleSpreadsheetから生成したタグを挿入するメソッド
        $scope.insertGSDataToHTML = function(code, gsData) {
            var label = '';
            for (var key in gsData) {
                // label = key.split('_')[0];
                // var re = new RegExp("<!--insert_gs\\(" + label + "\\)-->");
                // var re = new RegExp("<!--insert_gs\\(" + key + "\\)-->");
                console.log('------------------');
                console.log('key');
                console.log(key);
                var tmpKey = key.replace(/\//g, '\\/');
                tmpKey = tmpKey.replace(/\?/g, '\\?');
                console.log('tmpKey');
                console.log(tmpKey);
                var re = new RegExp("<!--insert_gs\\((" + tmpKey + ")\\)-->");
                console.log('re');
                console.log(re);
                console.log('------------------');
                // var re = new RegExp("<!--insert_gs\\((" + tmpKey + ")\\)-->");
                // var re = new RegExp("<!--insert_gs\\(" + tmpKey + "\\)-->");
                // var re = new RegExp("<!--insert_gs\\(" + key.replace(/[\/|\?]/g, ['\\/', '\\?']) + "\\|)-->");
                code = code.replace(re, '<!--insert_gs_bigin(' + "$1" + ')-->' + gsData[key]['source'] + '<!--insert_gs_end-->');
                // code = code.replace(re, '<!--insert_gs_bigin\\(' + "$1" + '\\)-->' + gsData[key]['source'] + '<!--insert_gs_end-->');
                // code = code.replace(re, gsData[key]);
            }
            return code;
        }

        // codeからGoogleSpreadsheetから生成したタグを取り除くメソッド
        $scope.removeGSDataFromHTML = function(code) {
            var result = code.match(/<!--insert_gs_bigin((.+)?)-->(.+?)<!--insert_gs_end-->/g);
            console.log('-------------');
            console.log('result');
            console.log(result);
            console.log();
            console.log('$1');
            console.log(RegExp.$1);
            console.log();
            console.log('$2');
            console.log(RegExp.$2);
            code = code.replace(/<!--insert_gs_bigin((.+?))-->(.+?)<!--insert_gs_end-->/g, ("<!--insert_gs" + "$1".replace('\\', '') + "-->"));
            console.log('code');
            console.log(code);
            console.log('-------------');
            return code;
        }
        /*
a<h2>題</h2>
    <p>これはサンプル<br>なにか<br>あるかな</p>
    <!--insert_gs_bigin\(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndFNfbjhXZnIwQnVNOGFraFVGOEtUaHc&usp=drive_web#gid=0\)--><table class="table table-bordered"><tbody><tr><td class="key">1-a</td><td class="val">1-b</td></tr><tr><td class="key">2-a</td><td class="val">2-b</td></tr><tr><td class="key">3-a</td><td class="val">3-b</td></tr><tr><td class="key">4-a</td><td class="val">4-b</td></tr><tr><td class="key">5-a</td><td class="val">5-b</td></tr></tbody></table><!--insert_gs_end-->
    <p>これはサンプル<br>なにか<br>あるかな</p>
    <!--insert_gs_bigin\(https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0\)--><table class="table table-bordered"><tbody><tr><td class="key">ウェリス大宮</td><td class="val">https://dl.dropboxusercontent.com/u/2760407/%E3%82%A6%E3%82%A7%E3%83%AA%E3%82%B9%E5%A4%A7%E5%AE%AE/index.html</td></tr><tr><td class="key">グレーシアタワー亀有</td><td class="val">https://dl.dropboxusercontent.com/u/2760407/%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%82%A2%E3%82%BF%E3%83%AF%E3%83%BC%E4%BA%80%E6%9C%89/index.html</td></tr><tr><td class="key">PROUD名古屋(Dropbox)</td><td class="val">https://dl.dropboxusercontent.com/u/2760407/Proud%E5%90%8D%E5%8F%A4%E5%B1%8B/index.html</td></tr><tr><td class="key">PROUD名古屋(GoogleDrive)</td><td class="val">https://googledrive.com/host/0B9vxJEe7IC7nMnUwblBlVDdXY3c/index.html</td></tr><tr><td class="key">PROUD名古屋(S3)</td><td class="val">http://proud-a.s3-website-us-east-1.amazonaws.com/</td></tr><tr><td class="key">PROUD東中野</td><td class="val">https://dl.dropboxusercontent.com/u/2760407/Proud%E6%9D%B1%E4%B8%AD%E9%87%8E/index.html</td></tr></tbody></table><!--insert_gs_end-->
*/
        // code Codeかから取得したコード
        // var refreshWysiwygFromCode = function(code) {
        //     console.log($scope.getGSInfo(code));
            // コード内のGoogleSpreadsheet挿入タグを置換する
            // 置換したコードでWysiwygを更新する
        // }

        // Wysiwygから取得したコードでCodeを更新する
        $scope.refreshCodeFromWysiwyg = function(code) {
            console.log('');
            console.log('--------------');
            console.log(code);
            console.log('--------------');
            // コード内のGoogleSpreadsheet挿入タグを置換する
            $scope.code = $scope.removeGSDataFromHTML(code);
            console.log($scope.code);
            console.log('--------------');
            console.log('Codeの値を更新');
            // 置換したコードでCodeを更新する
            $('.code-view').val($scope.code);
            // $scope.wysiwygCode = code;;
                        $scope.$apply(function() {
                            $scope.wysiwygCode = code;
                        });

            if ($scope.watcherId !== -1) {
                clearInterval($scope.watcherId);
            }
            $scope.watcherId = setInterval($scope.watchWysiwyg, 500);
        }

        // refreshCodeFromWysiwyg($('.summernote').code());

        $scope.convertData = function(data, gid) {
            console.log('convertData');
            // var dfd = $.Deferred();
            var row = 0;
            // var $elem = $('#gs-data');
            // var dateData = data["seet0"];
            var dateData = data["gid" + gid];
            var maxRow = dateData.getNumberOfRows();;
            var retArr = [];
            // var codeStr = '';
            for (row = 0; row < maxRow; row++) {
                var tmpArr = [dateData.getValue(row, 0), dateData.getValue(row, 1)];
                // retArr.push(tmpArr);
                retArr.push('<tr><td class="key">' + dateData.getValue(row, 0) + '</td><td class="val">' + dateData.getValue(row, 1) + '</td></tr>');
            }

            return '<table class="table table-bordered"><tbody>' + retArr.join('') + '</tbody></table>';
            // return retArr;
        }

        $scope.watcherId = -1;
        $scope.watchWysiwyg = function() {
            // console.log('wysiwygチェック');
            if ($scope.wysiwygCode !== $('.summernote').code()) {
                console.log('更新されている');
                $scope.refreshCodeFromWysiwyg($(".summernote").code());
            }
        }

        // コードの内容でWYSIWYGエディタを更新する
        $scope.refreshWysiwygFromCode = function(code) {
            // 前回更新したコードと引数codeに渡されたコードを比較して、内容が変わっていれば下記の処理を行う
            // コード表示エリアにコードを挿入する
            // WYSIWYGエディタに挿入するコードからGoogle Spreadsheetのキーを取得する
            var gsInfo = $scope.getGSInfo(code);
            console.log(gsInfo);

            // Google Spreadsheetのキーが見つかった場合、下記の処理を行う
            if (0 < gsInfo.length) {
                var counter = 0, complete = gsInfo.length;
                // console.log(window.getGSData);
                // console.log($(window));
                /*
                var refresh = function() {
                    // 整形したデータをWYSIWYGエディタに挿入するコードに挿入
                    $scope.wysiwygCode = $scope.insertGSDataToHTML(code, $scope.gsData);
                    $scope.code = code;
                    console.log('置換済みコード');
                    console.log($scope.wysiwygCode);
                    // WYSIWYGエディタにコードを挿入する
                    $('.summernote').code($scope.wysiwygCode);
                    $('.code-view').val(code);
                }
                */
                $(window).off('onCompleteRequestData');
                $(window).on('onCompleteRequestData', function(event, data) {
                    console.log('gsデータ受け取り完了');
                    // console.log(data);
                    // console.log($scope.code);
                    // Google Spreadsheetから取得したデータをHTMLに変換して保持
                    // $scope.gsData[data['key'] + '_' + data['gid']] = $scope.convertData(data['data'], data['gid']);
                    // https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0
                    var key = 'https://docs.google.com/spreadsheet/ccc?key=' + data.key + '&usp=drive_web#gid=' + data.gid;
                    $scope.gsData[key] = {
                        'source'    : $scope.convertData(data['data'], data['gid']),
                        'master'    : data
                    };
                    counter ++;
                    console.log('counter = ' + counter + ', complete = ' + complete);
                    // $scope.gsData[key] = $scope.convertData(data['data'], data['gid']);
                    // if (++counter === complete) {
                    if (counter === complete) {
                        $(window).off('onCompleteRequestData');
                        console.log('全データ取得完了');
                        console.log($scope.gsData);
                        // 整形したデータをWYSIWYGエディタに挿入するコードに挿入
                        // $scope.wysiwygCode = $scope.insertGSDataToHTML(code, $scope.gsData);
                        // $scope.code = code;
                        $scope.$apply(function() {
                            $scope.wysiwygCode = $scope.insertGSDataToHTML(code, $scope.gsData);
                            $scope.code = code;
                        });
                        console.log('置換済みコード');
                        console.log($scope.wysiwygCode);
                        // WYSIWYGエディタにコードを挿入する
                        $('.summernote').code($scope.wysiwygCode);
                        $('.code-view').val($scope.code);

                        if ($scope.watcherId !== -1) {
                            clearInterval($scope.watcherId);
                        }
                        $scope.watcherId = setInterval($scope.watchWysiwyg, 500);
                        // refresh();
                    } else {
                        console.log('あと' + (complete - counter) + '回');
                    }
                });
                for (var i=0; i<complete; i++) {
                    var key = 'https://docs.google.com/spreadsheet/ccc?key=' + gsInfo[i].key + '&usp=drive_web#gid=' + gsInfo[i].gid;
                    // $scope.gsData[key] = $scope.convertData(data['data'], data['gid']);
                    if ($scope.gsData[key]) {
                        console.log('キャッシュ済み');
                        $(window).trigger('onCompleteRequestData', $scope.gsData[key].master);
                    } else {
                        console.log('キャッシュにないので取得する');
                        window.getGSData(gsInfo[i].key, gsInfo[i].gid);
                    }
                    // window.getGSData(gsInfo[i].key, 0);
                }
            } else {
                // WYSIWYGエディタにコードを挿入する
            }
        }

        $scope.onClickSaveBtn = function(event) {
            console.log('onClickSaveBtn');
            console.log(event);
            console.log($scope.code);
            // $scope.source = $scope.code;
        }

        $scope.$watch('wysiwygCode', function(newVal, oldVal) {
            console.log('-------------');
            console.log('変数wysiwygCodeの値が更新された');
            console.log('newVal = ' + newVal + ', oldVal = ' + oldVal);
            console.log('-------------');
        });
        $scope.$watch('code', function(newVal, oldVal) {
            console.log('-------------');
            console.log('変数codeの値が更新された');
            console.log('newVal = ' + newVal + ', oldVal = ' + oldVal);
            console.log('-------------');
        });

        // $scope.code = '12345';
        // $scope.code = 'aaaaa';
        // setTimeout(function() {$scope.$apply(function() { $scope.source = 'abcdefg'; console.log('source = ' + $scope.source)})}, 4000);
        // $timeout(function()555 {$scope.source = 'abcdefg'; console.log('source = ' + $scope.source)}, 4000);


        /*
                */
        var timerId = -1;
        var checkMethod = function() {
            if (window.getGSData) {
                clearInterval(timerId);
                $('.summernote').summernote({
                    width: 640,
                    height: 320,                  // set editable area's height
                    focus: true,                  // set focus editable area after summernote loaded
                    tabsize: 2,                   // size of tab
                    disableDragAndDrop: false, // disable drag and drop event
                    codemirror: {                 // code mirror options
                        theme: 'monokai'
                    },
                    onkeyup: function(event) {
                        // console.log('キーアップ');
                        // console.log('$scope.wysiwygCode');
                        // console.log($scope.wysiwygCode);
                        // console.log('$(".summernote").code()');
                        // console.log($('.summernote').code());
                        if ($scope.wysiwygCode !== $('.summernote').code()) {
                            console.log('wysiwygの値が変わった');
                            $scope.refreshCodeFromWysiwyg($(".summernote").code());
                        }
                    },
                    onblur: function(event) {
                        // console.log('ブラー');
                    }
                });
                $('.code-view').on('keyup', function(event) {
                    // console.log('$(this).text()');
                    // console.log($(this).text());
                    // console.log('$scope.code');
                    // console.log($scope.code);
                    if ($(this).val() !== $scope.code) {
                        console.log('codeのコードが変わった');
                        $scope.refreshWysiwygFromCode($(this).val());
                        // $scope.refreshWysiwygFromCode($scope.code = $(this).text());
                    }
                });
                console.log('getGSDataは定義済み');
                $scope.refreshWysiwygFromCode($scope.code);
            } else {
                console.log('まだgetGSDataは未定義');
            }
        }
        // timerId = setInterval(checkMethod, 1000);
        console.log('utilService');
        console.log(utilService);
        console.log('utilService.getValue()');
        console.log(utilService.getValue());
        console.log('utilService.setValue("値を更新")');
        utilService.setValue("値を更新");
        console.log('utilService.getValue()');
        console.log(utilService.getValue());
        console.log('utilService.privateMethod()');
        console.log(utilService.privateMethod());
    });