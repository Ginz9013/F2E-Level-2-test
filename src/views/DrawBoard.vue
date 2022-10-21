<template>
  <h2 class="text-2xl font-bold">This is a Draw Board</h2>
  <!-- 簽名畫布組件 -->
  <div class="mb-6">
    <!-- Canvas 繪圖區 -->
    <canvas
      id="myCanvas"
      width="500"
      height="200"
      style="border: 2px solid #6699cc"
      class="mx-auto"
      ref="canvas"
    ></canvas>
    <!-- 工具列 -->
    <div class="mt-4">
      <button
        type="button"
        class="bg-gray-200 px-2 py-1 rounded mr-4"
        @click="clearArea"
      >
        清空簽名板
      </button>

      <label for="selWidth" class="font-bold mr-2">Line width :</label>
      <select id="selWidth" ref="color" class="border px-1 py1 mr-4">
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5" selected="selected">5</option>
        <option value="7">7</option>
        <option value="9">9</option>
        <option value="11">11</option>
      </select>

      <label for="selColor" class="font-bold mr-2">Color :</label>
      <select id="selColor" ref="width" class="border px-1 py1 mr-4">
        <option value="black" selected="selected">black</option>
        <option value="blue">blue</option>
        <option value="red">red</option>
        <option value="green">green</option>
        <option value="yellow">yellow</option>
        <option value="gray">gray</option>
      </select>
    </div>
  </div>
  <div>
    <img
      class="show-img mx-auto"
      width="250"
      height="150"
      style="border: 1px solid"
      ref="showImage"
    />

    <div class="btn-group my-4">
      <button type="button" class="clear bg-gray-200 px-2 py-1 rounded mr-4">
        Clear
      </button>
      <button
        type="button"
        class="bg-gray-200 px-2 py-1 rounded mr-4"
        ref="saveBtn"
        @click="saveImage"
      >
        Save
      </button>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "@vue/runtime-core";

export default {
  name: "DrawBoard",
  setup() {
    const canvas = ref(null);
    const color = ref(null);
    const width = ref(null);
    let pressDown = false;

    const showImage = ref(null);

    // 繪圖開啟
    function startDraw() {
      pressDown = true;
    }

    // Canvas 轉 Image，存入 LocalStorage
    const saveImage = () => {
      // 圖片儲存的類型選擇 png ，並將值放入 img 的 src
      const newImg = canvas.value.toDataURL("image/png");
      showImage.value.src = newImg;
      console.log(showImage.value);
      // 圖片存入 LocalStorage
      localStorage.setItem("img", newImg);
    };

    // PDF.js

    onMounted(() => {
      // Canvas 設置
      const ctx = canvas.value.getContext("2d");
      ctx.lineWidth = color.value.value;
      ctx.lineJoin = width.value.value;

      // 滑鼠監聽
      canvas.value.addEventListener("mousedown", () => {
        startDraw();
      });
      canvas.value.addEventListener("mousemove", (e) => {
        if (pressDown) {
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
        }
      });
      canvas.value.addEventListener("mouseup", () => {
        pressDown = false;
        ctx.beginPath();
      });
      canvas.value.addEventListener("mouseleave", () => {
        pressDown = false;
        ctx.beginPath();
      });
    });

    return {
      canvas,
      color,
      width,
      saveImage,
      showImage,
    };
  },
};
</script>
