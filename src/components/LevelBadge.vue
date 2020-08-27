<!-- 严重程度徽章组件 -->
<template>
  <span :class="cssClass">
    {{ alarmText }}
  </span>
</template>

<script>
import { alarms } from '@/utils/alarm'

export default {
  props: {
    alarmLevel: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cssClass () {
      return 'alarm-badge-level' + this.alarmLevel
    },
    alarmText () {
      try {
        return alarms[this.alarmLevel - 1][2]
      } catch (error) {
        return '未知'
      }
    }
  }
}
</script>

<style lang="scss">
@mixin alarmBadge {
  color: #fff;
  line-height: 16px;
  padding: 0 3px;
  border-radius: 6px;
}

.alarm-badge-level0 {
  @include alarmBadge;

  background: #909399;
}

.alarm-badge-level1 {
  @include alarmBadge;

  background: #f56c6c;
}

.alarm-badge-level2 {
  @include alarmBadge;

  background: #e6a23c;
}

.alarm-badge-level3 {
  @include alarmBadge;

  background: #67c23a;
}
</style>
