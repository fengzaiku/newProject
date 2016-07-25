function  ajax(json){
    //url,fnSucc,fnFaild
    var timer=null;
    if(!json.url){return;}
    clearInterval(timer);
    json=json || {};
    json.data=json.data || {};
    json.type=json.type || 'get';
    json.time=json.time || 3000;

    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject("Microsoft,XMLHTTP");
    }

    switch(json.type.toLowerCase()){
        case 'get':
            oAjax.open('get',json.url+'?'+setUrl(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('post',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            oAjax.send(setUrl(json.data));
            break;
    }

    json.loading && json.loading();
    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            json.compelet && json.compelet();

            if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
                json.fnSucc && json.fnSucc(oAjax.responseText);
            }else{
                json.fnFaild && json.fnFaild(oAjax.status);
            }
            clearTimeout(timer);
        }
    };

    timer=setTimeout(function(){
        oAjax.onreadystatechange=null;
        alert('网络超时');
    },json.time);

    function setUrl(json1){
        var arr=[];
        json1.t=Math.random();
        for(var name in json1){
            arr.push(name+'='+json1[name]);
        }
        return arr.join('&');
    }
}

