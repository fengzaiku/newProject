window.onload=function(){
    var oWorks=document.getElementById('works');
    var oUl=oWorks.getElementsByTagName('ul')[0];
    var aLi=oWorks.getElementsByTagName('li');
    var r=aLi[0].offsetWidth/2;
    //var R=oUl.offsetWidth/2;
    var R=300;

    document.onclick=function(){
        for(var i=0;i<aLi.length;i++){
            starMove(aLi[i],180/4.5*i);
        }
    };

    function starMove(obj,iTar){
        clearInterval(obj.timer);
        //初始距离
        var star=obj.a || 0;
       //运行距离
        var dis=iTar-star;
        //运行次数
        var iCount=Math.ceil(1000/30);
        var n=0;

        obj.timer=setInterval(function(){
            n++;
            var a=n/iCount;
            var cur=star+dis*a*a*a;

            console.log(deg(cur));

            var x=R+R*Math.sin(deg(cur))+100;
            var y=R-R*Math.cos(deg(cur))+50;

            obj.style.left=x+'px';
            obj.style.top=y+'px';
            obj.a=cur;

            if(n==iCount){
                clearInterval(obj.timer);
            }
        },30);

        function deg(w){
            return  (w*Math.PI/180-Math.PI/180*400*2);
        }

    }
};
