(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a3f3d25c"],{1799:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{attrs:{"aria-label":"Page navigation example"}},[a("ul",{staticClass:"pagination"},[a("li",{staticClass:"page-item",class:{disabled:1===t.pages.current_page}},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.emitPages(t.pages.current_page-1)}}},[t._v("Previous")])]),t._l(t.pages.total_pages,(function(e){return a("li",{key:e,staticClass:"page-item",class:{active:t.pages.current_page===e}},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.emitPages(e)}}},[t._v(t._s(e))])])})),a("li",{staticClass:"page-item",class:{disabled:t.pages.current_page===t.pages.total_pages}},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.emitPages(t.pages.current_page+1)}}},[t._v("Next")])])],2)])},i=[],n={name:"Pagination",props:["pages"],methods:{emitPages:function(t){this.$emit("emit-pages",t)}}},c=n,r=a("2877"),o=Object(r["a"])(c,s,i,!1,null,null,null);e["a"]=o.exports},"67e3":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container mt-3"},[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),a("table",{staticClass:"table mt-4"},[t._m(0),a("tbody",t._l(t.ordersList,(function(e,s){return a("tr",{key:e.id},[a("td",[t._v(t._s(e.created.datetime))]),a("td",[t._v(t._s(e.products[0].product.title))]),a("td",[t._v(t._s(e.payment))]),a("td",[t._v(t._s(e.amount))]),a("td",[a("div",{staticClass:"custom-control custom-switch"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.isChecked,expression:"isChecked"}],staticClass:"custom-control-input",attrs:{id:"#customSwitch"+(s+1),type:"checkbox"},domProps:{checked:Array.isArray(t.isChecked)?t._i(t.isChecked,null)>-1:t.isChecked},on:{change:function(e){var a=t.isChecked,s=e.target,i=!!s.checked;if(Array.isArray(a)){var n=null,c=t._i(a,n);s.checked?c<0&&(t.isChecked=a.concat([n])):c>-1&&(t.isChecked=a.slice(0,c).concat(a.slice(c+1)))}else t.isChecked=i}}}),a("label",{staticClass:"custom-control-label",attrs:{for:"#customSwitch"+(s+1)}}),t.isChecked?a("span",[t._v("已付款")]):a("span",[t._v("尚未付款")])])])])})),0)]),a("pagination",{attrs:{pages:t.pagination},on:{"emit-pages":t.getOrders}})],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("下單時間")]),a("th",[t._v("購買款項")]),a("th",[t._v("付款方式")]),a("th",[t._v("應付金額")]),a("th",[t._v("是否付款")])])])}],n=(a("99af"),a("1799")),c={components:{Pagination:n["a"]},data:function(){return{isLoading:!1,ordersList:{},isChecked:!1,pagination:{}}},methods:{getOrders:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0;var a="".concat("https://course-ec-api.hexschool.io/api","/").concat("3802fa0c-830d-47a0-a19f-9616c3fcd8ae","/admin/ec/orders?page=").concat(e);this.$http.get(a).then((function(e){console.log(e),t.ordersList=e.data.data,t.pagination=e.data.meta.pagination,t.isLoading=!1})).catch((function(t){return console.log(t)}))}},created:function(){this.getOrders()}},r=c,o=a("2877"),l=Object(o["a"])(r,s,i,!1,null,null,null);e["default"]=l.exports},"99af":function(t,e,a){"use strict";var s=a("23e7"),i=a("d039"),n=a("e8b5"),c=a("861d"),r=a("7b0b"),o=a("50c4"),l=a("8418"),d=a("65f0"),u=a("1dde"),p=a("b622"),g=a("2d00"),h=p("isConcatSpreadable"),f=9007199254740991,v="Maximum allowed index exceeded",m=g>=51||!i((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),_=u("concat"),k=function(t){if(!c(t))return!1;var e=t[h];return void 0!==e?!!e:n(t)},C=!m||!_;s({target:"Array",proto:!0,forced:C},{concat:function(t){var e,a,s,i,n,c=r(this),u=d(c,0),p=0;for(e=-1,s=arguments.length;e<s;e++)if(n=-1===e?c:arguments[e],k(n)){if(i=o(n.length),p+i>f)throw TypeError(v);for(a=0;a<i;a++,p++)a in n&&l(u,p,n[a])}else{if(p>=f)throw TypeError(v);l(u,p++,n)}return u.length=p,u}})}}]);
//# sourceMappingURL=chunk-a3f3d25c.d71767f2.js.map