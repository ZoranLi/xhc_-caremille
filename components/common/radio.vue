<style module>
.container {
    display: inline-block;
    vertical-align: middle;
}

.center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.checkbox_label,
.white_checkbox_label {
    position: relative;
    color: white;
    display: inline-block;
    line-height: 1;
}

.checkbox + .checkbox_label::before,
.white_checkbox + .white_checkbox_label::before {
    content: "";
    display: inline-block;
    width: 0.18rem;
    height: 0.18rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    background-color: #fff;
    margin-bottom: .03rem;
}

.checkbox,
.white_checkbox {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}

.checkbox:checked + .checkbox_label::before {
    border-color: #f66979;
    background: #f66979;
}

.checkbox:checked + .checkbox_label::after,
.white_checkbox:checked + .white_checkbox_label::after {
    content: "";
    position: absolute;
    width: 0.06rem;
    height: 0.11rem;
    border: 2px solid;
    border-left: none;
    border-top: none;
    left: 55%;
    top: 50%;
    transform-origin: center;
    transform: translate(-55%, -60%) rotate(43deg);
    margin-bottom: .03rem;
}
.white_checkbox:checked + .white_checkbox_label::after {
    color: #f66979;
    width: 0.1rem;
    height: 0.18rem;
    transform: translate(-50%, -75%) rotate(45deg);
}

.pink_label {
    position: relative;
    line-height: 1;
    width: auto;
    color: white;
    display: inline-block;
}

.pink + .pink_label::before {
    content: "";
    display: inline-block;
    width: 0.18rem;
    height: 0.18rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-bottom: .03rem;
}

.pink {
    opacity: 0;
    position: absolute;
    clip: rect(0, 0, 0, 0);
}

.pink:checked + .pink_label::before {
    border-color: rgb(254, 162, 162);
    background-image: -webkit-linear-gradient(
        180deg,
        rgb(254, 162, 162) 0%,
        rgb(255, 187, 187) 100%
    );
}

.pink:checked + .pink_label::after {
    content: "";
    position: absolute;
    width: 0.06rem;
    height: 0.11rem;
    border: 1px solid;
    border-left: none;
    border-top: none;
    left: 55%;
    top: 50%;
    transform-origin: center;
    transform: translate(-55%, -60%) rotate(43deg);
    margin-bottom: .03rem;
}


.circle{
    display: none;
    font-size: 0;
}
.circle_label{
    position: relative;
    line-height: 1;
    width: auto;
    color: white;
    display: inline-block;   
    font-size: 0;
}
.circle + .circle_label::before {
    content: '';
    display: inline-block;
    width: .18rem;
    height: .18rem;
    border-radius: 50%;
    background: #f5f5f5;
    margin-bottom: .03rem;
}
.circle:checked + .circle_label::after {
    content: '';
    position: absolute;
    background-color: #f66979;
    width: .18rem;
    height: .18rem;
    left: 0;
    top: 0;
    transform: scale(.5);
    border-radius: 50%;
}

</style>

<template>
  <div :class="$style.container">
    <input
      :class="$style[checked_style]"
      type="radio"
      :value="value"
      :id="id"
      :name="name"
      v-model="checked"
    />
    <label :class="$style[checked_style + '_label']" :for="id"></label>
  </div>
</template>

<script>
export default {
    data() {
        return {
            id: Math.random().toString(16),
        }
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        model: {
            type: String,
            default: '',
        }, 
        checked_style: {
            type: String,
            default: 'checkbox'
        },
    },
    computed: {
        checked: {
            get() {
                return this.model
            },
            set(val) {
                this.$emit('change', val)
                this.$emit('update:model', val)
            }
        }
    }
};
</script>