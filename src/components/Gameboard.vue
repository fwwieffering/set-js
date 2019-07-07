<template>
    <div class="game-container">
        <div class="game-board">
            <Grid v-on:message="processMessage" v-on:gameover="endGame" />
            <div class="game-controls">
                <div class="game-title">
                    <h1>Set</h1>
                </div>
                <div class="game-messages">
                    <h2 v-if="gameOver" style="margin: 0px; line-height: 50px;">thats the game!</h2>
                    <h2 v-else style="margin: 0px; line-height: 50px;">{{ message }}</h2>
                </div>
            </div>
        </div>
        <div v-if="gameOver" class="game-stats">
            <h1>Found Sets</h1>
            <div v-for="(row, index) in foundSets" v-bind:key="`found-row-${index}`" class="game-row">
                <Card
                    class="game-card"
                    v-for="(card, cindex) in row"
                    v-bind:key="`found-${index}-${cindex}`"
                    :count="card.count"
                    :color="card.color"
                    :fill="card.fill"
                    :shape="card.shape"
                    />
            </div>
            <h1>Missed Sets</h1>
            <div v-for="(row, index) in missedSets" v-bind:key="`missed-row-${index}`" class="game-row">
                <Card
                    class="game-card"
                    v-for="(card, cindex) in row"
                    v-bind:key="`missed-${index}-${cindex}`"
                    :count="card.count"
                    :color="card.color"
                    :fill="card.fill"
                    :shape="card.shape"
                    />
            </div>
        </div>
    </div>
</template>

<script>
import Grid from './Grid'
import Card from './Card'

export default {
    name: 'Gameboard',
    data: function() {
        return {
            message: null,
            gameOver: false,
            foundSets: [],
            missedSets: []
        }
    },
    components: {
        Grid,
        Card
    },
    methods: {
        // processMessage sets the data property message.
        processMessage: function(message) {
            this.message = message
            // fade away message after a bit
            window.setTimeout(this.removeMessage, 3000)
        },
        removeMessage: function() {
            this.message = null
        },
        endGame: function (event) {
            this.gameOver = true
            this.foundSets = event.foundSets
            this.missedSets = event.missedSets
        }
    }
}
</script>

<style>
.game-container {
    display: flex;
    flex-direction: column
}
.game-board {
    display: flex;
    flex-direction: row;
}
.game-controls {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.game-stats {
    width: 80%;
    flex-direction: column;
    display: flex;
}
.game-messages {
    width: 80%;
    background: lightgray;
    height: 50px;
    text-align: center;
}
</style>

