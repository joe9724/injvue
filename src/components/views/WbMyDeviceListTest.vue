<template>
  <section class="content">
    <div class="row center-block" style="background: #ffffff;white-space:nowrap;width:100%;overflow-x:scroll;overflow-y: scroll">
<span v-for="(item,index) in arrayDataRealtime" v-bind:key="item.value" style="white-space:nowrap;">
  <div v-if="index!==0&&index%9===0"></div><el-button   style="width: 100px" v-if="item.type==='数据' && (item.maxwarning === true || item.minwarning === true)" type="danger" class="blink">{{item.value}}</el-button><el-button v-else plain   style="width: 100px" type="info" >{{item.value}}</el-button>
</span>
    </div>
  </section>
</template>

<script>
  // import $ from 'jquery'
  import api from '../../api'
  import {
    formatDateBtk,
    OperationLogFilter,
    formatMsgStatus,
    formatRealtimeStatus,
    formatDATA,
    formatDate
  } from '../../filters/index.js'

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
      FormatDATA (data, pos) {
        return formatDATA(data, pos)
      },
      FormatDate (time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    data () {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value6: '',
        value7: [],
        historyData: [],
        radioT: 0,
        activeName2: 'first',
        arrayDataCurve: [],
       /*  T0name: '',
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
        Prjtitle7: '', */
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

        /* Data1: [],
        Data2: [],
        Data3: [],
        Data4: [],
        Data5: [],
        Data6: [],
        Data7: [],
        Data8: [], */
        Cols: [],
        Channels: [],
        MydeviceList: [],
        StandardList: [],
        RealtimeDataList: []
      }
    },
    methods: {
      getrealtimedata (userid) {
        this.arrayDataRealtime = []
        this.realtime = []
        this.Cols = []
        this.selectedDeviceSn = '012345675432012345675432012345675431'
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
      // this.getmydevice(userid)
      this.getrealtimedata(userid)
      // var nowstart = new Date()
      // this.value7.push(nowstart)
      // this.value7.push(nowstart)
      // this.gethistorydata(userid,this.value7,'default')
      // this.getcurve(userid)
    },
    mounted () {
      // var userid = localStorage.getItem('userid')
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

  .event {
    border-radius:4px;
    -webkit-border-radius:4px;
    color:#FFFFFF;
    font-size:12px;
    margin:0px 30px;
    padding:2px 0px;
  }

  .event.received {
    background-color:#4B946A;
    display:none;
  }

  @keyframes fade {
    from { opacity: 1.0; }
    50% { opacity: 0.4; }
    to { opacity: 1.0; }
  }

  @-webkit-keyframes fade {
    from { opacity: 1.0; }
    50% { opacity: 0.4; }
    to { opacity: 1.0; }
  }

  .blink {
    animation:fade 1000ms infinite;
    -webkit-animation:fade 1000ms infinite;
  }
</style>
