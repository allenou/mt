(function(e){function t(t){for(var r,i,l=t[0],u=t[1],c=t[2],s=0,p=[];s<l.length;s++)i=l[s],a[i]&&p.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);f&&f(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var u=n[l];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/markdown/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var f=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("header",[n("p",[n("a",{attrs:{href:"/markdown"}},[e._v("Markdown  ")]),e.html?n("span",[e._v("to")]):e._e()]),e.html?n("ul",{staticClass:"types"},[n("li",{on:{click:e.toPDF}},[e._v("PDF")]),n("li",{on:{click:e.toPNG}},[e._v("PNG")]),n("li",{on:{click:e.toHTML}},[e._v("HTML")])]):e._e()]),e.html?n("main",[n("div",{ref:"html",staticClass:"content",staticStyle:{padding:"30px"},domProps:{innerHTML:e._s(e.html)}})]):n("label",{attrs:{for:"file"},on:{dragenter:function(e){e.preventDefault()},dragover:function(e){e.preventDefault()},drop:function(t){return t.stopPropagation(),t.preventDefault(),e.fileChange(t)}}},[e._m(0),n("input",{attrs:{type:"file",id:"file",accept:".md"},on:{change:function(t){return e.fileChange(t)}}})]),n("footer",[n("GitHubBadge",{staticClass:"badge",attrs:{slug:"allenou/markdown"}})],1)])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("i",{staticClass:"iconfont"},[e._v("")]),e._v("\n      Drag or select a file\n    ")])}],i=(n("7f7f"),n("795b")),l=n.n(i),u=n("0e54"),c=n.n(u),f=n("aeb1"),s=n.n(f),p=n("527f"),d=n.n(p),h=n("d67e"),m=n.n(h),v=n("951f"),g=n.n(v),b={name:"app",components:{GitHubBadge:d.a},data:function(){return{html:"",name:"file",file:null}},methods:{fileChange:function(e){"change"===e.type&&this.previewMarkdown(e.target.files[0]),"drop"===e.type&&this.previewMarkdown(e.dataTransfer.files[0])},readerFile:function(e){var t=new FileReader;return new l.a(function(n){t.readAsText(e,"UTF-8"),t.onload=function(){n(this.result)}})},previewMarkdown:function(e){var t=this;this.readerFile(e).then(function(e){t.html=c()(e)})},toHTML:function(){var e=new Blob([document.querySelector("main").innerHTML]);s()(e,this.name+".html","text/html")},toPNG:function(){var e=this;g()(document.querySelector(".content")).then(function(t){var n=t.toDataURL("image/png",1);s()(n,e.name,"images/png")})},toPDF:function(){var e={margin:[.2,0,.2,0],filename:this.name+".pdf",pagebreak:{mode:["avoid-all"]},image:{type:"jpeg",quality:1},html2canvas:{scale:2},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}};m()().set(e).from(document.querySelector(".content")).save()}}},y=b,w=(n("034f"),n("2877")),_=Object(w["a"])(y,a,o,!1,null,null,null),P=_.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(P)}}).$mount("#app")},"64a9":function(e,t,n){}});
//# sourceMappingURL=app.4d5a3d19.js.map