window.onload=function(){
    var oIm=document.getElementById('img');
    var aIm=oIm.children[0];
    var arr0=[];
    var arr1=[];
    var arr2=[];
    var arr3=[];

        var R=4;
        var C=7;
        for(var r=0;r<R;r++){
            for(var c=0;c<C;c++){
                var oSpan=document.createElement('span');
                oSpan.style.width=oIm.offsetWidth/C+'px';
                oSpan.style.height=oIm.offsetHeight/R+'px';
                oSpan.style.backgroundPosition='-'+c*oIm.offsetHeight/R+'px -'+r*oIm.offsetWidth/C+'px';
                oIm.appendChild(oSpan);

                arr0.push({W:c,F:r});
                arr2.push({W:C-1-c,F:R-1-r});
                arr1.push({W:C-1-c,F:r});
                arr3.push({W:c,F:R-1-r});
            }
        }
    var iNow=1;
    document.onclick=function(){
        var aSp=oIm.children;
        var timer=null;
        clearInterval(timer);
        //oIm.innerHTML='';
        var arr=[arr0,arr1,arr2,arr3];
        for(var i=0;i<aSp.length;i++){
            ;(function(index){
                timer=setTimeout(function(){
                    aSp[index].style.backgroundImage='url(../myWeb/img/split/'+iNow%3+'.jpg)';
                    aSp[index].style.opacity=0;
                    starMove(aSp[index],{opacity:1},{type:Tween.Linear});
                    index==C*R && clearInterval(timer);
                },50*arr[iNow%4][index]['W']+50*arr[iNow%4][index]['F']);
            })(i);
        }
        iNow++;
    };
};
