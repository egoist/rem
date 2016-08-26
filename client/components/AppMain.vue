<template>
  <div class="app-main">
    <div class="items" v-show="items.length > 0">
      <div class="item" v-for="item in items">
        <div class="item-icon"></div>
        <div class="item-main">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-subtitle">{{ item.subtitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  
  export default {
    computed: {
      ...mapGetters(['items'])
    }
  }
</script>

<style>
  .app-main {
    background-color: white;
  }
  .items {
    overflow: auto;
    max-height: calc(70px * 5);

    &::-webkit-scrollbar {
      background-color: transparent;
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 0;
      border: 0;
    }
  }
  .item {
    height: 70px;
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    justify-content: center;
    border-bottom: 1px solid #e5eaea;
  }
  .item-title {
    color: #b7b3b3;
    font-size: 1.6rem;
    font-weight: 300;
  }
  .item-subtitle {
    color: #bfbcbc;
    font-size: .75rem;
    font-weight: 300;
  }
</style>