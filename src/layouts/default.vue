<!-- 基础布局 -->
<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <audio v-show="0" id="bell" controls>
        <source :src="'11750.wav' | staticPath" type="audio/ogg">
        <source :src="'11750.mp3' | staticPath" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
      </audio>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="small"
        style="display: inline; margin-right: 20px;"
      >
        <el-tooltip class="item" effect="light" content="设置声音或弹窗播放频率(监测到异常后播放)" placement="bottom-end">
          <el-select v-model="formInline.frequency" placeholder="选择报警时间间隔" size="small">
            <el-option label="<选择报警时间间隔(10秒)>" value="10"></el-option>
            <el-option label="5秒" value="5"></el-option>
            <el-option label="1秒" value="1"></el-option>
          </el-select>
        </el-tooltip>
        <el-form-item id="switchVoice" label="开启声音" size="small">
          <el-tooltip class="item" effect="light" content="设置是否播放声音" placement="bottom-end">
            <el-switch v-model="formInline.enableVoice"></el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item id="switchMock" label="模拟实时接收异常预警" size="small">
          <el-tooltip class="item" effect="light" content="开启后，前端每0.5~3秒生成一条预警数据，模拟后端实时推送异常预警数据到前端" placement="bottom-end">
            <el-switch v-model="formInline.enableMock" @change="switchMock"></el-switch>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <Navbar :connect="calcEnableMock" />
    </el-header>
    <el-main class="layout-main">
      <Nuxt />
    </el-main>
  </el-container>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Navbar from '@/layouts/components/Navbar'
import { generateAlarmData } from '@/utils/alarm'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      formInline: {
        frequency: '10',
        enableVoice: false,
        enableMock: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'newAlarms',
      'alarmData'
    ]),
    /**
     * 异常预警轮询频率
     */
    calcFrequency () {
      return parseInt(this.formInline.frequency, 10) * 1000
    },
    /**
     * 声音播放开关
     */
    calcEnableVoice () {
      return this.formInline.enableVoice
    },
    /**
     * 数据模拟开关阀
     */
    calcEnableMock () {
      return this.formInline.enableMock
    }
  },
  mounted () {
    this.fetchAlarmDatas().then(({ data }) => {
      // 获取历史异常预警数据后缓存
      this.cacheAlarmDataList(data)
      // 触发异常预警轮询函数，前端接受最新预警数据后缓存，一段时间后检查缓存，有数据时触发声音播放
      this.triggerAlarm()
    })
  },
  methods: {
    ...mapMutations({
      cacheAlarmData: 'cacheAlarmData',
      clearNewAlarm: 'clearNewAlarm',
      cacheAlarmDataList: 'cacheAlarmDataList'
    }),
    ...mapActions({
      fetchAlarmDatas: 'fetchAlarmDatas'
    }),
    playVoice () {
      let audio = document.getElementById('bell')
      audio.currentTime = 0
      audio.play()
    },
    switchMock () {
      if (this.calcEnableMock) {
        this.mockAlarm()
      }
    },
    // 在前端模拟服务端实时异常警告数据推送
    mockAlarm () {
      let data = generateAlarmData()
      this.onAlarmArrived(data)
      if (this.calcEnableMock) {
        setTimeout(this.mockAlarm, this.getInterval())
      }
    },
    // 模拟每间隔0.5~3秒时间，服务端推送一条数据到前端
    getInterval () {
      return Math.max(Math.floor(Math.random() * 3 * 1000), 500)
    },
    // 服务端数据到达前端后执行业务
    onAlarmArrived (data) {
      return this.cacheAlarmData(data)
    },
    // 触发前端页面告警
    triggerAlarm () {
      if (this.newAlarms.length > 0) {
        this.$notify({
          title: '异常监测',
          message: '系统监测到有 ' + this.newAlarms.length + ' 条异常信息发生，请注意查验。',
          type: 'warning',
          position: 'bottom-right',
          customClass: 'my-notify'
        })
        this.clearNewAlarm()
        if (this.calcEnableVoice) { this.playVoice() }
      }
      setTimeout(this.triggerAlarm, this.calcFrequency)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/layout.scss';

#switchMock > div,
#switchVoice > div {
  line-height: $lyHeaderHeight;
}

#switchMock > label,
#switchVoice > label {
  margin-left: 10px;
  color: #fff;
}
</style>
