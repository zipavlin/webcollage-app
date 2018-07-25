<template>
  <div class="header">
    <div class="header-image" :style="`backgroundImage: url(${image});`"></div>
    <div class="header-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ImageHeader",
        props: ['image']
    }
</script>

<style scoped lang="scss">
  .header {
    position: relative;
    display: flex;
    width: 100%;
    align-items: stretch;
  }
  .header-image {
    flex-grow: 1;
    flex-basis: 25%;
  }
  .header-content {
    flex-grow: 1;
    flex-basis: 75%;
    padding: 50px;
    box-sizing: border-box;
  }
</style>
