<template>
  <div>
    <!--<h4 class="text-center">编辑用户</h4>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div id="example1_length" class="dataTables_length">
            <router-link class="pageLink" to="/inj/zone/add">
              <a>
                <span class="page" style="float:right;margin:5px"><el-button type="success" plain></el-button></span>

              </a>
            </router-link>
          </div>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <!--<el-button type="primary" @click="onSubmit">确定</el-button>-->
          <el-table
            :stripe = true
            :data="arrayData"
            style="width: 100%">
            <el-table-column
              label="内容"
              width="300">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.content }}</span>
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
        input5: ''
      }
    },
    methods: {
      showMembers (index, row) {
        // console.log(index, row)
        var zoneId = '1'
        this.$router.push({path: '/inj/zone/members?zoneId=' + zoneId})
      },
      editZone (index, row) {
        var id = '1'
        this.$router.push({path: '/inj/zone/edit?id=' + id})
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
      api.request('get', 'comments/list?userid=1&page=0&count=20&type=1&source_id=1&source_type=1')
        .then(response => {
          this.arrayData = response.data.body.data.comments
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
