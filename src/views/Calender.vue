<template>
  <div class="contents_box">
      <div class="content_1200 calendar claer">
        <div class="left">
            <div class="top">
                <h1>Calendar</h1>
                <h3><a class="mon_before" @click="calenderPrev"></a>{{computedMonthNames}}, {{year}}<a class="mon_after" @click="calenderNext"></a></h3>
                <a class="add_bt" v-if="state == 'mypage'" v-bind:class="[ addBt ? 'on' : '' ]" @click="addBt = !addBt">Add Class</a>
                <ul class="add_class" v-bind:style="[ addBt ? 'display : block' : 'display : none' ]">
                    <li class="date">
                        <div class="title_box">
                            <h4>Date:</h4>
                        </div>
                        <div class="value_box claer">
                            <input v-model="startDay">
                            <p>─</p>
                            <input v-model="endDay">
                        </div>
                    </li>
                    <li>
                        <ul class="week">

                              <li>
                                <!-- v-bind:style="[everydayToggle ? 'color: #00ffa8' : 'color: #c9caca']" -->
                              <label for="everyday"  @click="computedEverydayToggle()">매일</label>
                            </li>
                              <li>
                              <input type="checkbox" id="mon" value="0" v-model="checkedDays">
                              <label for="mon">일</label>
                            </li>
                              <li>
                              <input type="checkbox" id="tue" value="1" v-model="checkedDays">
                              <label for="tue">월</label>
                            </li>
                              <li>
                              <input type="checkbox" id="wed" value="2" v-model="checkedDays">
                              <label for="wed">화</label>
                            </li>
                              <li>
                              <input type="checkbox" id="thu" value="3" v-model="checkedDays">
                              <label for="thu">수</label>
                            </li>
                              <li>
                              <input type="checkbox" id="fri" value="4" v-model="checkedDays">
                              <label for="fri">목</label>
                            </li>
                              <li>
                              <input type="checkbox" id="sat" value="5" v-model="checkedDays">
                              <label for="sat">금</label>
                            </li>
                              <li>
                              <input type="checkbox" id="sun" value="6" v-model="checkedDays">
                              <label for="sun">토</label>
                            </li>
                        </ul>
                    </li>
                    <li class="location">
                        <div class="title_box">
                            <h4>Location:</h4>
                        </div>
                        <div class="value_box">
                            <input v-model="location">
                        </div>
                    </li>
                    <li class="time">
                        <div class="title_box">
                            <h4>Time:</h4>
                        </div>
                        <div class="value_box">
                            <input v-model="startTime">
                            <p>─</p>
                            <input v-model="endTime">
                        </div>
                    </li>
                    <li class="note">
                        <div class="title_box">
                            <h4>Note:</h4>
                        </div>
                        <div class="value_box">
                            <input v-model="content">
                        </div>
                    </li>
                    <li class="level">
                        <div class="title_box">
                            <h4>Class Level:</h4>
                        </div>
                        <div class="value_box">
                            <div class="combo_box">
                                <select v-model="level">
                                    <option value="select">select</option>
                                    <option value="test">test</option>
                                </select>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a class="save_bt" @click="scheduleAdd()">Save >></a>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <ul>
                    <li class="date clear">
                        <div class="title_box">
                            <h4>Date:</h4>
                        </div>
                        <div class="value_box claer">
                            <input>
                            <p>─</p>
                            <input>
                        </div>
                    </li>
                    <li>
                        <ul class="week clear">
                            <li>
                                매일
                            </li>
                            <li>월</li>
                            <li class="on">화</li>
                            <li>수</li>
                            <li class="on">목</li>
                            <li>금</li>
                            <li>토</li>
                            <li>일</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="right" v-bind:style="[state != 'mypage' ? 'min-height: auto' : '']">
            <table>
              <tr v-for="n in (Math.ceil(computedMakeCaledar.length / 7))" :key="n">
                <td v-bind:class="[ item.scheduleState? 'able' : '' ]" v-for="item in computedMakeCaledar.slice((n - 1) * 7,7 * n)" :key="item.date"> 
                  <p v-bind:class="[ item.scheduleState ? 'calendar_tooltip' : '' ]" v-bind:style="[state != 'mypage' ? 'padding: 4px' : '']">{{ item.day }}</p>
                  <div id='calendar' v-if="item.scheduleState">
                    <div class='top'>
                      <h2>date {{item.toggle}}</h2>
                    </div>
                    <div class='bottom'>
                      <ul>
                        <li v-for="schedule in item.schedule" :key="schedule.seq">
                          <h3>{{schedule.startTime}}-{{schedule.endTime}}</h3>
                          <p>[{{schedule.genre}}]</p>
                          <span>Class Level: {{schedule.level}}</span>
                          <a>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
        </div>
    </div>
  </div>
</template>


<script lang="ts">

interface CalenderDataImpl {
  year:number; 
  month:number;
}

import { computed } from "@vue/runtime-core";
import { Options, Vue } from "vue-class-component";
import { scheduleFind,scheduleAdd } from "../api/index";


@Options({
  props: {
    id:String,
    propsState:String
  },
  async created() {

    let agrument:CalenderDataImpl & Record<string, unknown> = {
       year: this.year,
       month: this.month + 1,
       memberSeq:1
    };
    const {data:result} = await scheduleFind(agrument);
    console.log(result);
    this.data = result;
    this.state = 'mypage';
  },
  data : function() {

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();

    return{
      date: date,
      year: year,
      month: month,
      data: [],
      addBt: false,
      state:this.propsState,
      startDay:'',
      endDay:'',
      checkedDays:[],
      everydayToggle:false,
      startTime:'',
      endTime:'',
      location:'',
      content:'',
      level:'',

    }
  },
  components: {
  },
   computed: {
    computedMakeCaledar(){

        const result:{day:number | string,toggle:boolean,scheduleState:boolean,schedule:Record<string, unknown>[]}[] = [];
        const firstDay = new Date(this.year,this.month,1);
        const lastDay = new Date(this.year,this.month,0);
        const thisFirst = firstDay.getDay();
        for(let i=1; i<=lastDay.getDate(); i++){
            result.push({'day':i,toggle:false,scheduleState:false,schedule:[]});
        }
        this.data.forEach((data:any) => {
          result[data.day-1].scheduleState = true;
          result[data.day-1].schedule.push(data);
        });
        for (let index = 0; index < thisFirst; index++) {
            result.unshift({'day':'',toggle:false,scheduleState:false,schedule:[]});
        }
        console.log(result);
        return result;
    },
      computedMonthNames(){
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[this.month];
      },
   },
   
   methods: {
    goBack (a:number) {
        console.log(a);
    },
    async calenderPrev(){

      if(this.month == 0){
        this.year -= 1;
        this.month = 11;
      }else{
        this.month -= 1;
      }

      let agrument:CalenderDataImpl & Record<string, unknown> = {
       year: this.year,
       month: this.month + 1,
       memberSeq:1
      };

      const {data:result} = await scheduleFind(agrument);
      console.log(result);
      this.data = result;

    },
   async calenderNext(){

      if(this.month == 11){
        this.year += 1;
        this.month = 0;
      }else{
        this.month += 1;
      }

      let agrument:CalenderDataImpl & Record<string, unknown> = {
       year: this.year,
       month: this.month + 1,
       memberSeq:1
      };

      const {data:result} = await scheduleFind(agrument);
      console.log(result);

    },
    async scheduleAdd(){


      this.startDay = '2021-08-22';
      this.endDay = '2021-09-30';

      const startDay = new Date(this.startDay);
      let lastDay = new Date();
      lastDay.setMonth(startDay.getMonth()+1);
      lastDay.setDate(0);

      const cloneObj = (obj:Record<string, unknown>) => JSON.parse(JSON.stringify(obj))

      let agrument = {
        startTime: this.startTime,
        endTime:this.endTime,
        location: this.location,
        content:this.content,
        level: this.level,
        schedule : '',
      }
      let array:Record<string, unknown>[] = [];

      let check:any = [];
      this.checkedDays.forEach((checked:any) => {

        check.push(checked[0] * 1);
        
      });

      console.log(check);

      for (let index = startDay.getDate(); index <= lastDay.getDate(); index++) {
          startDay.setDate(index);
          if(check.indexOf(startDay.getDay()) > -1){
            agrument.schedule = startDay.toLocaleDateString();
            array.push(cloneObj(agrument));
          }
          
      }

      lastDay = new Date(this.endDay);

      startDay.setDate(1);
      startDay.setMonth(lastDay.getMonth());

      for (let index = 1; index <= lastDay.getDate(); index++) {
          startDay.setDate(index);
          agrument.schedule = startDay.toLocaleDateString();
          array.push(cloneObj(agrument));
      }
    },
    computedEverydayToggle(){
      this.everydayToggle = !this.everydayToggle;

      if(this.everydayToggle){
        this.checkedDays = [0,1,2,3,4,5,6];
      }else{
        this.checkedDays = [];
      }
    },
  }
})
export default class Calendar extends Vue {
    id!: string;
    state!:string;
}
</script>

<style scoped lang="scss">

</style>

    