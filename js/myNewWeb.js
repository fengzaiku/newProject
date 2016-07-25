define(function(require,exports,module){
    var Tween=require('moveTween.js').tween;
    var degMove=require('degMove.js').degMove;

    exports.show=function(){
        if(window.navigator.userAgent.toLowerCase().indexOf('msie ')!=-1){
            var index=window.navigator.userAgent.toLowerCase().indexOf('msie ');
            var str=window.navigator.userAgent.toLowerCase();

            if((Math.floor(str.substr(index+4,4)))<=9){
                document.write('<h2>您的浏览器版本不支持此网页<a href="http://download.microsoft.com/download/5/6/F/56FD6253-CB53-4E38-94C6-74367DA2AB34/IE11-Windows6.1-x64-zh-cn.exe">点击升级</a></h2>');
            }
            return;
        }

        ;(function(){
            var oFixHed=$('#fix-header');
            var oHomeCon=$('#home-con');
            var oWorks=$('#works');
            var oEm=$('.planet');
            var aLi=oFixHed.find('li');
            var oUl=$('#works ul');
            var aWli=$('#works li');
            var aP=$('#works p');
            var R=$('.roto').outerWidth()/2;

            aLi.eq(0).addClass('ac');
            //导航栏鼠标滑过
            aLi.mouseover(function(){
                aLi.each(function(){
                    aLi.removeClass('ac');
                });
                $(this).addClass('ac');
            });

            //滚轮事件
            $(window).scroll(function(){
                var scroT=$(window).scrollTop();
                var scal=1-scroT/500;
                (scal<=.5) && (scal=.5);
                oFixHed.css('height',120*scal);

                scal<.75 ? oWorks.show(300,function(){
                    aLi.removeClass('ac');
                    aLi.eq(1).addClass('ac');}):
                    oWorks.hide(1000,function(){
                        aLi.eq(1).removeClass('ac');
                        aLi.eq(0).addClass('ac');
                    });
            });
            //鼠标划过进入方向不一样
            aWli.on('mouseover',function(ev){
                var lX=Math.abs(ev.clientX-$(this).offset().left);
                var rX=Math.abs(ev.clientX-$(this).offset().left-$(this).outerWidth());
                var tY=Math.abs(ev.clientY-($(this).offset().top));
                var bY=Math.abs(ev.clientY-($(this).offset().top+$(this).innerHeight()));
                var num=$(this).index();
                var Form=ev.fromElement || ev.relatedTarget;
                if(aWli.get(num).contains(Form)){return};

                var arr=[lX,rX,bY,tY].sort(function(n1,n2){return n1-n2});
                //console.log(arr);
                switch(arr[0]){
                    case lX:
                        aP.eq(num).css({left:-200,top:-200});
                        break;
                    case rX:
                        aP.eq(num).css({left:200,top:-200});
                        break;
                    case tY:
                        console.log(1);
                        aP.eq(num).css({left:0,top:-400});
                        break;
                    case bY:
                        aP.eq(num).css({left:0,top:0});
                        break;
                }
                Tween(aP.get(num),{left:0,top:-203});
            });
            aWli.on('mouseout',function(ev){
                var lX=Math.abs(ev.clientX-$(this).offset().left);
                var rX=Math.abs(ev.clientX-$(this).offset().left-$(this).outerWidth());
                var tY=Math.abs(ev.clientY-($(this).offset().top));
                var bY=Math.abs(ev.clientY-($(this).offset().top+$(this).innerHeight()));
                var num=$(this).index();
                var to=ev.toElement || ev.relatedTarget;
                if(aWli.get(num).contains(to)){return};

                var arr=[lX,rX,bY,tY].sort(function(n1,n2){return n1-n2});
                switch(arr[0]){
                    case lX:
                        Tween(aP.get(num),{left:-200,top:-200});
                        break;
                    case rX:
                        Tween(aP.get(num),{left:200,top:-200});
                        break;
                    case tY:
                        Tween(aP.get(num),{left:0,top:-400});
                        break;
                    case bY:
                        Tween(aP.get(num),{left:0,top:0});
                        break;
                }
            })


            //圆圈内容 works内容
            var bSys=false;
            var fnTr=true;
                oUl.click(function(ev){
                    //alert(1);
                    if(fnTr){
                        fnTr=false;
                        var timer=null;
                        var to=ev.srcElement || ev.target;
                        //console.log(ev);
                        if(to!=oUl.get(0)){return};
                        if(bSys){
                            aWli.each(function (index,elem){
                                degMove(elem,0,function(){
                                    oUl.css('marginLeft',-10);
                                    Tween(elem,{left:200*index},{end:function(){
                                        fnTr=true;
                                    }});
                                });
                            });
                        }else{
                            aWli.each(function (index,elem){
                                degMove(elem,180/4.5*index,function(){
                                    fnTr=true;
                                });
                            });
                        }
                        bSys=!bSys;
                    }else{
                        return;
                    }
                });

        })();

        ;(function(){
            var oBut=$('#button');
            var oHide=$('#hide');
            var oLay=$('#layer');
            var aBut=$('#layer button');
            var oIm=$('#layer img');
            //var aLay=$('.overlay');
            var oFa=$('#menu-container a');
            var iNum=0;
            var num=0;

            oBut.click(function(){
                num++;
                oHide.toggle('slow',function(){
                    num%2==0?oBut.val('展示'):oBut.val('隐藏');
                });
            });


            oFa.each(function(i,obj){
                obj.index=i;

                obj.onclick=function(){
                    iNum=obj.index;
                    oLay.fadeIn();
                    oIm.get(0).src='img/images/gallery/'+(Math.abs(iNum)%17+1)+'.jpg';
                    oIm.get(0).style.transition='1s ease all';
                };
            });

            aBut.click(function(){
                switch($(this).index()){
                    case 0:
                        iNum--;
                        break;
                    case 1:
                        oLay.fadeOut();
                        break;
                    case 2:
                        iNum++;
                        break;
                }
                oIm.get(0).src='img/images/gallery/'+(Math.abs(iNum)%17+1)+'.jpg';
            });
        })();

    };
});
