<template>
  <div>
    <h6 class='text-center'>消息内容</h6>
    <section class='content'>
      <div class='row'>
        <div class='col-md-12'>
          <el-form ref='form' :model='form' label-width='120px'>
            <div class='editor-w clearfix'>
              <div class='w-2'>
                <div class='editor'>
                  <JsonEditor :objData='jsonData' v-model='jsonData' ></JsonEditor>
                </div>
                {{jsonData}}
              </div>
              <div class='w-2'>
                <div class='code-pre'>
                  <div slot='content'>
                    <pre>
                                    <code class='json' id='res_code'></code>
                                </pre>
                  </div>
                </div>
              </div>
            </div>
            <!--<tr v-for='(item,index) in arrayData' v-bind:key='item.name'>
            <el-input
              placeholder='请输入内容'
              v-model='input10'
              clearable>
            </el-input>
            </tr>-->
            <el-form-item>
              <el-button type='primary' @click='onSubmit'>确定</el-button>
              <!--<el-button>确定</el-button>-->
            </el-form-item>
          </el-form>
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
        jsonData: {
          "type": 3
        },
        data: [],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    watch: {
      'jsonData': function () {
        console.log('xxxxxxxxx........watch ed!', this.jsonData)
        // this.jsonData = 'xxxx'
      }
    },
    methods: {
      onSubmit () {
      }
    },
    mounted: function () {
    },
    created () {
      // 先获取组织机构列表
      var userid = localStorage.getItem('userid')
      // 再获取设备信息
      var id = 'abc'
      if (this.$route.query.id) {
        id = this.$route.query.id
      }
      api.request('get', 'log/message?operator_id=' + userid + '&id=' + id)
        .then(response => {
          var msg = (response.data.body.data)[0]
          console.log('//////////msg is', msg)
          var json = JSON.parse(msg.content)
          console.log('//////////json is', json)
          this.jsonData = json
          // this.set(this.jsonData, json)
          // this.jsonData = Object.assign({}, this.jsonData, {'a': 1})
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
</style>
