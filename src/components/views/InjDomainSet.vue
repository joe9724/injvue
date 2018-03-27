<template>
  <div>
    <!--<h4 class="text-center">编辑用户</h4>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    Ios <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">v0.1</el-dropdown-item>
              <el-dropdown-item command="b">v0.2</el-dropdown-item>
              <el-dropdown-item command="c">v0.3</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    Android <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">v0.1</el-dropdown-item>
              <el-dropdown-item command="b">v0.2</el-dropdown-item>
              <el-dropdown-item command="c">v0.3</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--<el-button type="primary" @click="onSubmit">确定</el-button>-->
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="模块"
              width="200">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="域名"
              width="400">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.domain }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          domain: 'user.inj100.jstv.com',
          name: '用户',
          des: '模块说明'
        }, {
          domain: 'activity.inj100.jstv.com',
          name: '活动',
          des: '模块说明'
        }, {
          domain: 'zone.inj100.jstv.com',
          name: '社区',
          des: '模块说明'
        }, {
          domain: 'goods.inj100.jstv.com',
          name: '商品',
          des: '模块说明'
        }, {
          domain: 'bus.inj100.jstv.com',
          name: '公交',
          des: '模块说明'
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
