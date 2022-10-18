<template>
  <h2>This is a PDF page</h2>
  <canvas ref="canvas" style="border: 1px solid #000" class="mx-auto"></canvas>
</template>
<script setup>
const { onMounted, ref } = require("@vue/runtime-core");
const pdfjsLib = require("pdfjs-dist/build/pdf");
console.log(pdfjsLib);
// 引入 pdfjsLib 參數設定
pdfjsLib.GlobalWorkerOptions.workerSrc = import(
  "pdfjs-dist/build/pdf.worker.entry"
);

// 使用網路上的PDF做抓取練習;
// pdfjsLib.getDocument("./sample.pdf").promise.then((doc) => {
//   console.log(doc);

//   // 抓取第一頁
//   doc.getPage(1).then((page) => {
//     console.log(page);
//   });
// });

// 建立 canvas 渲染區
const canvas = ref(null);
onMounted(() => {
  const ctx = canvas.value.getContext("2d");

  pdfjsLib.getDocument("./sample.pdf").promise.then((doc) => {
    // 抓取第一頁
    doc.getPage(1).then((page) => {
      // 設定 PDF 內容的顯示比例
      const viewport = page.getViewport({ scale: 1 });

      // 設定 canvas 的大小與 PDF 相等
      canvas.value.width = viewport.width;
      canvas.value.height = viewport.height;

      //實際渲染 PDF
      page.render({
        canvasContext: ctx,
        viewport: viewport,
      });
    });
  });
});
</script>
