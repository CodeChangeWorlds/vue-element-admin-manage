// 时间格式化工具类
import moment from 'moment'

// 将时间戳转换为时间格式
function dateParse(date, format) {
  return moment(date).format(format)
}
// 将时间格式转换为时间戳
function dateValue(date) {
  return moment(date).valueOf()
}

export default {
  dateParse,
  dateValue
}
