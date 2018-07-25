<template>
  <div>
    <nuxt/>
  </div>
</template>

<style lang="scss">
html {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 18px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  padding: 3em;
  box-sizing: border-box;
}
h1, h2, h3 {
  font-family: "Lora", serif;
}
h1 {
  font-size: 3.8em;
  margin-bottom: .5em;
}
p.big {
  $lineWidth: 2.5em;
  position: relative;
  margin-top: .5em;
  font-size: 1.5em;
  line-height: 1.5;
  padding-left: calc(#{$lineWidth} + 20px);
  font-weight: 300;
  font-style: italic;
  box-sizing: border-box;
  &:before {
    content: '';
    position: absolute;
    display: block;
    width: $lineWidth;
    height: 1px;
    left: 0;
    top: 22px;
    background-color: black;
  }
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

