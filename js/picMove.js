window.onload=function(){
    var oPicBox=document.getElementById('pic-box');
    var oUl=oPicBox.children[0];
    var aLi=oPicBox.getElementsByTagName('li');
    var aIm=oPicBox.getElementsByTagName('img');
    var oCenter=oPicBox.offsetWidth/2;

    oUl.onmousedown=function(ev){
        var oEven=ev || event;
        var disX=oEven.clientX-oUl.offsetLeft;

        document.onmousemove=function(ev){
            var oEven=ev || event;
            var l=oEven.clientX-disX;
            getPosition(l);
        };

        document.onmouseup=function(){
            oUl.releaseCapture && oUl.releaseCapture();
            document.onmousemove=null;
            document.onmouseup=null;
        };
        oUl.setCapture && oUl.setCapture();
        return false;
    };

    function getPosition(l){
        if(l>=(oCenter-aLi[0].offsetWidth/2))l=oCenter-aLi[0].offsetWidth/2;
        if(l<=oCenter-aLi[0].offsetWidth*(aLi.length -.5))l=oCenter-aLi[0].offsetWidth*(aLi.length -.5);

        oUl.style.left=l+'px';
        for(var i=0;i<aLi.length;i++){
            var center=oCenter-(aLi[i].offsetLeft+aLi[i].offsetWidth/2+l);
            var scal=(1-Math.abs(center/500)).toFixed(2);

            (scal<0.5) && (scal =.5);
            //下面zIndex提高的必须是他的父级的层级，否则无效
            console.log(i);
            console.log(scal);
            aIm[i].style.width=scal*528+'px';
            aIm[i].style.height=scal*360+'px';
            aIm[i].style.marginLeft=-(scal -.5)*264+'px';
            aIm[i].style.marginTop=-(scal -.5)*180+'px';
            aLi[i].style.zIndex=scal*10;
        }
    }
    getPosition(oCenter-aLi[0].offsetWidth*1.5);
};
