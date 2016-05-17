/*	Element.prototype.hasScroll	*/
;(function() {	//	simple method for determining if an element has visible scroll bars
	//	x == horizontal
	function hasScroll() {
		var args = Array.prototype.slice.call(arguments, 0),
			ele = [], type;
		
		for (var x in args) {
			switch (typeof args[x]) {
				case 'boolean': type = args[x]; break;
				case 'string':
					if (void 0 === type) {
						if (/^horizontal|x$/i.test(args[x])) type = 'x';
						else if (/^veritcal|y$/i.test(args[x])) type = 'y';
						else if (/^all|both$/i.test(args[x])) type = true;
					}
					break;
				case 'object':
					if (args[x] instanceof Array) ele = ele.concat(args[x]);
					if (args[x] instanceof HTMLCollection) ele = ele.concat(Array.prototype.slice.call(args[x], 0));
					if (args[x] instanceof Element) ele.push(args[x]);
					break;
			}
		}
		
		if (ele) {
			if (ele.length == 1) {
				switch (type) {
					case 'x': return hasScrollX(ele[0]); break;
					case 'y': return hasScrollY(ele[0]); break;
					case true: return { horizontal: hasScrollX(ele[0]), vertical: hasScrollY(ele[0]) }; break;
					default: return hasScrollX(ele[0]) || hasScrollY(ele[0]);
				}
			}
			else {
				var ret = {};
				for (var x in ele) {
					var e = ele[x];
					if (e instanceof Element) {
						ret[x] = { ele: e };
						switch (type) {
							case 'x': ret[x]['hasScroll'] = hasScrollX(ele[0]); break;
							case 'y': ret[x]['hasScroll'] = hasScrollY(ele[0]); break;
							case true: ret[x]['hasScroll'] = { horizontal: hasScrollX(ele[0]), vertical: hasScrollY(ele[0]) }; break;
							default: ret[x]['hasScroll'] = hasScrollX(ele[0]) || hasScrollY(ele[0]);
						}
					}
				}
				return ret;
			}
		}
		return void 0;
	}
	
	function hasScrollX(ele) { return (ele.scrollWidth > ele.clientWidth) && (getComputedStyle(ele)['overflowX'] != 'hidden') }	//	horizontal
	function hasScrollY(ele) { return (ele.scrollHeight > ele.clientHeight) && (getComputedStyle(ele)['overflowY'] != 'hidden') }	//	vertical
	
	//	add as window variable
	window.hasOwnProperty("hasScroll")||(window.matchUrl=hasScroll);
	
	//	add as method of a Element|HTMLCollection|Array ( exp: ele.hasScroll(); )
	var name = 'hasScroll';
	function method() {
		var args = Array.prototype.slice.call(arguments, 0);
		return hasScroll.apply(this, args.concat([this]))
	}
	Object['defineProperty'] && !Element.prototype.hasOwnProperty(name)
		? Object.defineProperty(Element.prototype, name, { value: method }) : Element.prototype[name] = method;
	Object['defineProperty'] && !HTMLCollection.prototype.hasOwnProperty(name)
		? Object.defineProperty(HTMLCollection.prototype, name, { value: method }) : HTMLCollection.prototype[name] = method;
	Object['defineProperty'] && !Array.prototype.hasOwnProperty(name)
		? Object.defineProperty(Array.prototype, name, { value: method }) : Array.prototype[name] = method;
	
	//	add as a jQuery extension
	try {
		if (window.hasOwnProperty('jQuery') && jQuery) {
			jQuery.hasScroll || (jQuery.extend({
				hasScroll: function() {
					var args = Array.prototype.slice.call(arguments, 0),
						nArgs = [];
					for (var x in args) {
						if (args[x] instanceof jQuery) args[x].each(function(i) { if (this instanceof Element) nArgs.push(this); });
						else if (args[x] instanceof Element) nArgs.push(args[x]);
						else if (args[x] instanceof HTMLCollection) nArgs = nArgs.concat(args[x]);
						else if (/boolean|string/.test(typeof args[x])) nArgs.push(args[x]);
					}
					return hasScroll.apply(window, nArgs);
				}
			}),
			jQuery.fn.extend({
				hasScroll: function() {
					var args = Array.prototype.slice.call(arguments, 0);
					return jQuery.hasScroll.apply(this, args.concat([jQuery(this)]))
				}
			}))
		}
	}
	catch (err) {}
})();
