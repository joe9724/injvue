<template>
  <div>
    <!--<h4 class="text-center">编辑用户</h4>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div id="example1_length" class="dataTables_length">
            <router-link class="pageLink" to="/device/add">
              <a>
                <span class="page" style="float:right;margin:5px"><el-button type="success" plain>添加</el-button></span>

              </a>
            </router-link>
          </div>
          <!--<el-button type="primary" @click="onSubmit">确定</el-button>-->
          <el-table
            :stripe = true
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="名称"
              width="100">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="角色"
              width="100">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.role }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号"
              width="150">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="最后登录时间"
              width="200">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.lasttime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="最后登录IP"
              width="200">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.lastip }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">授权</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        tableData: [{
          role: 'root',
          name: 'PF',
          des: '模块说明',
          lasttime: '2018-03-27 12:00:00',
          lastip: '218.94.215.3',
          phone: '18963636363'
        }, {
          role: 'admin',
          name: 'WCC',
          des: '模块说明',
          lasttime: '2018-03-27 12:00:00',
          lastip: '218.94.215.3',
          phone: '18963636363'
        }, {
          role: 'admin',
          name: 'JACK',
          des: '模块说明',
          lasttime: '2018-03-27 12:00:00',
          lastip: '218.94.215.3',
          phone: '18963636363'
        }, {
          role: 'admin',
          name: 'MARY',
          des: '模块说明',
          lasttime: '2018-03-27 12:00:00',
          lastip: '218.94.215.3',
          phone: '18963636363'
        }, {
          role: 'guest',
          name: 'WAWA',
          des: '模块说明',
          lasttime: '2018-03-27 12:00:00',
          lastip: '218.94.215.3',
          phone: '18963636363'
        }]
      }
    },
    methods: {
      handleEdit (index, row) {
        console.log(index, row)
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
</style>
