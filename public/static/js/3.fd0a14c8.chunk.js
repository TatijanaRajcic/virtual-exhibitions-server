(window.webpackJsonptestsvrf=window.webpackJsonptestsvrf||[]).push([[3],{112:function(e,t,a){},113:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return b});var o=a(2),r=a(3),n=a(5),s=a(4),l=a(1),c=a(6),i=a(0),u=a.n(i),d=(a(112),a(7)),h=a(44),p=a.n(h),b=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(n.a)(this,Object(s.a)(t).call(this,e))).state={error:null,loaded:!1},a.chooseBackground=a.chooseBackground.bind(Object(l.a)(a)),a.loadHandler=a.loadHandler.bind(Object(l.a)(a)),a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"loadHandler",value:function(){this.setState({loaded:!0})}},{key:"chooseBackground",value:function(){var e=this;return Object(d.a)({method:"POST",baseURL:"https://virtual-exhibitions.herokuapp.com/api",url:"/exhibition/create",data:{background_image:this.props.embedUrl}}).then(function(){e.setState({error:""}),e.props.history.push("/images")}).catch(function(t){e.setState({error:t.response.data.message}),"Forbidden"===t.response.data.message&&e.props.history.push("/login")})}},{key:"render",value:function(){return u.a.createElement("div",{className:"BgItem"},u.a.createElement(p.a,null,u.a.createElement("iframe",{height:"250px",scrolling:"no",style:{display:this.state.loaded?"block":"none"},onLoad:this.loadHandler,src:this.props.embedUrl,frameborder:"0",allowvr:"yes",allow:"vr; xr; accelerometer; magnetometer; gyroscope; autoplay;",allowfullscreen:!0,mozallowfullscreen:"true",webkitallowfullscreen:"true",onmousewheel:""})),u.a.createElement("button",{className:"bg-btn",onClick:this.chooseBackground},"select"))}}]),t}(i.Component)}}]);
//# sourceMappingURL=3.fd0a14c8.chunk.js.map