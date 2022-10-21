<template>
  <h2>This is a PDF page</h2>
  <input
    type="file"
    class="select bg-gray-300 px-4 py-2 my-4 rounded-md font-bold hover:bg-gray-700 hover:text-white hover:cursor-pointer"
    @change="selectFile"
    accept="application/pdf"
  />
  <canvas
    ref="canvas"
    width="600"
    height="800"
    class="border-2 mx-auto"
  ></canvas>
</template>
<script setup>
const { onMounted, ref } = require("@vue/runtime-core");
const pdfjsLib = require("pdfjs-dist/build/pdf");
// 引入 pdfjsLib 參數設定
pdfjsLib.GlobalWorkerOptions.workerSrc = import(
  "pdfjs-dist/build/pdf.worker.entry"
);

const canvas = ref(null);
let ctx = null;

async function renderPDF(data) {
  ctx = canvas.value.getContext("2d");
  console.log(ctx);
  const pdfDoc = await pdfjsLib.getDocument(data).promise;
  console.log(pdfDoc);
  const pdfPage = await pdfDoc.getPage(1);
  const viewport = pdfPage.getViewport({ scale: 1 });
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  pdfPage.render({
    canvasContext: ctx,
    viewport: viewport,
  });
}

function selectFile(e) {
  if (e.target.files[0] === undefined) return;

  // 透過 input 所選取的檔案
  const file = e.target.files[0];

  // 產生fileReader物件
  const fileReader = new FileReader();

  // 將資料做處理
  fileReader.readAsArrayBuffer(file);

  // 綁入事件監聽
  fileReader.addEventListener("load", () => {
    // 獲取readAsArrayBuffer產生的結果，並用來渲染PDF
    const typedarray = new Uint8Array(fileReader.result);
    renderPDF(typedarray);
  });
}

onMounted(() => {
  //   ctx = canvas.value.getContext("2d");
  //   pdfjsLib.getDocument("./sample.pdf").promise.then((doc) => {
  //     // 抓取第一頁
  //     doc.getPage(1).then((page) => {
  //       // 設定 PDF 內容的顯示比例
  //       const viewport = page.getViewport({ scale: 1 });
  //       // 設定 canvas 的大小與 PDF 相等
  //       canvas.value.width = viewport.width;
  //       canvas.value.height = viewport.height;
  //       //實際渲染 PDF
  //       page.render({
  //         canvasContext: ctx,
  //         viewport: viewport,
  //       });
  //     });
  //   });
});
</script>
