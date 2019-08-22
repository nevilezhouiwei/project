/**
 * 定义自己的全局插件
 */

jQuery.jpa = {
    /**
     *本地开发URL,远程URL,本地开发使能 
     * @param {*} options 
     */
    adaptURL: function (options) {
        var  defaults ={
            localURL:'',
            remoteURL:'http://localhost/api',
             isLocal: true
        };
        var opts = $.extend(defaults, options);  
        return opts.isLocal ? opts.localURL : opts.remoteURL;
    }
};

