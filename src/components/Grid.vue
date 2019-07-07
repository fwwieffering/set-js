<template>
    <div class="game-border">
            <div v-for="(row, index) in rows" v-bind:key="index" class="game-row">
                <Card
                    class="game-card"
                    v-for="cardnum in row"
                    v-bind:key="cardnum"
                    v-bind:class="{activeCard: !disabled}"
                    v-on:click="toggleSelected(cardnum, cardsInPlay[cardnum])"
                    :count="cardsInPlay[cardnum].count"
                    :color="cardsInPlay[cardnum].color"
                    :fill="cardsInPlay[cardnum].fill"
                    :shape="cardsInPlay[cardnum].shape"
                    :selected="selectedCards[cardnum] !== undefined"/>
            </div>
    </div>
</template>

<script>
import deck from '../deck'
import Card from './Card'
import combinatorics from 'js-combinatorics'

// Grid is the game board. Emits the following events:
// message: communication
// gameover: the game is over
export default {
    name: 'Grid',
    components: {
        Card
    },
    data: function() {
        return {
            deck: null,
            cardsInPlay: [],
            selectedCards: {},
            foundSets: [],
            missedSets: [],
            outOfCards: false,
            disabled: false
        }
    },
    beforeMount() {
        if (this.deck === null) {
            this.deck = new deck()
        }
        if (this.cardsInPlay.length == 0) { // deal out starting cards
            this.cardsInPlay = this.deck.deal(12-this.cardsInPlay.length)
        }
    },
    computed: {
        // generates array of arrays for card grid
        rows: function() {
            var rows = []
            var numRows = 3
            var numCols = this.cardsInPlay.length / 3
            for (var r = 0; r <numRows; r++) {
                var row = []
                for (var i = 0; i < numCols; i++) {
                    row.push(r * numCols + i)
                }
                rows.push(row)
            }
            return rows
        },
        // extantSets finds all the sets on the board so we can know when
        // a set is found, which sets are not chosen
        extantSets: function() {
            var sets = []
            // var nonNull = this.cardsInPlay.filter(x => x != null)
            if (this.cardsInPlay.length > 0) {
                combinatorics.combination(this.cardsInPlay, 3).forEach(a => {
                    if (this.checkSet(...a)) {
                        sets.push(a)
                    }
                })
            }
            return sets
        }
    },
    methods: {
        // onclick handler for cards
        toggleSelected(index, card) {
            if (!this.disabled) {
                // delete if already selected
                if (this.selectedCards[index] !== undefined) {
                    var newSelected = {...this.selectedCards}
                    delete newSelected[index]
                    this.selectedCards = newSelected
                    return
                }
                // otherwise add
                if (Object.keys(this.selectedCards).length < 3 ) {
                    this.selectedCards = {[index]: card, ...this.selectedCards}
                }
            }
        },
        // check set returns a boolean for whether the three cards are indeed a set
        checkSet(card1, card2, card3) {
            var valid = true
            for (var prop of ['count', 'shape', 'color', 'fill']) {
                var isSame = (card1[prop] === card2[prop]) && (card1[prop] === card3[prop])
                var isDiff = (card1[prop] !== card2[prop]) && (card1[prop] !== card3[prop]) && (card2[prop] !== card3[prop])
                valid = isSame || isDiff
                if (!valid) {
                    return false
                }
            }
            return valid
        },
        // findMissedSets - helper function to determine if the selected set removed the possibility of other sets
        findMissedSets(foundSet, allSets) {
            return allSets.filter(x => {
                // count the matching items in the foundSet and set
                var matchingItems = foundSet.map(item => x.includes(item)).reduce((accum, curr) => curr ? accum + 1: accum, 0)
                // if there are 1 or 2 matching items the set is a) not equal b) cannot be chosen again
                return 0 < matchingItems && matchingItems < 3
            })
        },
        // processSet takes the cards in selectedCards and
        // - removes them from cardsInPlay
        // - adds them to the foundSets
        // - determines if any sets were missed
        processSet() {
            // collect stats on missed sets
            var missedSets = this.findMissedSets(Object.values(this.selectedCards), this.extantSets)
            this.missedSets = [ ...missedSets ,...this.missedSets]
            // collect stats on found sets
            this.foundSets = [Object.values(this.selectedCards), ...this.foundSets]
            // handle selected cards
            var newCards = [ ...this.cardsInPlay ]
            // deal out cards if there are still cards and we need more
            if (!this.outOfCards && this.cardsInPlay.length <= 12) {
                for (var index in this.selectedCards) {
                    newCards[index] = this.deck.deal(1)[0]
                }
            } else { // otherwise remove them
                newCards = newCards.filter((item, index) => {
                    return !this.selectedCards.hasOwnProperty(index)
                })
            }
            // set outOfCards if deck is empty
            this.outOfCards = this.deck.empty()

            this.cardsInPlay = newCards
            this.selectedCards = {}
        }
    },
    watch: {
        // selectedCards: checks whether an item is a set or not
        // emits event `message` with a string message
        selectedCards: function(val) {
            if (Object.keys(val).length === 3) {
                if (this.checkSet(...Object.values(val))) {
                    this.$emit('message', 'Found set!')
                    this.processSet()
                } else {
                    this.$emit('message', 'Not a set')
                }
            }
        },
        // extantSets watcher handles
        // - emitting game over event and disabling
        // - adding additional cards when there are no matching sets
        extantSets: function(val) {
            if (val.length === 0) {
                if (this.outOfCards) {
                    this.disabled = true
                    this.$emit('gameover', {foundSets: this.foundSets, missedSets: this.missedSets})
                } else {
                    this.cardsInPlay = this.cardsInPlay.concat(this.deck.deal(3))
                }
            }
        }
    }
}
</script>

<style>
.game-border {
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: black;
    width: 70%;
}
.game-row {
    display: flex;
    flex-direction: row;
    justify-content: left;
    padding-top: 5px;
    padding-bottom: 5px;
}
.game-card {
    padding-left: 5px;
    padding-right: 5px;
}
.activeCard {
    cursor: pointer;
}
</style>
