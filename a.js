var MyDiv = document.getElementById("page-content-template");
var bt = document.createElement("button");           //createElement生成button对象
bt.innerHTML = '查看绩点';
bt.onclick = function () {                          //绑定点击事件
     var mytable = document.getElementById('scoretbody');
     length = mytable.rows.length; //获取课程数
     var allXuefenNum = 0.0; //记录学分总数
     var allgpaNum = 0.0; //记录总绩点数
     for (var i = 0; i < length; i++) {
          var _row = mytable.rows; //获取table的行
          var _cell = _row[i].cells; //获取第i行的列

          //缓考的情况
          reasonsForFail = _cell[11].innerText; //获取未通过原因
          if (reasonsForFail.indexOf("缓考") != -1) {	//如果有缓考科目，不计入总绩点，跳出这一行
               continue;
          }
          
          var scoreTxt = _cell[8].innerText; //获取成绩
          //还未出成绩，跳出这一行
          if (scoreTxt.length == 0) {
               continue;
          }

          xuefen = parseFloat(_cell[3].innerHTML); //获取学分
          
          allXuefenNum = allXuefenNum + xuefen;
          var score = parseFloat(scoreTxt);

          //绩点换算
          if (score === NaN) {	//如果score为NaN，说明scoreTxt读取到的是五分or两分计分制
               //五分or两分计分制换算成绩点
               if (scoreTxt == "优秀") {
                    var gpa = 4.0;
               }
               else if (scoreTxt == "良好" || scoreTxt == "通过") {
                    var gpa = 3.3;
               }
               else if (scoreTxt == "中等") {
                    var gpa = 2.3;
               }
               else if (scoreTxt == "及格") {
                    var gpa = 1.0;
               }
               else if (scoreTxt == "不及格" || scoreTxt == "不通过") {
                    var gpa = 0;
               }
          }
          else {
               //百分制换算成绩点
               if (score >= 90) {
                    var gpa = 4.0;
               }
               else if (score >= 85) {
                    var gpa = 3.7;
               }
               else if (score >= 82) {
                    var gpa = 3.3;
               }
               else if (score >= 78) {
                    var gpa = 3.0;
               }
               else if (score >= 75) {
                    var gpa = 2.7;
               }
               else if (score >= 72) {
                    var gpa = 2.3;
               }
               else if (score >= 68) {
                    var gpa = 2.0;
               }
               else if (score >= 66) {
                    var gpa = 1.7;
               }
               else if (score >= 64) {
                    var gpa = 1.5;
               }
               else if (score >= 60) {
                    var gpa = 1.0;
               }
               else if (score < 60) {
                    var gpa = 0.0;
               }
          }

          allgpaNum = allgpaNum + xuefen * gpa;
     }
     var currentGPA = allgpaNum / allXuefenNum;
     alert("本学期绩点：" + currentGPA);

}
MyDiv.appendChild(bt);                         //添加到页面
