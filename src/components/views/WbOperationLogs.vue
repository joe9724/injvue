<template>
  <section class="content">

    <div class="row center-block" style="background: #ffffff">

      <el-table
        :data="arrayData"
        :show-overflow-tooltip = true
        stripe
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          min-width="1%">
          <template slot-scope="scope">
            {{Number(scope.$index+1)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="操作人"
          min-width="3%">
        </el-table-column>
        <el-table-column
          prop="content"
          label="操作"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="on_ip"
          label="IP"
          min-width="7%">
        </el-table-column>
        <el-table-column
          label="时间"
          min-width="6%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.time*1000 | BTKformatDate}}</span>
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
            :page-size="10"
            layout="prev, pager, next"
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
  import {formatDateBtk, OperationLogFilter} from '../../filters/index.js'
  export default {
    filters: {
      BTKformatDate (time) {
        var date = new Date(time)
        return formatDateBtk(date, 'yyyy-MM-dd hh:mm')
      },
      FormatOperationLog (sb, action, target, id) {
        return OperationLogFilter(sb, action, target, id)
      }
    },
    data () {
      return {
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
        dialogVisible: false
      }
    },
    methods: {
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
        api.request('get', '/log/operate?operator_id=' + userid + '&page=' + val + '&size=12')
          .then(response => {
            console.log(response.data)
            this.arrayData = response.data.body.data
            this.totalCount = response.data.body.return.count
            for (var i = 0; i < this.arrayData.length; i++) {
              this.arrayData.time = formatDateBtk(this.arrayData.join_time)
            }
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
      api.request('get', '/log/operate?operator_id=' + userid + '&page=0&size=12')
        .then(response => {
          console.log(response.data)
          this.arrayData = response.data.body.data
          this.totalCount = response.data.body.return.count
          for (var i = 0; i < this.arrayData.length; i++) {
            this.arrayData.time = formatDateBtk(this.arrayData.join_time)
          }
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
