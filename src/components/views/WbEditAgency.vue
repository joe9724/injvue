<template>
  <div>
    <h6 class="text-center"><!--添加组织--></h6>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="form.agentName"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="form.contactName"></el-input>
            </el-form-item>
            <el-form-item label="联系号码">
              <el-input v-model="form.contactNumber"></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="form.contactAddr"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="正常"></el-radio>
                <el-radio label="锁定"></el-radio>
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

  export default {
    data () {
      return {
        form: {
          agentName: '',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          status: ''
        },
        agencyId: '0'
      }
    },
    methods: {
      onSubmit () {
        console.log('name is' + this.form.agentName)
        var userid = localStorage.getItem('userid')
        var params = {
          'operator_id': userid,
          'agency_id': this.agencyId,
          'agency_name': this.form.agentName,
          'contact_name': this.form.contactName,
          'contact_number': this.form.contactNumber,
          'contact_addr': this.form.contactAddr,
          'status': this.form.status === '正常' ? 0 : -1
        }
        api.request('post', '/agency/edit', params)
          .then(response => {
            // var data = response.data
            // console.log(JSON.stringify(data))
            this.$message({
              message: '操作成功!',
              type: 'success'
            })
            //
            this.$router.go(-1)
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

      if (this.$route.query.agencyId) {
        this.agencyId = this.$route.query.agencyId
      }
      // console.log('currentUserId is' + currentUserId)
      api.request('get', '/agency/view?operator_id=1&agency_id=' + this.agencyId)
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
