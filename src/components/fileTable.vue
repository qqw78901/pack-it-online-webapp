<template>
    <div>
        <mu-row>
            <mu-table multiSelectable enableSelectAll ref="table">
                <mu-thead>
                    <mu-tr>
                        <mu-th>name</mu-th>
                        <mu-th>size</mu-th>
                        <mu-th>progress</mu-th>
                    </mu-tr>
                </mu-thead>
                <mu-tbody>
                    <mu-tr v-for="(file,index) in files" :key="file.id">
                        <mu-td>{{file.name}}</mu-td>
                        <mu-td>{{file.size | formatSize}}</mu-td>
                        <mu-td>{{file.progress+"%"}}</mu-td>
                    </mu-tr>
                </mu-tbody>
            </mu-table>
        </mu-row>
        <mu-row class="container">
            <file-upload class="mu-raised-button" post-action="http://localhost:3008/upload" extensions="gif,jpg,jpeg,png,webp" accept="image/png,image/gif,image/jpeg,image/webp" :multiple="true" :size="1024 * 1024 * 10" v-model="files" @input-file="inputFile" ref="upload">
                选择
            </file-upload>
            <mu-raised-button label="上传" @click="upload" primary/>
            <mu-raised-button label="输出" @click="output" secondary/>
        </mu-row>
        <mu-row>
            <mu-dialog :open="downloadDialog" title="项目打包成功">
                <mu-raised-button label="点此下载" :href="downloadLink" secondary/>
            </mu-dialog>
        </mu-row>
    </div>
</template>

<script>

export default {
  name: "FileTable",
  data() {
    return {
      downloadDialog: false,
      downloadLink: "",
      files: []
    };
  },
  methods: {
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        console.log("add", newFile);
      }
      if (newFile && oldFile) {
        // update
        console.log("update", newFile);
      }
      if (!newFile && oldFile) {
        // remove
        console.log("remove", oldFile);
      }
    },
    upload() {
      this.$refs.upload.active = true;
    },
    output() {
      let images = [];
      this.files.forEach(val => {
        let { success, response } = val;
        if (success) {
          let { data } = response;
          images.push(data);
        }
      });
      this.$http
        .get(this.$api.pack, {
          params: {
            images
          }
        })
        .then(resp => {
          console.log(resp);
          if (!resp.status === 200 || !resp.data.success) {
            throw new Error();
          } else {
            this.downloadDialog = true;
            this.downloadLink = `${this.$api.download}/${resp.data.name}`;
          }
        });
    }
  }
};
</script>
<style scoped>
.container {
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>