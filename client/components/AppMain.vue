<template>
  <div class="app-main">
    <div class="items" v-show="items.length > 0" ref="container">
      <div
        class="item"
        @click="handleItemClick(index, item.action)"
        :class="{active: activeItemIndex === index}"
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
  import {mapGetters, mapActions} from 'vuex'
  import Ps from 'perfect-scrollbar'
  import {$} from 'utils/dom'
  import handleAction from 'utils/handle-action'
  
  export default {
    data() {
      return {
        active: 0
      }
    },
    computed: {
      ...mapGetters(['items', 'activeItemIndex'])
    },
    mounted() {
      Ps.initialize(this.$refs.container)
    },
    methods: {
      ...mapActions(['moveTo']),
      updateScrollBar() {
        Ps.update(this.$refs.container)
      },
      handleItemClick(index, action) {
        this.moveTo(index)
        handleAction(action)
      }
    },
    watch: {
      items() {
        this.$nextTick(() => {
          this.updateScrollBar()
        })
      }
    },
    beforeDestroy() {
      Ps.destroy(this.$refs.container)
    }
  }
</script>

<style src="perfect-scrollbar/dist/css/perfect-scrollbar.css"></style>
<style>
  .app-main {
    background-color: white;
    overflow: hidden;
  }
  .items {
    max-height: calc(70px * 5);
    position: relative;

    .ps-scrollbar-y-rail {
      opacity: 0.6;
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