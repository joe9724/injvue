<template>
  <div>
    <!--<h4 class="text-center">编辑用户</h4>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入关键字" v-model="input5" class="input-with-select">

              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <!--<el-button type="primary" @click="onSubmit">确定</el-button>-->
          <el-table
            :stripe = true
            :data="arrayData"
            style="width: 100%">
            <el-table-column
              label="会员名"
              width="300">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">导出用户</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">禁止</el-button>
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
        input5: ''
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
      api.request('get', 'zone/members?userid=1&page=0&count=20&zone_id=1')
        .then(response => {
          this.arrayData = response.data.body.data.members
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
