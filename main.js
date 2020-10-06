/*
 * 定义所需要的数据&对象
 */
var courseNum = 0; //课程数
var allCredits = 0; //学分总和
var allGPA = 0; //绩点总和
var averageGPA = 0; //平均绩点
nowUrl = window.location.href; //获取页面URL
var mytable; //相应的table
nowPgaeNum = 0;
pageNum = 0;

var MyDiv = document.getElementById("page-content-template");
var bt = document.createElement("button"); //createElement生成button对象
bt.innerHTML = '查看绩点';
bt.onclick = function() { //绑定点击事件
    if (nowUrl.indexOf('allTermScores') != -1) {
        //确保能获取到所有数据
        //获取页数
        nowPgaeNum = document.getElementById("turnpageto_urppagebar").value
        pageNum = document.getElementById("totalPage_show_urppagebar").innerHTML
            //翻到最下页
        if (nowPgaeNum != pageNum) {
            //   var ele = document.getElementById('pager_scroll');
            //   ele.scrollTop = ele.scrollHeight
            alert("请翻到最下页再计算,否则计算错误!!!!");
        }
    }

    CalculateGPA();

    alert("平均绩点：" + averageGPA); //显示绩点

    //数据清零
    courseNum = 0; //课程数
    allCredits = 0; //学分总和
    allGPA = 0; //绩点总和
    averageGPA = 0; //平均绩点
    nowUrl = window.location.href; //获取页面URL
    mytable; //相应的table
    nowPgaeNum = 0;
    pageNum = 0;
}

MyDiv.appendChild(bt); //添加到页面


function CalculateGPA() {
    /*
     * 每个页面计算方法不同,先判断在哪个页面
     */
    //判断所在页面,定义学分,成绩,未通过原因所在的列
    if (nowUrl.indexOf('thisTermScores') != -1) { //本学期成绩页面
        reasonsForFailRow = 11; //未通过原因所在列
        scoreTxtRow = 8; //成绩所在列
        parseFloatRow = 3; //学分所在列
        mytable = document.getElementById('scoretbody');
        courseNum = mytable.rows.length;  //获取课程数
    } else if (nowUrl.indexOf('allTermScores') != -1) { //历年成绩页面
        reasonsForFailRow = 10; //未通过原因所在列
        scoreTxtRow = 9; //成绩所在列
        parseFloatRow = 5; //学分所在列
        mytable = document.getElementById('scoreintbody');
        courseNum = mytable.rows.length;  //获取课程数
    }

    for (var i = 0; i < courseNum; i++) {
        var _row = mytable.rows;  //获取table的行
        var _cell = _row[i].cells;  //获取第i行的列
        //缓考的情况
        reasonsForFail = _cell[reasonsForFailRow].innerText;  //获取未通过原因
        if (reasonsForFail.indexOf("缓考") != -1) { //如果有缓考科目，不计入总绩点，跳出这一行
            continue;
        }

        var scoreTxt = _cell[scoreTxtRow].innerText;  //获取成绩
        //还未出成绩，跳出这一行
        if (scoreTxt.length == 0) {
            continue;
        }

        xuefen = parseFloat(_cell[parseFloatRow].innerHTML);  //获取学分

        allCredits = allCredits + xuefen;
        var score = parseFloat(scoreTxt);

        //绩点换算
        if (scoreTxt == "优秀" || scoreTxt == "良好" || scoreTxt == "通过" || scoreTxt == "中等" || scoreTxt == "及格" || scoreTxt == "不及格" || scoreTxt == "不通过") { //如果score为NaN，说明scoreTxt读取到的是五分or两分计分制
            //五分or两分计分制换算成绩点
            if (scoreTxt == "优秀") {
                var gpa = 4.0;
            } else if (scoreTxt == "良好" || scoreTxt == "通过") {
                var gpa = 3.3;
            } else if (scoreTxt == "中等") {
                var gpa = 2.3;
            } else if (scoreTxt == "及格") {
                var gpa = 1.0;
            } else if (scoreTxt == "不及格" || scoreTxt == "不通过") {
                var gpa = 0;
            }
        } else {
            //百分制换算成绩点
            if (score >= 90) {
                var gpa = 4.0;
            } else if (score >= 85) {
                var gpa = 3.7;
            } else if (score >= 82) {
                var gpa = 3.3;
            } else if (score >= 78) {
                var gpa = 3.0;
            } else if (score >= 75) {
                var gpa = 2.7;
            } else if (score >= 72) {
                var gpa = 2.3;
            } else if (score >= 68) {
                var gpa = 2.0;
            } else if (score >= 66) {
                var gpa = 1.7;
            } else if (score >= 64) {
                var gpa = 1.5;
            } else if (score >= 60) {
                var gpa = 1.0;
            } else if (score < 60) {
                var gpa = 0.0;
            }
        }

        allGPA = allGPA + xuefen * gpa;
    }
    averageGPA = allGPA / allCredits;
}