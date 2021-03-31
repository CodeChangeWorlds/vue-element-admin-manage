<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" size="mini" @click="showModal">新增图片</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        :index="num"
        align="center"
        label="序号"
      />
      <el-table-column
        prop="alt"
        label="广告名称"
        align="center"
      />
      <el-table-column
        prop="href"
        label="链接"
        align="center"
      />
      <el-table-column
        prop="img"
        label="图片"
        align="center"
      >
        <template slot-scope="scope">
          <div class="good-info">
            <img :src="scope.row.img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增轮播图" :visible.sync="show">
      <el-form
        :model="form"
      >
        <el-form-item
          label="广告名称"
          label-width="80"
        >
          <el-input v-model="form.alt" />
        </el-form-item>
        <el-form-item
          label="广告链接"
          label-width="80"
        >
          <el-input v-model="form.href" />
        </el-form-item>
        <el-form-item
          label="图片"
          label-width="80"
        >
          <imgUpload
            v-model="form.img"
            name="pic"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { imgUpload } from '@/components'
export default {
  name: 'BannerManage',
  components: {
    imgUpload
  },
  data() {
    return {
      tableData: [],
      show: false,
      form: {
        alt: '',
        href: '',
        img: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 序号
    num(index) {
      return index + 1
    },
    init() {
      this.$apis.getBanner().then(res => {
        this.tableData = res.data
      })
    },
    // 编辑
    handleEdit(row) {},
    handleDelete(row) {
      this.$apis.delBanner({
        bannerid: row.bannerid
      }).then(() => {
        this.$notify({
          message: '图片删除成功',
          type: 'success',
          duration: 2000,
          showClose: false
        })
        this.init()
      })
    },
    showModal() {
      this.show = true
    },
    submit() {
      // this.$refs.upload.uploadImg()
      // console.log(this.form)
      this.$apis.addBanner({ bannerObj: this.form }).then(() => {
        this.show = false
        this.init()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .good-info {
    width: 100%;
    height: 80px;
    text-align: center;
    img {
      width: 80px;
      height: 80px;
    }
  }
</style>>
