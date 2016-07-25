window.onload=function(){
    var oCon=document.getElementById('con');
    var oBt=document.getElementById('but1');
    var aLi=oCon.children;
    var aIm=oCon.getElementsByTagName('img');
    var arr=[];

    for(var i=0;i<aLi.length-1;i++){
       arr.push({
           left:aLi[i].offsetLeft,
           top:aLi[i].offsetTop,
           aIn:getStyle(aLi[i],'z-index'),
           aimT:aIm[i].offsetTop
       });
    }

    oBt.onclick=function(){
        arr.unshift(arr.pop());

       for(var i=0;i<aLi.length-1;i++){
           aLi[i].style.zIndex=arr[i].aIn;
           aIm[i].style.marginTop=arr[i].aimT+'px';
           starMove(aLi[i],{left:arr[i].left,top:arr[i].top})
       }
    };

    function getStyle(obj,name){
        return (obj.currentStyle || getComputedStyle(obj,false))[name];
    }
};
