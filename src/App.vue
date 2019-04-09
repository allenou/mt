<template>
  <div id="app">
    <header>
      <p>
        Markdown
        <span v-if="html">to</span>
      </p>
      <ul class="types" v-if="html">
        <li @click="toPDF">PDF</li>
        <li @click="toPNG">PNG</li>
        <li @click="toHTML">HTML</li>
      </ul>
    </header>
    <div class="upload" v-if="!html">
      <label
        for="file"
        @dragenter.prevent
        @dragover.prevent
        @drop.stop.prevent="fileChange($event)"
      >
        <i class="iconfont">&#xe656;</i>
        <span>Drag or select a file</span>
      </label>
      <input type="file" id="file" accept=".md"  @change="fileChange($event)">
    </div>
    <main>
      <div class="content" ref="html" v-html="html" style="padding:30px;"></div>
    </main>
    <footer>
      <GitHubBadge slug="allenou/markdown" class="badge"></GitHubBadge>
    </footer>
  </div>
</template>

<script>
import marked from "marked";
import download from "downloadjs";
import GitHubBadge from "vue-github-badge";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
export default {
  name: "app",
  components: {
    GitHubBadge
  },
  data() {
    return {
      html: "",
      name: "file",
      file: null
    };
  },
  methods: {
    fileChange(e) {
      if (e.type === "change") {
        this.previewMarkdown(e.target.files[0]);
      }
      if (e.type === "drop") {
        this.previewMarkdown(e.dataTransfer.files[0]);
      }
    },
    readerFile(file) {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.readAsText(file, "UTF-8");
        reader.onload = function() {
          resolve(this.result);
        };
      });
    },

    previewMarkdown(file) {
      this.readerFile(file).then(result => {
        this.html = marked(result);
      });
    },

    toHTML() {
      var blob = new Blob([document.querySelector("main").innerHTML]);
      download(blob, this.name + ".html", "text/html");
    },
    toPNG() {
      html2canvas(document.querySelector(".content")).then(canvas => {
        const image = canvas.toDataURL("image/png", 1.0);
        download(image, this.name, "images/png");
      });
    },
    toPDF() {
      var opt = {
        margin: [0.2, 0, 0.2, 0],
        filename: this.name + ".pdf",
        pagebreak: { mode: ["avoid-all"] },
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      };

      html2pdf()
        .set(opt)
        .from(document.querySelector(".content"))
        .save();
    }
  }
};
</script>

<style>
html,
body,
#app {
  margin: 0;
  height: 100%;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
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
  height: 50px;
  line-height: 50px;
  padding: 0 30px;
  list-style: none;
  cursor: pointer;
}
.types li:hover {
  color: #000;
  background-color: #ccc;
}

.upload {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  /* height: 300px;
  width: 300px; */
  padding: 30px;
  text-align: center;
  font-size: 30px;

  border-radius: 10px;
  color: #ccc;
}

.upload input {
  position: absolute;
  z-index: -11;
  top: -100%;
}
.upload label {
  padding: 120px;
  background-color: #ecf0f15e;
}
.upload .iconfont {
  font-size: 70px;
}
.upload span {
  display: block;
}

canvas {
  display: none;
}
main {
  padding-top: 50px;
}
.content {
  outline: none;
}
.content li {
  line-height: 30px;
}

footer /deep/ .badge {
  top: inherit !important;
  bottom: 1rem !important;
}
</style>
