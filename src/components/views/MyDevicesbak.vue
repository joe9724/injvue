<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <!--<div class="box-header">-->
            <!--<h3 class="box-title">Data Table With Full Features</h3>-->
          <!--</div>-->
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                    <!--<thead>
                      <tr role="row">
                        <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Rendering engine</th>
                        <th aria-label="Browser: activate to sort column ascending" style="width: 207px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Browser</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Platform(s)</th>
                        <th aria-label="Engine version: activate to sort column ascending" style="width: 142px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Engine version</th>
                        <th aria-label="CSS grade: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">CSS grade</th>
                      </tr>
                    </thead>-->
                    <tbody>
                      <tr class="even" role="row">
                        <td class="sorting_1"><div style="child-align: middle">名称</div><div> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-red">●</i></div></td>
                        <td class="sorting_1">名称<br> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-red">●</i></td>
                        <td class="sorting_1">名称<br> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-green">●</i></td>
                        <td class="sorting_1">名称<br> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-red">●</i></td>
                        <td class="sorting_1">名称<br> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-red">●</i></td>
                        <td class="sorting_1">名称<br> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-green">●</i></td>

                      </tr>
                      <tr class="even" role="row">
                        <td class="sorting_1"><div style="child-align: middle">名称</div><div> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-red">●</i></div></td>
                        <td class="sorting_1">名称<br> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-red">●</i></td>
                        <td class="sorting_1">名称<br> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-green">●</i></td>
                        <td class="sorting_1">名称<br> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-red">●</i></td>
                        <td class="sorting_1">名称<br> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-red">●</i></td>
                        <td class="sorting_1">名称<br> 温度 <i  class="ico ico-red">●</i> 湿度 <i  class="ico ico-green">●</i></td>

                      </tr>

                    </tbody>
                   <!-- <tfoot>
                      <tr v-for="item in list" v-bind:key="item.user">
                        <th colspan="1" rowspan="1">{{item.user}}</th>
                        <th colspan="1" rowspan="1">{{item.token}}</th>
                        <th colspan="1" rowspan="1">{{item.redirect}}</th>
                        <th colspan="1" rowspan="1">{{item.error}}</th>
                        <th colspan="1" rowspan="1">固定列</th>
                      </tr>
                    </tfoot>-->
                  </table>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
    <p><button @click="fillData()">fill</button></p>
  </section>

</template>

<!--<script>-->
<!--import $ from 'jquery'-->
<!--// Require needed datatables modules-->
<!--import 'datatables.net'-->
<!--import 'datatables.net-bs'-->

<!--export default {-->
  <!--name: 'Tables',-->
  <!--mounted () {-->
    <!--this.$nextTick(() => {-->
      <!--$('#example1').DataTable()-->
    <!--})-->
  <!--}-->
<!--}-->
<!--</script>-->
<script>
  console.log('start myDevice.vue')
  import api from '../../api'

  export default {
    name: 'Table',
    data (router) {
      return {
        list: {}
      }
    },
    methods: {
      fillData: function () {
        const {username, password} = this

        this.toggleLoading()
        this.resetResponse()
        this.$store.commit('TOGGLE_LOADING')
        console.log(username)
        /* Making API call to authenticate a user */
        api.request('post', 'http://192.168.200.208:88/table', {username, password})
          .then(response => {
            this.toggleLoading()

            var data = response.data
            console.log(data)
            this.list = data
          })
          .catch(error => {
            this.$store.commit('TOGGLE_LOADING')
            console.log(error)

            this.response = 'Server appears to be offline'
            this.toggleLoading()
          })
      },
      toggleLoading () {
        this.loading = (this.loading === '') ? 'loading' : ''
      },
      resetResponse () {
        this.response = ''
      }
    }
  }

</script>

<style>
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>
