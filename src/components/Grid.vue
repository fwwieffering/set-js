<template>
    <div class="game-border">
            <div v-for="(row, index) in rows" v-bind:key="index" class="game-row">
                <Card
                    class="game-card"
                    v-for="cardnum in row"
                    v-bind:key="cardnum"
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

export default {
    name: 'Grid',
    components: {
        Card
    },
    data: function() {
        return {
            deck: new deck(), // probably shouldn't do this here but for now its ok
            cardsInPlay: [],
            selectedCards: {},
            foundSets: []
        }
    },
    beforeMount() {
        if (this.cardsInPlay.length == 0) { // deal out starting cards
            this.cardsInPlay = this.deck.deal(12-this.cardsInPlay.length)
        }
    },
    computed: {
        rows: function() {
            var rows = []
            var numRows = this.cardsInPlay.length / 3
            for (var r = 0; r <numRows; r++) {
                rows.push([ r*3, r*3 +1, r*3 +2])
            }
            return rows
        }
        // TODO:
        // finds all the sets on the board so we can know when
        // - a set is found
        // - when a set is found, which sets are not chosen
        // extantSets: function() {

        // }
    },
    methods: {
        // onclick handler for cards
        toggleSelected(index, card) {
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
        // processSet takes the cards in selectedCards and
        // - removes them from cardsInPlay
        // - adds them to the foundSets
        processSet() {
            this.foundSets = [Object.values(this.selectedCards), ...this.foundSets]
            var newCards = [ ...this.cardsInPlay ]
            for (var index in this.selectedCards) {
                newCards[index] = this.deck.deal(1)[0]
            }
            this.cardsInPlay = newCards
            this.selectedCards = {}
        }
    },
    watch: {
        selectedCards: function(val) {
            if (Object.keys(val).length === 3) {
                if (this.checkSet(...Object.values(val))) {
                    this.$emit('message', 'Found set!')
                    this.processSet()
                } else {
                    this.$emit('message', 'Not a set')
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
    width: 80%;
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
</style>
