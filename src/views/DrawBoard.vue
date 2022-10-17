<template>
  <h2 class="text-2xl font-bold">This is a Draw Board</h2>
  <!-- 簽名畫布組件 -->
  <div>
    <!-- Canvas 繪圖區 -->
    <canvas
      id="myCanvas"
      width="500"
      height="200"
      style="border: 2px solid #6699cc"
      ref="refCanvas"
      class="mx-auto"
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
      <select id="selWidth" class="border px-1 py1 mr-4">
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5" selected="selected">5</option>
        <option value="7">7</option>
        <option value="9">9</option>
        <option value="11">11</option>
      </select>

      <label for="selColor" class="font-bold mr-2">Color :</label>
      <select id="selColor" class="border px-1 py1 mr-4">
        <option value="black" selected="selected">black</option>
        <option value="blue">blue</option>
        <option value="red">red</option>
        <option value="green">green</option>
        <option value="yellow">yellow</option>
        <option value="gray">gray</option>
      </select>
    </div>
  </div>
  <div class="w-full h-24 bg-slate-400" ref="testArea"></div>
  <button type="button" @click="call">console</button>
</template>
<script>
import { ref, onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const refCanvas = ref(null);
    onMounted(() => {
      const ctx = refCanvas.value.getContext("2d");

      let mousePress = false;

      let lastX;
      let lastY;

      refCanvas.value.addEventListener("mousedown" | "toulchstart", (e) => {
        mousePress = true;
        console.log("Mouse Down!!");
        draw(e.offsetX, e.offsetY, mousePress);
      });

      refCanvas.value.addEventListener("mousemove", (e) => {
        if (mousePress) {
          draw(e.offsetX, e.offsetY, mousePress);
        }
      });

      refCanvas.value.addEventListener("mouseup", () => {
        mousePress = false;
        lastX = undefined;
        lastY = undefined;
      });

      // Mobile
      refCanvas.value.addEventListener("touchstart", (e) => {
        mousePress = true;
        console.log("Touch Start!!");
        draw(e.offsetX, e.offsetY, mousePress);
      });

      refCanvas.value.addEventListener("touchmove", (e) => {
        if (mousePress) {
          draw(e.offsetX, e.offsetY, mousePress);
        }
      });

      refCanvas.value.addEventListener("touchend", () => {
        mousePress = false;
        lastX = undefined;
        lastY = undefined;
      });

      // Draw
      function draw(x, y, isDown) {
        let color = document.querySelector("#selColor").value;
        let width = document.querySelector("#selWidth").value;
        if (isDown) {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = width;
          ctx.lineJoin = "round";
          console.log(lastX, lastY);
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(x, y);
          ctx.closePath();
          ctx.stroke();
        }
        lastX = x;
        lastY = y;
      }
    });

    // 清空簽名版
    const clearArea = () => {
      // Use the identity matrix while clearing the canvas
      const ctx = refCanvas.value.getContext("2d");

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    const testArea = ref(null);

    onMounted(() => {
      testArea.value.addEventListener("touchstart", () => {
        console.log("Touch Event!", testArea.value);
      });
    });

    const call = () => {
      console.log(testArea.value);
    };

    return {
      refCanvas,
      clearArea,
      testArea,
      call,
    };
  },
};
</script>
