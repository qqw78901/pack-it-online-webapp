<template>
  <section>
    <mu-appbar title="LYAPP" titleClass="navbar"></mu-appbar>
    <form id='editfile' method='post' action='http://localhost:3008/upload' enctype='multipart/form-data'>
      <input name="text" type="text" /> 选择图片：
      <input name="avatar" id='upfile' type='file' />
      <input type='submit' value='提交' />
    </form>

    <file-upload ref="upload" v-model="files" post-action="/post.method" put-action="/put.method" @input-file="inputFile" @input-filter="inputFilter">
      上传文件
      
    </file-upload>
    <FileTable/>
  </section>
</template>

<script>
import FileTable from './fileTable'
export default {
  name: "index",
  components: {
    FileTable
  },
  data: function () {
    return {
      files: []
    }
  },
  methods: {
    /**
 * Has changed
 * @param  Object|undefined   newFile   只读
 * @param  Object|undefined   oldFile   只读
 * @return undefined
 */
    inputFile: function (newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  获得响应状态码
          console.log('status', newFile.xhr.status)
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   读写
     * @param  Object|undefined   oldFile   只读
     * @param  Function           prevent   阻止回调
     * @return undefined
     */
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      // 创建 blob 字段 用于图片预览
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.loading {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  p {
    text-align: center;
    font-size: 16px;
  }
}

.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
section{
  padding-bottom: 50px;
}
</style>
