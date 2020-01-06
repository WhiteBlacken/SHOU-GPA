var MyDiv =document.getElementById("page-content-template");
     var bt =document.createElement("button");           //createElement生成button对象
     bt.innerHTML = '查看绩点'; 
     bt.onclick = function () {                          //绑定点击事件
              var mytable = document.getElementById('scoretbody');
length = mytable.rows.length; //获取课程数
var allXuefenNum=0.0; //记录学分总数
var allgpaNum=0.0; //记录总绩点数
for(var i=0;i<length;i++){
    var _row = mytable.rows; //获取table的行
    var _cell = _row[i].cells; //获取第i行的列
    xuefen=parseFloat(_cell[3].innerHTML); //获取学分
    
    var scoreTxt=_cell[8].innerText; //获取成绩
    if(scoreTxt=="良好"){
    var gpa=3.3;    
    }
  
    if(scoreTxt.length==0){
    continue;    
    }
    allXuefenNum=allXuefenNum+xuefen; 
    var score=parseFloat(scoreTxt)
    if(score>=90){
      var gpa=4.0;
    }else if(score>=85){
      var gpa=3.7;
    }else if(score>=82){
      var gpa=3.3;
    }else if(score>=78){
      var gpa=3.0;
    }else if(score>=75){
      var gpa=2.7;
    }else if(score>=72){
      var gpa=2.3;
    }else if(score>=68){
      var gpa=2.0;
    }
    else if(score>=64){
      var gpa=1.5;
    }
    else if(score>=60){
      var gpa=1.0;
    }
    else if(score<60){
      var gpa=0.0;
    }

    allgpaNum=allgpaNum+xuefen*gpa;
    }
var currentGPA=allgpaNum/allXuefenNum;
alert("本学期绩点："+currentGPA);

     }
     MyDiv.appendChild(bt);                         //添加到页面
