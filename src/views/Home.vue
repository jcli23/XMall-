<template>
  <div>
    <navigation></navigation>
    <div class="a">
      <banner :banner="banner" :class="{'banner':searchBarFixed}"></banner>
      <panel :panel="panel"></panel>
      <hot class="hot" :hot="hot"></hot>
      <handpick :selection="selection1" class="selection"></handpick>
      <handpick :selection="selection2" class="selection"></handpick>
      <handpick :selection="selection3" class="selection"></handpick>
      <panel :panel="panel2" class="panel"></panel>
    </div>
  </div>
</template>

<script>
import banner from '../../src/components/banner/banner'
import panel from '../../src/components/panel/panel'
import hot from '../../src/components/hot/hot'
import handpick from '../../src/components/handpick/handpick'
import navigation from '../../src/components/navigation/navigation'
export default {
  data() {
    return {
      banner:{},
      panel:[],
      panel2:[],
      hot:{},
      selection1:{},
      selection2:{},
      selection3:{},
    };
  },
  components: {
    banner,
    panel,
    hot,
    handpick,
    navigation
  },
  mounted() {
    this.$api
      .getHome()
      .then(res => {
        console.log(res);
        this.banner=res.data[0]
        this.panel=res.data[1].panelContents
        this.panel2=res.data[6].panelContents
        this.hot=res.data[2]
        this.selection1=res.data[3]
        this.selection2=res.data[4]
        this.selection3=res.data[5]
      })
      .catch(err => {
        console.log(err);
      })
  },
  methods: {
    
  },
  watch: {},
  computed: {}
};
</script>

<style lang='scss' scoped>
.a {
  .banner{
    margin-top: 120px;
  }
  .hot{
    width: 100%;
    height: 522px;
    padding-top:30px;
    background: #f2f2f2;
  }
  .panel{
    width: 100%;
    padding-top:30px;
    background: #f2f2f2;
  }
  .selection{
    width: 100%;
    padding-top:30px;
    background: #f2f2f2;
  }
  .bottom{
    width: 100%;
    padding-top:50px;
    background: #f2f2f2;
  }
}
.a1{
  .bottom{
    width: 100%;
    padding-top:50px;
    background: #f2f2f2;
  }
}
</style>