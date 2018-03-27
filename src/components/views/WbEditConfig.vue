<template>
  <div>
    <h6 class='text-center'>预警设置</h6>
    <section class='content'>
      <div class='row'>
        <div class='col-md-12'>
          <el-form ref='form' :model='form' label-width='120px'>
            <div class='editor-w clearfix'>
              <div class='w-2'>
                <div class='editor'>
                  <JsonEditor :objData='jsonData' v-model='jsonData' ></JsonEditor>
                </div>
              </div>
              <div class='w-2'>
                <div class='code-pre'>
                  <div slot='content'>
						<!--<pre>
							<code class='json' id='res_code'></code>
						</pre>-->
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
          "type": 2,
          "sn": "012345675432",
          "data": {
            "status": {
              "name": "烟雾1",
              "svr": "123.57.158.51"
            }
          }
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
        //let c = this.formatJson(JSON.stringify(this.jsonData))
        //this.drawResCode(c)
      }
    },
    methods: {
      onSubmit () {
        // this.$router.push('/users')
        console.log('update_json is', this.jsonData)
        var userid = localStorage.getItem('userid')
        var deviceNo = 'abc'
        if (this.$route.query.device_id) {
          deviceNo = this.$route.query.device_id
        }
        var params = {
          'device_name': '0',
          'agency_id': '0',
          'latitude': 0.0,
          'longitude': 0.0,
          'status': 0,
          'operator_id': userid,
          'device_id': deviceNo,
          'json_status': JSON.stringify(this.jsonData),
          'update_json': Number(1)
        }
        api.request('post', 'device/edit', params)
          .then(response => {
            var data = response.data
            console.log(JSON.stringify(data))
            if (data.status !== 200) {
              console.log('2')
              this.response = data.message
              return
            }
            if (data.status === 200) {
              console.log('4')
              this.response = data.message
              this.$router.push('/agencyList')
              // console.log('path is' + JSON.stringify(data.data.paths[0].children[0].path))
            }
          })
          .catch(error => {
            console.log(error)
            this.response = error
          })
      },
      //JSON format print
      formatJson: function(txt, compress /*是否为压缩模式*/) {
        /* 格式化JSON源码(对象转换为JSON文本) */
        var indentChar = "  ";
        if (/^\s*$/.test(txt)) {
          console.error("数据为空,无法格式化! ");
          return;
        }
        try {
          var data = eval("(" + txt + ")");
        } catch (e) {
          throw ("数据源语法错误,格式化失败! 错误信息: " + e.description, "err");
          return;
        }
        var draw = [],
          last = false,
          This = this,
          line = compress ? "" : "\n",
          nodeCount = 0,
          maxDepth = 0;
        var notify = function(name, value, isLast, indent /*缩进*/, formObj) {
          nodeCount++; /*节点计数*/
          for (var i = 0, tab = ""; i < indent; i++) tab += indentChar; /* 缩进HTML */
          tab = compress ? "" : tab; /*压缩模式忽略缩进*/
          maxDepth = ++indent; /*缩进递增并记录*/
          if (value && value.constructor == Array) {
            /*处理数组*/
            draw.push(
              tab + (formObj ? '"' + name + '":' : "") + "[" + line
            ); /*缩进'[' 然后换行*/
            for (var i = 0; i < value.length; i++)
              notify(i, value[i], i == value.length - 1, indent, false);
            draw.push(
              tab + "]" + (isLast ? line : "," + line)
            ); /*缩进']'换行,若非尾元素则添加逗号*/
          } else if (value && typeof value == "object") {
            /*处理对象*/
            draw.push(
              tab + (formObj ? '"' + name + '":' : "") + "{" + line
            ); /*缩进'{' 然后换行*/
            var len = 0,
              i = 0;
            for (var key in value) len++;
            for (var key in value) notify(key, value[key], ++i == len, indent, true);
            draw.push(
              tab + "}" + (isLast ? line : "," + line)
            ); /*缩进'}'换行,若非尾元素则添加逗号*/
          } else {
            if (typeof value == "string") value = '"' + value + '"';
            draw.push(
              tab +
              (formObj ? '"' + name + '":' : "") +
              value +
              (isLast ? "" : ",") +
              line
            );
          }
        };
        var isLast = true,
          indent = 0;
        notify("", data, isLast, indent, false);
        return draw.join("");
      },
      //绘制res body
      /*drawResCode: function (content) {
        var target = document.getElementById('res_code');
        target.textContent = content
        hljs.highlightBlock(target)
      },*/
    },
    mounted: function () {
      let c = this.formatJson(JSON.stringify(this.jsonData))
      this.drawResCode(c)
    },
    created () {
      // 先获取组织机构列表
      var userid = localStorage.getItem('userid')
      // 再获取设备信息
      var deviceNo = 'abc'
      if (this.$route.query.device_id) {
        deviceNo = this.$route.query.device_id
      }
      api.request('get', 'device/view?operator_id=' + userid + '&device_id=' + deviceNo)
        .then(response => {
          var msg = response.data.body.data
          console.log('msg is' + msg.json_status)
          // this.form.name = msg.device_name
          // this.form.id = msg.device_id
          // this.form.status = msg.status_desc
          // this.value = msg.agency_name
          // 设置所属组织机构初始值
          // this.form.defaultvalue = msg.agency_id
          this.data = msg.json_status
          var json = JSON.parse(msg.json_status)
          this.jsonData = json
          console.log('type is', json.data.status)
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
