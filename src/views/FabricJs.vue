<template>
  <h2>This is a Fabric.js test page</h2>
  <button
    type="button"
    @click="addNewBox"
    class="bg-gray-300 px-4 py-2 my-4 rounded-md font-bold hover:bg-gray-700 hover:text-white"
  >
    Add Rect
  </button>
  <button
    type="button"
    @click="addNewCircle"
    class="bg-gray-300 px-4 py-2 my-4 rounded-md font-bold hover:bg-gray-700 hover:text-white"
  >
    Add Circle
  </button>
  <canvas
    id="canvas"
    ref="canvasRef"
    width="600"
    height="600"
    class="border border-2 rounded-2xl border-blue-900"
  ></canvas>
</template>
<script>
import { fabric } from "fabric";
let canvas = null;
export default {
  data() {
    return {
      lucy: "https://truth.bahamut.com.tw/s01/202209/aa202459995ebaf1562575cb30f84048.JPG",
    };
  },
  methods: {
    addNewBox() {
      const rect = new fabric.Rect({
        left: 150,
        top: 150,
        width: 90,
        height: 90,
        fill: "blue",
        borderColor: "red",
      });
      canvas.add(rect);
    },
    addNewCircle() {
      const circle = new fabric.Circle({
        left: 100,
        top: 300,
        radius: 40,
        fill: "green",
      });
      canvas.add(circle);
    },
  },
  mounted() {
    canvas = new fabric.Canvas(this.$refs.canvasRef, {
      isDrawingMode: false,
    });
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 50,
      height: 50,
      fill: "#f3f345",
      angle: 45,
      borderColor: "red",
    });
    canvas.add(rect);

    // Circle
    new fabric.Image.fromURL(this.lucy, (_img) => {
      const lucy = _img.set({
        left: 0,
        top: 0,
        width: _img.width,
        height: _img.height,
      });
      canvas.add(lucy);
    });
  },
};
</script>
