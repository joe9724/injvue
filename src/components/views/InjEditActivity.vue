<template>
  <div>
    <!--<h5 class="text-center">添加设备</h5>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="form.summary"></el-input>
            </el-form-item>
            <el-form-item label="图标">
            <img v-bind:src="imgUrl"/>
            <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              @imageuploaded="imageUploaded"
              data="type:m4a"
              :max-file-size="5242880"
              inputOfFile="file"
              text="选择图片"
              :credentials="false"
              :url="uploadUrl">

            </vue-core-image-upload>
            </el-form-item>
            <el-form-item label="经度">
              <el-input v-model="form.lat"></el-input>
            </el-form-item>
            <el-form-item label="维度">
              <el-input v-model="form.lon"></el-input>
            </el-form-item>
            <el-form-item label="地点">
              <el-input v-model="form.area"></el-input>
            </el-form-item>
            <el-form-item label="时间">
            <el-date-picker
              @change="changeDate"
              v-model="value7"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
            </el-form-item>
            <el-form-item label="分类">
              <el-select v-model="value" placeholder="请选择所属分类" value-key="agency_id">
                <el-option v-for="item in options" :label="item.agency_name" :value="item" :key="item.id" />
              </el-select>
            </el-form-item>
            {{value}}
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="正常"></el-radio>
                <el-radio label="无效"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="多图">
              <uploader :options="options1" class="uploader-example" :file-status-text="statusText" ref="uploader" @file-complete="fileComplete" @complete="complete">
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                  <p>拖拽上传</p>
                  <!--<uploader-btn>选择文件</uploader-btn>-->
                  <uploader-btn :attrs="attrs">选择文件</uploader-btn>
                  <!--<uploader-btn :directory="true">select folder</uploader-btn>-->
                </uploader-drop>
                <uploader-list></uploader-list>
              </uploader>
            </el-form-item>
            <el-form-item label="内容">
              <vue-editor id="editor"
              useCustomImageHandler
              @imageAdded="handleImageAdded" v-model="htmlForEditor">
              </vue-editor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
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
  import { VueEditor } from 'vue2-editor'
  import VueCoreImageUpload from '../../../node_modules/vue-core-image-upload/src/vue-core-image-upload.vue'

  export default {
    components: {
      VueEditor,
      'vue-core-image-upload': VueCoreImageUpload
    },
    data () {
      return {
        options1: {
          // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
          target: 'configParams.uploadURI',
          testChunks: false,
          chunkSize: 100 * 1024 * 1024
        },
        attrs: {
          accept: '*/*'
        },
        statusText: {
          success: '成功了',
          error: '出错了',
          uploading: '上传中',
          paused: '暂停中',
          waiting: '等待中'
        },
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        options: [],
        value: ''
      }
    },
    methods: {
      onSubmit () {
        var userid = localStorage.getItem('userid')
        var statusValue = ''
        if (this.form.status === '正常') {
          statusValue = '0'
        } else if (this.form.status === '锁定') {
          statusValue = '-1'
        } else if (this.form.status === '无效') {
          statusValue = '-100'
        } else if (this.form.status === '未分配') {
          statusValue = '100'
        }
        var params = {
          'operator_id': userid,
          'agency_id': this.value.id + '',
          'device_id': this.form.device_id,
          'device_name': this.form.device_name,
          'latitude': 32.34112,
          'longitude': 118.2341,
          'status': Number(statusValue)
        }
        api.request('post', '/device/add', params)
          .then(response => {
            var data = response.data
            console.log(JSON.stringify(data))
            this.$message({
              message: '操作成功!',
              type: 'success'
            })
            //
            this.$router.go(-1)
            /* if (data.status !== 200) {
              console.log('2')
              this.response = data.message
              return
            }
            if (data.status === 0) {
              console.log('4')
              this.response = data.message
              this.$router.push('/deviceList')
              // console.log('path is' + JSON.stringify(data.data.paths[0].children[0].path))
            } */
          })
          .catch(error => {
            console.log(error)
            this.response = error
          })
      }
    },
    created () {
      // 先获取组织机构列表
      var userid = localStorage.getItem('userid')
      api.request('get', '/agency/list?operator_id=' + userid + '&page=0&size=12')
        .then(response => {
          console.log(response.data)
          this.options = response.data.body.data
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

  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .datetime-picker input {
    height: 4em !important;
  }

</style>
