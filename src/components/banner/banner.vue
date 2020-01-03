<template>
  <div>
    <div class="all">
      <div class="warp">
        <Carousel loop :autoplay="autoplay" :autoplay-speed="speed">
          <CarouselItem v-for="(item,index) in banner.panelContents" :key="index" class="for">
            <div class="box">
              <img class="img1" :src="item.picUrl" alt />
              <img class="img2" :src="item.picUrl2" alt />
              <img class="img3" :src="item.picUrl3" alt />
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoplay:true,
      speed:9000
    };
  },
  props: {
    banner: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  width: 100%;
  height: 580px;
  padding: 40px 0;
  background: #f2f2f2;
  .warp {
    height: 500px;
    .for {
      width: 100%;
      height: 500px;
      display: flex;
      .box {
        width: 100%;
        height: 500px;
        position: relative;
        .img1 {
          width: 100%;
          height: 500px;
          position: absolute;
          left: 0;
          top: 0;
        }
        .img2 {
          width: 100%;
          height: 500px;
          position: absolute;
          left: 0;
          top: 0;
        }
        .img3 {
          width: 100%;
          height: 500px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
}
</style>