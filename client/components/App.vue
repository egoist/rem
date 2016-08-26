<template>
  <div id="app">
    <app-input></app-input>
    <app-main></app-main>
  </div>
</template>

<script>
  import AppInput from 'components/AppInput'
  import AppMain from 'components/AppMain'

  export default {
    components: {
      AppInput,
      AppMain
    }
  }
</script>

<style>
* {
  box-sizing: border-box;
}
html, body, #app {
  height: 100%;
}
html {
  font-size: 16px;
}
body {
  margin: 0;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
}
.page {
  text-align: center;
}
code {
  background-color: #f0f0f0;
  padding: 3px 5px;
  border-radius: 2px;
}
#app {
  background-color: white;
  overflow: hidden;
}
</style>