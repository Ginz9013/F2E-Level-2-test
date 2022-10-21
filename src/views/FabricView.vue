<template>
  <h2>This is a Fabric.js page</h2>
  <div>
    <input type="file" accept="application/pdf" />
  </div>
  <canvas id="c" ref="canvas" width="500" height="620"> </canvas>
</template>
<script>
// import { pdfjsLib } from "pdfjs-dist/build/pdf";
import { fabric } from "fabric";
export default {
  methods: {},
  created() {},
  mounted() {
    const Base64Prefix = "data:application/pdf;base64,";
    const pdfjsLib = require("pdfjs-dist/build/pdf");
    // function getPdfHandler() {
    //   return window["pdfjs-dist/build/pdf"];
    // }
    console.log(pdfjsLib);

    // 處理來源資料 - 傳入一個資料(blob)
    function readBlob(blob) {
      // 返回一個 Promise，依照讀取成功或失敗選一邊執行
      return new Promise((resolve, reject) => {
        // Promise 中建立一個讀取檔案的建構子 FileReader
        const reader = new FileReader();
        // FileReader新增監聽事件，如果讀取成功，回傳 Promise 的 resolve，內容是 FileReader 讀取檔案的內容
        reader.addEventListener("load", () => resolve(reader.result));
        // 監聽，監聽事件 error，沒有讀取成功的話就回傳 Promise 的 reject，內容是字串 "失敗拉"
        reader.addEventListener("error", () => {
          reject("失敗拉");
        });
        // 顯示讀取的檔案內容
        reader.readAsDataURL(blob);
      });
    }
    async function printPDF(pdfData, pages) {
      // const pdfjsLib = await getPdfHandler();
      console.log(pdfjsLib);
      pdfData = pdfData instanceof Blob ? await readBlob(pdfData) : pdfData;
      const data = atob(
        pdfData.startsWith(Base64Prefix)
          ? pdfData.substring(Base64Prefix.length)
          : pdfData
      );
      // Using DocumentInitParameters object to load binary data.
      const loadingTask = pdfjsLib.getDocument({ data });
      return loadingTask.promise.then((pdf) => {
        const numPages = pdf.numPages;
        return new Array(numPages).fill(0).map((__, i) => {
          const pageNumber = i + 1;
          if (pages && pages.indexOf(pageNumber) == -1) {
            return;
          }
          return pdf.getPage(pageNumber).then((page) => {
            //  retina scaling
            const viewport = page.getViewport({
              scale: window.devicePixelRatio,
            });
            // Prepare canvas using PDF page dimensions
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            // Render PDF page into canvas context
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            const renderTask = page.render(renderContext);
            return renderTask.promise.then(() => canvas);
          });
        });
      });
    }

    async function pdfToImage(pdfData, canvas) {
      const scale = 1 / window.devicePixelRatio;
      return (await printPDF(pdfData)).map(async (c) => {
        canvas.add(
          new fabric.Image(await c, {
            scaleX: scale,
            scaleY: scale,
          })
        );
      });
    }

    const canvas = (this.__canvas = new fabric.Canvas("c"));
    const text = new fabric.Text("Upload PDF");
    canvas.add(new fabric.Circle({ radius: 100, fill: "green" }), text);
    document.querySelector("input").addEventListener("change", async (e) => {
      text.set("text", "loading...");
      canvas.requestRenderAll();
      await Promise.all(pdfToImage(e.target.files[0], canvas));
      canvas.remove(text);
    });
  },
};
</script>
