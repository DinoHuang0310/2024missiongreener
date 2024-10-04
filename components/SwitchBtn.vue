<template>
  <div class="flex justify-center items-center">
    <div class="relative">
      <button class="absolute left-0 top-1/2 -ml-2 transform -translate-x-full -translate-y-1/2" @click="handleClick(true)">
        <span class="whitespace-nowrap" :class="active ? 'text-primary font-bold' : 'text-lightgray'">{{ option.left.name }}</span>
      </button>
      <label>
        <div :class="active ? 'switch-btn' : 'switch-btn right'" />
        <input type="checkbox" v-model="active" class="hidden" />
      </label>
      <button class="absolute right-0 top-1/2 -mr-2 transform translate-x-full -translate-y-1/2" @click="handleClick(false)">
        <span class="whitespace-nowrap" :class="!active ? 'text-primary font-bold' : 'text-lightgray'">{{ option.right.name }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: function() {
        return {
          left: {
            name: '',
            value: true
          },
          right: {
            name: '',
            value: false
          },
          default: 'left'
        }
      }
    }
  },
  data() {
    return {
      active: null
    }
  },
  watch: {
    active: function() {
      const val = this.active ? this.option.left.value : this.option.right.value;
      this.$emit('handleSwitchVal', val);
    }
  },
  methods: {
    handleClick(bool) {
      this.active = bool;
    }
  },
  mounted() {
    this.active = this.option.default === 'right' ? false : true;
  }
}
</script>

<style scoped>
.switch-btn {
  position: relative;
  width: 80px;
  height: 34px;
  border-radius: 20px;
  cursor: pointer;
  background: var(--color-primary);
  overflow: hidden;
  transition: .5s;
}
.switch-btn::after {
  content: '';
  position: absolute;
  width: 28px;
  height: 28px;
  top: 3px;
  left: 3px;
  box-shadow: 3px 0 8px rgba(0, 0, 0, .4);
  border-radius: 50%;
  background: white;
  transition: .5s;
}
.switch-btn.right::after {
  left: 49px;
  box-shadow: -3px 0 8px rgba(0, 0, 0, .4);
}
</style>