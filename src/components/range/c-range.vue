<template>
  <div class='c-range-container'>
    <div class="range-container">
      <slot name="start"></slot>
      <div
          class="range-content"
          ref="content"
          :style="{
              marginLeft: `calc(${btnSize} / 2)`,
              marginRight: `calc(${btnSize} * 1.5)`,
              height: btnSize
          }"
      >
        <div
            class="range-default"
            :style="{
                borderRadius: barRadius,
                backgroundColor: defaultBg,
                width: `calc( 100% + ${btnSize} )`,
                height: barLen,
                top: `calc(${btnSize} / 2 - ${barLen} / 2)`,
            }"
        ></div>
        <div
            class="range-active"
            :style="{
                borderTopLeftRadius: barRadius,
                borderBottomLeftRadius: barRadius,
                backgroundColor: disabled ? disabledBg : activeBg,
                width: `calc(${progress}% + ${btnSize} / 2`,
                height: barLen,
                top: `calc(${btnSize} / 2 - ${barLen} / 2)`,
            }"
        ></div>
        <div
            ref="thumb"
            class="range-thumb"
            :style="{
                backgroundColor: disabled ? disabledBg : btnColor,
                width: btnSize,
                height: btnSize,
                left: `${progress}%`
            }"
        ></div>
      </div>
      <slot name="end"></slot>
    </div>
  </div>
</template>

<script>
import draggable from '@/utils/draggable'

export default {
  name: 'c-range',
  components: {},
  data() {
    return {}
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledBg: {
      type: String,
      default: '#d64a0a'
    },
    value: {
      type: Number,
      default: 5
    },
    barLen: {
      type: String,
      default: '12px'
    },
    barRadius: {
      type: String,
      default: '6px'
    },
    btnSize: {
      type: String,
      default: '30px'
    },
    btnColor: {
      type: String,
      default: '#FF5000'
    },
    vertical: {
      type: Boolean,
      default: false
    },
    defaultBg: {
      type: String,
      default: '#e5e5e5'
    },
    activeBg: {
      type: String,
      default: '#FF5000'
    },
  },
  computed: {
    progress() {
      const value = this.value;
      if (typeof value === 'undefined' || value === null) return 0;
      return Math.floor((value - this.min) / (this.max - this.min) * 100);
    }
  },
  watch: {},
  methods: {
  },
  created() {
  },
  mounted() {
    const thumb = this.$refs.thumb;
    const content = this.$refs.content;

    const getThumbPosition = () => {
      const contentBox = content.getBoundingClientRect();
      const thumbBox = thumb.getBoundingClientRect();
      return {
        left: thumbBox.left - contentBox.left,
        top: thumbBox.top - contentBox.top,
        thumbBoxLeft: thumbBox.left
      };
    };

    let dragState = {};
    draggable(thumb, {
      start: (event) => {
        if (this.disabled) return;
        const position = getThumbPosition();
        const thumbClickDetalX = event.clientX - position.thumbBoxLeft;
        dragState = {
          thumbStartLeft: position.left,
          thumbStartTop: position.top,
          thumbClickDetalX: thumbClickDetalX
        };
      },
      drag: (event) => {
        if (this.disabled) return;
        const contentBox = content.getBoundingClientRect();
        const deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft - dragState.thumbClickDetalX;
        const stepCount = Math.ceil((this.max - this.min) / this.step);
        const newPosition = (dragState.thumbStartLeft + deltaX) - (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount);

        let newProgress = newPosition / contentBox.width;

        if (newProgress < 0) {
          newProgress = 0;
        } else if (newProgress > 1) {
          newProgress = 1;
        }

        this.$emit('input', Math.round(this.min + newProgress * (this.max - this.min)));
      },
      end: () => {
        if (this.disabled) return;
        this.$emit('change', this.value);
        dragState = {};
      }
    });
  }
}
</script>

<style lang="scss" scoped>
  .c-range-container {
    .range-container {
      display: flex;
      align-items: center;
      background: #fff;
      .range-content {
        margin: 6px 0;
        flex: 1;
        position: relative;
        width: 100%;
        .range-default {
          position: absolute;
          left: 0;
          top: 0;
        }
        .range-active {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 2;
        }
        .range-thumb {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 50%;
          z-index: 3;
          cursor: move;
          box-shadow: 0 1px 3px rgba(0,0,0,.4)
        }
      }
    }
  }
  .range-vertical {
    transform: rotate(90deg) translateY(90px);
  }
</style>