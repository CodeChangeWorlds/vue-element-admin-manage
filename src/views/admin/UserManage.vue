<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" size="mini" @click="showModal">新增用户</el-button>
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
        prop="admin_name"
        label="用户名"
        align="center"
      />
      <el-table-column
        prop="admin_role"
        label="角色"
        align="center"
      />
      <el-table-column
        prop="admin_state"
        label="用户状态"
        align="center"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.admin_state ? '正常' : '禁用'" />
        </template>
      </el-table-column>
      <el-table-column
        prop="resister_time"
        label="注册时间"
        align="center"
      >
        <template slot-scope="scope">
          <span v-text="showTime(scope)" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹框 -->
    <el-dialog title="用户新增" :visible.sync="show">
      <el-form
        :model="form"
        :rules="rules"
      >
        <el-form-item
          label="用户名"
          label-width="80"
        >
          <el-input v-model="form.admin_name" />
        </el-form-item>
        <el-form-item
          label="角色"
          label-width="80"
        >
          <el-input v-model="form.admin_role" />
        </el-form-item>
        <el-form-item
          label="头像"
          label-width="80"
        >
          <imgUpload
            ref="upload"
            v-model="form.admin_avatars"
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
  name: 'UserManage',
  components: {
    imgUpload
  },
  data() {
    return {
      roleArr: [],
      tableData: [],
      show: false,
      form: {
        admin_name: '',
        admin_role: '',
        admin_avatars: ''
      },
      rules: {
        admin_name: [
          { required: true, message: '请添加写用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z][a-zA-Z0-9]/, message: '用户名不合法', trigger: 'blur' }
        ],
        admin_role: [
          { required: true, message: '请输入角色', trigger: 'blur' }
        ],
        admin_avatars: [
          { required: true, message: '请选择头像', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$apis.getAdmin().then(res => {
        // console.log('用户列表', res.data)
        this.tableData = res.data
      })
    },
    showModal() {
      this.show = true
    },
    // 转换时间戳
    showTime(scope) {
      return this.$moment.dateParse(scope.row.register_time, 'YYYY-MM-DD')
    },
    submit() {
      this.$refs.upload.uploadImg()
      // console.log('form', this.form)
      this.$apis.addAdmin({ insertObj: this.form }).then(() => {
        this.show = false
        this.init()
      })
    },
    // 序号
    num(index) {
      return index + 1
    }
  }
}
</script>

<style>

</style>
