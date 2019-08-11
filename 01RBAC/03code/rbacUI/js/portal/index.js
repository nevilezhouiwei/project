/**
 * 视图框架
 */
$(function () {   

    /**
     * 加载左侧菜单树
     * accordion:本质上是一个 ul 列表
     */
    $.ajax({
        type: 'get',
        dataType: "json",
        url:  $.jpa.adaptURL({localURL:'../../js/portal/menu.json'}),//accordion 中无法直接使用 URL 属性，所以直接的使用 ajax get方法取得数据。
        success: function (data) {
            $.each(data, function (i, n) {//加载父类节点即一级菜单
                if (i == 0) {//显示第一个一级菜单下的二级菜单
                    $('#layout_west_accordion').accordion('add', {
                        title: n.text,
                        iconCls: n.iconCls,
                        selected: true,
                        //为了加入二级菜单方便
                        content: '<div style="width: 20%;padding:10px"><ul name="' + n.text + '"></ul></div>',
                    });
                } else {
                    $('#layout_west_accordion').accordion('add', {
                        //一级菜单的名称
                        title: n.text,
                        iconCls: n.iconCls,
                        selected: false,
                        content: '<div style="width: 20%;padding:10px"><ul name="' + n.text + '"></ul></div>',
                    });
                }

            });
        }
    });
    //异步加载子节点，即二级菜单
    //在一级菜单中的 ul 中添加一个树。
    //!!当从服务端请求数据时候可以优化暂时页面循环展开的问题。
    //因为这是一个异步树,每次展开后都请求同一个地址,导致子节点展开相同的子菜单。
    /**
     * 还是保留：
     * 1、为多级菜单保留
     * 2、使用返回的数据进行判断，没有子节点的就不请求。
     */
    $('#layout_west_accordion').accordion({
        onSelect: function (title, index) {
            $("ul[name='" + title + "']").tree({
                method: "get",
                url:  $.jpa.adaptURL({localURL:'../../js/portal/menu2.json'}),//自动拼接当前节点的id传递到服务器。
                onClick: function (node) {
                    var text = node.text;
                    //var url = node.attributes.url;//可以填写进入动态的url
                    var url = node.attributes.url;//表单demo
                    if ($('#tabs').tabs('exists', text)) {
                        $('#tabs').tabs('select', text); 
                    } else {
                        var content = '<iframe scrolling="auto" frameborder="0"  src='+url+' style="width:100%;height:100%;"></iframe>';
                            $('#tabs').tabs('add', {
                            title: text,
                            content: content,
                            closable: true
                        });
                    }
                }
            });
        },


    });
    


})
/**
 * 权限的管理  
 * 1、使用反射技术在项目启动时，在context 加载时找到项目的资源信息，比如模块、url。并输出
 * 
 * 2、使用注解表示资源的读写导出导入，使用拦截器进行配置。
 * 
 * 参考文献：https://www.cnblogs.com/wangzhongqiu/p/6626252.html
 * 
 * 如果单独使用内存方法验证，可以使用此方法：https://blog.csdn.net/adsadadaddadasda/article/details/78902779
 * 
 * 
 * 
 */

 