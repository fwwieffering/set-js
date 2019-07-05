<template>
  <div class="hello">
    <Card v-bind:count="1" shape="squiggle" color="red" fill="solid" />
    <Card v-bind:count="2" shape="diamond" color="green" fill="none" />
    <Card v-bind:count="3" shape="pill" color="purple" fill="hatch" />
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Main',
  components: {'Card': Card}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
