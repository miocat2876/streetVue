// var leftBtn = document.querySelector(".calLeft");
// var rightBtn = document.querySelector(".calRight");

interface CalenderImpl {
    year:number; 
    month:number;
  }

export class CalenderCalc{

    date:Date;
    year:number;
    month:number;
    toDate:number;

    constructor(){

        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.toDate = this.date.getDate();

    }
    makeCaledar(data:CalenderImpl & Record<string, unknown>){

        const result = [];
        const lastDay = new Date(this.year,this.month,0);
        const firstDay = new Date(this.year,this.month,1);
        const test = new Date(2016,2,0);
        console.log(lastDay.getDate());
        //이달의 1일 무슨요일인지
        const thisFirst = firstDay.getDay(); //0일 1월 5금 6일

        for(let i=1; i<=lastDay.getDate(); i++){
            result.push({'day':i});
        }

        for (let index = 0; index < thisFirst; index++) {
            result.unshift({'day':''});
        }

        return result;
    }
    prvCalender(){
        this.month = this.month == 0 ? 11 : this.month - 1;
        return '';
    }
    nextCalender(){
        this.month = this.month == 11 ? 0 : this.month - 1;
        //     rightBtn.onclick = function(){
//         date = new Date(y,m+1,toDate);
//         y = date.getFullYear();
//         m = date.getMonth();
//         makeCaledar();
//     }
//     leftBtn.onclick=function(){
//         date = new Date(y,m-1,toDate);
//         y = date.getFullYear();
//         m = date.getMonth();
//         makeCaledar();
//     }
    }

}
