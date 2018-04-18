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
            <img v-bind:src="iconimgUrl"/>
            <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              @imageuploaded="iconimageUploaded"
              :max-file-size="5242880"
              inputOfFile="files"
              text="选择图片"
              :credentials="false"
              :url="uploadUrl">

            </vue-core-image-upload>
            </el-form-item>
            <el-form-item label="大图">
              <img v-bind:src="coverimgUrl"/>
              <vue-core-image-upload
                class="btn btn-primary"
                :crop="false"
                @imageuploaded="coverimageUploaded"
                :max-file-size="5242880"
                inputOfFile="files"
                text="选择图片"
                :credentials="false"
                :url="uploadUrl">

              </vue-core-image-upload>
            </el-form-item>
            <el-form-item label="分类">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="正常"></el-radio>
                <el-radio label="关闭"></el-radio>
              </el-radio-group>
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
  import configParams from '../../config'
  export default {
    components: {
      VueEditor,
      'vue-core-image-upload': VueCoreImageUpload
    },
    data () {
      return {
        options: [{
          value: '1',
          label: '户外'
        }, {
          value: '2',
          label: '唱歌'
        }, {
          value: '3',
          label: '美食'
        }, {
          value: '4',
          label: '游戏'
        }, {
          value: '5',
          label: '其他'
        }],
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
          desc: '',
          title: 'title',
          summary: 'summary'
        },
        value: '',
        iconUrl: '',
        coverUrl: '',
        uploadUrl: '',
        iconimgUrl: '',
        coverimgUrl: ''
      }
    },
    methods: {
      iconimageUploaded (response) {
        console.log('response is', response)
        this.src = response.body.url
        this.iconUrl = response.body.url
        // alert(this.imgUrl)
        // this.imgUrl = 'https://upload.jianshu.io/users/upload_avatars/2204269/54bc6df9d4b6.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'
      },
      coverimageUploaded (response) {
        console.log('response is', response)
        this.src = response.body.url
        this.coverUrl = response.body.url
        // alert(this.imgUrl)
        // this.imgUrl = 'https://upload.jianshu.io/users/upload_avatars/2204269/54bc6df9d4b6.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'
      },
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
          'euid': userid,
          'name': this.form.title,
          'logo_id': this.iconUrl,
          'pic_id': this.pic_id,
          'remark': this.form.summary,
          'status': Number(statusValue)
        }
        api.request('post', '/zone/create', params)
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
      this.uploadUrl = configParams.uploadURI
      // 先获取组织机构列表
      var userid = localStorage.getItem('userid')
      api.request('get', '/zone/show?euid=' + userid + '&zone_id=1')
        .then(response => {
          console.log('response.data is:' + JSON.stringify(response.data))
          this.form.title = 'sss' // response.data.body.data.name
          this.form.summary = response.data.body.data.summary
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
