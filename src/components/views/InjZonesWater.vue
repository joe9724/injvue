<template>
  <div>
    <!--<h4 class="text-center">编辑用户</h4>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入圈名关键字" v-model="input5" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <waterfall :line-gap="250" :watch="arrayData" style="margin-top: 10px">
            <!-- each component is wrapped by a waterfall slot -->
            <waterfall-slot
              v-for="(item, index) in arrayData"
              width="230"
              height="320"
              :order="index"
              :key="item.euid"
            >
              <el-card :body-style="{ padding: '10px' }">
                <img v-bind:src="item.logo" class="rimage" style="text-align: center" >
                <div style="padding: 14px;">
                  <div style="color: rgba(0,172,214,0.93);font-size: 16px">{{item.name}}</div>
                  <div>创建时间:{{item.registerat}}</div>
                  <div>动态数:{{item.level}}</div>
                  <div>话题数:{{item.level}}</div>
                  <div>评论数:{{item.level}}</div>
                  <div>浏览数:{{item.hitTimes}}</div>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">统计</el-button>
                  </div>
                </div>
              </el-card>
              <!--
                your component
              -->
            </waterfall-slot>
          </waterfall>
          <div>
            <div class="block">
              <!--<span class="demonstration">每页显示条数</span>-->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout=" prev, pager, next"
                :total="totalCount">
              </el-pagination>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>
<script>
  import api from '../../api'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

  export default {
    components: {
      Waterfall,
      WaterfallSlot
    },
    data () {
      return {
        value5: 3.7,
        arrayData: [],
        input5: '',
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
        showPageEnd: 100
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        var userid = localStorage.getItem('userid')
        api.request('get', '/device/list?operator_id=' + userid + '&page=0&size=12')
          .then(response => {
            console.log(response.data)
            this.arrayData = response.data.body.data
            this.totalCount = response.data.body.return.count
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      },
      showMembers (index, row) {
        // console.log(index, row)
        var zoneId = '1'
        this.$router.push({path: '/inj/zone/members?zoneId=' + zoneId})
      },
      handleEdit (index, row) {
        console.log(index, row)
        var activityId = '123'
        this.$router.push({path: '/inj/activity/edit?activityId=' + activityId})
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleCommand (command) {
        this.$message('click on item ' + command)
      },
      onSubmit () {
        api.request('post', 'user/edit', null)
          .then(response => {
            var data = response.data
            console.log(JSON.stringify(data))
            if (data.status !== 200) {
              console.log('2')
              this.response = data.message
              return
            }
            if (data.status === 0) {
              console.log('4')
              this.response = data.message
              this.$router.push('/deviceList')
              // console.log('path is' + JSON.stringify(data.data.paths[0].children[0].path))
            }
          })
          .catch(error => {
            console.log(error)
            this.response = error
          })
      }
    },
    created () {
      api.request('get', 'zone/list?userid=1&page=0&count=20')
        .then(response => {
          this.arrayData = response.data.body.data.zones
          this.totalCount = response.data.body.data.total_count
        })
        .catch(error => {
          // this.$store.commit('TOGGLE_LOADING')
          console.log(error)
          this.response = 'Server appears to be offline'
        })
    }
  }
</script>

<style>
  .datetime-picker input {
    height: 4em !important;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .rimage{
    width:75px;
    height:75px;
    border-radius:50%;
  }
</style>
