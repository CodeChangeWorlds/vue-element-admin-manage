<template>
  <div class="cb-upload">
    <el-upload
      ref="upload"
      :file-list="list"
      :on-change="imgChange"
      :action="$config.imgAction"
      :name="name"
      :auto-upload="autoUpload"
      :on-success="imgSuccess"
      :multiple="multiple"
      list-type="picture-card"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  props: {
    name: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    autoUpload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    list() {
      return this.fileList.length > 0 ? this.fileList : (this.value ? [{ url: this.value }] : [])
    }
  },
  updated() {
    // console.log(this.$refs.upload.submit)
    // this.imgSuccess()
  },
  methods: {
    // 图片上传
    uploadImg() {
      const vm = this
      vm.$refs.upload.submit()
    },
    // 图片修改时触发
    imgChange(file) {
      this.fileList = [file]
    },
    imgSuccess(res) {
      if (res && res.data) {
        this.$emit('input', this.$config.ImgBase + res.data.img)
      }
    },
    // 图片移除时触发
    handleRemove() {
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>>
