<!-- 分页告警数据表格 -->
<template>
  <div v-show="showTable" style="width: 100%;">
    <el-form
      :inline="true"
      :model="frmSearch"
      class="demo-form-inline"
      size="small"
      style="text-align: left;"
    >
      <el-form-item label="监所">
        <el-select v-model="frmSearch.region" placeholder="选择监所">
          <el-option label="<全部>" value="" />
          <el-option v-for="(item, i) in regions" :key="i" :label="item[0]" :value="item[0]" />
        </el-select>
      </el-form-item>
      <el-form-item label="严重程度">
        <el-select v-model="frmSearch.level" placeholder="选择严重程度">
          <el-option label="<全部>" value="" />
          <el-option v-for="(item, i) in alarms" :key="i" :label="item[2]" :value="item[0]" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <date-time-range-picker :from-to="fromTo" @pick="onPick" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="onSubmit">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="showLoading"
      :data="pageData.data"
      class="alarm-data"
      size="small"
      :header-cell-style="{ background: '#EBEEF5' }"
      :default-sort="{prop: 'date', order: 'descending'}"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      element-loading-text="数据正在加载中"
      element-loading-spinner="el-icon-loading"
      min-height="20"
    >
      <el-table-column prop="id" label="ID" sortable width="100" />
      <el-table-column prop="occurredAt" label="日期" sortable width="180" />
      <el-table-column prop="level" label="严重程度" sortable width="100">
        <template slot-scope="scope">
          <level-badge :alarm-level="getIntLevel(scope)" />
        </template>
      </el-table-column>
      <el-table-column prop="region" label="监所" sortable width="100" />
      <el-table-column prop="msg" label="地址" />
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="pageData.currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import DateTimeRangePicker from '@/components/DateTimeRangePicker'
import LevelBadge from '@/components/LevelBadge'
import { regions } from '@/utils/chartMap'
import { alarms } from '@/utils/alarm'
import { dateFormat, isArray } from '@/utils/common'

export default {
  components: {
    DateTimeRangePicker,
    LevelBadge
  },
  props: {
    pageData: {
      type: Object,
      default: () => { return { data: [], pageSize: 20, currentPage: 1, total: 0 } }
    }
  },
  data () {
    return {
      regions,
      alarms,
      showLoading: false,
      showTable: false,
      fromTo: [],
      frmSearch: {
        region: '',
        level: '',
        fromAt: '',
        toAt: '',
        pageSize: this.pageData.pageSize,
        currentPage: this.pageData.currentPage
      }
    }
  },
  mounted () {
    this.showTable = true
  },
  methods: {
    showLevel (row, column) {
      return alarms[parseInt(row.level, 10) - 1][2]
    },
    getIntLevel (scope) {
      return parseInt(scope.row.level, 10)
    },
    onPick (fromTo) {
      if (isArray(fromTo)) {
        this.frmSearch.fromAt = dateFormat('YYYY-mm-dd HH:MM:SS', fromTo[0])
        this.frmSearch.toAt = dateFormat('YYYY-mm-dd HH:MM:SS', fromTo[1])
      }
    },
    onSubmit () {
      this.search()
    },
    handleSizeChange (val) {
      this.frmSearch.pageSize = val
      this.search()
    },
    handleCurrentChange (val) {
      this.frmSearch.currentPage = val
      this.search()
    },
    search () {
      this.$emit('onSearch', this.frmSearch)
    }
  }
}
</script>

<style scoped>
.alarm-data {
  width: 100%;
  border: solid 1px #909399;
  min-height: 100px;
}
</style>>
