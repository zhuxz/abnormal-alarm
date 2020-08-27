<!-- 数据分析页 -->
<template>
  <div class="analysis">
    <el-row type="flex" class="chart-data" :gutter="4">
      <el-col :span="12">
        <div class="chart-trend">
          <ChartTrend :trend-data="chartTrendData" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-pie">
          <ChartPie :pie-data="chartPieData" />
        </div>
      </el-col>
    </el-row>
    <div class="table-data">
      <textarea v-show="0" name="json" cols="200" rows="10" v-text="jsonData" />
      <aLarm-table :page-data="alarms" @onSearch="onSearch" />
    </div>
  </div>
</template>

<script>
import ChartTrend from '@/components/ChartTrend'
import ChartPie from '@/components/ChartPie'
import ALarmTable from '@/components/ALarmTable'
import { mapActions } from 'vuex'

export default {
  components: {
    ChartTrend,
    ChartPie,
    ALarmTable
  },
  data () {
    return {
      // 带分页信息的异常预警数据
      alarms: {
        data: [],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      // 全部异常预警数据
      chartData: []
    }
  },
  computed: {
    pageData () {
      return this.alarms
    },
    chartTrendData () {
      return this.chartData
    },
    chartPieData () {
      return this.chartData
    },
    jsonData () {
      return JSON.stringify(this.chartData)
    }
  },
  mounted () {
    let { pageSize, currentPage } = this.alarms

    // 初始化echarts图数据
    this.fetchAlarmDatas({ pageSize: 10000, currentPage: 1 }).then(({ data }) => {
      this.chartData = data
    })

    // 初始化表格数据
    this.search({ pageSize, currentPage })
  },
  methods: {
    ...mapActions({
      fetchAlarmDatas: 'fetchAlarmDatas'
    }),
    onSearch (filter) {
      this.search(filter)
    },
    search (filter) {
      this.fetchAlarmDatas(filter).then((data) => {
        this.alarms = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.analysis {
  background: #fff;
  height: 100%;
  overflow-x: hidden;
}

.chart-data {
  height: 75%;
}

.chart-trend {
  background: none;
  height: 100%;
}

.chart-pie {
  height: 100%;
}

.table-data {
  padding: 20px;
}
</style>
