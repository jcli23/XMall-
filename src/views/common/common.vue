<template>
 <div>
   <top></top>
   <router-view></router-view>
   <bottom class="bottom"></bottom>
 </div>
</template>

<script>
import bottom from '../../components/bottom/bottom'
 export default {
   data () {
     return {

     }
   },
   components: {
     bottom
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

</style>