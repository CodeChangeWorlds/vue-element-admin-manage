<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="产品名称" prop="goods_title">
        <el-input v-model="ruleForm.goods_title" clearable />
      </el-form-item>
      <el-form-item label="产品品牌" prop="goods_brand">
        <el-input v-model="ruleForm.goods_brand" clearable />
      </el-form-item>
      <el-form-item label="产品品类" prop="goods_tag">
        <el-input v-model="ruleForm.goods_tag" clearable />
      </el-form-item>
      <el-form-item label="产品价格" prop="goods_price">
        <el-input-number
          v-model="ruleForm.goods_price"
          controls-position="right"
          :min="1"
        />
      </el-form-item>
      <el-form-item label="产品库存" prop="goods_stock">
        <el-input-number
          v-model="ruleForm.goods_stock"
          controls-position="right"
          :min="1"
        />
      </el-form-item>
      <el-form-item label="产品折扣" prop="goods_disc">
        <el-input-number
          v-model="ruleForm.goods_disc"
          controls-position="right"
          :min="1"
          :max="10"
        />
      </el-form-item>
      <el-form-item label="商品图片" prop="goods_pic">
        <!-- <el-upload
          v-model="ruleForm.goods_pic"
          :file-list="list"
          :on-success="imgSuccess"
          name="pic"
          :on-change="imgChange"
          :action="$config.imgAction"
          list-type="picture-card"
        >
          <i class="el-icon-plus" />
        </el-upload> -->
        <imgUpload
          ref="upload"
          v-model="ruleForm.goods_pic"
          name="pic"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" v-text="btn" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { imgUpload } from '@/components'
export default {
  name: 'GoodsEdit',
  components: {
    imgUpload
  },
  data() {
    return {
      title: this.$route.params.id ? '商品编辑' : '商品新增',
      btn: this.$route.params.id ? '立即修改' : '立即新增',
      dialogVisible: false,
      list: [],
      ruleForm: {
        goods_title: '',
        goods_brand: '',
        goods_price: 0,
        goods_stock: 0,
        goods_disc: 0,
        goods_pic: ''
      },
      rules: {
        goods_title: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 2, message: '名称长度不符合要求', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
    if (this.id) {
      this.$apis.goodsDetail({
        goods_id: this.id
      }).then(res => {
        this.ruleForm = res.data[0]
        this.list = [{ url: this.ruleForm.goods_pic }]
      })
    }
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.upload.uploadImg()
      setTimeout(() => {
        if (!this.id) { // 新增
          this.$apis.addGoods({
            insertObj: this.ruleForm
          }).then(() => {
            this.$notify({
              title: '成功',
              message: '商品新增成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$router.back()
              }
            })
          })
        } else { // 修改
          this.$apis.updateGoods({
            goods_id: this.id,
            updateObj: this.ruleForm
          }).then(() => {
            this.$notify({
              title: '成功',
              message: '商品修改成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$router.back()
              }
            })
          })
        }
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
  .ruleForm {
    width: 30%;
    min-width: 380px;
  }
</style>
