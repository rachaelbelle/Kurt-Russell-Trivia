var __extends=this&&this.__extends||function(){var n=function(t,i){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])},n(t,i)};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}}(),__assign,Multimedia,ImageDetailSwipe;(function(n){var t;(function(t){var u=ImageVisualSearchCropBox.CropBoxClientConfig,i=MmGeometry.Rectangle,f=VisualSearchCropBoxUtils.OverlayView,e=n.ImageDetailUtils.setCropBoxAnimationProperty,o=n.ImageDetailUtils.isRTL,s=n.ImageDetailUtils.calculateRegionDifference,r=ImageDetailReducers,h=function(n){function h(){var t=n.call(this)||this;return t.lastCropCoordinates=null,t.cropBoxAnimationTime=1e3,t.px="px",t.startAnimationClassName="start",t.endAnimationClassName="end",t.readyAnimationClassName="ready",t.cropboxHintShown="mm.detail.crophint",t.isHintShown=!1,t.cropBoxContentAnimationTime=1e3,t.cropBoxHintAnimationTime=3500,t.animationsRunning=!0,t.mouseButtonDown=!1,t.multiTouchMove=!1,t.containerHeight=null,t.containerWidth=null,t.hint=null,t.cropConfig=null,t.componentWillUnmount=function(){t.setSessionStorage();t.handleEventsSetting(!1)},t.setSessionStorage=function(){t.isHintShown||typeof sessionStorage=="undefined"||(sessionStorage.setItem(t.cropboxHintShown,"1"),t.isHintShown=!0)},t.getViewRect=function(){if(!t.imageElement)return null;var n=t.imageElement.clientLeft,r=t.imageElement.clientTop,u=Math.min(t.imageElement.clientWidth,t.containerWidth),f=Math.min(t.imageElement.clientHeight,t.containerHeight),e={x:n,y:r},o={x:n+u,y:r+f};return new i(e,o)},t.getCropRect=function(n){if(!t.imageElement)return null;var o=t.imageElement.clientLeft,s=t.imageElement.clientTop,r=Math.min(t.imageElement.clientWidth,t.containerWidth),u=Math.min(t.imageElement.clientHeight,t.containerHeight),f=o+Math.round(r*n.left()),e=s+Math.round(u*n.top()),h=f+Math.round(r*n.width()),c=e+Math.round(u*n.height()),l={x:f,y:e},a={x:h,y:c};return new i(l,a)},t.start=function(n){t.overlayView!=null&&(t.startCropRect=t.overlayView.cropRect().clone(),t.overlayView.setStartPoint(n))},t.move=function(n){t.overlayView!=null&&t.startCropRect!=null&&(t.overlayView.setCurrPoint(n),t.overlayView.setCropRect(t.startCropRect.clone()),t.overlayView.update(),t.updateCropBoxStyle())},t.end=function(){t.throttleCropBoxChange()},t.cropBoxChange=function(){var n=t.getCropCoordinates(),i;n==null||t.isTinyChange(t.lastCropCoordinates,n)||(i={left:n.left(),top:n.top(),right:n.right(),bottom:n.bottom()},t.props.changeCropCoordinates(i),t.lastCropCoordinates=n)},t.setCropBoxState=function(n,r){t.startCropRect=new i(n,r);t.overlayView.setCropRect(t.startCropRect);t.overlayView.setStartPoint(n);t.overlayView.setCurrPoint(n);t.overlayView.update();t.updateCropBoxStyle()},t.updateCropBoxStyle=function(){if(t.overlayView!=null){var n=t.overlayView.cropRect();t.update(n)}},t.getCropCoordinates=function(){var u,r,n,f,e;return t.overlayView!=null&&(r=t.overlayView.cropRect(),n=t.overlayView.viewRect(),n.width()>0&&n.height()>0&&(f={x:r.left()/n.width(),y:r.top()/n.height()},e={x:r.right()/n.width(),y:r.bottom()/n.height()},u=new i(f,e))),u},t.isTinyChange=function(n,i){if(t.overlayView!=null&&t.overlayView.cropRect()!=null&&t.overlayView.cropRect().width()<=t.config.minDelta&&t.overlayView.cropRect().height()<=t.config.minDelta)return!0;if(n&&i){var r=s(n.transformToRegion(),i.transformToRegion());if(r<t.config.minDelta)return!0}return!1},t.throttle=function(n,t){var i,r;return function(){clearTimeout(r);var f=this,e=arguments,u=Number(new Date);i&&u<i+t?r=setTimeout(function(){i=u;n.apply(f,e)},i+t-u):(i=u,n.apply(f,e))}},t.cancelAnimation=function(n){n&&(n.classList.remove(t.startAnimationClassName),n.classList.add(t.endAnimationClassName))},t.startAnimation=function(n){n&&(n.classList.add(t.readyAnimationClassName),t.isAnimationEnabled()&&n.classList.add(t.startAnimationClassName))},t.endAnimation=function(n,i){if(n){var r=t.cancelAnimation;t.isAnimationEnabled()?setTimeout(function(){r(n)},i):t.cancelAnimation(n)}},t.setAnimations=function(){t.startAnimation(t.cropBox);t.startAnimation(t.cropBoxContent);t.startAnimation(t.cropBoxHint);t.endAnimation(t.cropBox,t.cropBoxAnimationTime);t.endAnimation(t.cropBoxContent,t.cropBoxContentAnimationTime);t.endAnimation(t.cropBoxHint,t.cropBoxHintAnimationTime)},t.cancelAnimations=function(){t.animationsRunning&&(t.cancelAnimation(t.cropBox),t.cancelAnimation(t.cropBoxContent),t.cancelAnimation(t.cropBoxHint));t.animationsRunning=!1},t.update=function(n){t.cropBox&&n&&(o?t.cropBox.style.right=n.left()+t.px:t.cropBox.style.left=n.left()+t.px,t.cropBox.style.top=n.top()+t.px,t.cropBox.style.width=n.width()+t.px,t.cropBox.style.height=n.height()+t.px)},t.getOffsetPosition=function(n,t,i){var r=n.getBoundingClientRect(),u=t-r.left,f=i-r.top;return{x:u,y:f}},t.getTouchPosition=function(n,i){return n&&n.touches?t.getOffsetPosition(t.imageElement,n.touches[i].clientX,n.touches[i].clientY):null},t.getMousePosition=function(n){return t.getOffsetPosition(t.imageElement,n.clientX,n.clientY)},t.onTouchStart=function(n){if(n&&n.touches)t.start(t.getTouchPosition(n,0));else t.onMouseDown(n)},t.onMouseDown=function(n){if(t.isPositionWithinBoundary(t.imageElement,n.clientX,n.clientY)){t.mouseButtonDown=!0;var i=t.getMousePosition(n);t.start(i)}},t.onTouchMove=function(n){if(n&&n.touches)if(t.config.enableMultiTouchRedraw&&n.touches.length>=2){t.multiTouchMove=!0;var i=t.getTouchPosition(n,0),r=t.getTouchPosition(n,1);t.setCropBoxState(i,r);t.stopPropagation(n)}else!t.multiTouchMove&&t.overlayView.isTransforming()&&(t.move(t.getTouchPosition(n,0)),t.stopPropagation(n));else t.onMouseMove(n)},t.onMouseMove=function(n){var i,r,u;t.mouseButtonDown&&(i=t.getMousePosition(n),t.overlayView.isTransforming()?t.move(i):t.config.enableMouseRedraw&&(r={x:i.x,y:i.y},u={x:i.x+1,y:i.y+1},t.setCropBoxState(r,u)),t.stopPropagation(n))},t.onTouchEnd=function(n){if(n&&n.touches)t.end(),n.touches.length===0&&(t.multiTouchMove=!1),t.stopPropagation(n);else t.onMouseUp(n)},t.onMouseUp=function(){t.mouseButtonDown=!1;typeof _w!="undefined"&&_w.getSelection().removeAllRanges();t.end()},t.isPositionWithinBoundary=function(n,t,i){var r=n.getBoundingClientRect();return t<r.left||t>r.right||i<r.top||i>r.bottom?!1:!0},t.handleEventsSetting=function(n){var i=n?sj_be:sj_ue;"ontouchstart"in sb_de?(i(t.imageElement,"touchstart",t.onTouchStart,!0),i(t.imageElement,"touchmove",t.onTouchMove,!0),i(t.imageElement,"touchend",t.onTouchEnd,!0)):window.navigator.msPointerEnabled?(t.imageElement.style.msTouchAction="none",t.imageElement.style.touchAction="none",i(t.imageElement,"MSPointerDown",t.onTouchStart,!0),i(t.imageElement,"MSPointerMove",t.onTouchMove,!0),i(t.imageElement,"MSPointerUp",t.onTouchEnd,!0),i(_d,"MSPointerUp",t.onTouchEnd,!0)):"onpointermove"in sb_de&&(t.imageElement.style.msTouchAction="none",t.imageElement.style.touchAction="none",i(t.imageElement,"pointerdown",t.onTouchStart,!0),i(t.imageElement,"pointermove",t.onTouchMove,!0),i(t.imageElement,"pointerup",t.onTouchEnd,!0),i(_d,"pointerup",t.onTouchEnd,!0));i(t.imageElement,"mousedown",t.onMouseDown,!0);i(t.imageElement,"mousemove",t.onMouseMove,!0);i(t.imageElement,"mouseup",t.onMouseUp,!0)},t.hint=r.getResourceString("VSHint"),t.cropConfig=r.getCropConfig(),t.isHintShown=typeof sessionStorage!="undefined"&&sessionStorage.getItem(t.cropboxHintShown)=="1",t}return __extends(h,n),h.prototype.componentWillMount=function(){this.props&&(this.config=new u(this.cropConfig),this.cropBoxAnimationTime=this.config.animationDuration,this.containerWidth=this.props.containerWidth,this.containerHeight=this.props.containerHeight)},h.prototype.componentDidMount=function(){var t,r,n;this.throttleCropBoxChange=this.throttle(this.cropBoxChange,this.config.eventTimeThreshold);t=this.props.cropCoordinates?this.props.cropCoordinates:this.config;r=new i({x:t.left,y:t.top},{x:t.right,y:t.bottom});this.overlayView=new f(this.getViewRect(),this.getCropRect(r),this.config);n=this.overlayView.cropRect();n&&e(n.width(),n.height(),n.left(),n.top());this.isAnimationEnabled()?setTimeout(this.updateCropBoxStyle,this.cropBoxAnimationTime):this.updateCropBoxStyle();this.setAnimations();this.props.cropCoordinates?this.lastCropCoordinates=r:this.throttleCropBoxChange();this.handleEventsSetting(!0)},h.prototype.componentWillReceiveProps=function(n){if(n.cropCoordinates&&this.overlayView!=null){var t=new i({x:n.cropCoordinates.left,y:n.cropCoordinates.top},{x:n.cropCoordinates.right,y:n.cropCoordinates.bottom});t.equals(this.lastCropCoordinates)&&this.containerHeight==n.containerHeight&&this.containerWidth==n.containerWidth||(this.overlayView.setViewRect(this.getViewRect()),this.overlayView.setCropRect(this.getCropRect(t)),this.updateCropBoxStyle(),this.containerHeight=n.containerHeight,this.containerWidth=n.containerWidth,this.setState({coordinates:t,containerHeight:n.containerHeight,containerWidth:n.containerWidth}))}},h.prototype.isAnimationEnabled=function(){return this.config.enableAnimations&&!this.props.isFromOverlayElement},h.prototype.isCloseButtonEnabled=function(){return this.config.enableCloseButton},h.prototype.stopPropagation=function(n){n.preventDefault();n.stopPropagation()},h.prototype.render=function(){var n=this,i="cropRect";return(i+=this.isCloseButtonEnabled()?" rb":"",this.props)?React.createElement("div",{id:"overlay_view",className:"overlayView",ref:function(t){n.imageElement=t}},React.createElement("div",{id:"crop_rect",className:i,ref:function(t){n.cropBox=t}},React.createElement("div",{className:"content",ref:function(t){n.cropBoxContent=t}},React.createElement("div",{className:"left"}),React.createElement("div",{className:"right"}),React.createElement("div",{className:"top"}),React.createElement("div",{className:"bottom"}),React.createElement("div",{className:"leftTop"}),React.createElement("div",{className:"rightTop"}),React.createElement("div",{className:"leftBottom"}),React.createElement("div",{className:"rightBottom"}),this.isCloseButtonEnabled()&&React.createElement(t.RemoveCropAction,{actionConfig:this.props.removeCropActionConfig,isCropBoxButton:!0}))),!this.isHintShown&&React.createElement("span",{className:"cropBoxHint",ref:function(t){n.cropBoxHint=t}},this.hint)):null},h}(React.Component),c=function(n){return{changeCropCoordinates:function(t){t&&n(ImageDetailActions.changeCropCoordinates(t))}}},l=function(n){var t=r.getIsHotspotClick(n)||r.getClickedEntity(n),i=r.getActionConfig(n,"RemoveCropAction");return{cropCoordinates:r.getCropCoordinates(n),isFromOverlayElement:t,removeCropActionConfig:i}};n.ImageDetail.ImageCropBox=ReactRedux.connect(l,c)(h)})(t=n.ImageDetail||(n.ImageDetail={}))})(Multimedia||(Multimedia={})),function(n){var t;(function(t){var r=SharedComponent.AccessibleComponent,i=ImageDetailReducers;n.ImageDetail.VisualSearchButton=function(u){if(u.onclick){var f=u.enableVSNotification&&!n.ImageDetailUtils.getVSNotificationCookie("0")?"show":"",e=i.getResourceString("VSNotificationTitle"),o=i.getResourceString("VSNotification");return React.createElement(r,{elementName:"span",id:"vsbutton",className:f,onClick:u.onclick,role:"button","aria-label":u.visualSearchTooltip,"data-tooltip":u.visualSearchTooltip},React.createElement("span",{className:"icon"}),u.enableVSNotification&&!n.ImageDetailUtils.getVSNotificationCookie("0")&&React.createElement(t.NotificationContainer,{notificationTitle:e,notificationText:o,getCookie:n.ImageDetailUtils.getVSNotificationCookie,setCookie:n.ImageDetailUtils.setVSNotificationCookie}))}return null};n.ImageDetail.VisualSearchButton.displayName="VisualSearchButton"})(t=n.ImageDetail||(n.ImageDetail={}))}(Multimedia||(Multimedia={}));__extends=this&&this.__extends||function(){var n=function(t,i){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])},n(t,i)};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}}();__assign=this&&this.__assign||function(){return __assign=Object.assign||function(n){for(var t,r,i=1,u=arguments.length;i<u;i++){t=arguments[i];for(r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},__assign.apply(this,arguments)},function(n){var t;(function(t){var u=n.InstrumentationUtils.l,f=ImageDetailReducers.getResourceString,e=ImageDetailActions.IImageDetailViewType,o=ImageDetailActions.IImageDetailOverlayElement,r=ImageDetailActions.IClickTarget,i=ImageDetailReducers,s=function(e){function o(t){var o=e.call(this,t)||this;return o.hotSpots=[],o.defaultHoverShown=!1,o.hoverTimeout=2e3,o.showHotspotClassName="show",o.hotSpotTooltip=null,o.isUnMounted=!1,o.changeCropCoordinatesAndLoadVisualSearch=function(n){if(n){o.props.changeCropCoordinates(n);o.props.changeSelectedModule();var t=ImageDetailActions.IImageDetailViewType.VisualSearch;o.props.viewType!==t&&(o.props.addToDetailStateHistory(),o.props.changeInsightsStatus(o.props.ig),o.props.changePageView())}},o.stopPropagation=function(n){n.stopPropagation();n.preventDefault()},o.handleUserAction=function(t,i){var e;o.stopPropagation(t);var s=o.props.detectedObjects[i].boundingBox,f=s,h="left:"+f.left+", top:"+f.top;o.props.imageData&&o.props.imageData.instInfo&&u(o.props.imageData.instInfo.appNS,o.props.imageData.instInfo.kValue,"CI.Click","ObjectDetectionHotSpot",o.props.ig,{Mid:o.props.imageData.id,Info:h});switch(o.clickTarget){case r.External:e={result:o.props.imageData,insightsViewState:{viewType:ImageDetailActions.IImageDetailViewType.VisualSearch},cropcoordinates:{top:f.top,bottom:f.bottom,left:f.left,right:f.right}};n.ImageDetailUtils.gecc(n.ImageDetailLocationUtils.getSearchByImageUploadUrl(e,!0))();break;default:o.changeCropCoordinatesAndLoadVisualSearch(f)}},o.runHotSpotRoutine=i.isMobileViewEnabled()?o.runMobileRoutine:o.runDesktopRoutine,o.hotspotDelay=t.config?t.config.ShowHotSpotDelay:1,o.hotSpotTooltip=f("HSTooltip"),o.clickTarget=t.config?t.config.ClickTarget:r.DetailPage,o}return __extends(o,e),o.prototype.runDesktopRoutine=function(){var t=this,i,r;if(this.defaultHoverShown){if(this.props&&this.props.config&&this.props.config.EnableFlash){for(i=0;i<this.hotSpots.length;i++)r=this.hotSpots[i],r.style.animationName="",r.style.webkitAnimationName="";setTimeout(function(){for(var i,n=0;n<t.hotSpots.length;n++)i=t.hotSpots[n],i.style.animationName="flash",i.style.webkitAnimationName="flash"},1)}}else(!this.props.enableVSNotification||n.ImageDetailUtils.getHSNotificationCookie("0"))&&setTimeout(function(){t.defaultHoverShown=!0;t.isUnMounted||t.setState({defaultHoverShown:t.defaultHoverShown})},this.hoverTimeout)},o.prototype.runMobileRoutine=function(){for(var i,n=this,t=0;t<this.hotSpots.length;t++)i=this.hotSpots[t],i.classList.remove(this.showHotspotClassName);setTimeout(function(){for(var i,t=0;t<n.hotSpots.length;t++)i=n.hotSpots[t],i.classList.add(n.showHotspotClassName)},this.hotspotDelay)},o.prototype.componentDidMount=function(){this.hotSpots&&this.hotSpots.length>0&&this.runHotSpotRoutine()},o.prototype.componentWillUpdate=function(){this.hotSpots=[]},o.prototype.componentDidUpdate=function(){this.hotSpots&&this.hotSpots.length>0&&this.runHotSpotRoutine()},o.prototype.componentWillUnmount=function(){this.isUnMounted=!0},o.prototype.render=function(){var r=this,u=ImageDetailActions.IImageDetailViewType.VisualSearch,o=!this.props.enableVSNotification||this.props.viewType==u||n.ImageDetailUtils.getVSNotificationCookie("0"),f=!this.props.enableVSNotification||this.props.viewType!=u||n.ImageDetailUtils.getHSNotificationCookie("0");if(this.props&&this.props.config&&this.props.config.Enabled&&this.props.detectedObjects&&this.props.detectedObjects.length>0&&o){var e=this.props.config.EnableTooltip&&f?this.hotSpotTooltip:"",s=e?{"data-tooltip":e}:{},h=i.getResourceString("HSNotification"),c=!f||this.props.showHotspotWithoutHover?"obj_det_container show":"obj_det_container";return React.createElement("div",{className:c,id:"obj_det_container"},this.props.detectedObjects.map(function(i,f){if(i.hotspot){var e=f==0&&r.props.config.EnableNotification&&!r.defaultHoverShown?"obj_det hover":"obj_det",o={left:i.hotspot.left*100+"%",top:i.hotspot.top*100+"%"};return React.createElement("span",__assign({},s,{className:e,key:f,style:o,onMouseDown:function(n){return r.handleUserAction(n,f)},onTouchEnd:function(n){return r.handleUserAction(n,f)},ref:function(n){n&&r.hotSpots.push(n)}}),React.createElement("span",{className:"core"}),r.props.enableVSNotification&&r.props.viewType==u&&f==0&&React.createElement(t.NotificationContainer,{notificationTitle:null,notificationText:h,getCookie:n.ImageDetailUtils.getHSNotificationCookie,setCookie:n.ImageDetailUtils.setHSNotificationCookie}))}}))}return null},o}(React.Component),h=function(n){return{changeCropCoordinates:function(t){n(ImageDetailActions.changeCropCoordinates(t,!0))},addToDetailStateHistory:function(){n(ImageDetailActions.addToDetailStateHistory())},changePageView:function(){n(ImageDetailActions.changePageView(e.VisualSearch))},changeSelectedModule:function(){n(ImageDetailActions.changeInsightsSelectedModule("similarproduct"))},changeInsightsStatus:function(t){n(ImageDetailActions.changeInsightStatus(!0,t,"ObjectDetection"))}}},c=function(n){var t=i.getCurrentResult(n),u=i.getPageConfig().disAdltSimImg,f=u&&t&&t.isAdult?null:i.getDetectedObjects(n),r=i.getVisibleOverlayElements(n),e=r&&r.some(function(n){return n.type==o.Hotspot&&n.id==null});return{detectedObjects:f,config:i.getObjectDetectionConfig(n),detailScenario:i.getDetailScenario(n),showHotspotWithoutHover:e,imageData:t,viewType:i.getViewType(n),ig:i.getCurrentImpressionId(n)}};n.ImageDetail.ObjectDetection=ReactRedux.connect(c,h)(s);n.ImageDetail.ObjectDetection.displayName="ObjectDetection"})(t=n.ImageDetail||(n.ImageDetail={}))}(Multimedia||(Multimedia={}));__extends=this&&this.__extends||function(){var n=function(t,i){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])},n(t,i)};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}}(),function(n){var t;(function(t){var e=n.ImageDetailUtils.getMouseClickPosition,o=n.ImageDetailUtils.getParentContainer,s=n.InstrumentationUtils.l,u=ImageDetailActions.IImageDetailViewType,f=ImageDetailActions.IImageDetailOverlayElement,i=ImageDetailReducers,r=i.gentc(),h=function(n){function f(t){var f=n.call(this,t)||this;return f.entities=[],f.isEventListenerAttached=!1,f.isAnimationShown=!1,f.entityModuleEnabled=!1,f.visualSearchOnClickEnabled=!1,f.config=null,f.dismissEntityPane=function(){f.setState({clickedElement:null,style:null});typeof document!="undefined"&&(f.isEventListenerAttached=!1,document.removeEventListener("click",f.dismissEntityPane),document.removeEventListener("touchend",f.dismissEntityPane))},f.changeCropCoordinatesAndLoadVisualSearch=function(n,t){if(n){f.props.changeCropCoordinates(n,t);f.props.changeSelectedModule();var i=u.VisualSearch;f.props.viewType!==i&&(f.props.addToDetailStateHistory(),f.props.changeInsightsStatus(f.props.ig),f.props.changePageView())}},f.stopPropagation=function(n){n.stopPropagation();n.preventDefault()},f.handleOnClick=function(n,t){var i,o,h;if(f.entityModuleEnabled&&f.visualSearchOnClickEnabled){f.stopPropagation(n);var r=f.props.recognizedObjects[t],u=r.entity.bingId,c=r.region;f.props.changeEntityVisibility(!1,u);f.changeCropCoordinatesAndLoadVisualSearch(c,u)}else{if(f.isEventListenerAttached)return;f.stopPropagation(n);i=e(n,f.config.EntityPaneXOffset,f.config.EntityPaneYOffset);o=sj_et(n);i=f.adjustPositionToParent(o,i);h=f.props.recognizedObjects[t];f.setState({clickedElement:h,style:{left:i[0]+"px",top:i[1]+"px",width:f.config.EntityPaneWidth+"px",height:f.config.EntityPaneHeight+"px"}});typeof document!="undefined"&&(f.isEventListenerAttached=!0,document.addEventListener("click",f.dismissEntityPane),document.addEventListener("touchend",f.dismissEntityPane))}f.props.imageData&&f.props.imageData.instInfo&&s(f.props.imageData.instInfo.appNS,f.props.imageData.instInfo.kValue,"CI.Click","objectRecognitionFaceRect",f.props.ig,{Mid:f.props.imageData.id})},f.onMouseOver=function(n){f.props.changeEntityVisibility(!0,n)},f.onMouseLeave=function(n){f.props.changeEntityVisibility(!1,n)},f.config=i.getObjectRecognitionConfig(),f.entityModuleEnabled=r!=null&&i.getMainImageConfig().EnableEntitiesModule,f.visualSearchOnClickEnabled=r&&r.EnableVSClick,f}return __extends(f,n),f.prototype.componentWillUpdate=function(){this.entities=[]},f.prototype.componentWillReceiveProps=function(){this.entities=[];this.isAnimationShown=!1;this.dismissEntityPane()},f.prototype.componentDidUpdate=function(){var t=this,n,i;if(this.entities&&this.entities.length>0&&!this.isAnimationShown&&this.config.EnableFlash){for(n=0;n<this.entities.length;n++)i=this.entities[n],i.style.animationName="",i.style.webkitAnimationName="";setTimeout(function(){for(var i,n=0;n<t.entities.length;n++)i=t.entities[n],i.style.animationName="flash",i.style.webkitAnimationName="flash";t.isAnimationShown=!0},1)}},f.prototype.componentWillUnMount=function(){typeof document!="undefined"&&this.isEventListenerAttached&&(document.removeEventListener("click",this.dismissEntityPane),document.removeEventListener("touchend",this.dismissEntityPane))},f.prototype.render=function(){var n=this,i;return this.config.Enabled&&this.props.recognizedObjects&&this.props.recognizedObjects.length>0?(i="obj_rec"+(this.props.showEntitiesWithoutHover?" show":""),React.createElement("div",{className:i,id:"obj_rec"},this.props.recognizedObjects.map(function(t,i){if(t.entity&&t.entity.imageUrl){var r=t.entity.bingId,u="feature objrec "+(n.props.visibleEntityId==r?" show":"")+(n.props.clickedEntityId==r?" hidden":""),f={left:t.region.left*100+"%",top:t.region.top*100+"%",width:(t.region.right-t.region.left)*100+"%",height:(t.region.bottom-t.region.top)*100+"%"};return React.createElement("span",{"data-index":i,className:u,key:i,style:f,onClick:function(t){return n.handleOnClick(t,i)},onMouseOver:n.entityModuleEnabled?function(){return n.onMouseOver(r)}:null,onMouseLeave:n.entityModuleEnabled?function(){return n.onMouseLeave(r)}:null,ref:function(t){t&&n.entities.push(t)}})}return null}),this.state&&this.state.clickedElement&&React.createElement(t.ImageEntityPane,{entity:this.state.clickedElement.entity,style:this.state.style,ig:this.props.ig,imageData:this.props.imageData}))):null},f.prototype.adjustPositionToParent=function(n,t){var r=o(n,"DIV","imgContainer");if(r){var i=r.getClientRects()[0],u=this.calculateNewPosition(t[0],this.config.EntityPaneWidth,i.left,i.right),f=this.calculateNewPosition(t[1],this.config.EntityPaneHeight,i.top,i.bottom);return[u,f]}return t},f.prototype.calculateNewPosition=function(n,t,i,r){var u,e,f;return n<0?0:(u=r-i,u<t)?u:(e=20,f=r-(i+n+t),f>0?n:Math.max(0,n+f-e))},f}(React.Component),c=function(n){return{changeCropCoordinates:function(t,i){n(ImageDetailActions.changeCropCoordinates(t,!1,i))},addToDetailStateHistory:function(){n(ImageDetailActions.addToDetailStateHistory())},changePageView:function(){n(ImageDetailActions.changePageView(u.VisualSearch))},changeSelectedModule:function(){n(ImageDetailActions.changeInsightsSelectedModule("entities"))},changeInsightsStatus:function(t){n(ImageDetailActions.changeInsightStatus(!0,t,"ObjectRecognition"))},changeEntityVisibility:function(t,i){var r=t?[{type:f.Entity,id:i}]:[];n(ImageDetailActions.changeVisibleOverlayElements(r))}}},l=function(n){var o=i.getCurrentResult(n),e=i.getRecognizedEntities(n,r!=null,r&&r.RemoveQueryEntity,!0),t=i.getVisibleOverlayElements(n,f.Entity),u=t&&t.length>0?t[0].id:null;return{recognizedObjects:e,imageData:i.getCurrentResult(n),ig:i.getCurrentImpressionId(n),viewType:i.getViewType(n),showEntitiesWithoutHover:t&&t.length>0&&u==null,visibleEntityId:u,clickedEntityId:i.getClickedEntity(n)}};n.ImageDetail.ObjectRecognition=ReactRedux.connect(l,c)(h);n.ImageDetail.ObjectRecognition.displayName="ObjectRecognition"})(t=n.ImageDetail||(n.ImageDetail={}))}(Multimedia||(Multimedia={})),function(n){var t=function(){function n(n,t,i,r,u,f,e,o,s){e===void 0&&(e=!0);o===void 0&&(o=5);s===void 0&&(s=!1);var h=this;if(this.utils=pMMUtils,this.moved=!1,this.doubletap=!1,this.touchStartPoint=null,this.touchStartElementLeft=0,this.nowtouchpid=0,this.swipeDelta=null,this.touchStartTime=0,this.timeDelta=0,this.captureEvent=!0,this.enableEndHandlerWithoutMove=!1,this.moveSensitivity=5,this.cleanUp=function(){h.handleEventsSetting(!1)},this.isMoved=function(){return h.moved},this.resetMoved=function(){h.moved=!1},this.handleEventsSetting=function(n){var t=n?sj_be:sj_ue;typeof sb_de!="undefined"&&("ontouchstart"in sb_de?(t(h.touchElement,"touchstart",h.touchStart,h.captureEvent),t(h.touchElement,"touchmove",h.touchMove,h.captureEvent),t(h.touchElement,"touchend",h.touchEnd,h.captureEvent)):window.navigator.msPointerEnabled?(h.touchElement.style.msTouchAction="none",h.touchElement.style.touchAction="none",t(h.touchElement,"MSPointerDown",h.touchStart,h.captureEvent),t(h.touchElement,"MSPointerMove",h.touchMove,h.captureEvent),t(h.touchElement,"MSPointerUp",h.touchEnd,h.captureEvent),t(_d,"MSPointerUp",h.touchEnd,h.captureEvent)):"onpointermove"in sb_de&&(h.touchElement.style.msTouchAction="none",h.touchElement.style.touchAction="none",t(h.touchElement,"pointerdown",h.touchStart,h.captureEvent),t(h.touchElement,"pointermove",h.touchMove,h.captureEvent),t(h.touchElement,"pointerup",h.touchEnd,h.captureEvent),t(_d,"pointerup",h.touchEnd,h.captureEvent)),t(_d,"mousedown",h.resetMoved,!0))},this.getHandlerOrEmpty=function(n){return n!=null?n:h.Empty},this.Empty=function(){},this.setMoved=function(n){n===void 0&&(n=!1);h.moved=n},this.checkIfDoubleTap=function(){return sb_gt()-h.touchStartTime<250&&!!h.doubleTapHandler&&!h.isMoved()},this.touchStart=function(n){if(h.isTouchEvent(n)&&(h.doubletap=h.checkIfDoubleTap(),!h.doubletap)){h.setMoved(!1);h.touchStartPoint=h.getTouchPointFromEvent(n);var t=h.utils.gcs(h.touchElement);h.touchStartElementLeft=parseInt(typeof _G!="undefined"&&_G.RTL?t.marginRight:t.marginLeft);h.touchStartTime=sb_gt();!n.pointerId||(h.nowtouchpid=n.pointerId);h.touchStartHandler(n)}},this.touchMove=function(n){if(h.isTouchEvent(n)&&h.isValidTouch(n)){var t=h.getTouchPointFromEvent(n);if(!h.touchStartPoint||!t)return;h.swipeDelta=h.getDistanceBetweenPoints(h.touchStartPoint,t);h.setMoved(Math.abs(h.swipeDelta.X)>h.moveSensitivity||Math.abs(h.swipeDelta.Y)>h.moveSensitivity);h.isMoved()&&!h.doubletap&&h.touchMoveHandler(h.touchStartElementLeft,h.swipeDelta)&&h.preventDefault(n)}},this.touchEnd=function(n){var t=h.isMoved(),i;h.isTouchEvent(n)&&(h.doubletap&&!h.isMoved()?(h.doubleTapHandler(n),h.preventDefault(n),h.doubletap=!1):(t||h.enableEndHandlerWithoutMove)&&h.isValidTouch(n)&&(h.timeDelta=sb_gt()-h.touchStartTime,i=t?h.swipeDelta:h.getNewPoint(),h.touchEndHandler(h.touchStartElementLeft,i,h.timeDelta)&&h.preventDefault(n)),sj_ue(_d,"mousedown",h.resetMoved,!0),sb_st(function(){sj_be(_d,"mousedown",this.resetMoved,!0)},150))},this.preventDefault=function(n){n.stopPropagation();n.preventDefault()},this.getTouchPointFromEvent=function(n){var t=h.getNewPoint();return t.X=n.touches?n.touches[0].pageX:n.pageX!=undefined&&n.pageX!=0?n.pageX:0,t.Y=n.touches?n.touches[0].pageY:n.pageY!=undefined&&n.pageY!=0?n.pageY:0,t},this.getDistanceBetweenPoints=function(n,t){var i=h.getNewPoint();return i.X=t.X-n.X,i.Y=t.Y-n.Y,i},this.getNewPoint=function(){return{X:0,Y:0}},this.isTouchEvent=function(n){return typeof n.pointerType=="undefined"||n.pointerType==2||n.pointerType=="touch"||n.pointerType=="pen"},this.isValidTouch=function(n){return!n.pointerId||n.pointerId==h.nowtouchpid},!n)throw"container cannot be null!";this.container=n;this.touchElement=!t?this.container:t;this.touchStartHandler=this.getHandlerOrEmpty(i);this.touchMoveHandler=this.getHandlerOrEmpty(r);this.touchEndHandler=this.getHandlerOrEmpty(u);this.doubleTapHandler=this.getHandlerOrEmpty(f);this.enableEndHandlerWithoutMove=s;this.captureEvent=e;this.moveSensitivity=o;this.handleEventsSetting(!0)}return n}();n.MmReactSwipe=t}(ImageDetailSwipe||(ImageDetailSwipe={}))