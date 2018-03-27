<template>
  <div>
    <h6 class="text-center"><!--添加组织--></h6>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-radio v-model="radio" label="1">status</el-radio>
            <el-radio v-model="radio" label="2">current</el-radio>
            <el-radio v-model="radio" label="3">heartBeat</el-radio>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">发送</el-button>
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
        radio: '1',
        form: {
          status: ''
        },
        device_id: '0'
      }
    },
    methods: {
      onSubmit () {
        console.log('name is' + this.form.agentName)
        // var userid = localStorage.getItem('userid')
        api.requestSocketServer('get', 'fk?sn=' + this.device_id + '&request=' + Number(this.radio))
          .then(response => {
            // var data = response.data
            // console.log(JSON.stringify(data))
            this.$message({
              message: '操作成功!',
              type: 'success'
            })
            //
            // this.$router.go(-1)
          })
          .catch(error => {
            console.log(error)
            this.response = error
          })
      }
    },
    created () {
      // alert('created!')
      // this.uploadUrl = configParams.uploadURI

      if (this.$route.query.device_id) {
        this.device_id = this.$route.query.device_id
      }
      // console.log('currentUserId is' + currentUserId)
      api.request('get', '/agency/view?operator_id=1&agency_id=' + this.device_id)
        .then(response => {
          var data = response.data.body.data
          this.form.agentName = data.agency_name
          this.form.contactName = data.contact_name
          this.form.contactNumber = data.contact_number
          this.form.contactAddr = data.contact_addr
          // this.form.grade = data.grade
          if (data.status === 0) {
            this.form.status = '正常'
          } else {
            this.form.status = '锁定'
          }
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
