$.fn.extend({
	
	/*
	 *DIV循环布局
	 * 
	 *@param col_num：每行展示几个
	 *@param margin：间距
	 * 
	 * */
	for_layout : function(col_num,margin){ 
		var _itemDOM = $(this);
		var child_div = _itemDOM.children(); //需要布局的DIV集合
		var child_div_length = _itemDOM.children().length  //集合个数
		var col_num = col_num;  //一行显示几个
		var row_num = Math.ceil(child_div_length / col_num); //总共几行
		var margin = margin;  //间距
		var last_div = child_div_length - 1;  //最后一个div索引
		var parent_div_width = _itemDOM.width()  //总宽度
		var child_width = (parent_div_width - margin * (col_num - 1)) / col_num //单个div宽度

		//设定每一个的DIV宽度
		for(var r = 0; r <= last_div; r++) {
			$(child_div[r]).css({ "width": child_width, });
		}
		
		//布局
		for(var m = 0; m < row_num; m++) {
			for(var i = (col_num * m + 1); i < (col_num * m + col_num); i++) {
				$(child_div[i]).css({ "margin-left": margin, });
			}
		}
	} 
	
});