function getLoad(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',function(){
            fn && fn();
        },false);
    }else{
        document.onreadystatechange=function(){
            if(document.readyState=='complete'){
                fn && fn();
            }
        };
    }
}


getLoad(function(){
//照片墙
    ;(function(){
        var oBox=document.getElementById('box');
        var oBt=document.getElementById('but');
        var oUl=oBox.children[1];
        var aLi=oBox.getElementsByTagName('li');
        var aIm=oBox.getElementsByTagName('img');
        var iMinIndex=-1;

        //将元素转换成定位
        var arr=[];
        for(var i=0;i<aLi.length;i++){
            arr.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
        }
        for(var i=0;i<aLi.length;i++){
            aLi[i].style.position='absolute';
            aLi[i].style.left=arr[i].left+'px';
            aLi[i].style.top=arr[i].top+'px';
        }


        //点击切换
        oBt.onclick=function(){
            arr.sort(function(){
                return Math.random()-.5;
            }) ;
            for(var i=0;i<aLi.length;i++){
                aLi[i].style.left=arr[i].left+'px';
                aLi[i].style.top=arr[i].top+'px';
            }
        };

        //鼠标移动图片中心放大
        for(var i=0;i<aIm.length;i++){
            ;(function(index){
                aIm[i].onmouseover=function(){
                    aIm[index].style.position='relative';
                    move(aIm[index],{width:250,height:250,left:-50,top:-50,zIndex:2},{type:'linear',end:function(){
                        aIm[index].onmousedown=function(){
                            dar(aLi[index]);
                        };
                    }});
                };
                aIm[i].onmouseout=function(){
                    move(aIm[index],{width:150,height:150,left:0,top:0,zIndex:0},{type:'ease-out', end:function(){
                        aIm[index].style.position='static';
                    }});
                };
            })(i);
        }

        //获得元素所在坐标
        function getPos(obj){
            var L=0;
            var T=0;
            while(obj){
                L+=obj.offsetLeft;
                T+=obj.offsetTop;
                obj=obj.offsetParent;
            }
            return {left:L,top:T};
        }

        //拖拽函数
        function dar(obj){
            obj.onmousedown=function(ev){
                var oEven=ev || event;
                var disX=oEven.clientX-obj.offsetLeft;
                var disY=oEven.clientY-obj.offsetTop;
                var json={left:obj.offsetLeft-10,top:obj.offsetTop-10};
                //obj.style.zIndex=2;
                var oLi=null;

                document.onmousemove=function(ev){
                    var oEven=ev || event;
                    var l=oEven.clientX-disX;
                    var t=oEven.clientY-disY;

                    obj.style.left=l+'px';
                    obj.style.top=t+'px';
                    oLi=getNear(obj);

                    if(oLi){
                        for(var i=0;i<aLi.length;i++){
                            aLi[i].className='';
                        }
                        oLi.className='ac';
                    }
                };

                document.onmouseup=function(){
                    for(var i=0;i<aLi.length;i++){
                        aLi[i].className='';
                    }

                    if(oLi){
                        move(obj,{left:oLi.offsetLeft-10,top:oLi.offsetTop-10},{type:'ease-in'});
                        move(oLi,{left:json.left,top:json.top},{type:'ease-in'});
                    }else{
                        move(obj,{left:json.left,top:json.top,zIndex:0},{type:'ease-in'});
                    }
                    document.onmousemove=null;
                    document.onmouseup=null;
                };
                return false;
            };
        }

        //循环
        function getNear(obj){
            var iMin=99999999;
            for(var i=0;i<aLi.length;i++){
                if(obj==aLi[i]){continue};
                if(getDis(obj,aLi[i])){
                    var d=dis(obj,aLi[i]);
                    if(iMin>d){
                        iMin=d;
                        iMinIndex=i;
                    }
                }
            }
            if(iMinIndex!=-1){
                return aLi[iMinIndex];
            }else{
                return null;
            }
        }

        //判断距离
        function dis(obj,obj2){
            var a=obj.offsetLeft-obj2.offsetLeft;
            var b=obj.offsetTop-obj2.offsetTop;

            return Math.sqrt(Math.abs(a*a)+Math.abs(b*b));
        }

        //判断碰撞
        function getDis(obj,obj2){
            var l=obj.offsetLeft;
            var r=obj.offsetLeft+obj.offsetWidth;
            var t=obj.offsetTop;
            var b=obj.offsetTop+obj.offsetHeight;

            var l2=obj2.offsetLeft;
            var r2=obj2.offsetLeft+obj2.offsetWidth;
            var t2=obj2.offsetTop;
            var b2=obj2.offsetTop+obj2.offsetHeight;

            if(l<r2 && r>l2 && t<b2 && b>t2){
                return true;
            }else{
                return false;
            }
        }

        //运动函数
        function move(obj,json,opations){
            clearInterval(obj.timer);
            opations=opations || {};
            opations.type=opations.type || 'linear';
            opations.time=opations.time || 700;

            var iCount=parseInt(opations.time/30);
            var star={};
            var dis={};

            for(var name in json){
                star[name]=parseFloat(getStyle(obj,name));
                dis[name]=json[name]-star[name];
            }
            obj.n=0;

            obj.timer=setInterval(function(){
                obj.n++;

                for(var name in dis){
                    switch(opations.type){
                        case 'linear':
                            var a=obj.n/iCount;
                            var cur=star[name]+dis[name]*a;
                            break;
                        case 'ease-in':
                            var a=obj.n/iCount;
                            var cur=star[name]+dis[name]*a*a*a;
                            break;
                        case 'ease-out':
                            var a=1-obj.n/iCount;
                            var cur=star[name]+dis[name]*(1-a*a*a);
                            break;
                    }

                    if(name=='opacity' || name=='zIndex'){
                        obj.style[name]=cur;
                    }else{
                        obj.style[name]=cur+'px';
                    }
                }

                if(obj.n==iCount){
                    clearInterval(obj.timer);
                    opations.end && opations.end();
                }
            },1000/60);
        }

        //获得行间属性
        function getStyle(obj,name){
            return (obj.currentStyle || getComputedStyle(obj,false))[name];
        }
    })();
});

