<template>
  <section class="content">

    <div class="row center-block" style="background: #ffffff">
      <span><el-input v-model="deviceID" placeholder="请输入设备ID" style="width:300px"></el-input></span>
      <span><el-select v-model="value" placeholder="消息类型">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select></span>
<span><el-date-picker
  @change="changeDate"
  v-model="value7"
  type="daterange"
  align="right"
  unlink-panels
  range-separator="至"
  start-placeholder="开始日期"
  end-placeholder="结束日期"
  :picker-options="pickerOptions2">
      </el-date-picker><el-button type="primary" @click="search">搜索</el-button></span>

      <el-table
        :data="arrayData"
        :show-overflow-tooltip = true
        stripe
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          min-width="2%">
          <template slot-scope="scope">
            {{Number(scope.$index+1)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="device_id"
          label="设备ID"
          min-width="5%">
        </el-table-column>
        <el-table-column
          label="类型"
          min-width="2%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.type | formatMsgStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="时间"
          min-width="4%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.time*1000 | BTKformatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="on_ip"
          label="IP"
          min-width="5%">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="4%"><template slot-scope="scope">
          <el-button type="text" @click="showdialog(scope.row.content)">查看数据</el-button>
        </template>
        </el-table-column>
      </el-table>
      <sweet-modal ref="mydialog">
        {{this.msgcontent}}
      </sweet-modal>
      <!--<table class="table table-bordered table-responsive table-striped">
        <thead>
        <tr>
          <th>序号</th>
          <th>设备id</th>
          <th>类型</th>
          <th>时间</th>
          <th>IP</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in arrayData" v-bind:key="item.device_id">
          <td class="sorting_1" style="vertical-align: middle">{{index+1}}</td>
          <td class="sorting_1" style="vertical-align: middle">{{item.device_id}}</td>
          <td class="sorting_1" style="vertical-align: middle">{{item.type | formatMsgStatus}}</td>
          <td class="sorting_1" style="vertical-align: middle">{{item.time*1000 | BTKformatDate}}</td>
          <td class="sorting_1" style="vertical-align: middle">{{item.on_ip}}</td>
          <td class="sorting_1" style="vertical-align: middle"><el-button type="text" @click="dialogVisible = true">查看数据</el-button><el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>{{item.content}}</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关 闭</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
          </el-dialog></td>
        </tr>
        </tbody>
      </table>-->
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
    </div>
  </section>
</template>

<script>
  // import $ from 'jquery'
  import api from '../../api'
  import {formatDateBtk, OperationLogFilter, formatMsgStatus, formatDate} from '../../filters/index.js'
  import { SweetModal } from 'sweet-modal-vue'
  export default {
    components: {
      SweetModal
    },
    filters: {
      FormatDate (time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      BTKformatDate (time) {
        var date = new Date(time)
        return formatDateBtk(date, 'yyyy-MM-dd hh:mm')
      },
      FormatOperationLog (sb, action, target, id) {
        return OperationLogFilter(sb, action, target, id)
      },
      FormatMsgStatus (status) {
        return formatMsgStatus(status)
      }
    },
    data () {
      return {
        deviceID: '',
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
        value: '',
        value6: '',
        value7: [],
        options: [{
          value: 'All',
          label: 'All'
        }, {
          value: 'Status',
          label: 'Status'
        }, {
          value: 'Data',
          label: 'Data'
        }, {
          value: 'Warning',
          label: 'Warning'
        }, {
          value: 'HeartBeat',
          label: 'HeartBeat'
        }, {
          value: 'Request',
          label: 'Request'
        }],
        currentPage: 1,
        // 为第一页或者最后一页时，首页，尾页不能点击
        fDisabled: false,
        lDisabled: false,
        // 总项目数
        totalCount: 40,
        // 分页数
        pageCount: 20,
        // 当前页面
        pageCurrent: 1,
        // 分页大小
        pagesize: 10,
        // 显示分页按钮数
        showPages: 11,
        // 开始显示的分页按钮
        showPagesStart: 1,
        // 结束显示的分页按钮
        showPageEnd: 100,
        // 分页数据
        arrayData: [],
        // 删除确认框
        dialogVisible: false,
        msgcontent: '',
        starttimets: '',
        endtimets: ''
      }
    },
    methods: {
      search () {
        console.log('deviceID is', this.deviceID, this.value, this.value7)
        var userid = localStorage.getItem('userid')
        /* ErrorStatus = 0
        HeartBeat  = 1
        Status     = 2
        Config  = 3
        Data = 4
        Warning  = 5
        Request = 6 */

        var sql = ''
        var msgtype
        if (this.value === 'All') {
          msgtype = -1
        } else if (this.value === 'Status') {
          msgtype = 2
          sql = '&type=2'
        } else if (this.value === 'Data') {
          msgtype = 4
          sql = '&type=4'
        } else if (this.value === 'Warning') {
          msgtype = 5
          sql = '&type=5'
        } else if (this.value === 'HeartBeat') {
          msgtype = 1
          sql = '&type=1'
        } else if (this.value === 'Request') {
          msgtype = 6
          sql = '&type=6'
        }
        if (this.deviceID !== '') {
          sql = sql + '&deviceId=' + this.deviceID
        }
        if (this.value7 == null) {
          this.starttimets = ''
        }
        if (this.starttimets !== '') {
          sql = sql + '&start=' + Number((new Date(this.starttimets).getTime()) / 1000)
          sql = sql + '&end=' + Number((new Date(this.endtimets).getTime()) / 1000)
        }
        console.log(msgtype)
        api.request('get', 'log/message?operator_id=' + userid + '&page=0&size=12' + sql)
          .then(response => {
            // console.log(response.data)
            this.arrayData = response.data.body.data
            this.totalCount = response.data.body.return.count
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      },
      changeDate (val) {
        console.log('val is', val)
        var starttime = formatDate(val[0], 'yyyy-MM-dd')
        var endtime = formatDate(val[1], 'yyyy-MM-dd')
        this.starttimets = starttime
        this.endtimets = endtime
        console.log(starttime, endtime, new Date(starttime).getTime())
      },
      showdialog (content) {
        this.msgcontent = content
        this.$refs.mydialog.open()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        var userid = localStorage.getItem('userid')
        api.request('get', 'log/message?operator_id=' + userid + '&page=' + Number(val - 1) + '&size=12')
          .then(response => {
            // console.log(response.data)
            this.arrayData = response.data.body.data
            this.totalCount = response.data.body.return.count
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      }
    },
    created () {
      var userid = localStorage.getItem('userid')
      api.request('get', 'log/message?operator_id=' + userid + '&page=0&size=12')
        .then(response => {
          // console.log(response.data)
          this.arrayData = response.data.body.data
          this.totalCount = response.data.body.return.count
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
