<template>
 <div>
   <div class="all">
     <div class="top">我的订单</div>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

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
  background: white;
  border-radius: 10px;
  height: 200px;
  box-shadow: 0 0 30px #f2f2f2;
  overflow: hidden;
  .top{
    width: 100%;
    height: 60px;
    padding: 0 10px 0 24px;
    line-height: 60px;
    font-size: 18px;
    color: #626262;
    border-bottom: 1px solid #d4d4d4;
    background: linear-gradient(#fbfbfb,#ececec);
  }
}
</style>