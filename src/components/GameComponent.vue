<template>
  <div class="col-sm-12 col-md-3 bigComp" v-if="this.minimized == false">
    <RouterLink :to="'/catalog/game/' + this.gameId">
      <p class="underline productName">{{ $t('gamesText[' + this.gameId + '].name') }}</p>
    </RouterLink>
    <br />
    <RouterLink :to="'/catalog/game/' + this.gameId">
      <img :src="this.imageUrl" />
    </RouterLink>
    <p v-if="this.game.discount !== undefined" class="underline">
      {{ $t('gameComponent.price') }}
      <s>{{ this.game.price.toString() }}</s>
      {{ this.game.price * (1 - this.game.discount / 100) }}
      <br />
      {{ $t('gameComponent.discount') + ' ' + this.game.discount.toString() + '%' }}
    </p>
    <p v-else class="underline">
      {{ $t('gameComponent.price') + ':' + this.game.price }}
    </p>
    <p class="underline">
      {{
        $t('gameComponent.rating') +
        (this.numberOfRatings == 0
          ? 'Nema ocena'
          : (this.ratingSum / this.numberOfRatings).toString())
      }}
    </p>
  </div>
  <div v-else>
    <p>
      {{ $t('gamesText[' + this.gameId + '].name') }}
      {{ $t('gameComponent.price') + ':' + this.game.price }}
    </p>
  </div>
</template>

<script>
import { allGames } from '@/data/gameList'
import { startRatings } from '@/data/ratings'
export default {
  name: 'GameComponent',
  props: {
    gameId: Number,
    minimized: Boolean,
  },
  data() {
    return {
      game: allGames[this.gameId],
      ratingSum: 0.0,
      numberOfRatings: 0,
      imageUrl:
        allGames[this.gameId].imgUrl !== undefined ? allGames[this.gameId].imgUrl : 'falislika.png',
    }
  },
  created() {
    let ratingsText = localStorage.getItem('ratings')
    if (ratingsText == null) {
      ratingsText = JSON.stringify(startRatings)
      localStorage.setItem('ratings', ratingsText)
    }
    let ratings = JSON.parse(ratingsText)
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].gameId == this.gameId) {
        this.ratingSum += ratings[i].rating
        this.numberOfRatings += 1
      }
    }
  },
}
</script>

<style scoped>
a {
  color: black;
  text-decoration-line: none;
}

img {
  max-height: 30vh;
  max-width: 90%;
  border-color: black;
  border-width: 2px;
  border-style: solid;
  border-radius: 10%;
}
.bigComp:hover img {
  max-height: 30vh;
  max-width: 94%;
  border-color: black;
  border-width: 3px;
  border-style: solid;
  border-radius: 10%;
}
.bigComp:hover .productName {
  font-weight: bold;
}

.bigComp {
  padding: 3%;
  margin: 4%;
  box-shadow: 4px 4px 3px rgb(36, 36, 36);
  background-color: rgb(231, 231, 231);
}
.bigComp:hover {
  box-shadow: 5px 5px 3px black;
}

.underline {
  border-bottom-color: black;
  border-bottom-width: 2px;
  border-bottom-style: solid;
}
</style>
