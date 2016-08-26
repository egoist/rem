<template>
  <div class="app-main">
    <div class="items" v-show="items.length > 0">
      <div
        class="item"
        :class="{active: active === index}"
        v-for="(item, index) in items">
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
  import {$} from 'utils/dom'
  
  export default {
    data() {
      return {
        active: 0
      }
    },
    computed: {
      ...mapGetters(['items'])
    },
    mounted() {
      document.addEventListener('keydown', e => {
        if (e.code === 'ArrowDown') {
          this.moveDown()
        } else if (e.code === 'ArrowUp') {
          this.moveUp()
        }
      }, false)
    },
    methods: {
      moveDown() {
        if (this.active === this.items.length - 1) {
          this.active = 0
        } else {
          this.active++
        }
        this.$nextTick(() => {
          $('.item.active').scrollIntoViewIfNeeded()
        })
      },
      moveUp() {
        if (this.active === 0) {
          this.active = this.items.length - 1
        } else {
          this.active--
        }
        this.$nextTick(() => {
          $('.item.active').scrollIntoViewIfNeeded()
        })
      }
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
    &.active {
      background-color: #f9f9f9;
    }
  }
  .item-title {
    color: #b7b3b3;
    font-size: 1.6rem;
    font-weight: 300;
    .active & {
      color: #333;
    }
  }
  .item-subtitle {
    color: #bfbcbc;
    font-size: .75rem;
    font-weight: 300;
    .active & {
      color: #666;
    }
  }
</style>