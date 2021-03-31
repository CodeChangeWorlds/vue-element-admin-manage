<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 搜索 -->
      <el-input
        v-model="filter.name"
        placeholder="商品名称"
        style="width: 200px;"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <!-- 筛选 -->
      <el-select
        v-model="filter.cate"
        placeholder="品类筛选"
        clearable
        style="width: 130px"
        @change="selectTag"
      >
        <el-option
          v-for="(item, index) in tagArr"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button
        class="delBtn"
        type="danger"
        @click="delSelect"
      >
        删除所选商品
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="goods-table">
      <el-table
        v-loading="loading"
        element-loading-text="努力加载中。。。"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        style="width: 100%"
        @selection-change="selectHandle"
      >
        <!-- 第一列 -->
        <el-table-column
          type="selection"
          width="45"
          align="center"
        />
        <el-table-column
          type="index"
          :index="num"
          width="50"
          align="center"
          label="序号"
        />
        <el-table-column
          width="140"
          prop="goods_pic"
          align="center"
          label="图片"
          class="img"
        >
          <template slot-scope="scope">
            <div class="good-info">
              <img :src="scope.row.goods_pic" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_title"
          align="center"
          label="名称"
          width="300"
        />
        <el-table-column
          prop="goods_tag"
          align="center"
          label="分类"
        />
        <el-table-column
          prop="goods_price"
          align="center"
          label="价格"
          sortable
        />
        <el-table-column
          prop="goods_stock"
          align="center"
          label="库存"
        />
        <el-table-column
          prop="goods_sales"
          align="center"
          label="销量"
          sortable
        />
        <el-table-column
          prop="goods_disc"
          align="center"
          label="折扣"
        />
        <el-table-column
          prop="goods_rating"
          align="center"
          label="评分"
        />
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
    </div>
    <div class="btnDel">
      <el-button
        type="danger"
        @click="delSelect"
      >
        删除所选商品
      </el-button>
    </div>
    <!-- 分页 -->
    <pagination
      v-show="total>10"
      :total="total"
      :page.sync="filter.page"
      :limit.sync="filter.size"
      :page-sizes="[10, 20, 30, 40, 50]"
      @pagination="getList"
    />
    <el-backtop
      :visibility-height="500"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'GoodsList',
  components: {
    Pagination
  },
  data() {
    return {
      filter: {
        page: 1,
        size: 10,
        name: '',
        cate: ''
      },
      tagArr: [],
      total: 0,
      tableData: [],
      loading: true
    }
  },
  created() {
    this.getList()
    this.getTag()
  },
  methods: {
    // 搜索
    handleFilter() {
      this.getList()
    },
    // 勾选商品时触发
    selectHandle(e) {
      this.rows = e
    },
    // 获取商品列表
    getList(e, i) {
      if (!e) this.filter.page = 1
      this.loading = true
      this.$apis.getGoodsList({
        size: this.filter.size,
        page: i || this.filter.page - 1,
        name: this.filter.name,
        cate: this.filter.cate
      }).then(res => {
        this.tableData = res.data
        this.filter.page = res.page
        this.filter.size = res.size
        this.total = res.len
        this.$nextTick(() => {
          this.loading = false
        })
      })
    },
    // // 设置图片src
    // imgStr(val) {
    //   return val.row.goods_pic.match(/^\/\//) ? val.row.goods_pic : this.$config.ImgBase + val.row.goods_pic
    // },
    // 获取品类
    getTag() {
      this.$apis.getTag().then(res => {
        this.tagArr = res.data
      })
    },
    // 序号
    num(index) {
      return index + 1
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: `/goods/editGoods/${row.goods_id}`
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$apis.delGoods({
          goods_id: row.goods_id
        }).then(() => {
          this.$notify({
            message: '商品删除成功',
            type: 'success',
            duration: 2000,
            showClose: false
          })
          const p = this.filter.page
          this.getList(p)
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除',
          showClose: false,
          duration: 2000
        })
      })
    },
    // 删除所选商品
    delSelect() {
      if (this.rows.length > 0) {
        let ids = ''
        this.rows.map(ele => { ids += (';' + ele.goods_id) })
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$apis.delGoods({
            goods_id: ids
          }).then(() => {
            this.$notify({
              message: '商品删除成功',
              type: 'success',
              duration: 2000,
              showClose: false
            })
            const p = this.filter.page
            this.getList(p)
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除',
            showClose: false,
            duration: 2000
          })
        })
      }
    },
    // 品类筛选
    selectTag() {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-item {
    margin-top: 8px;
    margin-right: 20px;
  }
  .delBtn {
    margin-left: 20px;
  }
  .btnDel {
    margin-top: 20px;
    margin-bottom: -35px;
  }
  .good-info {
    width: 100%;
    height: 80px;
    text-align: center;
    img {
      width: 80px;
      height: 80px;
    }
  }
</style>
