<template>
 <div>
   <top></top>
   <div class="center">
     <div class="warp">
       <avatarer class="avatarer"></avatarer>
       <div class="right">
         <router-view></router-view>
       </div>
     </div>
   </div>
   <bottom class="bottom"></bottom>
 </div>
</template>

<script>
import bottom from '../../components/bottom/bottom'
import avatarer from '../../components/avatarer/avatarer'
 export default {
   data () {
     return {

     }
   },
   components: {
      bottom,
      avatarer
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
  .center{
    width: 100%;
    padding: 50px 0 70px 0;
    background: #f2f2f2;
    .warp{
      display: flex;
      .avatarer{
        width: 210px;
        height: 544px;
        padding: 20px 0 0;
        background: white;
        border-radius: 20px;
        box-shadow: 0 0 10px #e0dfdf;
        overflow: hidden;
      }
      .right{
        width: 988px;
        margin-left: 20px;
      }
    }
  }
</style>