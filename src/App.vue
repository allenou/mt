<template>
  <div id="app" @dragover.prevent="dragoverFile">
    <header v-if="html">
      <p>Markdown to</p>
      <ul class="types" @click="handleConvert($event)">
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
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const pageHeight = (595 * canvasHeight) / canvasWidth;
      const pdf = new jsPDF("", "pt", "a4");
      if (canvasHeight < pageHeight) {
        pdf.addImage(image, "JPEG", 0, 0, 595, pageHeight);
      }
      pdf.save("stone.pdf");
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
