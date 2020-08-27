<!-- 动态告警列表展示组件 -->
<template>
  <div class="alarm-container">
    <div class="infinite-list-wrapper">
      <ol class="list">
        <li v-for="(item, i) in alarmDataOnDisplay" :key="i" :title="item.msg" class="list-item">
          [{{ getOccurredAt(item.occurredAt) }}]
          <level-badge :alarm-level="parseInt(item.level, 10)" style="margin: 0 2px;" />
          {{ item.region }}监狱，{{ item.msg }}
        </li>
      </ol>
      <p v-if="alarmData.length === 0">
        即将展示实时监狱异常报警数据...
      </p>
    </div>
  </div>
</template>

<script>
import LevelBadge from '@/components/LevelBadge'

export default {
  components: {
    LevelBadge
  },
  props: {
    alarmData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    alarmDataOnDisplay () {
      return this.alarmData.slice(0, 50)
    }
  },
  methods: {
    getOccurredAt (occurredAt) {
      return occurredAt.substr(11)
    }
  }
}
</script>
<style scoped>
.alarm-container {
  height: 100%;
  padding: 8px;
}

.infinite-list-wrapper {
  min-height: 100%;
}

.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  text-align: left;
  list-style: none;
  line-height: 26px;
  background: #000;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.infinite-list-wrapper .list-item:hover {
  background-color: rgb(48, 45, 45);
  color: rgb(255, 255, 0);
}

.infinite-list-wrapper p {
  line-height: 30px;
  text-align: left;
  color: grey;
}

.level {
  color: #fff;
  background: #f56c6c;
  line-height: 16px;
  padding: 0 4px;
  border-radius: 6px;
}
</style>
