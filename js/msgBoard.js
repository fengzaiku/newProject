window.onload=function(){
    var oText=document.getElementById('text');
    var oSend=document.getElementById('buton');
    var oMsg=document.getElementById('getMsg');
    var oPage=document.getElementById('page');
    var url='weibo.php';
    var iNow=1;

    //weibo.php?act=add&content=xxx	添加一条
    //返回：{error:0, id: 新添加内容的ID, time: 添加时间}
    oSend.onclick=function(){
        ajax({
            url:url,
            data:{
                act:'add',
                content:oText.value
            },
            fnSucc:function(mod){
                var fnSuc=new Function('return '+mod)();
                //console.log(fnSuc);
                if(fnSuc.error){
                    alert('添加失败');
                }else{
                    var oData=new Date();
                    var time=oData.setTime(parseInt(oData.getTime()/1000));
                    var oDiv=createEl(oText.value,time,0,0,fnSuc.id);
                    if(oMsg.children[0]){
                        oMsg.insertBefore(oDiv,oMsg.children[0]);
                        var aDiv=oMsg.children;

                        if(aDiv.length==7){
                            oMsg.removeChild(aDiv[aDiv.length-1]);
                        }
                    }else{
                        oMsg.appendChild(oDiv);
                        getPageCount();
                    }
                    oText.value='';
                    pageCon(1);
                    getPageCount();
                }
            }
        });
    };

    function createEl(value,time,add,ref,id){
        var oDiv=document.createElement('div');
        oDiv.className='msgCon';
        oDiv.innerHTML='<p class="content">'+value+'</p>'
            +'<p class="opation">'
            +'<span class="opaTime">'+getTime(time)+'</span>'
            +'<span class="opaCon clearfix">'
            +'<a href="javascript:;" class="add">'+add+'</a>'
            +'<a href="javascript:;" class="ref">'+ref+'</a>'
            +'<a href="javascript:;" class="cut">删除</a>'
            +'</span>'
            +'</p>';
        //weibo.php?act=acc&id=12			顶某一条数据
        //返回：{error:0}
        //
        var aA=oDiv.getElementsByTagName('a');

        ;(function(index){
        aA[0].onclick=function(){
                ajax({
                    url:url,
                    data:{
                        act:'acc',
                        id:id
                    },
                    fnSucc:function(mod){
                        var fnTr=new Function('return '+mod)();
                        if(fnTr.error){
                            alert('定失败');
                        }else{
                            aA[index].innerHTML=parseInt(aA[index].innerHTML)+1;
                        }
                    }
                });
            };
        })(0);


        //weibo.php?act=ref&id=12			踩某一条数据
        //返回：{error:0}
        aA[1].onclick=function(){
            ajax({
                url:url,
                data:{
                    act:'ref',
                    id:id
                },
                fnSucc:function(mod){
                    var fnTr=new Function('return '+mod)();
                    if(fnTr.error){
                        alert('踩失败');
                    }else{
                        aA[1].innerHTML=1+parseInt(aA[1].innerHTML);
                    }
                }
            });
        };

        //weibo.php?act=del&id=12			删除一条数据
        //返回：{error:0}
        aA[2].onclick=function(){
            ajax({
                url:url,
                data:{
                    act:'del',
                    id:id
                },
                fnSucc:function(mod){
                    var fnTr=new Function('return '+mod)();
                    if(fnTr.error){
                        alert('删除失败');
                    }else{
                        oMsg.removeChild(oDiv);

                        getPageCount();
                        pageCon(iNow);
                    }
                }
            });
        };
        return oDiv;
    }

    //weibo.php?act=get_page_count	获取页数
    //返回：{count:页数}
    function getPageCount(){
        oPage.innerHTML='';
        ajax({
            url:url,
            data:{
                act:'get_page_count'
            },
            fnSucc:function(mod){
                var page=new Function('return '+mod)();
                var aA=oPage.children;

                for(var i=0;i<page['count'];i++){
                    var oA=document.createElement('a');
                    oA.href='javascript:;';
                    if(iNow==1 && i==0){
                        oA.className='on';
                    }
                    oA.innerHTML=i+1;

                    oPage.appendChild(oA);
                }
                for(var j=0;j<aA.length;j++){
                    aA[j].onclick=function(){
                        for(var i=0;i<aA.length;i++){
                            aA[i].className='';
                        }
                        this.className='on';
                        iNow=this.innerHTML;
                        pageCon(iNow);
                    };
                    if(iNow!=1){
                        aA[iNow-1].className='on';
                    }
                }
            }
        });
    }
    getPageCount();

    //weibo.php?act=get&page=1		获取一页数据
    //返回：[{id: ID, content: "内容", time: 时间戳, acc: 顶次数, ref: 踩次数}, {...}, ...]
    function pageCon(pageCount){
        oMsg.innerHTML='';
        ajax({
            url:url,
            data:{
                act:'get',
                page:pageCount
            },
            fnSucc:function(json){
                var arr=new Function('return '+json)();
                for(var i=0;i<arr.length;i++){
                    var oDiv=createEl(arr[i].content,arr[i].time,arr[i].acc,arr[i].ref,arr[i].id);
                    oMsg.appendChild(oDiv);
                }
            }
        });
    }

    pageCon(1);
    //


    function getTime(time){
        var oData=new Date();
        oData.setTime(time*1000);
        var Y=oData.getFullYear();
        var M=oData.getMonth();
        var D=oData.getDate();
        var h=oData.getHours();
        var m=oData.getMinutes();
        var s=oData.getSeconds();
        return Y+'-'+findEor(M)+'-'+findEor(D)+' '+findEor(h)+':'+findEor(m)+':'+findEor(s);
    }

    //补零函数
    function findEor(n){
        if(n<10){
            return '0'+n;
        }else{
            return ''+n;
        }
    }
};
