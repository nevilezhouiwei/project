$(function () {
    //定义本地和远程加载数据模式
    $("body").data("isLocal", true);
    function adaptURL(localURL, remotURL) {
        //debugger;
        return $("body").data("isLocal") ? localURL : remotURL;
    }
    //加载表格主体 
    $('#dg').datagrid({

        fitColumns: false,
        striped: true,
        nowrap: true,
        idField: "code",
        pagination: true,//前端分页
        pagePosition: 'bottom',
        rownumbers: true,//前端自带序号
        checkOnSelect: true,//选择行复选框
        selectOnCheck: true,
        singleSelect: true,//单行选择
        sortName: "code",
        sortOrder: "desc",
        onClickCell: onClickCell,//
        onEndEdit: onEndEdit,//
        //工具栏定义
        toolbar: [{
            iconCls: 'icon-add',
            text: '添加',
            handler: function () { append() }//!!此出要放入匿名函数
        }, '-', {
            iconCls: 'icon-remove',
            text: '删除',
            handler: function () { removeit() }
        }, {
            iconCls: 'icon-edit',
            text: '编辑',
            handler: function () { getChanges() }
        }, {
            iconCls: 'icon-save',
            text: '保存',
            handler: function () { acceptit() }
        }, {
            iconCls: 'icon-redo',
            text: '撤销',
            handler: function () { reject() }
        }],

        method: 'get',//默认psot 请求，无法加载报错405
        url: adaptURL('../../js/portal/datagrid_data.json', 'http://localhost/api/colums'),
        //列定义，其中列属性定义很关键
        columns: [[
            { field: 'code', title: 'Code', width: 100, editor: { type: 'text' } },
            { field: 'name', title: 'Name', width: 100, editor: { type: 'validatebox', options: { required: true } } },
            { field: 'price', title: 'Price', width: 100, editor: { type: 'text' }, align: 'right' }
        ]]
    });

    /***********************************************************/
    //当前编辑索引
    var editIndex = undefined;
    //结束编辑校验
    function endEditing() {
        if (editIndex == undefined) { return true }
        if ($('#dg').datagrid('validateRow', editIndex)) {
            $('#dg').datagrid('endEdit', editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    }
    /*
      点击表格触发此函数，选中一行-->始编辑-->获得编辑器。
    */
    function onClickCell(index, field) {
        if (editIndex != index) {
            if (endEditing()) {
                $('#dg').datagrid('selectRow', index)
                    .datagrid('beginEdit', index);
                var ed = $('#dg').datagrid('getEditor', { index: index, field: field });
                if (ed) {
                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                }
                editIndex = index;
            } else {
                setTimeout(function () {
                    $('#dg').datagrid('selectRow', editIndex);
                }, 0);
            }
        }
    }
    //完成编辑但是编辑器销毁之前
    function onEndEdit(index, row) {
        // var ed = $(this).datagrid('getEditor', {
        //         index: index,
        //         field: 'productid'
        //     });
        //     row.productname = $(ed.target).combobox('getText');
    }
    /*
    添加一行,并且进行编辑
    */
    function append() {
        if (endEditing()) {
            $('#dg').datagrid('appendRow', { code: 'P' });
            editIndex = $('#dg').datagrid('getRows').length - 1;
            $('#dg').datagrid('selectRow', editIndex)
                .datagrid('beginEdit', editIndex);
        }
    }
    /*
    取消编辑-->删除行
    */
    function removeit() {
        if (editIndex == undefined) { return }
        $('#dg').datagrid('cancelEdit', editIndex)
            .datagrid('deleteRow', editIndex);
        editIndex = undefined;
    }
    //接受当前编辑
    function acceptit() {
        if (endEditing()) {
            $('#dg').datagrid('acceptChanges');
        }
    }
    //拒绝当前编辑
    function reject() {
        $('#dg').datagrid('rejectChanges');
        editIndex = undefined;
    }
    //受影响的行数
    function getChanges() {
        var rowsi = $('#dg').datagrid('getChanges', 'inserted');
        console.log(rowsi);
        var rowsu = $('#dg').datagrid('getChanges', 'updated');
        console.log(rowsu);
        var rowsd = $('#dg').datagrid('getChanges', 'deleted');
        console.log(rowsd);
        var rows = $('#dg').datagrid('getChanges');
        console.log(rows);
        alert(rows.length + ' rows are changed!');
        //可以获得CRUD对应的行数据，前端封装好后包装提交进行保存。
        var data = { data2insertd: rowsi, data2updated: rowsu, data2deleted: rowsd };
        console.log(data);//进行提交
    }
    /***********************************************************/




})