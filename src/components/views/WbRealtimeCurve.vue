<template>
  <section class="content">

    <div class="row center-block" style="background: #ffffff">
      <el-table
        :data="realtime"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="t"
          label="指标"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="t0"
          label="T0"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="t1"
          label="T1"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="t2"
          label="T2"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="t3"
          label="T3"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="t4"
          label="T4"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="t5"
          label="T5"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="t6"
          label="T6"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="t7"
          label="T7"
          width="auto">
        </el-table-column>
      </el-table>
      <div>
        <div class="block">
          <!--<span class="demonstration">调整每页显示条数</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="12"
            layout=" prev, pager, next"
            :total="totalCount">
          </el-pagination>-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  // import $ from 'jquery'
  import api from '../../api'
  import {formatDateBtk, OperationLogFilter, formatMsgStatus, formatRealtimeStatus} from '../../filters/index.js'
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
      }
    },
    data () {
      return {
        realtime: [],
        arrayDataRealtime: [],
        // 删除确认框
        dialogVisible: false,
        datas: []
      }
    },
    methods: {
    },
    created () {
      console.log('////created')
      var userid = localStorage.getItem('userid')
      api.request('get', 'data/curve/list?operator_id=' + userid + '&page=0&size=12')
        .then(response => {
          this.arrayDataRealtime = response.data.body.data[0]
          var title
          for (var k=0; k<8; k++){
            var arr
            if (Number(k)===0){
              arr = this.arrayDataRealtime.prjv0.split(',')
              title = '温度T(℃)'
            }else if (Number(k)===1){
              arr = this.arrayDataRealtime.prjv1.split(',')
              title = '湿度H(%)'
            }else if (Number(k)===2){
              arr = this.arrayDataRealtime.prjv1.split(',')
              title = 'PM2.5(mg/mmm)'
            }else if (Number(k)===3){
              arr = this.arrayDataRealtime.prjv1.split(',')
              title = 'PM10(mg/mmm)'
            }else if (Number(k)===4){
              arr = this.arrayDataRealtime.prjv1.split(',')
              title = '臭氧(ppm)'
            }else if (Number(k)===5){
              arr = this.arrayDataRealtime.prjv1.split(',')
              title = '二氧化硫(ppm)'
            }else if (Number(k)===6){
              arr = this.arrayDataRealtime.prjv1.split(',')
              title = '二氧化氮(ppm)'
            }else if (Number(k)===7){
              arr = this.arrayDataRealtime.prjv1.split(',')
              title = '一氧化碳(ppm)'
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
            this.realtime.push(tt)
            }
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
    },
    mounted () {
      // this.showPage(this.pageCurrent, null, true)
    },
    computed: {}
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
