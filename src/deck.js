const PURPLE = {color: 'purple'}
const GREEN = {color: 'green'}
const RED = {color:'red'}

const FILL_NONE = {fill: 'none'}
const FILL_SOLID = {fill: 'solid'}
const FILL_HATCH = {fill: 'hatch'}

const ONE = {count: 1}
const TWO = {count: 2}
const THREE = {count: 3}

const PILL = {shape: 'pill'}
const DIAMOND = {shape: 'diamond'}
const SQUIGGLE = {shape: 'squiggle'}

// this is the actual set of card attributes in a Set game.
const CARDS = [
  {...THREE, ...PURPLE, ...FILL_SOLID, ...SQUIGGLE},
  {...ONE, ...GREEN, ...FILL_NONE, ...PILL},
  {...ONE, ...GREEN, ...FILL_SOLID, ...SQUIGGLE},
  {...THREE, ...PURPLE, ...FILL_HATCH, ...PILL},
  {...ONE, ...PURPLE, ...FILL_NONE, ...DIAMOND},
  {...ONE, ...RED, ...FILL_SOLID, ...PILL},
  {...THREE, ...PURPLE, ...FILL_NONE, ...DIAMOND},
  {...THREE, ...RED, ...FILL_HATCH, ...PILL},
  {...ONE, ...GREEN, ...FILL_HATCH, ...PILL},
  {...ONE, ...GREEN, ...FILL_NONE, ...SQUIGGLE},
  {...ONE, ...PURPLE, ...FILL_NONE, ...SQUIGGLE},
  {...ONE, ...GREEN, ...FILL_SOLID, ...PILL},
  {...THREE, ...GREEN, ...FILL_HATCH, ...SQUIGGLE},
  {...TWO, ...GREEN, ...FILL_SOLID, ...PILL},
  {...TWO, ...RED, ...FILL_HATCH, ...SQUIGGLE},
  {...TWO, ...GREEN, ...FILL_HATCH, ...SQUIGGLE},
  {...TWO, ...RED, ...FILL_HATCH, ...DIAMOND},
  {...TWO, ...RED, ...FILL_SOLID, ...PILL},
  {...TWO, ...PURPLE, ...FILL_HATCH, ...PILL},
  {...TWO, ...RED, ...FILL_NONE, ...SQUIGGLE},
  {...ONE, ...RED, ...FILL_NONE, ...PILL},
  {...TWO, ...PURPLE, ...FILL_SOLID, ...SQUIGGLE},
  {...THREE, ...RED, ...FILL_NONE, ...PILL},
  {...TWO, ...RED, ...FILL_SOLID, ...DIAMOND},
  {...TWO, ...PURPLE, ...FILL_HATCH, ...DIAMOND},
  {...THREE, ...GREEN, ...FILL_HATCH, ...PILL},
  {...THREE, ...PURPLE, ...FILL_NONE, ...SQUIGGLE},
  {...ONE, ...RED, ...FILL_HATCH, ...DIAMOND},
  {...THREE, ...GREEN, ...FILL_SOLID, ...DIAMOND},
  {...THREE, ...RED, ...FILL_SOLID, ...PILL},
  {...ONE, ...PURPLE, ...FILL_SOLID, ...SQUIGGLE},
  {...ONE, ...RED, ...FILL_SOLID, ...DIAMOND},
  {...ONE, ...PURPLE, ...FILL_SOLID, ...PILL},
  {...THREE, ...RED, ...FILL_HATCH, ...SQUIGGLE},
  {...TWO, ...GREEN, ...FILL_NONE, ...DIAMOND},
  {...ONE, ...RED, ...FILL_HATCH, ...PILL},
  {...ONE, ...PURPLE, ...FILL_HATCH, ...DIAMOND},
  {...ONE, ...RED, ...FILL_HATCH, ...SQUIGGLE},
  {...THREE, ...RED, ...FILL_SOLID, ...DIAMOND},
  {...TWO, ...RED, ...FILL_NONE, ...DIAMOND},
  {...THREE, ...PURPLE, ...FILL_NONE, ...PILL},
  {...ONE, ...RED, ...FILL_NONE, ...SQUIGGLE},
  {...THREE, ...RED, ...FILL_NONE, ...DIAMOND},
  {...THREE, ...GREEN, ...FILL_NONE, ...DIAMOND},
  {...THREE, ...PURPLE, ...FILL_HATCH, ...SQUIGGLE},
  {...TWO, ...RED, ...FILL_SOLID, ...SQUIGGLE},
  {...THREE, ...GREEN, ...FILL_SOLID, ...SQUIGGLE},
  {...TWO, ...GREEN, ...FILL_NONE, ...PILL},
  {...THREE, ...GREEN, ...FILL_SOLID, ...PILL},
  {...ONE, ...GREEN, ...FILL_SOLID, ...DIAMOND},
  {...TWO, ...GREEN, ...FILL_SOLID, ...SQUIGGLE},
  {...ONE, ...PURPLE, ...FILL_SOLID, ...DIAMOND},
  {...THREE, ...PURPLE, ...FILL_HATCH, ...DIAMOND},
  {...TWO, ...PURPLE, ...FILL_NONE, ...DIAMOND},
  {...ONE, ...RED, ...FILL_SOLID, ...SQUIGGLE},
  {...ONE, ...GREEN, ...FILL_NONE, ...DIAMOND},
  {...ONE, ...PURPLE, ...FILL_HATCH, ...PILL},
  {...TWO, ...GREEN, ...FILL_HATCH, ...DIAMOND},
  {...ONE, ...RED, ...FILL_NONE, ...DIAMOND},
  {...THREE, ...PURPLE, ...FILL_SOLID, ...DIAMOND},
  {...TWO, ...RED, ...FILL_NONE, ...PILL},
  {...THREE, ...GREEN, ...FILL_NONE, ...PILL},
  {...ONE, ...PURPLE, ...FILL_NONE, ...PILL},
  {...TWO, ...PURPLE, ...FILL_SOLID, ...PILL},
  {...THREE, ...RED, ...FILL_NONE, ...SQUIGGLE},
  {...ONE, ...GREEN, ...FILL_HATCH, ...DIAMOND},
  {...THREE, ...GREEN, ...FILL_NONE, ...SQUIGGLE},
  {...THREE, ...RED, ...FILL_HATCH, ...DIAMOND},
  {...THREE, ...PURPLE, ...FILL_SOLID, ...PILL},
  {...TWO, ...GREEN, ...FILL_SOLID, ...DIAMOND},
  {...TWO, ...GREEN, ...FILL_NONE, ...SQUIGGLE},
  {...TWO, ...GREEN, ...FILL_HATCH, ...PILL},
  {...TWO, ...PURPLE, ...FILL_NONE, ...SQUIGGLE},
  {...ONE, ...GREEN, ...FILL_HATCH, ...SQUIGGLE},
  {...THREE, ...RED, ...FILL_SOLID, ...SQUIGGLE},
  {...THREE, ...GREEN, ...FILL_HATCH, ...DIAMOND},
  {...TWO, ...RED, ...FILL_HATCH, ...PILL},
  {...ONE, ...PURPLE, ...FILL_HATCH, ...SQUIGGLE},
  {...TWO, ...PURPLE, ...FILL_SOLID, ...DIAMOND},
  {...TWO, ...PURPLE, ...FILL_NONE, ...PILL},
  {...TWO, ...PURPLE, ...FILL_HATCH, ...SQUIGGLE}
]

import {knuthShuffle} from 'knuth-shuffle'

export default class Deck {
  constructor() {
    this.cards = knuthShuffle(CARDS)
  }

  deal(count) {
    return this.cards.splice(-count)
  }

  empty() {
    return this.cards.length === 0
  }
}