<!-- 页面切换导航 -->
<template>
  <div class="right-menu">
    <Bell :connect="connect" />
    <div class="div-inline">
      <el-tooltip class="item" effect="light" content="点击跳转到实时预警监测页面" placement="bottom-end">
        <el-button
          type="primary"
          icon="el-icon-message-solid"
          plain
          @click="switchPanel('')"
        >
          预警
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="点击跳转到数据分析页面" placement="bottom-end">
        <el-button
          type="primary"
          icon="el-icon-data-analysis"
          plain
          @click="switchPanel('analysis')"
        >
          分析
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    connect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switchPanel (path) {
      this.$router.push('/' + path)
    }
  }
}
</script>

<style>
.right-menu {
  float: right;
  height: 100%;
  line-height: 60px;
}

.div-inline {
  display: inline;
}
</style>
