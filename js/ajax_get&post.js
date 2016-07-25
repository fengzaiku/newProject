function setUrl(data){
    var arr=[];
    data.t=Math.random();
    for(var name in data){
        arr.push(name+'='+data[name]);
    }
    return arr.join('&');
}

function ajax(json){
    clearTimeout(timer);
    //url,date,type,fnSucc,loading,compelet,fnFaild,time
    json=json || {};
    if(!json.url)return;
    json.type=json.type || 'get';
    json.time=json.time || 3000;
    json.data=json.data || {};
    var timer=null;
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

}