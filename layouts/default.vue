<template>
  <div>
    <nuxt/>
  </div>
</template>

<style lang="scss">
html {
  font-family: "Lora", sans-serif;
  font-size: 18px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
body {
  padding: 0;
  margin: 0;
}
h1, h2, h3, .h {
  font-family: "Roboto Slab", serif;
  font-weight: bold;
}
h1 {
  font-size: 3.8em;
  margin-bottom: .5em;
}
a {
  font-weight: bold;
  color: inherit;
  font-style: italic;
}
a.btn {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  font-family: 'Roboto Slab', serif;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 18px;
  text-transform: uppercase;
  color: black;
  border: 3px solid #F8A597;
  box-sizing: border-box;
  padding: 9px 57px 8px 26px;
  text-decoration: none;
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 63px;
    height: 3px;
    background-color: black;
    right: -17px;
    top: calc(50% - 1px);
  }
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

