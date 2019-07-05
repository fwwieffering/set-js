<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="360" width="235">
    <defs>
        <pattern id="hatch-green" width="5" height="3" patternUnits="userSpaceOnUse">
            <line class="green" x1="0" y1="0" x2="0" y2="10" stroke-width="2"></line>
        </pattern>
        <pattern id="hatch-red" width="5" height="3" patternUnits="userSpaceOnUse">
            <line class="red" x1="0" y1="0" x2="0" y2="10" stroke-width="2"></line>
        </pattern>
        <pattern id="hatch-purple" width="5" height="3" patternUnits="userSpaceOnUse">
            <line class="purple" x1="0" y1="0" x2="0" y2="10" stroke-width="2"></line>
        </pattern>
        <rect class="common" id="pill" x="30" y="145" width="175" height="70" rx="35"></rect>
        <polygon class="common" id="diamond" points="30,180 117,145 205,180 117,215"></polygon>
        <path class="common" id="squiggle" d="m 33,180 c 6,-13 11,-23 26,-28 15,-5 31,-1 58,7 23,7 36,0 43,-3 7,-4 17,-9 30,-9 13,0 18,21 12,33 -5,11 -14,23 -26,28 -12,5 -32,1 -59,-7 -17,-5 -29,-3 -42,3 -9,4 -18,10 -30,9 -13,0 -19,-18 -12,-33 z"></path>
    </defs>
    <rect x="5" y="5" height="350" width="225" rx="10" ry="10" fill="white" stroke="grey" stroke-width="2"></rect>

    <!-- single -->
    <use
        v-if="count === 1"
        v-bind:href="'#' + shape"
        v-bind:class="classes">
    </use>
    <!-- double -->
    <use
        y="-50"
        v-if="count === 2"
        v-bind:href="'#' + shape"
        v-bind:class="classes">
    ></use>
    <use
        y="50"
        v-if="count === 2"
        v-bind:href="'#' + shape"
        v-bind:class="classes">
    ></use>
    <!-- triple -->
    <use
        v-if="count === 3"
        y="-100"
        v-bind:href="'#' + shape"
        v-bind:class="classes">
    ></use>
    <use
        v-if="count === 3"
        v-bind:href="'#' + shape"
        v-bind:class="classes">
    ></use>
    <use
        v-if="count === 3"
        y="100"
        v-bind:href="'#' + shape"
        v-bind:class="classes">
    ></use>
    </svg>
</template>

<script>
export default {
    name: 'Card',
    props: {
        color: {
            type: String,
            required: true,
            validator: function(value) {
                // must be one of the following strings
                return ['purple', 'red', 'green'].indexOf(value) !== -1
            }
        },
        shape: {
            type: String,
            required: true,
            validator: function(value) {
                // must be one of the following strings
                return ['pill', 'diamond', 'squiggle'].indexOf(value) !== -1
            }
        },
        fill: {
            type: String,
            required: true,
            validator: function(value) {
                // must be one of the following strings
                return ['hatch', 'none', 'solid'].indexOf(value) !== -1
            }
        },
        count: {
            type: Number,
            required: true,
            validator: function(value) {
                // must be between 1 and 3
                return value >= 1 && value <= 3
            }
        }
    },
    computed: {
        classes: function() {
            var fill = this.fill === 'none' ? 'none' : `${this.fill}-${this.color}`
            return `${this.color} ${fill}`
        },
    }
}
</script>


<style>
.common {
    stroke-width: 4;
    stroke-linejoin: round;
}
.hatch-green {
    fill: url(#hatch-green);
}
.hatch-red {
    fill: url(#hatch-red);
}
.hatch-purple {
    fill: url(#hatch-purple)
}
.none {
    fill: none;
}
.green {
    stroke: green;
}
.red {
    stroke: red
}
.purple {
    stroke: purple
}
.solid-green {
    fill: green;
}
.solid-purple {
    fill: purple;
}
.solid-red {
    fill: red;
}
</style>
