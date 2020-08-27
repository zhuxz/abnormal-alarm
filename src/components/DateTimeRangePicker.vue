<!-- 起止时间选择组件 -->
<template>
  <el-date-picker
    v-model="value"
    type="datetimerange"
    :picker-options="pickerOptions"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    align="right"
    @change="onChange"
  />
</template>

<script>
import { isArray, getOffsetDayTime, getOffsetMonthTime } from '@/utils/common'

export default {
  props: {
    fromTo: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const startAt = new Date()
            const endAt = new Date()
            picker.$emit('pick', [getOffsetDayTime(startAt, -7)], endAt)
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const startAt = new Date()
            const endAt = new Date()
            picker.$emit('pick', [getOffsetMonthTime(startAt, -1), endAt])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const startAt = new Date()
            const endAt = new Date()
            picker.$emit('pick', [getOffsetMonthTime(startAt, -3), endAt])
          }
        }]
      },
      value: this.getDefaultValue()
    }
  },
  methods: {
    onChange () {
      this.$emit('pick', this.value)
    },
    getDefaultValue () {
      return isArray(this.fromTo) ? [this.fromTo[0], this.fromTo[1]] : []
    }
  }
}
</script>
