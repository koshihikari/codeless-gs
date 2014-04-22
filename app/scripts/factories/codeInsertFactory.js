'use strict';

angular.module('codeInsertFactory', [])
    .factory('codeInsertFactory', function() {
        var _timerId = -1;
        var $scope = null;
        var _code = '';
        var _gsData = {};
        var _wysiwygCode = '';
        // var _watcherId = -1;


        /*
        * 引数codeにGoogleSpreadsheet埋め込み用コードが含まれていれば、GSのURL、ワークシートのID等を返すメソッド
        * @param   code:String      GSのコードが埋め込まれているか調べるソースコード
        * @return  Array            GSのコードが埋め込まれていれば、GSのURL、ワークシートのID等を保持する配列
        */
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
                    // console.log(RegExp.$1);
                    tmpArr0 = RegExp.$1.split('?');
                    // console.log("tmpArr0");
                    // console.log(tmpArr0);
                    tmpArr1 = tmpArr0[1].split('#gid=');
                    // console.log("tmpArr1");
                    // console.log(tmpArr1);
                    tmpArr2 = tmpArr1[0].split('&');
                    // console.log("tmpArr2");
                    // console.log(tmpArr2);
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

        /*
        * GoogleSpreadsheetから取得したデータをHTMLのコードに変換するメソッド
        * @param   data:Object      GoogleSpreadsheetから取得したデータ
        * @param   gid:String       取得したGoogleSpreadsheetのワークシートのID
        * @return  String           返還後のHTMLタグ
        */
        function convertData(data, gid) {
            // console.log('convertData');
            var row = 0;
            var dateData = data["gid" + gid];
            // console.log('dateData');
            // console.log(dateData);
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
        }

        /*
        * 引数codeにGoogleSpreadsheetから生成したHTMLのコードを挿入するメソッド
        * @param   code:String      挿入前のHTMLソース
        * @param   gsData:Object    GoogleSpreadsheetから取得したデータ
        * @return  String           挿入後のHTMLソース
        */
        function insertGSDataToHTML(code, gsData) {
            var label = '';
            for (var key in gsData) {
                // console.log('------------------');
                // console.log('key');
                // console.log(key);
                var tmpKey = key.replace(/\//g, '\\/');
                tmpKey = tmpKey.replace(/\?/g, '\\?');
                // console.log('tmpKey');
                // console.log(tmpKey);
                var re = new RegExp("<!--insert_gs\\((" + tmpKey + ")\\)-->");
                // console.log('re');
                // console.log(re);
                // console.log('------------------');
                code = code.replace(re, '<!--insert_gs_bigin(' + "$1" + ')-->' + gsData[key]['source'] + '<!--insert_gs_end-->');
            }
            return code;
        }

        /*
        * 引数codeの内容でWYSIWYGエディタを更新するメソッド
        * @param   code:String      HTMLソース(GoogleSpreadsheetのデータ展開前のソース)
        * @return  void
        */
        function refreshWysiwygFromCode(code) {
            var gsInfo = getGSInfo(code);   // WYSIWYGエディタに挿入するコードからGoogle Spreadsheetのキーを取得する
            // console.log(gsInfo);

            // Google Spreadsheetのキーが見つかった場合、下記の処理を行う
            if (0 < gsInfo.length) {
                var counter = 0, complete = gsInfo.length;
                // console.log(window.getGSData);
                // console.log($(window));
                $(window).off('onCompleteRequestData');
                $(window).on('onCompleteRequestData', function(event, data) {
                    // console.log('gsデータ受け取り完了');
                    // console.log(data);
                    // console.log($scope.code);
                    var key = 'https://docs.google.com/spreadsheet/ccc?key=' + data.key + '&usp=drive_web#gid=' + data.gid;
                    _gsData[key] = {
                        'source'    : convertData(data['data'], data['gid']),
                        'master'    : data
                    };
                    counter ++;
                    // console.log('counter = ' + counter + ', complete = ' + complete);
                    // $scope._gsData[key] = $scope.convertData(data['data'], data['gid']);
                    // if (++counter === complete) {
                    if (counter === complete) {
                        $(window).off('onCompleteRequestData');
                        // console.log('全データ取得完了');
                        // console.log(_gsData);
                        $scope.$apply(function() {
                            _wysiwygCode = insertGSDataToHTML(code, _gsData);
                            _code = code;
                        });
                        // console.log('置換済みコード');
                        // console.log(_wysiwygCode);
                        $('.summernote').code(_wysiwygCode);    // WYSIWYGエディタにコードを挿入する
                        $('.code-view').val(_code);             // 置換したコードでソースエディタを更新する

                        // if (_watcherId !== -1) {
                        //     clearInterval(_watcherId);
                        // }
                        // _watcherId = setInterval(watchWysiwyg, 500);
                    } else {
                        // console.log('あと' + (complete - counter) + '回');
                    }
                });
                for (var i=0; i<complete; i++) {
                    var key = 'https://docs.google.com/spreadsheet/ccc?key=' + gsInfo[i].key + '&usp=drive_web#gid=' + gsInfo[i].gid;
                    // $scope._gsData[key] = $scope.convertData(data['data'], data['gid']);
                    if (_gsData[key]) {
                        // console.log('キャッシュ済み');
                        $(window).trigger('onCompleteRequestData', _gsData[key].master);
                    } else {
                        // console.log('キャッシュにないので取得する');
                        window.getGSData(gsInfo[i].key, gsInfo[i].gid);
                    }
                    // window.getGSData(gsInfo[i].key, 0);
                }
            } else {
                // WYSIWYGエディタにコードを挿入する
            }
        }

        /*
        * 引数codeからGoogleSpreadsheetから生成したHTMLのコードを取り除くメソッド
        * @param   code:String      GoogleSpreadsheetから生成したコードが挿入済みのHTMLソース
        * @return  String           GoogleSpreadsheetから生成したコードを挿入前の状態に戻したHTMLソース
        */
        function removeGSDataFromHTML(code) {
            // var result = code.match(/<!--insert_gs_bigin((.+)?)-->(.+?)<!--insert_gs_end-->/g);
            // while (1) {
                var result = code.match(/<!--insert_gs_bigin((.*?))-->([\s\S]*?)<!--insert_gs_end-->/g);
                // console.log('-------------');
                // console.log('result');
                // console.log(result);
                // console.log();
                // console.log('$1');
                // console.log(RegExp.$1);
                // console.log();
                // console.log('$2');
                // console.log(RegExp.$2);
                // if (result === null) {
                //     break;
                // }
                // code = code.replace(/<!--insert_gs_bigin((.+?))-->(.+?)<!--insert_gs_end-->/g, ("<!--insert_gs" + "$1".replace('\\', '') + "-->"));
                code = code.replace(/<!--insert_gs_bigin((.*?))-->([\s\S]*?)<!--insert_gs_end-->/g, ("<!--insert_gs" + "$1".replace('\\', '') + "-->"));
                // console.log('code');
                // console.log(code);
                // console.log('-------------');
            // }
            return code;
        }

        /*
        * WYSIWYGエディタの内容が更新されたかチェックするメソッド
        * @param   void
        * @return  void
        */
        // function watchWysiwyg() {
        //     // console.log('wysiwygチェック');
        //     if (_wysiwygCode !== $('.summernote').code()) {
        //         console.log('更新されている');
        //         refreshCodeFromWysiwyg($(".summernote").code(), false);
        //     }
        // }

        /*
        * 引数codeの内容でソースエディタを更新するメソッド
        * @param   code:String      HTMLソース(GoogleSpreadsheetのデータ挿入済みのソース)
        * @return  void
        */
        function refreshCodeFromWysiwyg(code, isWyiswygRefresh) {
            // console.log('');
            // console.log('--------------');
            // console.log(code);
            // console.log('--------------');
            _code = removeGSDataFromHTML(code);     // コード内のGoogleSpreadsheet挿入タグを置換する
            // console.log(_code);
            // console.log('--------------');
            // console.log('Codeの値を更新');
            if (isWyiswygRefresh === true) {
                refreshWysiwygFromCode(_code);
            }
            // $('.summernote').code(_wysiwygCode);
            $('.code-view').val(_code);             // 置換したコードでソースエディタを更新する
            /*
            // $scope._wysiwygCode = code;;
            $scope.$apply(function() {
                _wysiwygCode = code;
            });
            if (_watcherId !== -1) {
                clearInterval(_watcherId);
            }
            _watcherId = setInterval(watchWysiwyg, 500);
            */
        }

        /*
        * 引数codeの内容でソースエディタを更新するメソッド
        * @param   code:String      HTMLソース(GoogleSpreadsheetのデータ挿入済みのソース)
        * @return  void
        */
        function checkMethod() {
            if (window.getGSData) {
                // console.log('getGSDataは定義済み');
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
                            // console.log('wysiwygの値が変わった');
                            refreshCodeFromWysiwyg($(".summernote").code(), false);
                        }
                    },
                    onblur: function(event) {
                        // console.log('ブラー');
                        if (_wysiwygCode !== $('.summernote').code()) {
                            // console.log('wysiwygの値が変わった');
                            refreshCodeFromWysiwyg($(".summernote").code(), true);
                        }
                    }
                });
                $('.code-view').on('keyup', function(event) {
                    // console.log('$(this).text()');
                    // console.log($(this).text());
                    // console.log('$scope.code');
                    // console.log($scope.code);
                    if ($(this).val() !== _code) {
                        // console.log('ソースエディタのコードが変わった');
                        refreshWysiwygFromCode($(this).val());
                    }
                });
                refreshWysiwygFromCode(_code);
            } else {
                // console.log('まだgetGSDataは未定義');
            }
        }
        function execute(scope, code) {
            $scope = scope;
            _code = code;
            _timerId = setInterval(checkMethod, 1000);
        }
        return {
            execute    : execute
        }
    });