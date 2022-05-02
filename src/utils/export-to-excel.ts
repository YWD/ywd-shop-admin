// import * as xlsx from 'xlsx'
import { BookType, utils, writeFile } from 'xlsx'

export const jsonToExcel = (options: {
  data: any[]
  header?: Record<string, string>
  fileName: string
  bookType: BookType
}) => {
  // 1、创建一个工作簿 workbook
  const wb = utils.book_new()

  // 2、创建工作表 worksheet

  if (options.header) {
    options.data = options.data.map(item => {
      const obj: Record<string, any> = {}
      for (const key in item) {
        if (options.header && options.header[key]) {
          obj[options.header[key]] = item[key]
        } else {
          obj[key] = item[key]
        }
      }
      return obj
    })
  }

  const ws = utils.json_to_sheet(options.data)

  // 3. 把工作表放到工作簿中
  utils.book_append_sheet(wb, ws)

  // 4、生成数据保存
  writeFile(wb, options.fileName, {
    bookType: options.bookType || 'xlsx'
  })
}
