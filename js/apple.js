window.onload=function(){
    var oFoot=document.getElementById('footer');
    var aIm=oFoot.children;

    document.onmousemove=function(ev){
        var oEven=ev || event;
        var x=oEven.clientX;
        var y=oEven.clientY;

        for(var i=0;i<aIm.length;i++){
            var json=getPos(aIm[i]);
            var a=x-json.left-aIm[i].offsetWidth/2;
            var b=y-json.top-aIm[i].offsetHeight/2;
            var c=Math.sqrt(a*a+b*b);
            var scal=1-c/500;
            (scal<.5) && (scal=.5);
            aIm[i].style.width=128*scal+'px';
        }
    };

    function getPos(obj){
        var L=0;
        var T=0;
        while(obj){
            L+=obj.offsetLeft;
            T+=obj.offsetTop;
            obj=obj.offsetParent;
        }
        return {left:L, top:T};
    }
};
