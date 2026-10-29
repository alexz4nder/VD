<template>
  <div>
    <div class="row">
      <h3 class="col-sm-12" id="bestGames">{{ $t('homepage.bestGames') }}</h3>
      <GameComponent
        v-for="n in 3"
        :gameId="bestGames[n - 1].id"
        :minimized="false"
        :key="bestGames[n - 1].id"
      ></GameComponent>
    </div>
    <hr />
    <div class="row">
      <h3 class="col-sm-12" id="discountedGames">{{ $t('homepage.discountedGames') }}</h3>
      <GameComponent
        v-for="game in this.discountedGames"
        :gameId="game.id"
        :minimized="false"
        :key="game.id"
      ></GameComponent>
    </div>

    <hr />

    <h3 class="tournaments">
      {{ $t('homepage.tournaments') }}
    </h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. A iste consequatur dicta et ratione
      quos perferendis quaerat, cum, magnam soluta minus corporis quod esse tempore quia aliquid
      iusto debitis voluptatem ullam sequi rem animi itaque. Consequuntur iusto aut eum numquam
      doloremque quae corporis cumque, exercitationem quasi maxime, quam nulla pariatur. Aliquam
      soluta excepturi itaque ipsa.
    </p>
  </div>
</template>

<script>
import GameComponent from '@/components/GameComponent.vue'
import { allGames } from '@/data/gameList'
import { startRatings } from '@/data/ratings'

export default {
  name: 'HomePageComponent',
  components: { GameComponent: GameComponent },
  data() {
    return {
      bestGames: [],
      discountedGames: [],
    }
  },
  created() {
    //this.$root.setBreadCrumb(['breadcrumb.homepage'])
    this.$root.setBreadCrumb([''])

    for (let i = 0; i < allGames.length; i++) {
      this.bestGames.push(allGames[i])
    }

    let ratingsText = localStorage.getItem('ratings')
    if (ratingsText == null) {
      ratingsText = JSON.stringify(startRatings)
      localStorage.setItem('ratings', ratingsText)
    }
    let ratings = JSON.parse(ratingsText)
    for (let i = 0; i < this.bestGames.length; i++) {
      this.bestGames[i].numOfRatings = 0
      this.bestGames[i].ratingSum = 0.0
    }

    for (let i = 0; i < ratings.length; i++) {
      let rating = ratings[i]
      this.bestGames[rating.gameId].numOfRatings += 1
      this.bestGames[rating.gameId].ratingSum += rating.rating
    }

    this.bestGames.sort(function (a, b) {
      if (a.numOfRatings == 0 && b.numOfRatings == 0) {
        return 0
      }
      if (a.numOfRatings == 0) {
        return 1
      }
      if (b.numOfRatings == 0) {
        return -1
      }

      return -a.ratingSum / a.numOfRatings + b.ratingSum / b.numOfRatings
    })

    //Discounted games
    for (let i = 0; i < allGames.length; i++) {
      if (allGames[i].discount !== undefined) {
        this.discountedGames.push(allGames[i])
      }
    }
  },
}
</script>

<style scoped>
#bestGames {
  text-align: center;
}
#discountedGames {
  text-align: center;
}
.tournaments {
  text-align: center;
}
</style>
