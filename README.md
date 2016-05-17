# hasScroll
Establishes quick and easy method for determining if an element has or set of elements have scroll bars.


Easy to Use:
---

	//	simple use on one element
	var ele = document.getElementById('bob');
	if (bob.hasScroll()) { /* do work */ }
	
	//	simple use on an element collection
	var col = ele.getElementsByTagName('div');
	for (var x in col) if (col[x].hasScroll()) { /* do work */ }
	
	//	simple use on a jQuery collection
	var col = jQuery('selector');
	col.each(function(i) { if ($(this).hasScroll()) { /* do work */ } });
	
	//	a couple diff params available for slightly altered return
	ele.hasScroll(true); // return an object { horizontal: [bool], veritical: [bool] }
	ele.hasScroll('x') || ele.hasScroll('horizontal'); // will return bool based on if horizontal bar visible
	ele.hasScroll('y') || ele.hasScroll('vertical'); // will return bool based on if vertical bar visible
