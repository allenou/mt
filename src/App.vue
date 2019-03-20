<template>
  <div id="app" @dragover.prevent="dragoverFile">
    <header >
      <p>Markdown to</p>
      <ul class="types" @click="handleConvert($event)" v-if="html">
        <!-- <li>PDF</li> -->
        <li>PNG</li>
      </ul>
    </header>
    <div class="upload" v-if="!html">
      <label for="file">
        <i class="iconfont">&#xe656;</i>
        <span>Select file</span>
      </label>
      <input type="file" id="file" @change="fileChange($event)">
    </div>
    <div class="content" ref="html" v-html="html"></div>
  </div>
</template>

<script>
import marked from "marked";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  name: "app",
  data() {
    return {
      html: "",
      name: ""
    };
  },
  methods: {
    fileChange(e) {
      const _this = this;
      const file = e.target.files[0];
      const reader = new FileReader();
      this.name = file.name;
      reader.readAsText(file, "UTF-8");
      reader.onload = function() {
        _this.html = marked(this.result);
      };
    },
    dragoverFile() {
      console.log(1);
    },
    handleConvert(e) {
      const type = e.target.textContent;
      if (e.target.tagName === "LI") {
        html2canvas(this.$refs.html).then(canvas => {
          document.body.appendChild(canvas);
          const image = canvas.toDataURL("image/" + type, 1.0);
          switch (type) {
            case "PNG":
              this.download(image);
              break;
            case "PDF":
              this.toPdf(image, canvas);
          }
        });
      }
    },
    toPdf(image, canvas) {
     
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;

      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = (contentWidth / 592.28) * 841.89;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28;
      var imgHeight = (592.28 / contentWidth) * contentHeight;

      var pageData = canvas.toDataURL("image/jpeg", 1.0);

      var pdf = new jsPDF("", "pt", "a4");

      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, "JPEG", 20, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }

      pdf.save("content.pdf");
    },
    download(dataUrl) {
      const tag = document.createElement("a");
      tag.download = "test";
      tag.style.display = "none";
      tag.href = dataUrl;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
  }
};
</script>



<style>
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
header {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  color: #fff;
  background-color: #232323;
}
header p {
  margin: 0;
  padding-left: 30px;
}

.types {
  overflow: hidden;
  margin: 0;
  color: #fff;
}
.types li {
  float: right;
  padding: 0 30px;
  list-style: none;
  cursor: pointer;
}
.upload {
  /* display: inline-block; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 300px;
  width: 300px;
  padding: 30px;
  text-align: center;
  font-size: 30px;
  /* border: 1px dotted #ccc; */
  border-radius: 10px;
  color: #ccc;
  /* background-color: #fff; */
}

.upload input {
  position: absolute;
  z-index: -11;
  top: -100%;
}
.upload .iconfont {
  /* padding-top: 50px; */
  font-size: 50px;
}
.upload span {
  display: block;
  /* color: #232323; */
}

canvas {
  display: none;
}

.content {
  padding: 30px;
}
.content li {
  line-height: 30px;
}
</style>
