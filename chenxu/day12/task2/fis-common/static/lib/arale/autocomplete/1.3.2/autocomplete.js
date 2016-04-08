define("arale/autocomplete/1.3.2/autocomplete",["$","arale/overlay/1.1.2/overlay","arale/position/1.0.1/position","arale/iframe-shim/1.0.2/iframe-shim","arale/widget/1.1.1/widget","arale/base/1.1.1/base","arale/class/1.1.0/class","arale/events/1.1.0/events","arale/templatable/0.9.2/templatable","gallery/handlebars/1.0.2/handlebars","./data-source","./filter","./input","./autocomplete.handlebars"],function(a,b,c){function d(a){return"[object String]"===Object.prototype.toString.call(a)}function e(a){return"[object Object]"===Object.prototype.toString.call(a)}function f(a,b){if(a){if(k.isFunction(a))return a.call(this,b);if(!k.isArray(b)&&d(a)){for(var c=a.split("."),e=b;c.length;){var f=c.shift();if(!e[f])break;e=e[f]}return e}}return b}function g(a){var b=[];return k.each(a,function(a,c){if(d(c))b.push({label:c,value:c,alias:[]});else if(e(c)){if(!c.value&&!c.label)return;c.value||(c.value=c.label),c.label||(c.label=c.value),c.alias||(c.alias=[]),b.push(c)}}),b}function h(a,b){return d(a)?a=o[a]?o[a]:o["default"]:k.isFunction(a)||(a="url"===b.get("type")?o["default"]:o.startsWith),a}function i(a){function b(a){for(var b in a)c[b]=a[b]}var c={};return b(this),b(a.hash),a.fn(c)}function j(a){var b=this.highlightIndex,c=this.parent?this.parent.classPrefix:"",d=0,e=a||this.label||"",f="";if(k.isArray(b)){for(var g=0,h=b.length;h>g;g++){var i,j,l=b[g];if(k.isArray(l)?(i=l[0],j=l[1]-l[0]):(i=l,j=1),i>d&&(f+=e.substring(d,i)),i<e.length){var m=c?'class="'+c+'-item-hl"':"";f+="<span "+m+">"+e.substr(i,j)+"</span>"}if(d=i+j,d>=e.length)break}return e.length>d&&(f+=e.substring(d,e.length)),f}return e}var k=a("$"),l=a("arale/overlay/1.1.2/overlay"),m=a("arale/templatable/0.9.2/templatable"),n=a("./data-source"),o=a("./filter"),p=a("./input"),q=/\bMSIE [678]\.0\b/.test(navigator.userAgent),r=a("./autocomplete.handlebars"),s=l.extend({Implements:m,attrs:{trigger:null,classPrefix:"ui-select",align:{baseXY:[0,"100%"]},submitOnEnter:!0,dataSource:{value:[],getter:function(a){var b=this;return k.isFunction(a)?function(){a.apply(b,arguments)}:a}},locator:"data",filter:null,disabled:!1,selectFirst:!1,delay:100,model:{value:{items:[]},getter:function(a){return a.classPrefix||(a.classPrefix=this.get("classPrefix")),a}},template:r,footer:"",header:"",html:"{{{label}}}",selectedIndex:null,data:[]},events:{"mousedown [data-role=items]":"_handleMouseDown","click [data-role=item]":"_handleSelection","mouseenter [data-role=item]":"_handleMouseMove","mouseleave [data-role=item]":"_handleMouseMove"},templateHelpers:{highlightItem:j,include:i},parseElement:function(){var a=this;this.templatePartials||(this.templatePartials={}),k.each(["header","footer","html"],function(b,c){a.templatePartials[c]=a.get(c)}),s.superclass.parseElement.call(this)},setup:function(){s.superclass.setup.call(this),this._isOpen=!1,this._initInput(),this._initDataSource(),this._initFilter(),this._bindHandle(),this._blurHide([k(this.get("trigger"))]),this._tweakAlignDefaultValue(),this.on("indexChanged",function(a){var b=parseInt(this.get("height"),10);if(b){var c=this.items.parent().height()/this.items.length,d=Math.max(0,c*(a+1)-b);this.element.children().scrollTop(d)}})},show:function(){this._isOpen=!0,this._isEmpty()||s.superclass.show.call(this)},hide:function(){this._timeout&&clearTimeout(this._timeout),this.dataSource.abort(),this._hide()},destroy:function(){this._clear(),this.input&&(this.input.destroy(),this.input=null),s.superclass.destroy.call(this)},selectItem:function(a){this.items&&(a&&this.items.length>a&&a>=-1&&this.set("selectedIndex",a),this._handleSelection())},setInputValue:function(a){this.input.setValue(a)},_filterData:function(a){var b=this.get("filter"),c=this.get("locator");a=f(c,a),a=b.call(this,g(a),this.input.get("query")),this.set("data",a)},_onRenderData:function(a){a||(a=[]),this.set("model",{items:a,query:this.input.get("query"),length:a.length}),this.renderPartial(),this.items=this.$("[data-role=items]").children(),this.get("selectFirst")&&this.set("selectedIndex",0),this._isOpen&&this.show()},_onRenderSelectedIndex:function(a){var b=this.get("classPrefix")+"-item-hover";this.items&&this.items.removeClass(b),-1!==a&&(this.items.eq(a).addClass(b),this.trigger("indexChanged",a,this.lastIndex),this.lastIndex=a)},_initDataSource:function(){this.dataSource=new n({source:this.get("dataSource")})},_initInput:function(){this.input=new p({element:this.get("trigger"),delay:this.get("delay")})},_initFilter:function(){var a=this.get("filter");a=h(a,this.dataSource),this.set("filter",a)},_bindHandle:function(){this.dataSource.on("data",this._filterData,this),this.input.on("blur",this.hide,this).on("focus",this._handleFocus,this).on("keyEnter",this._handleSelection,this).on("keyEsc",this.hide,this).on("keyUp keyDown",this.show,this).on("keyUp keyDown",this._handleStep,this).on("queryChanged",this._clear,this).on("queryChanged",this._hide,this).on("queryChanged",this._handleQueryChange,this).on("queryChanged",this.show,this),this.after("hide",function(){this.set("selectedIndex",-1)}),this.on("itemSelected",function(){this._hide()})},_handleSelection:function(a){var b=a?"click"===a.type:!1,c=b?this.items.index(a.currentTarget):this.get("selectedIndex"),d=this.items.eq(c),e=this.get("data")[c];c>=0&&d&&(this.input.setValue(e.label),this.set("selectedIndex",c,{silent:!0}),!a||b||this.get("submitOnEnter")||a.preventDefault(),this.trigger("itemSelected",e,d))},_handleFocus:function(){this._isOpen=!0},_handleMouseMove:function(a){var b=this.get("classPrefix")+"-item-hover";if(this.items.removeClass(b),"mouseenter"===a.type){var c=this.items.index(a.currentTarget);this.set("selectedIndex",c,{silent:!0}),this.items.eq(c).addClass(b)}},_handleMouseDown:function(a){if(q){var b=this.input.get("element")[0];b.onbeforedeactivate=function(){window.event.returnValue=!1,b.onbeforedeactivate=null}}a.preventDefault()},_handleStep:function(a){a.preventDefault(),this.get("visible")&&this._step("keyUp"===a.type?-1:1)},_handleQueryChange:function(a){this.get("disabled")||(this.dataSource.abort(),this.dataSource.getData(a))},_step:function(a){var b=this.get("selectedIndex");-1===a?b>-1?this.set("selectedIndex",b-1):this.set("selectedIndex",this.items.length-1):1===a&&(b<this.items.length-1?this.set("selectedIndex",b+1):this.set("selectedIndex",-1))},_clear:function(){this.$("[data-role=items]").empty(),this.set("selectedIndex",-1),delete this.items,delete this.lastIndex},_hide:function(){this._isOpen=!1,s.superclass.hide.call(this)},_isEmpty:function(){var a=this.get("data");return!(a&&a.length>0)},_tweakAlignDefaultValue:function(){var a=this.get("align");a.baseElement=this.get("trigger"),this.set("align",a)}});c.exports=s}),define("arale/autocomplete/1.3.2/data-source",["arale/base/1.1.1/base","arale/class/1.1.0/class","arale/events/1.1.0/events","$"],function(a,b,c){function d(a){return"[object String]"===Object.prototype.toString.call(a)}function e(a){return a.replace(/^([a-z])/,function(a,b){return b.toUpperCase()})}var f=a("arale/base/1.1.1/base"),g=a("$"),h=f.extend({attrs:{source:null,type:"array"},initialize:function(a){h.superclass.initialize.call(this,a),this.id=0,this.callbacks=[];var b=this.get("source");if(d(b))this.set("type","url");else if(g.isArray(b))this.set("type","array");else if(g.isPlainObject(b))this.set("type","object");else{if(!g.isFunction(b))throw new Error("Source Type Error");this.set("type","function")}},getData:function(a){return this["_get"+e(this.get("type")||"")+"Data"](a)},abort:function(){this.callbacks=[]},_done:function(a){this.trigger("data",a)},_getUrlData:function(a){var b,c=this,d={query:a?encodeURIComponent(a):"",timestamp:(new Date).getTime()},e=this.get("source").replace(/\{\{(.*?)\}\}/g,function(a,b){return d[b]}),f="callback_"+this.id++;this.callbacks.push(f),b=/^(https?:\/\/)/.test(e)?{dataType:"jsonp"}:{dataType:"json"},g.ajax(e,b).success(function(a){g.inArray(f,c.callbacks)>-1&&(delete c.callbacks[f],c._done(a))}).error(function(){g.inArray(f,c.callbacks)>-1&&(delete c.callbacks[f],c._done({}))})},_getArrayData:function(){var a=this.get("source");return this._done(a),a},_getObjectData:function(){var a=this.get("source");return this._done(a),a},_getFunctionData:function(a){function b(a){c._done(a)}var c=this,d=this.get("source"),e=d.call(this,a,b);e&&this._done(e)}});c.exports=h}),define("arale/autocomplete/1.3.2/filter",["$"],function(a,b,c){function d(a){return(a||"").replace(h,"\\$1")}function e(a,b){for(var c=[],d=a.split(""),e=0,f=b.split(""),g=0,h=d.length;h>g;g++){var i=d[g];if(i===f[e]){if(e===f.length-1){c.push([g-f.length+1,g+1]),e=0;continue}e++}else e=0}return c}var f=a("$"),g={"default":function(a){return a},startsWith:function(a,b){b=b||"";var c=[],e=b.length,g=new RegExp("^"+d(b));return e?(f.each(a,function(a,b){for(var d,f=[b.value].concat(b.alias);d=f.shift();)if(g.test(d)){b.label===d&&(b.highlightIndex=[[0,e]]),c.push(b);break}}),c):[]},stringMatch:function(a,b){b=b||"";var c=[],d=b.length;return d?(f.each(a,function(a,d){for(var f,g=[d.value].concat(d.alias);f=g.shift();)if(f.indexOf(b)>-1){d.label===f&&(d.highlightIndex=e(f,b)),c.push(d);break}}),c):[]}};c.exports=g;var h=/(\[|\[|\]|\^|\$|\||\(|\)|\{|\}|\+|\*|\?|\\)/g}),define("arale/autocomplete/1.3.2/input",["$","arale/base/1.1.1/base","arale/class/1.1.0/class","arale/events/1.1.0/events"],function(a,b,c){function d(a,b){return function(){a.apply(b,arguments)}}function e(a,b){return a=(a||"").replace(/^\s*/g,"").replace(/\s{2,}/g," "),b=(b||"").replace(/^\s*/g,"").replace(/\s{2,}/g," "),a===b}function f(a){return a.charAt(0).toUpperCase()+a.substring(1)}var g=a("$"),h=a("arale/base/1.1.1/base"),i=/\bMSIE [6789]\.0\b/.test(navigator.userAgent),j={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},k=h.extend({attrs:{element:{value:null,setter:function(a){return g(a)}},query:null,delay:100},initialize:function(){k.superclass.initialize.apply(this,arguments),this._bindEvents(),this.set("query",this.getValue())},focus:function(){this.get("element").focus()},getValue:function(){return this.get("element").val()},setValue:function(a,b){this.get("element").val(a),!b&&this._change()},destroy:function(){k.superclass.destroy.call(this)},_bindEvents:function(){var a,b=this.get("element");if(b.attr("autocomplete","off").on("focus.autocomplete",d(this._handleFocus,this)).on("blur.autocomplete",d(this._handleBlur,this)).on("keydown.autocomplete",d(this._handleKeydown,this)),i){var c=this,e=["keydown.autocomplete","keypress.autocomplete","cut.autocomplete","paste.autocomplete"].join(" ");b.on(e,d(function(b){j[b.which]||(clearTimeout(a),a=setTimeout(function(){c._change.call(c,b)},this.get("delay")))},this))}else b.on("input.autocomplete",d(this._change,this))},_change:function(){var a=this.getValue(),b=this.get("query"),c=e(b,a),d=c?a.length!==b.length:!1;d&&this.trigger("whitespaceChanged",b),c||(this.set("query",a),this.trigger("queryChanged",a,b))},_handleFocus:function(a){this.trigger("focus",a)},_handleBlur:function(a){this.trigger("blur",a)},_handleKeydown:function(a){var b=j[a.which];if(b){var c="key"+f(b);this.trigger(a.type=c,a)}}});c.exports=k}),define("arale/autocomplete/1.3.2/autocomplete.handlebars",["gallery/handlebars/1.0.2/runtime"],function(a,b,c){var d=a("gallery/handlebars/1.0.2/runtime"),e=d.template;c.exports=e(function(a,b,c,d,e){function f(a,b,d){var e,f,h,i="";return i+='\n      <li data-role="item" class="'+m((e=d.classPrefix,typeof e===l?e.apply(a):e))+'-item">\n        <a href="javascript:\\\'\\\'">\n        ',h={hash:{parent:d},inverse:k.noop,fn:k.program(2,g,b),data:b},e=c.include,f=e?e.call(a,h):n.call(a,"include",h),(f||0===f)&&(i+=f),i+="\n        </a>\n      </li>\n    "}function g(a,b){var e;return e=k.invokePartial(d.html,"html",a,c,d,b),e||0===e?e:""}this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||{};for(var h in a.helpers)c[h]=c[h]||a.helpers[h];d=d||a.partials,e=e||{};var i,j="",k=this,l="function",m=this.escapeExpression,n=c.helperMissing;return j+='<div class="',(i=c.classPrefix)?i=i.call(b,{hash:{},data:e}):(i=b.classPrefix,i=typeof i===l?i.apply(b):i),j+=m(i)+'">\n  <div class="',(i=c.classPrefix)?i=i.call(b,{hash:{},data:e}):(i=b.classPrefix,i=typeof i===l?i.apply(b):i),j+=m(i)+'-content">\n    ',i=k.invokePartial(d.header,"header",b,c,d,e),(i||0===i)&&(j+=i),j+='\n    <ul data-role="items">\n    ',i=c.each.call(b,b.items,{hash:{},inverse:k.noop,fn:k.programWithDepth(1,f,e,b),data:e}),(i||0===i)&&(j+=i),j+="\n    </ul>\n    ",i=k.invokePartial(d.footer,"footer",b,c,d,e),(i||0===i)&&(j+=i),j+="\n  </div>\n</div>\n"})});
