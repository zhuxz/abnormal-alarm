<!-- 警铃组件 -->
<template>
  <div class="bell-container">
    <el-tooltip class="item" effect="light" content="监测前后端实时数据推送连接是否断开" placement="bottom-end">
      <img v-if="connect" class="bell-image" src="'bell-active.svg' | staticPath" alt="">
      <img v-else :src="'bell.svg' | staticPath" alt="">
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    connect: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.bell-container {
  display: inline;
  line-height: 60px;
  margin-right: 40px;
}

.bell-container img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.bell-image {
  width: 60px;
  height: 70px;
  transform-origin: 50% 0;
  animation: yaolingdang 3s infinite ease;
}

@keyframes yaolingdang {
  5%,
  25%,
  45% {
    transform: rotate(8deg);
  }

  0%,
  10%,
  30%,
  50% {
    transform: rotate(-8deg);
  }

  15%,
  35%,
  55% {
    transform: rotate(4deg);
  }

  20%,
  40%,
  60% {
    transform: rotate(-4deg);
  }

  65%,
  100% {
    transform: rotate(0deg);
  }
}
</style>
