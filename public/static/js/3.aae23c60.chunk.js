(window.webpackJsonptestsvrf=window.webpackJsonptestsvrf||[]).push([[3],{111:function(e,t,a){},112:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return b});var n=a(2),o=a(3),r=a(5),s=a(4),c=a(1),i=a(6),l=a(0),d=a.n(l),u=(a(111),a(7)),h=a(43),p=a.n(h),b=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={error:null,loaded:!1},a.chooseBackground=a.chooseBackground.bind(Object(c.a)(a)),a.loadHandler=a.loadHandler.bind(Object(c.a)(a)),a}return Object(i.a)(t,e),Object(o.a)(t,[{key:"loadHandler",value:function(){this.setState({loaded:!0})}},{key:"chooseBackground",value:function(){var e=this;return Object(u.a)({method:"POST",baseURL:"https://virtual-exhibitions.herokuapp.com/api",url:"/exhibition/create",data:{background_image:this.props.embedUrl}}).then(function(){e.setState({error:""}),e.props.history.push("/images")}).catch(function(t){e.setState({error:t.response.data.message}),"Forbidden"===t.response.data.message&&e.props.history.push("/login")})}},{key:"render",value:function(){return d.a.createElement("div",{className:"BgItem"},d.a.createElement(p.a,null,d.a.createElement("iframe",{sandbox:"allow-scripts",style:{display:this.state.loaded?"block":"none"},onLoad:this.loadHandler,src:this.props.embedUrl,allowFullScreen:!0})),d.a.createElement("button",{className:"BgButton",onClick:this.chooseBackground},"select"))}}]),t}(l.Component)}}]);
//# sourceMappingURL=3.aae23c60.chunk.js.map