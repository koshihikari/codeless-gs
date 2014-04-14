'use strict';

angular.module('codeInsertFactory', [])
    .factory('codeInsertFactory', function() {
        var _timerId = -1;
        var $scope = null;
        var _code = '';
        var _gsData = {};
        var _wysiwygCode = '';
        var _watcherId = -1;

       function getGSInfo(code) {
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

        function convertData(data, gid) {
            console.log('convertData');
            // var dfd = $.Deferred();
            var row = 0;
            // var $elem = $('#gs-data');
            // var dateData = data["seet0"];
            var dateData = data["gid" + gid];
            console.log('dateData');
            console.log(dateData);
            if (dateData !== null) {
                var maxRow = dateData.getNumberOfRows();;
                var retArr = [];
                // var codeStr = '';
                for (row = 0; row < maxRow; row++) {
                    var tmpArr = [dateData.getValue(row, 0), dateData.getValue(row, 1)];
                    // retArr.push(tmpArr);
                    retArr.push('<tr><td class="key">' + dateData.getValue(row, 0) + '</td><td class="val">' + dateData.getValue(row, 1) + '</td></tr>');
                }

                return '<table class="table table-bordered"><tbody>' + retArr.join('') + '</tbody></table>';
            } else {
                return '';
            }
            // return retArr;
        }

        // codeに_gsData内に保持されているGoogleSpreadsheetから生成したタグを挿入するメソッド
        function insertGSDataToHTML(code, _gsData) {
            var label = '';
            for (var key in _gsData) {
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
                code = code.replace(re, '<!--insert_gs_bigin(' + "$1" + ')-->' + _gsData[key]['source'] + '<!--insert_gs_end-->');
                // code = code.replace(re, '<!--insert_gs_bigin\\(' + "$1" + '\\)-->' + _gsData[key]['source'] + '<!--insert_gs_end-->');
                // code = code.replace(re, _gsData[key]);
            }
            return code;
        }

        // コードの内容でWYSIWYGエディタを更新する
        function refreshWysiwygFromCode(code) {
            // 前回更新したコードと引数codeに渡されたコードを比較して、内容が変わっていれば下記の処理を行う
            // コード表示エリアにコードを挿入する
            // WYSIWYGエディタに挿入するコードからGoogle Spreadsheetのキーを取得する
            var gsInfo = getGSInfo(code);
            console.log(gsInfo);

            // Google Spreadsheetのキーが見つかった場合、下記の処理を行う
            if (0 < gsInfo.length) {
                var counter = 0, complete = gsInfo.length;
                // console.log(window.getGSData);
                // console.log($(window));
                /*
                var refresh = function() {
                    // 整形したデータをWYSIWYGエディタに挿入するコードに挿入
                    $scope.__wysiwygCode = $scope.insertGSDataToHTML(code, $scope._gsData);
                    $scope.code = code;
                    console.log('置換済みコード');
                    console.log($scope._wysiwygCode);
                    // WYSIWYGエディタにコードを挿入する
                    $('.summernote').code($scope._wysiwygCode);
                    $('.code-view').val(code);
                }
                */
                $(window).off('onCompleteRequestData');
                $(window).on('onCompleteRequestData', function(event, data) {
                    console.log('gsデータ受け取り完了');
                    // console.log(data);
                    // console.log($scope.code);
                    // Google Spreadsheetから取得したデータをHTMLに変換して保持
                    // $scope._gsData[data['key'] + '_' + data['gid']] = $scope.convertData(data['data'], data['gid']);
                    // https://docs.google.com/spreadsheet/ccc?key=0AtvxJEe7IC7ndGk4Z2ZiazdZV1hZNHpDVzhsZlo3S1E&usp=drive_web#gid=0
                    var key = 'https://docs.google.com/spreadsheet/ccc?key=' + data.key + '&usp=drive_web#gid=' + data.gid;
                    _gsData[key] = {
                        'source'    : convertData(data['data'], data['gid']),
                        'master'    : data
                    };
                    counter ++;
                    console.log('counter = ' + counter + ', complete = ' + complete);
                    // $scope._gsData[key] = $scope.convertData(data['data'], data['gid']);
                    // if (++counter === complete) {
                    if (counter === complete) {
                        $(window).off('onCompleteRequestData');
                        console.log('全データ取得完了');
                        console.log(_gsData);
                        // 整形したデータをWYSIWYGエディタに挿入するコードに挿入
                        // $scope._wysiwygCode = $scope.insertGSDataToHTML(code, $scope._gsData);
                        // $scope.code = code;
                        $scope.$apply(function() {
                            _wysiwygCode = insertGSDataToHTML(code, _gsData);
                            _code = code;
                        });
                        console.log('置換済みコード');
                        console.log(_wysiwygCode);
                        // WYSIWYGエディタにコードを挿入する
                        $('.summernote').code(_wysiwygCode);
                        $('.code-view').val(_code);

                        if (_watcherId !== -1) {
                            clearInterval(_watcherId);
                        }
                        _watcherId = setInterval(watchWysiwyg, 500);
                        // refresh();
                    } else {
                        console.log('あと' + (complete - counter) + '回');
                    }
                });
                for (var i=0; i<complete; i++) {
                    var key = 'https://docs.google.com/spreadsheet/ccc?key=' + gsInfo[i].key + '&usp=drive_web#gid=' + gsInfo[i].gid;
                    // $scope._gsData[key] = $scope.convertData(data['data'], data['gid']);
                    if (_gsData[key]) {
                        console.log('キャッシュ済み');
                        $(window).trigger('onCompleteRequestData', _gsData[key].master);
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

        // codeからGoogleSpreadsheetから生成したタグを取り除くメソッド
        function removeGSDataFromHTML(code) {
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
        function watchWysiwyg() {
            // console.log('wysiwygチェック');
            if (_wysiwygCode !== $('.summernote').code()) {
                console.log('更新されている');
                refreshCodeFromWysiwyg($(".summernote").code());
            }
        }
        // Wysiwygから取得したコードでCodeを更新する
        function refreshCodeFromWysiwyg(code) {
            console.log('');
            console.log('--------------');
            console.log(code);
            console.log('--------------');
            // コード内のGoogleSpreadsheet挿入タグを置換する
            _code = removeGSDataFromHTML(code);
            console.log(_code);
            console.log('--------------');
            console.log('Codeの値を更新');
            // 置換したコードでCodeを更新する
            $('.code-view').val(_code);
            // $scope._wysiwygCode = code;;
                        $scope.$apply(function() {
                            _wysiwygCode = code;
                        });

            if (_watcherId !== -1) {
                clearInterval(_watcherId);
            }
            _watcherId = setInterval(watchWysiwyg, 500);
        }
        function checkMethod() {
            if (window.getGSData) {
                console.log('getGSDataは定義済み');
                clearInterval(_timerId);
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
                        // console.log('$scope._wysiwygCode');
                        // console.log($scope._wysiwygCode);
                        // console.log('$(".summernote").code()');
                        // console.log($('.summernote').code());
                        if (_wysiwygCode !== $('.summernote').code()) {
                            console.log('wysiwygの値が変わった');
                            refreshCodeFromWysiwyg($(".summernote").code());
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
                    if ($(this).val() !== _code) {
                        console.log('codeのコードが変わった');
                        refreshWysiwygFromCode($(this).val());
                    }
                });
                refreshWysiwygFromCode(_code);
            } else {
                console.log('まだgetGSDataは未定義');
            }
        }
        function execute(scope, code) {
            $scope = scope;
            _code = code;
            _timerId = setInterval(checkMethod, 1000);
                console.log('よし :: _timerId = ' + _timerId);
        }
        return {
            execute    : execute
        }
    });