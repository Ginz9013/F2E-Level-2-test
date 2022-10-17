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
      ref="canvas"
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
import { onMounted, ref } from "@vue/runtime-core";
export default {
  setup() {
    const canvas = ref(null);

    onMounted(() => {
      console.log(canvas.value);
      const ctx = canvas.value.getContext("2d");
    });

    return {
      canvas,
    };
  },
};
</script>
