<template>
  <div>
    <!--<h4 class="text-center">编辑用户</h4>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div id="example1_length" class="dataTables_length">
            <router-link class="pageLink" to="/inj/activity/add">
              <a>
                <span class="page" style="float:right;margin:5px"><el-button type="success" plain>添加</el-button></span>

              </a>
            </router-link>
          </div>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <!--<el-button type="primary" @click="onSubmit">确定</el-button>-->
          <el-table
            :stripe = true
            :data="arrayData"
            style="width: 100%">
            <el-table-column
              label="圈名"
              width="300">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="100">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showMembers(scope.$index, scope.row)">圈内用户</el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">上移</el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">下移</el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">导出用户</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">关闭</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import api from '../../api'

  export default {
    data () {
      return {
        arrayData: [],
        totalCount: '',
        input5: '',
        tableData: [{
          role: 'root',
          name: '周末去哪儿',
          des: '模块说明',
          lasttime: '2018-03-27 12:00:00',
          lastip: '218.94.215.3',
          phone: '18963636363',
          status: '正常'
        }, {
          role: 'admin',
          name: '88积分即可获得康贝佳口腔医院VIP卡',
          des: '模块说明',
          lasttime: '2018-03-27 12:00:00',
          lastip: '218.94.215.3',
          phone: '18963636363',
          status: '过期'
        }, {
          role: 'admin',
          name: '连续签到赢700积分',
          des: '模块说明',
          lasttime: '2018-03-27 12:00:00',
          lastip: '218.94.215.3',
          phone: '18963636363',
          status: '正常'
        }, {
          role: 'admin',
          name: '用相机记录下你家宝贝的成长点滴',
          des: '模块说明',
          lasttime: '2018-03-27 12:00:00',
          lastip: '218.94.215.3',
          phone: '18963636363',
          status: '正常'
        }, {
          role: 'guest',
          name: '9折入商城鲜果时蔬',
          des: '模块说明',
          lasttime: '2018-03-27 12:00:00',
          lastip: '218.94.215.3',
          phone: '18963636363',
          status: '下架'
        }]
      }
    },
    methods: {
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
</style>
