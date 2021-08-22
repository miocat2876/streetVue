var leftBtn = document.querySelector(".calLeft");
var rightBtn = document.querySelector(".calRight");


//날짜 정보
var date = new Date();
var y = date.getFullYear();
var m = date.getMonth();
var toDate = date.getDate();

var lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// var month = [January, February, March, April, May, June, July, August, September, October, December]
// console.log(m);
function makeCaledar(){
        
    
    //이달 1일의 정보알아내기
    var firstDay = new Date(y,m,1);
    
    //이달의 1일 무슨요일인지
    var thisFirst = firstDay.getDay(); //0일 1월 5금 6일
    
    //윤달 계산하기 -> 4년마다 한 번 그렇지만 100년 마다는 아니고
        if(y % 4 == 0 && y & 100 || y%400 ==0){
           lastDay[1] =29;
           }else {
               lastDay[1] =28;
           }
        
        
    //달력안에 들어가는 숫자를 체크 할 변수 만들기
    var num =1;
    
    //달력의 줄 수 계산하기
    var row = Math.ceil((thisFirst+lastDay[m])/7);
    
    //제목 출력하기
    document.querySelector(".calendarDate").innerHTML =(m+1)+"."+y
    
    //달력테이블을 저장할 변수 만들기
    var calTalble = "<table>";
       //줄을 체크해 줄 for
    for(i=1; i<=row; i++){
        calTalble +="<tr>";
        //칸을 체크해 줄 for
        for(j=1; j<=7; j++) {
            if(j <=thisFirst &&i ==1 || num>lastDay[m]){
                calTalble +="<td><p></p></td>"
            }else{
            calTalble+="<td class='able'><p class='calendar_tooltip'>"+ num++ +"</p></td>";
                }
        }
        calTalble +="</tr>";
    }
    
    
    
    calTalble +="</table>";
    document.querySelector(".calendar .right").innerHTML = calTalble;
  
 }
makeCaledar();

    rightBtn.onclick = function(){
        date = new Date(y,m+1,toDate);
        y = date.getFullYear();
        m = date.getMonth();
        makeCaledar();
    }
    leftBtn.onclick=function(){
        date = new Date(y,m-1,toDate);
        y = date.getFullYear();
        m = date.getMonth();
        makeCaledar();
    }