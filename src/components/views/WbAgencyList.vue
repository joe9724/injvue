<template>
  <section class="content">

    <div class="row center-block" style="background: #ffffff">
      <div id="example1_length" class="dataTables_length">
        <router-link class="pageLink" to="/agency/add">
          <a>
            <span class="page" style="float:right;margin:5px"><el-button type="success" plain>添加组织</el-button></span>
          </a>
        </router-link>

      </div>

      <el-table
        :data="arrayData"
        :show-overflow-tooltip = true
        stripe
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          min-width="40">
          <template slot-scope="scope">
            {{Number(scope.$index+1)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="agency_name"
          label="名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="contact_name"
          label="联系人"
          min-width="120">

        </el-table-column>
        <el-table-column
          prop="contact_number"
          label="联系号码"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="contact_addr"
          label="联系地址"
          min-width="200">
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.status | FormatStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="editAgency(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="removeAgency(scope.row.id)">删除</el-button>
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
            layout="prev, pager, next"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
      <!-- /.box-body -->
    </div>

  </section>
</template>

<script>
  // import $ from 'jquery'
  import api from '../../api'
  import { formatDateBtk, formatStatus } from '../../filters/index.js'

  export default {
    filters: {
      BTKformatDate (time) {
        var date = new Date(time)
        return formatDateBtk(date, 'yyyy-MM-dd hh:mm')
      },
      FormatStatus (status) {
        return formatStatus(status)
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
        pagesize: 12,
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
        this.$confirm('确认删除？')
          .then(_ => {
            // done()
            console.log('删除成功')
          })
          .catch(_ => {})
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        var userid = localStorage.getItem('userid')
        api.request('get', '/agency/list?operator_id=' + userid + '&page=' + Number(val - 1) + '&size=12')
          .then(response => {
            console.log(response.data)
            this.arrayData = response.data.body.data
            this.totalCount = response.data.body.return.count
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = error
          })
      },
      editAgency (agencyId) {
        // this.$router.push('/org/edit?orgid=' + agentId)
        this.$router.push({path: '/agency/edit?agencyId=' + agencyId})
      },
      removeAgency (agentId) {
        this.$confirm('此操作将永久删除 ' + ', 是否继续?', '提示', {type: 'warning'})
          .then(() => {
            // 向请求服务端删除
            var userid = localStorage.getItem('userid')
            api.request('get', '/agency/delete?agency_id=' + agentId + '&operator_id=' + userid)
              .then(response => {
                console.log(response.data)
                this.$message.info('删除成功!')
                // reload
                api.request('get', '/agency/list?operator_id=' + userid + '&page=0&size=12')
                  .then(response => {
                    console.log(response.data)
                    this.arrayData = response.data.body.data
                    this.totalCount = response.data.body.return.count
                  })
                  .catch(error => {
                    // this.$store.commit('TOGGLE_LOADING')
                    console.log(error)
                    this.response = error
                  })
              })
              .catch(error => {
                // this.$store.commit('TOGGLE_LOADING')
                console.log(error)
                this.response = error
              })
          })
          .catch(() => {
            this.$message.info('已取消操作!')
          })
      }
    },
    created () {
      var userid = localStorage.getItem('userid')
      api.request('get', '/agency/list?operator_id=' + userid + '&page=0&size=12')
        .then(response => {
          console.log(response.data)
          this.arrayData = response.data.body.data
          this.totalCount = response.data.body.return.count
        })
        .catch(error => {
          // this.$store.commit('TOGGLE_LOADING')
          console.log(error)
          this.response = error
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
