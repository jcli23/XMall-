<template>
 <div>
   <div class="all">
     <div class="warp">
       <div v-for="(item,index) in panel" :key="index" class="for">
         <img :src="item.picUrl" alt="">
         <div class="box"></div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   props: {
    panel: {
      type: Array,
      default: () => []
    }
  },
   components: {

   },
   methods: {

   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
  .all{
    width: 100%;
    height: 202px;
    background: #f2f2f2;
    .warp{
      display: flex;
      overflow: hidden;
      border-radius: 10px;
      border: 1px solid #eee;
      align-items: center;
      .for{
        flex: 1;
        border-right: 1px solid #f2f2f2;
        height: 200px;
        position: relative;
        img{
          width: 100%;
          height: 200px;
        }
        .box{
          width: 100%;
          height: 200px;
          position: absolute;
          background: #f1ece5;
          opacity: 0;
          top: 0;
          &:hover{
            opacity: 0.1;
            box-shadow: 2px 5px 10px #666462 inset;
          }
        }
      }
    }
  }
</style>