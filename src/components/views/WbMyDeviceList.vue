<template>
  <section class="content">
<!--<div>我的设备</div>-->
    <div class="row center-block" style="background: #ffffff">
      <span v-for="(item,index) in arrayData" v-bind:key="item.id">
        <span  v-if="item.status===0">
          <span v-if="item.device_id===selectedDeviceSn"><el-button  type="success" @click="clickMyDeviceCell(item.device_id)">{{item.device_name}}</el-button></span>
          <span v-else><el-button plain type="success" @click="clickMyDeviceCell(item.device_id)">{{item.device_name}}</el-button></span>
        </span>

        <span v-else-if="item.status===1">
          <span v-if="item.device_id===selectedDeviceSn"><el-button @click="clickMyDeviceCell(item.device_id)"  type="danger">{{item.device_name}}</el-button></span>
          <span v-else><el-button @click="clickMyDeviceCell(item.device_id)" plain type="danger">{{item.device_name}}</el-button></span>
        </span>
      </span>
    </div>
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="实时数据" name="first">
        <div class="row center-block" style="background: #ffffff;white-space:nowrap;width:100%;overflow-x:scroll;overflow-y: scroll">
<span v-for="(item,index) in arrayDataRealtime" v-bind:key="item.value" style="white-space:nowrap;">
  <div v-if="index!==0&&index%9===0"></div><el-button   style="width: 100px" v-if="item.type==='数据' && (item.maxwarning === true || item.minwarning === true)" type="danger" class="blink">{{item.value}}</el-button><el-button v-else plain   style="width: 100px" type="info" >{{item.value}}</el-button>
</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="曲线图" name="second">
        <canvas id="myChart" style="max-height: 100%"></canvas>
        <el-button type="text" @click="save()">保存图片</el-button>
      </el-tab-pane>
      <el-tab-pane label="历史数据" name="third">
        <div class="block">
          <!--<span class="demonstration">带快捷选项</span>-->
          <el-date-picker
            @change="changeDate"
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
          <!--{{value7}}-->
        </div>
        <div><h5>传感器</h5></div>
        <div><el-radio-group v-model="radioT" @change="changeT">
          <el-radio :label="0">{{T0name}}</el-radio>
          <el-radio :label="1">{{T1name}}</el-radio>
          <el-radio :label="2">{{T2name}}</el-radio>
          <el-radio :label="3">{{T3name}}</el-radio>
          <el-radio :label="4">{{T4name}}</el-radio>
          <el-radio :label="5">{{T5name}}</el-radio>
          <el-radio :label="6">{{T6name}}</el-radio>
          <el-radio :label="7">{{T7name}}</el-radio>
        </el-radio-group>
          <!--radioT is{{radioT}}-->
        </div>

        <el-table
          @current-change="currentchange"
          :data="historyData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            label="序号"
            min-width="50">
            <template slot-scope="scope">
              {{Number(scope.$index+1)}}
            </template>
          </el-table-column>
          <el-table-column
            label="时间"
            min-width="150">
            <template slot-scope="scope">
              {{scope.row.date | FormatDate}}
            </template>
          </el-table-column>
          <el-table-column
            :label="Prjtitle0"
            min-width="70">
            <template slot-scope="scope">
              <span v-if="radioT===0">{{scope.row.prjv0,0 | FormatDATA}}</span><span v-else-if="radioT===1">{{scope.row.prjv0,1 | FormatDATA}}</span><span v-else-if="radioT===2">{{scope.row.prjv0,2 | FormatDATA}}</span><span v-else-if="radioT===3">{{scope.row.prjv0,3 | FormatDATA}}</span><span v-else-if="radioT===4">{{scope.row.prjv0,4 | FormatDATA}}</span><span v-else-if="radioT===5">{{scope.row.prjv0,5 | FormatDATA}}</span><span v-else-if="radioT===6">{{scope.row.prjv0,6 | FormatDATA}}</span><span v-else-if="radioT===7">{{scope.row.prjv0,7 | FormatDATA}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="Prjtitle1"
            min-width="70">
            <template slot-scope="scope">
              <span v-if="radioT===0">{{scope.row.prjv1,0 | FormatDATA}}</span><span v-else-if="radioT===1">{{scope.row.prjv1,1 | FormatDATA}}</span><span v-else-if="radioT===2">{{scope.row.prjv1,2 | FormatDATA}}</span><span v-else-if="radioT===3">{{scope.row.prjv1,3 | FormatDATA}}</span><span v-else-if="radioT===4">{{scope.row.prjv1,4 | FormatDATA}}</span><span v-else-if="radioT===5">{{scope.row.prjv1,5 | FormatDATA}}</span><span v-else-if="radioT===6">{{scope.row.prjv1,6 | FormatDATA}}</span><span v-else-if="radioT===7">{{scope.row.prjv1,7 | FormatDATA}}</span>            </template>
          </el-table-column>
          <el-table-column
            :label="Prjtitle2"
            min-width="80">
            <template slot-scope="scope">
              <span v-if="radioT===0">{{scope.row.prjv2,0 | FormatDATA}}</span><span v-else-if="radioT===1">{{scope.row.prjv2,1 | FormatDATA}}</span><span v-else-if="radioT===2">{{scope.row.prjv2,2 | FormatDATA}}</span><span v-else-if="radioT===3">{{scope.row.prjv2,3 | FormatDATA}}</span><span v-else-if="radioT===4">{{scope.row.prjv2,4 | FormatDATA}}</span><span v-else-if="radioT===5">{{scope.row.prjv2,5 | FormatDATA}}</span><span v-else-if="radioT===6">{{scope.row.prjv2,6 | FormatDATA}}</span><span v-else-if="radioT===7">{{scope.row.prjv2,7 | FormatDATA}}</span>            </template>
          </el-table-column>
          <el-table-column
            :label="Prjtitle3"
            min-width="70">
            <template slot-scope="scope">
              <span v-if="radioT===0">{{scope.row.prjv3,0 | FormatDATA}}</span><span v-else-if="radioT===1">{{scope.row.prjv3,1 | FormatDATA}}</span><span v-else-if="radioT===2">{{scope.row.prjv3,2 | FormatDATA}}</span><span v-else-if="radioT===3">{{scope.row.prjv3,3 | FormatDATA}}</span><span v-else-if="radioT===4">{{scope.row.prjv3,4 | FormatDATA}}</span><span v-else-if="radioT===5">{{scope.row.prjv3,5 | FormatDATA}}</span><span v-else-if="radioT===6">{{scope.row.prjv3,6 | FormatDATA}}</span><span v-else-if="radioT===7">{{scope.row.prjv3,7 | FormatDATA}}</span>            </template>
          </el-table-column>
          <el-table-column
            :label="Prjtitle4"
            min-width="70">
            <template slot-scope="scope">
              <span v-if="radioT===0">{{scope.row.prjv4,0 | FormatDATA}}</span><span v-else-if="radioT===1">{{scope.row.prjv4,1 | FormatDATA}}</span><span v-else-if="radioT===2">{{scope.row.prjv4,2 | FormatDATA}}</span><span v-else-if="radioT===3">{{scope.row.prjv4,3 | FormatDATA}}</span><span v-else-if="radioT===4">{{scope.row.prjv4,4 | FormatDATA}}</span><span v-else-if="radioT===5">{{scope.row.prjv4,5 | FormatDATA}}</span><span v-else-if="radioT===6">{{scope.row.prjv4,6 | FormatDATA}}</span><span v-else-if="radioT===7">{{scope.row.prjv4,7 | FormatDATA}}</span>            </template>
          </el-table-column>
          <el-table-column
            :label="Prjtitle5"
            min-width="80">
            <template slot-scope="scope">
              <span v-if="radioT===0">{{scope.row.prjv5,0 | FormatDATA}}</span><span v-else-if="radioT===1">{{scope.row.prjv5,1 | FormatDATA}}</span><span v-else-if="radioT===2">{{scope.row.prjv5,2 | FormatDATA}}</span><span v-else-if="radioT===3">{{scope.row.prjv5,3 | FormatDATA}}</span><span v-else-if="radioT===4">{{scope.row.prjv5,4 | FormatDATA}}</span><span v-else-if="radioT===5">{{scope.row.prjv5,5 | FormatDATA}}</span><span v-else-if="radioT===6">{{scope.row.prjv5,6 | FormatDATA}}</span><span v-else-if="radioT===7">{{scope.row.prjv5,7 | FormatDATA}}</span>          </template>
          </el-table-column>
          <el-table-column
            :label="Prjtitle6"
            min-width="80">
            <template slot-scope="scope">
              <span v-if="radioT===0">{{scope.row.prjv6,0 | FormatDATA}}</span><span v-else-if="radioT===1">{{scope.row.prjv6,1 | FormatDATA}}</span><span v-else-if="radioT===2">{{scope.row.prjv6,2 | FormatDATA}}</span><span v-else-if="radioT===3">{{scope.row.prjv6,3 | FormatDATA}}</span><span v-else-if="radioT===4">{{scope.row.prjv6,4 | FormatDATA}}</span><span v-else-if="radioT===5">{{scope.row.prjv6,5 | FormatDATA}}</span><span v-else-if="radioT===6">{{scope.row.prjv6,6 | FormatDATA}}</span><span v-else-if="radioT===7">{{scope.row.prjv6,7 | FormatDATA}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="Prjtitle7"
            min-width="80">
            <template slot-scope="scope">
              <span v-if="radioT===0">{{scope.row.prjv7,0 | FormatDATA}}</span><span v-else-if="radioT===1">{{scope.row.prjv7,1 | FormatDATA}}</span><span v-else-if="radioT===2">{{scope.row.prjv7,2 | FormatDATA}}</span><span v-else-if="radioT===3">{{scope.row.prjv7,3 | FormatDATA}}</span><span v-else-if="radioT===4">{{scope.row.prjv7,4 | FormatDATA}}</span><span v-else-if="radioT===5">{{scope.row.prjv7,5 | FormatDATA}}</span><span v-else-if="radioT===6">{{scope.row.prjv7,6 | FormatDATA}}</span><span v-else-if="radioT===7">{{scope.row.prjv7,7 | FormatDATA}}</span>
            </template>
          </el-table-column>
        </el-table>

        <div>
          <div class="block">
            <!--<span class="demonstration">调整每页显示条数</span>-->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="12"
              layout=" prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

  </section>
</template>

<script>
  // import $ from 'jquery'
  import api from '../../api'
  import Chart from 'chart.js'
  import {formatDateBtk, OperationLogFilter, formatMsgStatus, formatRealtimeStatus, formatDATA, formatDate} from '../../filters/index.js'

  export default {
    filters: {
      BTKformatDate (time) {
        var date = new Date(time)
        return formatDateBtk(date, 'yyyy-MM-dd hh:mm')
      },
      FormatOperationLog (sb, action, target, id) {
        return OperationLogFilter(sb, action, target, id)
      },
      FormatMsgStatus (status) {
        return formatMsgStatus(status)
      },
      FormatRealtimeStatus (status) {
        return formatRealtimeStatus(status)
      },
      FormatDATA (data,pos) {
        return formatDATA(data,pos)
      },
      FormatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    data () {
      return {
        currentPage: 1,
        totalCount: 0,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: [],
        historyData: [],
        radioT: 0,
        activeName2: 'first',
        arrayDataCurve: [],
        T0name: '',
        T1name: '',
        T2name: '',
        T3name: '',
        T4name: '',
        T5name: '',
        T6name: '',
        T7name: '',

        Prjtitle0: '',
        Prjtitle1: '',
        Prjtitle2: '',
        Prjtitle3: '',
        Prjtitle4: '',
        Prjtitle5: '',
        Prjtitle6: '',
        Prjtitle7: '',
        //
        tableData: [],
        arrayData: [],
        // 删除确认框
        dialogVisible: false,
        //
        realtime: [],
        arrayDataRealtime: [],
        datas: [],
        selectedDeviceSn: 0,
        extrainfo: '',
        DateArr: [],
        Ydata: [],
        Labels: [],
        YDatasets: [],
        Colors: [],

        Data1: [],
        Data2: [],
        Data3: [],
        Data4: [],
        Data5: [],
        Data6: [],
        Data7: [],
        Data8: [],

        Cols: [],
        MydeviceList: []
      }
    },
    methods: {
      handleCurrentChange (val) {

      },
      handleSizeChange (val) {

      },
      currentchange (newrow ,oldrow) {

      },
      sizechange () {

      },
      save () {
        var myCanvas = document.getElementById("myChart");
        // here is the most important part because if you dont replace you will get a DOM 18 exception.
        var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream;Content-Disposition: attachment;filename=chart.png");
        // var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href=image; // it will save locally
      },
      formatterColumn(row, column) {
        switch(row.t0){
          case 0:
            return '未通过';
            break;

          case 1:
            return '审核通过';
            break;

          case 10:
            return '待审核';
            break;


          case 9:
            return '草稿';
            break;

          default:
            return '未知';
        }
      },
      tableDbEdit(row, column, cell, event) {
        console.log(row);
      },
      clickMyDeviceCell(device_id){
        this.selectedDeviceSn = device_id
        var userid = localStorage.getItem('userid')
        this.getrealtimedata(userid)
        this.getcurve(userid)
        this.gethistorydata(userid,this.value7,'getdatabychangeDevice')

        // alert(snid)
      },
      clicktablecell(name){
        alert(name)
      },
      changeT(value) {
        console.log('改变之后的值是:' + value)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getmydevice(userid) {
        api.request('get', '/device/list?operator_id=' + userid + '&page=0&size=12')
          .then(response => {
            console.log(response.data)
            this.arrayData = response.data.body.data
            this.MydeviceList = arrayData
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      },
      getrealtimedata (userid) {
        this.arrayDataRealtime = []
        this.realtime = []
        this.Cols = []
        // this.selectedDeviceSn = '012345675432012345675432012345675431'
        api.request('get', 'data/curve/list?btk=getrealtimedata&operator_id=' + userid + '&page=0&size=1&sn=' + this.selectedDeviceSn)
          .then(response => {
            this.arrayDataRealtime = response.data.body.realtimedatalist
            this.extrainfo = response.data.body.extrainfo
            console.log('ssssssssssssssss.this.RealtimeDataList is', this.RealtimeDataList)
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      },
      /*getrealtimedata(userid) {
        this.arrayDataRealtime = []
        this.realtime = []
        this.Cols = []
        api.request('get', 'data/curve/list?btk=getrealtimedata&operator_id=' + userid + '&page=0&size=1&sn='+this.selectedDeviceSn)
          .then(response => {
            this.arrayDataRealtime = response.data.body.data[0]
            this.extrainfo = response.data.body.extrainfo
            var title = this.extrainfo.prj2title

            console.log('///this.extrainfo.ch0name is', this.extrainfo.ch0name)

            // this.Cols.push('指标')

            if (this.extrainfo.ch0name != ''){
              this.Cols.push({prop:'t0', name: this.extrainfo.ch0name})
            }
            if (this.extrainfo.ch1name != ''){
              this.Cols.push({prop:'t1', name: this.extrainfo.ch1name})
            }
            if (this.extrainfo.ch2name != ''){
              this.Cols.push({prop:'t2', name: this.extrainfo.ch2name})
            }
            if (this.extrainfo.ch3name != ''){
              this.Cols.push({prop:'t3', name: this.extrainfo.ch3name})
            }
            if (this.extrainfo.ch4name != ''){
              this.Cols.push({prop:'t4', name: this.extrainfo.ch4name})
            }
            if (this.extrainfo.ch5name != ''){
              this.Cols.push({prop:'t5', name: this.extrainfo.ch5name})
            }
            if (this.extrainfo.ch6name != ''){
              this.Cols.push({prop:'t6', name: this.extrainfo.ch6name})
            }
            if (this.extrainfo.ch7name != ''){
              this.Cols.push({prop:'t7', name: this.extrainfo.ch7name})
            }

            this.T0name = this.extrainfo.ch0name
            this.T1name = this.extrainfo.ch1name
            this.T2name = this.extrainfo.ch2name
            this.T3name = this.extrainfo.ch3name
            this.T4name = this.extrainfo.ch4name
            this.T5name = this.extrainfo.ch5name
            this.T6name = this.extrainfo.ch6name
            this.T7name = this.extrainfo.ch7name

            var arr
            //计算出有几个指标,就是几个prj
            for (var k=0; k<8; k++){

              if (Number(k)===0){
                arr = this.arrayDataRealtime.prjv0.split(',')
                title = this.extrainfo.prj0title
                this.Prjtitle0 = title
              }else if (Number(k)===1){
                arr = this.arrayDataRealtime.prjv1.split(',')
                title = this.extrainfo.prj1title
                this.Prjtitle1 = title
              }else if (Number(k)===2){
                arr = this.arrayDataRealtime.prjv1.split(',')
                title = this.extrainfo.prj2title
                this.Prjtitle2 = title
              }else if (Number(k)===3){
                arr = this.arrayDataRealtime.prjv1.split(',')
                title = this.extrainfo.prj3title
                this.Prjtitle3 = title
              }else if (Number(k)===4){
                arr = this.arrayDataRealtime.prjv1.split(',')
                title = this.extrainfo.prj4title
                this.Prjtitle4 = title
              }else if (Number(k)===5){
                arr = this.arrayDataRealtime.prjv1.split(',')
                title = this.extrainfo.prj5title
                this.Prjtitle5 = title
              }else if (Number(k)===6){
                arr = this.arrayDataRealtime.prjv1.split(',')
                title = this.extrainfo.prj6title
                this.Prjtitle6 = title
              }else if (Number(k)===7){
                arr = this.arrayDataRealtime.prjv1.split(',')
                title = this.extrainfo.prj7title
                this.Prjtitle7 = title
              }
              var tt
              console.log('arr/////// is',arr)
              tt = {
                t:title,
                t0: arr[0],
                t1: arr[1],
                t2: arr[2],
                t3: arr[3],
                t4: arr[4],
                t5: arr[5],
                t6: arr[6],
                t7: arr[7]
              }
              console.log('title is',title)
              if (title !== ''){
                this.realtime.push(tt)
              }

            }
            // this.Cols.push({prop: arr, name: '指标'})
            // this.realtime.push(JSON.stringify(arr0temp.join(',')))
            // console.log('arr0temp is',JSON.stringify(arr0temp.join(',')))
            console.log('this.realtime is',this.realtime)
            // this.realtime.push(this.arrayDataRealtime.prjv0)
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      },*/
      getcurve(userid) {
        this.xdata0 = []
        this.DateArr = []
        this.Ydata = []
        this.Labels = []
        this.YDatasets = []
        api.request('get', 'data/curve/list?btk=getcurve&type=default&operator_id=' + userid+'&sn='+this.selectedDeviceSn )
          .then(response => {
            this.DateArr = []
            // console.log(response.data)
            this.arrayDataCurve = response.data.body.data
            var s = response.data.body.extrainfo
            if (s.prj0title != ''){
              this.Labels.push(s.prj0title)
            }if (s.prj1title != ''){
              this.Labels.push(s.prj1title)
            }if (s.prj2title != ''){
              this.Labels.push(s.prj2title)
            }if (s.prj3title != ''){
              this.Labels.push(s.prj3title)
            }if (s.prj4title != ''){
              this.Labels.push(s.prj4title)
            }if (s.prj5title != ''){
              this.Labels.push(s.prj5title)
            }if (s.prj6title != ''){
              this.Labels.push(s.prj6title)
            }if (s.prj7title != ''){
              this.Labels.push(s.prj7title)
            }

            console.log('//////this.Labels is',this.Labels)

            // this.xdata = new Array(this.arrayDataCurve.length)
            for (var i = 0; i < this.arrayDataCurve.length; i++) {
              //this.xdata0.push(i+'') //(this.arrayDataCurve[i].date)
              /*this.DateArr.push(this.arrayDataCurve[i].date)
              //this.xdata0.push(i+ '')*/
              //this.DateArr.push(((this.arrayDataCurve[i].prjv0).split(',')))
              this.Data1.push(((this.arrayDataCurve[i].prjv0).split(','))[0])
              this.Data2.push(((this.arrayDataCurve[i].prjv1).split(','))[0])
              this.Data3.push(((this.arrayDataCurve[i].prjv2).split(','))[0])
              this.Data4.push(((this.arrayDataCurve[i].prjv3).split(','))[0])
              this.Data5.push(((this.arrayDataCurve[i].prjv4).split(','))[0])
              this.Data6.push(((this.arrayDataCurve[i].prjv5).split(','))[0])
              this.Data7.push(((this.arrayDataCurve[i].prjv6).split(','))[0])
              this.Data8.push(((this.arrayDataCurve[i].prjv7).split(','))[0])
              /*this.ydata0.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[0]))
              this.ydata1.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[1]))
              this.ydata2.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
              this.ydata3.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
              this.ydata4.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
              this.ydata5.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
              this.ydata6.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
              this.ydata7.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))*/
              //console.log('number is',Number(((this.arrayDataCurve[i].prjv0).split(','))[0]))
            }
            this.DateArr.push(this.Data1)
            this.DateArr.push(this.Data2)
            this.DateArr.push(this.Data3)
            this.DateArr.push(this.Data4)
            this.DateArr.push(this.Data5)
            this.DateArr.push(this.Data6)
            this.DateArr.push(this.Data7)
            this.DateArr.push(this.Data8)
            console.log('bbbbbbbbbbbbbb.this.DateArr is',this.DateArr)
            this.drawcurve()
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      },
      drawcurve () {
        console.log('///testabc is',this.xdata0)
        for (var i = 0; i < this.arrayDataCurve.length; i++) {
          //var timestr = (this.arrayDataCurve[i].date).split('+')
          var temp = (this.arrayDataCurve[i].date).substring(2,(this.arrayDataCurve[i].date).length).replace('+08:00','').replace(':00Z','').replace('T',' ')
          this.xdata0.push(temp.substring(0,temp.length-3))
        }
        var ctx = document.getElementById("myChart").getContext('2d');
        for (var s = 0; s<this.Labels.length; s++){
          console.log('aaaaaaaaaaaaaaa.this.DateArr is',this.DateArr[s])
          var ds = {
            label: this.Labels[s],
            data: this.DateArr[s],  //
            fill: false,
            borderColor: this.Colors[s],
            pointBackgroundColor: this.Colors[s],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 1
          }
          this.YDatasets.push(ds)
        }

        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.xdata0, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], //
            datasets: this.YDatasets
          },
          options: {
            xAxes: [{
              display: true, // X轴 上竖线是否显示
              color: '#ffffff', //颜色
              stacked: true,
              scaleLabel: {
                display: true, // x轴下面显示 x名字 是否显示
                labelString: 'Month', //名字
              },
              gridLines: {
                color: '#aab5fd', // X轴 上竖线颜色
                zeroLineColor: "#aab5fd" // 起点的颜色
              },
              ctx: {
                font: "18px  Helvetica, Arial, sans-serif"
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Value'
              },
              ticks: { // 刻度线
                suggestedMin: 0,
                suggestedMax: 250,
              },
              gridLines: {
                color: '#aab5fd',
                zeroLineColor: "#aab5fd"
              }
            }],
            maintainAspectRatio: !this.isMobile,
            //scaleOverride: true, //是否用硬编码重写y轴网格线
            //scaleSteps: 3, //y轴刻度的个数
            //scaleSteps: 20,
            //scaleGridLineWidth:0.1,
            //scaleLineWidth:0.1,
            //barPercentage:0.9,
            /*responsive: true,
            maintainAspectRatio: !this.isMobile,
            legend: {
              position: 'bottom',
              display: true
            },*/
            /*scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }]
            }*/
            layout: {
              padding: {
                left: 10,
                right: 0,
                top: 0,
                bottom: 0
              }
            }
          }
        });
      },
      gethistorydata(userid,daterange,type) {
        this.historyData = []
        console.log('.......this.daterange is', daterange)
        var starttime = formatDate(daterange[0],"yyyy-MM-dd")
        var endtime = formatDate(daterange[1],"yyyy-MM-dd")
        console.log('.......starttime is',starttime)
        console.log('.......endtime is',endtime)
        api.request('get', 'data/curve/list?btk=gethistorydata&operator_id=' + userid + '&page=0&size=12&startDate='+starttime+'&endDate='+endtime+'&type='+type+'&sn='+this.selectedDeviceSn)
          .then(response => {

            this.historyData = response.data.body.data
            console.log('//////this.historyData is',this.historyData)
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      },
      changeDate(val){
        console.log('changeData.val is',val)
        console.log('/////date is',this.value7)
        var userid = localStorage.getItem('userid')
        this.gethistorydata(userid,val,'getbyDateChoose')
      }
    },
    created () {
      // 获取设备信息
      this.Colors.push('#eeeaaa')
      this.Colors.push('#113322')
      this.Colors.push('#ff0000')
      this.Colors.push('#00ff00')
      this.Colors.push('#0000ff')
      this.Colors.push('#abcdef')
      this.Colors.push('#fcbacd')
      this.Colors.push('#eeccff')
      var userid = localStorage.getItem('userid')
      this.selectedDeviceSn = '012345675432012345675432012345675431'
      this.getmydevice(userid)
      this.getrealtimedata(userid)
      var nowstart = new Date();
      this.value7.push(nowstart)
      this.value7.push(nowstart)
      this.gethistorydata(userid,this.value7,'default')
      this.getcurve(userid)

    },
    mounted () {
      var userid = localStorage.getItem('userid')
      // this.testabc()
      // this.showPage(this.pageCurrent, null, true)
      // this.render(this.xdata0,this.ydata0,this.ydata1,this.ydata2,this.ydata3,this.ydata4,this.ydata5,this.ydata6,this.ydata7)
    },
    computed: {
      isMobile () {
        return (window.innerWidth <= 800 && window.innerHeight <= 600)
      }
    }
  }

</script>

<style>
  /* Using the bootstrap style, but overriding the font to not draw in
     the Glyphicons Halflings font as an additional requirement for sorting icons.

     An alternative to the solution active below is to use the jquery style
     which uses images, but the color on the images does not match adminlte.

  @import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
  */
  @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

  table.dataTable thead .sorting:after,
  table.dataTable thead .sorting_asc:after,
  table.dataTable thead .sorting_desc:after {
    font-family: 'FontAwesome';
  }

  table.dataTable thead .sorting:after {
    content: "\f0dc";
  }

  table.dataTable thead .sorting_asc:after {
    content: "\f0dd";
  }

  table.dataTable thead .sorting_desc:after {
    content: "\f0de";
  }
</style>
