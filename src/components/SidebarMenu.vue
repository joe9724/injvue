<template>
  <div >
    <ul  class="sidebar-menu" >

      <!--<li class="header"><span>xx</span></li>

      <li  class="pageLink" @click="to(it.router_url)" style="cursor: pointer;" >
        <a>
          <i class="fa fa-book"></i>
          <span class="page">b</span>
        </a>
      </li>-->


    <li class="header">系统管理</li>
     <router-link tag="li" class="pageLink" to="/inj/domainset">
       <a>
         <i class="fa fa-desktop"></i>
         <span class="page">域名配置</span>
       </a>
     </router-link>
     <router-link tag="li" class="pageLink" to="/inj/adminusers">
       <a>
         <i class="fa fa-table"></i>
         <span class="page">管理员管理</span>
       </a>
     </router-link>
     <li class="header">活动管理</li>
     <router-link tag="li" class="pageLink" to="/inj/activities">
       <a>
         <i class="fa fa-desktop"></i>
         <span class="page">活动列表</span>
       </a>
     </router-link>
      <li class="header">社区管理</li>
     <router-link tag="li" class="pageLink" to="/agency/list">
       <a>
         <i class="fa fa-table"></i>
         <span class="page">社区列表</span>
       </a>
     </router-link>
      <li class="header">商户管理</li>
      <router-link tag="li" class="pageLink" to="/agency/list">
        <a>
          <i class="fa fa-table"></i>
          <span class="page">商户列表</span>
        </a>
      </router-link>
      <router-link tag="li" class="pageLink" to="/agency/list">
        <a>
          <i class="fa fa-table"></i>
          <span class="page">商品列表</span>
        </a>
      </router-link>
      <router-link tag="li" class="pageLink" to="/agency/list">
        <a>
          <i class="fa fa-table"></i>
          <span class="page">订单列表</span>
        </a>
      </router-link>
      <li class="header">数据统计</li>
      <router-link tag="li" class="pageLink" to="/log/list/op">
        <a>
          <i class="fa fa-table"></i>
          <span class="page">流水</span>
        </a>
      </router-link>
      <router-link tag="li" class="pageLink" to="/log/list/op">
        <a>
          <i class="fa fa-table"></i>
          <span class="page">用户</span>
        </a>
      </router-link>
      <router-link tag="li" class="pageLink" to="/log/list/op">
        <a>
          <i class="fa fa-table"></i>
          <span class="page">广告</span>
        </a>
      </router-link>
     <li class="header">日志管理</li>
     <router-link tag="li" class="pageLink" to="/log/list/op">
       <a>
         <i class="fa fa-table"></i>
         <span class="page">操作日志</span>
       </a>
     </router-link>

      <!--<router-link tag="li" class="pageLink" to="/curve/realtime">
        <a>
          <i class="fa fa-table"></i>
          <span class="page">实时数据</span>
        </a>
      </router-link>
     <router-link tag="li" class="pageLink" to="/curve">
       <a>
         <i class="fa fa-table"></i>
         <span class="page">曲线图</span>
       </a>
     </router-link>-->
     <!--<router-link tag="li" class="pageLink" to="/air">
       <a>
         <i class="fa fa-table"></i>
         <span class="page">空气质量</span>
       </a>
     </router-link>
     <router-link tag="li" class="pageLink" to="/echart">
       <a>
         <i class="fa fa-table"></i>
         <span class="page">echart</span>
       </a>
     </router-link>
     <router-link tag="li" class="pageLink" to="/login">
       <a>
         <i class="fa fa-table"></i>
         <span class="page">注销登录</span>
       </a>
     </router-link>
     <router-link tag="li" class="pageLink" to="/testtablepaging">
       <a>
         <i class="fa fa-table"></i>
         <span class="page">分页测试</span>
       </a>
     </router-link>
     <router-link tag="li" class="pageLink" to="/upload">
       <a>
         <i class="fa fa-table"></i>
         <span class="page">上传测试</span>
       </a>
     </router-link>-->
    <!--<span v-for="item in arrayData" v-bind:key="item.parent">
    <li class="header"><span style="color: #13ce66">{{item.parent}}</span> </li>

    <router-link tag="li" class="pageLink" to="{{it.path}}" v-for="it in item.children" v-bind:key="it.name">
    <a>
    <i class="fa fa-desktop"></i>
    <span class="page">{{it.name}}</span>
    </a>
    </router-link>

    </span>-->
    <!--<ul v-for="item in arrayData" class="sidebar-menu" :key="item.name">

    <li class="header" v-if="item.router_url==='-1'"><span>{{item.name}}</span></li>

    <li  class="pageLink" @click="to(it.router_url)" style="cursor: pointer;" v-for="it in item.children">
      <a>
        <i class="fa fa-book"></i>
        <span class="page">{{it.name}}</span>
      </a>
    </li>
    </ul>-->


    <!--<script>
      for (var i = 0; i < this.arrayData.length; i++) {

      }

    </script>-->

    </ul>
  </div>
</template>
<script>
  export default {
    name: 'SidebarName',
    data () {
      return {
        arrayData: []
      }
    },
    methods: {
      to (path) {
        console.log(path)
        this.$router.push(path)
//        this.$router.push('/org')
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      }
    },
    mounted () {
      // console.log('store.data = ' + JSON.stringify(this.$store.state.btk_menu))
      // this.arrayData = this.$store.state.btk_menu // getItem('SET_BTK_MENU')
      console.log(localStorage.getItem('btk_menu999'))
      this.arrayData = JSON.parse(localStorage.getItem('btk_menu999'))
      console.log('length is' + this.arrayData.length)
      /* for (var i = 0; i < this.arrayData.length; i++) {
        console.log('for is:' + this.arrayData[i])
      }
      console.log('menu1 is ' + this.arrayData) */
      // console.log('menu2 is ' + window.localStorage.getItem('MENU_DATA'))
    },
    computed: {}
  }
</script>

<style>
  /* override default */
  .sidebar-menu > li > a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active > a > .fa-angle-left, .sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
