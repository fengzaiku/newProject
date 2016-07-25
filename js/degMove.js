define(function(require,exports,module){
    exports.degMove=function(obj,iTarg,fn){
       obj.timer=null;
        clearInterval(obj.timer);
        var R=350;
        //初始距离
        var star=obj.a || 0;

        //运行距离
        var dis=iTarg-star;

        //弧度
        function getDeg(n){
            return (n*Math.PI/180-Math.PI/180*400*2);
        }

        //运行次数
        var iCount=parseInt(1000/30);

        obj.n=0;
        obj.timer=setInterval(function(){
            obj.n++;
            var a=obj.n/iCount;
            var cur=star+dis*a*a*a;
            var x=R+R*Math.sin(getDeg(cur))+40;
            var y=R-R*Math.cos(getDeg(cur))+10;

            obj.style.left=x+'px';
            obj.style.top=y+'px';
            obj.a=cur;

            if(obj.n==iCount){
                clearInterval(obj.timer);
                fn && fn();
            }
        },1000/30);

    };
});
