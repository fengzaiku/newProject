define(function(require,exports,module){
    var Tween=require('moveTween.js').tween;
    var degMove=require('degMove.js').degMove;

    exports.show=function(){
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

            //导航栏鼠标滑过
            aLi.mouseover(function(){
                aLi.each(function(){
                    aLi.removeClass('ac');
                });
                $(this).addClass('ac');
            });

            //我的作品跳转
            aLi.click(function(){
                if($(this).index()==1){
                    oWorks.show();
                }
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

                //鼠标划过进入方向不一样
                aWli.on('mouseover',function(ev){
                    var lX=Math.abs(ev.clientX-$(this).offset().left);
                    var rX=Math.abs(ev.clientX-$(this).offset().left-$(this).outerWidth());
                    var tY=Math.abs(ev.clientY-($(this).offset().top-scroT));
                    var bY=Math.abs(ev.clientY-($(this).offset().top+$(this).innerHeight()-scroT));
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
                    var tY=Math.abs(ev.clientY-($(this).offset().top-scroT));
                    var bY=Math.abs(ev.clientY-($(this).offset().top+$(this).innerHeight()-scroT));
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
            });

            //圆圈内容 works内容
            var bSys=false;
            oUl.click(function(ev){
                var to=ev.toElement || ev.relatedTarget;
                if(to!=oUl.get(0)){return};

                if(bSys){
                    aWli.each(function (index,elem){
                        degMove(elem,0,function(){
                            oUl.css('marginLeft',-10);
                            Tween(elem,{left:200*index});
                        });
                    });
                }else{
                    aWli.each(function (index,elem){
                        degMove(elem,180/4.5*index);
                    });
                }
                bSys=!bSys;
            });
        })();

        ;(function(){
            var oBut=$('#button');
            var oHide=$('#hide');
            var oLay=$('#layer');
            var aBut=$('#layer button');
            var oIm=$('#layer img');
            var oFa=$('#menu-container a');
            //var oFa=$('.overlay a');

            oBut.click(function(){
                oHide.toggle('slow',function(){
                    oBut.val('隐藏');
                });
            });

            var iNum=0;

            console.log(oFa);
            oFa.click(function(elem){
                iNum=$(this).index();
                oLay.fadeIn();
                oIm.get(0).src='img/images/gallery/'+(Math.abs(iNum)%17+1)+'.jpg';
                console.log(iNum);
                console.log(elem);
                console.log($(this).index());
            });

            aBut.eq(0).click(function(){
                iNum++;
                oIm.get(0).src='img/images/gallery/'+(Math.abs(iNum)%17+1)+'.jpg';
            });

            aBut.eq(1).click(function(){
                oLay.fadeOut();
            });

            aBut.eq(2).click(function(){
                iNum--;
                oIm.get(0).src='img/images/gallery/'+(Math.abs(iNum)%17+1)+'.jpg';
            });
        })();
    };
});
