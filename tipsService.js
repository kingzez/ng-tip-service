angular.module('app')
    .factory('tipsService', ['$rootScope', function($rootScope) {

        function prompt() {
            /**
             * 是否已初始化过的标志
             * @private
             */
            var frameTopPrompt_init = false;

            $.extend({
                /**
                 * 顶部弹出窗口初始化
                 * @public
                 * @param iWidth int 状态条宽度[默认250],单位px
                 * @return void
                 */
                initTopPrompt: function(iWidth) {
                    if (!frameTopPrompt_init) {
                        iWidth = (typeof(iWidth) == 'undefined') ? 300 : parseInt(iWidth);
                        iWidth = (iWidth < 200) ? 200 : iWidth;
                        var html =
                            "<style>#gc-frameTopPrompt{display:none;background: rgba(242,242,242,0.9);position:fixed;text-align:center;font-size:14px;color:#808080;z-index:2000;clear:both:border:1px solid #e5e5e5;padding:10px 15px;width:300px;left:50%;margin-left:-150px;-moz-border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;-webkit-border-radius:4px;-khtml-border-radius:4px;-khtml-border-radius:4px;border-radius:4px;border-radius:4px;}</style><div id='gc-frameTopPrompt' style='top: 13%; display: none;'><img id='info' src='/common/img/info-379b990419.png' style='float:left; display:none; padding-left:40px'><img id='success' src='/common/img/success-9bb03768ec.png' style='float:left; display:none; padding-left:40px'><img id='error' src='/common/img/error-137cdbea88.png' style='float:left; display:none; padding-left:40px'><img id='warn' src='/common/img/warn-9fd1278a3a.png' style='float: left; display: inline; padding-left: 40px;'><div id='async_TopPrompt_textarea' style='float:left; text-align:center;width:65%;word-wrap:break-word;word-break:break-all;max-height:300px;overflow:hidden; line-height: 26px;'>请选择数据源</div><span style='float:right;cursor:pointer;font-size:16px;'>x</span></div>";

                        angular.element('body').append(html);
                        //取出gc-frameTopPrompt对象引用
                        var $my = angular.element(document.querySelector('#gc-frameTopPrompt'));
                        $my.find('span').bind('click', function() {
                            $my.fadeOut(100);
                        });
                        // delete aBuf;
                        frameTopPrompt_init = true; //初始化完成
                    }
                },
                /**
                 * 弹出状态条
                 * @public
                 * @param sMsg 状态条显示内容
                 * @return void
                 */
                showTopPrompt: function(initConfig) {
                    clearTimeout($.hideTopPrompt.time);
                    var bodyTop = 0;
                    if (!frameTopPrompt_init) {
                        $.initTopPrompt();
                    }
                    // 如果没有初始化则显示先初始化
                    var $my = angular.element(document.querySelector('#gc-frameTopPrompt'));
                    if (typeof window.pageYOffset != 'undefined')
                        bodyTop = window.pageYOffset;
                    else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat')
                        bodyTop = document.documentElement.scrollTop;
                    else if (typeof document.body != 'undefined')
                        bodyTop = document.body.scrollTop;

                    var msg = initConfig.msg;
                    var type = initConfig.type;
                    if (typeof(initConfig) == 'string')
                        msg = initConfig;
                    $my.find('#async_TopPrompt_textarea').html(msg); // 设置显示信息
                    $my.css("top", "13%");
                    var $info = angular.element(document.querySelector('#info'));
                    var $success = angular.element(document.querySelector('#success'));
                    var $error = angular.element(document.querySelector('#error'));
                    var $warn = angular.element(document.querySelector('#warn'));

                    if (type === "info") {
                        $info.css("display", "inline");
                        $success.css("display", "none");
                        $error.css("display", "none");
                        $warn.css("display", "none");
                    } else if (type === "success") {
                        $success.css("display", "inline");
                        $info.css("display", "none");
                        $error.css("display", "none");
                        $warn.css("display", "none");
                    } else if (type === "error") {
                        $error.css("display", "inline");
                        $info.css("display", "none");
                        $success.css("display", "none");
                        $warn.css("display", "none");
                    } else if (type === "warn") {
                        $warn.css("display", "inline");
                        $info.css("display", "none");
                        $success.css("display", "none");
                        $error.css("display", "none");
                    }

                    if (false) {
                        $my.show("fade", 1100);
                    } else {
                        $my.show(false);
                        var out = 10000; // 默认值
                        if (typeof(initConfig) == 'string')
                            setTimeout(function() {
                                $.hideTopPrompt();
                            }, out);
                        else if (initConfig.out) {
                            out = initConfig.out;
                            $.hideTopPrompt.time = setTimeout(function() {
                                $.hideTopPrompt();
                            }, out);
                        }
                    }
                },
                /**
                 * 隐藏窗口
                 * @public
                 * @param sMsg 状态条显示内容[可以不填]
                 * @return void
                 */
                hideTopPrompt: function(sMsg) {
                    if (frameTopPrompt_init) {
                        var $my = $('#gc-frameTopPrompt');
                        if (typeof(sMsg) == 'string')
                            $my.find('#async_TopPrompt_textarea').html(sMsg);
                        $my.fadeOut(1500);
                    }
                },
                /**
                 * 返回顶部状态条对象的jQuery引用
                 * @public
                 * @return jQuery
                 */
                get$ObjTopPrompt: function() {
                    if (frameTopPrompt_init)
                        return $('#gc-frameTopPrompt');
                    else
                        return null;
                },
            });
        };
        prompt()

        return {
            /**
             * 显示提示信息窗口
             * @param  {String} msg  消息文本内容
             * @param  {Number} time 窗口停留时间
             * @param  {String} type 消息类型（info/success/warn/error）
             */

            message: function(msg, time, type) {
                $.showTopPrompt({
                    msg: msg,
                    out: time || 2000,
                    type: type
                });


            },

        };
    }]);
