<!-- 首页/异常预警展示页 -->
<template>
  <el-container class="index-container">
    <el-main class="index-main">
      <chart-map :alarm-data="alarmData" />
    </el-main>
    <el-aside width="320px" class="index-aside">
      <Monitor :alarm-data="alarmData" />
    </el-aside>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartMap from '@/components/ChartMap'
import Monitor from '@/components/Monitor'

export default {
  name: 'Index',
  components: {
    ChartMap,
    Monitor
  },
  computed: {
    ...mapGetters([
      'alarmData'
    ])
  }
}
</script>

<style scope>
.index-container {
  height: 100%;
  background: black;
}

.index-main {
  background-color: #000;
  padding: 0;
}

.index-aside {
  border: solid 1px cornsilk;
  margin: 20px;
}
</style>
