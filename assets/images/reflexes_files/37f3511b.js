(function(){function t(t){typeof Log!==n&&typeof Log.Log!==n&&Log.Log("NcHeader","Rewards",t,!0)}function i(){var r,f,e;if(typeof bepcfg===n)t("bepcfg Undefined");else if(r=_ge("nc_iid"),r){var o=typeof bepcfg.wb!==n,s=typeof bepcfg.v!==n,u=r.getAttribute("_IG");if(u&&u.length||(u=_G.IG),f="&IID="+r.getAttribute("_iid")+"&IG="+u,s)try{sj_cook.get("")}catch(l){f+="&CID="+r.getAttribute("_cid")}var c="/rewardsapp/ncheader?ver="+_G.AppVer+f,h=[_w.top,_w],i=sj_gx();i.open("POST",c,!0);i.setRequestHeader("Content-type","application/x-www-form-urlencoded");o&&(i.onreadystatechange=function(){i&&i.readyState==4&&i.status==200&&sj_appHTML(sj_b,i.responseText)});e="wb="+(o?bepcfg.wb:"0");s&&(e+=";i="+(h[0]!==h[1].self?0:1)+";v="+bepcfg.v);i.send(e)}else t("nc_iid NotFound")}var n="undefined";sj_evt.bind("onHTML",function(){i()},!0,0)})()