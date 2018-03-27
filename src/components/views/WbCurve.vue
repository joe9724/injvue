<template>
  <!-- Main content -->
  <section class="content">


    <div class="col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
          <div class="box-body">
            <div class="col-sm-12col-xs-12">
              <p class="text-center">
                <strong>数据曲线图</strong>
              </p>
              <canvas id="trafficBar" ></canvas>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- /.row -->


  </section>
  <!-- /.content -->
</template>

<script>
import Chart from 'chart.js'
import api from '../../api'

export default {
  data () {
    return {
      arrayDataCurve: [],
      xdata0: [],
      ydata0: [],
      ydata1: [],
      ydata2: [],
      ydata3: [],
      ydata4: [],
      ydata5: [],
      ydata6: [],
      ydata7: [],
      ydata8: []
      /* generateRandomNumbers (numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      } */
    }
  },
  computed: {
    /*coPilotNumbers () {
      return this.generateRandomNumbers(31, 100, 10)
    },*/
    isMobile () {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    }
  },
  methods: {
    render (x,y0,y1,y2,y3,y4,y5,y6,y7) {
      this.$nextTick(() => {
        var ctx = document.getElementById('trafficBar').getContext('2d')
        var config = {
          type: 'line',
          data: {
            labels: x,
            datasets: [{
              label: '温度',
              fill: true,
              borderColor: '#284184',
              pointBackgroundColor: '#284184',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: y0
            },{
              label: '湿度',
              borderColor: '#4BC0C0',
              pointBackgroundColor: '#4BC0C0',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: y1
            },{
              label: 'PM2.5',
              borderColor: '#000000',
              pointBackgroundColor: '#ff0000',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: y2
            },{
              label: 'PM10',
              borderColor: '#6BC0C0',
              pointBackgroundColor: '#6BC0C0',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: y3
            },{
              label: '臭氧',
              borderColor: '#7BC0C0',
              pointBackgroundColor: '#7BC0C0',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: y4
            },{
              label: '二氧化硫',
              borderColor: '#8BC0C0',
              pointBackgroundColor: '#8BC0C0',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: y5
            },{
              label: '二氧化氮',
              borderColor: '#9BC0C0',
              pointBackgroundColor: '#9BC0C0',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: y6
            },{
              label: '一氧化碳',
              borderColor: '#ABC0C0',
              pointBackgroundColor: '#ABC0C0',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: y7
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: !this.isMobile,
            legend: {
              position: 'bottom',
              display: true
            },
            tooltips: {
              mode: 'label',
              xPadding: 10,
              yPadding: 10,
              bodySpacing: 10
            }
          }
        }

        new Chart(ctx, config) // eslint-disable-line no-new
      })
    }
  },
  created () {
    console.log('////created')
    var userid = localStorage.getItem('userid')
    api.request('get', 'data/curve/list?operator_id=' + userid + '&page=0&size=12')
      .then(response => {
        // console.log(response.data)
        this.arrayDataCurve = response.data.body.data
        console.log('this.arrayDataCurve is',this.arrayDataCurve)
        // this.xdata = new Array(this.arrayDataCurve.length)
        for (var i = 0; i < this.arrayDataCurve.length; i++) {
             this.xdata0.push(this.arrayDataCurve[i].date)
             this.ydata0.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[0]))
             this.ydata1.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[1]))
             this.ydata2.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
             this.ydata3.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
             this.ydata4.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
             this.ydata5.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
             this.ydata6.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
             this.ydata7.push(Number(((this.arrayDataCurve[i].prjv0).split(','))[2]))
             //console.log('number is',Number(((this.arrayDataCurve[i].prjv0).split(','))[0]))
        }
        //console.log('xxxdata is',this.xdata)
        //console.log('yyydata is',this.ydata)
      })
      .catch(error => {
        // this.$store.commit('TOGGLE_LOADING')
        console.log(error)
        this.response = 'Server appears to be offline'
      })
  },
  mounted () {
    this.render(this.xdata0,this.ydata0,this.ydata1,this.ydata2,this.ydata3,this.ydata4,this.ydata5,this.ydata6,this.ydata7)
  }
}
</script>
<style>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
</style>
