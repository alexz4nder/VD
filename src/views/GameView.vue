<template>
  <div>
    <!-- GAME -->
    <p class="col-md-12">{{ $t('gamesText[' + this.game.id + '].name') }}</p>
    <img :src="this.imageUrl" />
    <p v-if="this.game.discount !== undefined">
      {{ $t('gameComponent.price') }}
      <s>{{ this.game.price.toString() }}</s>
      {{ this.game.price * (1 - this.game.discount / 100) }}
      <br />
      {{ $t('gameComponent.discount') + ' ' + this.game.discount.toString() + '%' }}
    </p>
    <p v-else>
      {{ $t('gameComponent.price') + ' ' + this.game.price }}
    </p>
    <button @click="addToCart">{{ $t('gameComponent.addToCart') }}</button>
    <p>{{ $t(this.addToCartMsg) }}</p>
    <!-- RATING -->
    <p>
      {{ $t('gameComponent.rating') + ' ' + (this.ratingSum / this.numberOfRatings).toString() }}
    </p>

    <div v-if="this.$root.$data.currentUser != null">
      <p>{{ $t('gameComponent.yourRating') }}</p>
      1
      <input type="radio" name="rating" id="rating1" :value="1" v-model.number="this.myRating" />
      <input type="radio" name="rating" id="rating2" :value="2" v-model.number="this.myRating" />
      <input type="radio" name="rating" id="rating3" :value="3" v-model.number="this.myRating" />
      <input type="radio" name="rating" id="rating4" :value="4" v-model.number="this.myRating" />
      <input type="radio" name="rating" id="rating5" :value="5" v-model.number="this.myRating" />
      5
      <br />
      <button @click="submitRating">{{ $t('gameComponent.submitRating') }}</button>
      <p>{{ $t(notLoggedInRating) + $t(ratingNotSelected) }}</p>
    </div>

    <!-- COMMENT SECTION-->
    <h4>{{ $t('gameComponent.comments') }}</h4>
    <div v-for="comm in this.comments">
      <h5>{{ comm.username }}</h5>
      <p>{{ comm.comment }}</p>
    </div>
    <!-- LEAVE COMMENT-->
    <p>{{ $t('gameComponent.leaveComment') }}</p>
    <textarea name="" id="" cols="50" rows="7" v-model="commentText"></textarea>
    <br />
    <button @click="submitComment">{{ $t('gameComponent.submitComment') }}</button>
    <p>{{ $t(this.notLoggedInComment) }}</p>
  </div>
</template>

<script>
import { allGames } from '@/data/gameList'
import { startComments } from '@/data/comments'
import { startRatings } from '@/data/ratings'
export default {
  name: 'GameView',
  data() {
    return {
      game: allGames[this.$route.params.gameId],
      comments: [],
      commentText: '',
      notLoggedInComment: 'emptystr',
      notLoggedInRating: 'emptystr',
      ratingNotSelected: 'emptystr',
      addToCartMsg: 'emptystr',
      ratingSum: 0.0,
      numberOfRatings: 0,
      myRating: null,
      imageUrl:
        allGames[this.$route.params.gameId].imgUrl !== undefined
          ? allGames[this.$route.params.gameId].imgUrl
          : 'falislika.png',
    }
  },
  created() {
    let commentsText = localStorage.getItem('comments')
    if (commentsText == null) {
      for (let i = 0; i < startComments.length; i++) {
        if (startComments[i].gameId == parseInt(this.$route.params.gameId)) {
          this.comments.push(startComments[i])
        }
      }
      localStorage.setItem('comments', JSON.stringify(startComments))
    } else {
      let allComments = JSON.parse(commentsText)
      for (let i = 0; i < allComments.length; i++) {
        if (allComments[i].gameId == parseInt(this.$route.params.gameId)) {
          this.comments.push(allComments[i])
        }
      }
    }

    let ratingsText = localStorage.getItem('ratings')
    if (ratingsText == null) {
      localStorage.setItem('ratings', JSON.stringify(startRatings))
      ratingsText = localStorage.getItem('ratings')
    }

    let allRatings = JSON.parse(ratingsText)
    for (let i = 0; i < allRatings.length; i++) {
      if (allRatings[i].gameId == this.$route.params.gameId) {
        this.numberOfRatings += 1
        this.ratingSum += allRatings[i].rating
        if (this.$root.$data.currentUser != null) {
          if (this.$root.$data.currentUser.username == allRatings[i].username) {
            this.myRating = allRatings[i].rating
            console.log('FUND RATING', this.myRating)
          }
        }
      }
    }

    let breadCrumbCategory
    switch (allGames[this.$route.params.gameId].category) {
      case 'strategy':
        breadCrumbCategory = 'breadcrumb.catalogStrat'
        break
      case 'family':
        breadCrumbCategory = 'breadcrumb.catalogFamily'
        break
      case 'funny':
        breadCrumbCategory = 'breadcrumb.catalogFunny'
        break
    }
    this.$root.setBreadCrumb([
      'breadcrumb.homepage',
      'breadcrumb.catalog',
      breadCrumbCategory,
      this.$t('gamesText[' + this.game.id + '].name'),
    ])
  },
  methods: {
    addToCart() {
      let cart = []
      let cartText = localStorage.getItem('cart')
      if (cartText != null) {
        cart = JSON.parse(cartText)
      }

      this.addToCartMsg = 'gameComponent.addedToCart'
      for (let i = 0; i < cart.length; i++) {
        console.log(this.$route.params.gameId)
        if (cart[i].id == parseInt(this.$route.params.gameId)) {
          cart[i].amount += 1
          localStorage.setItem('cart', JSON.stringify(cart))

          return
        }
      }

      cart.push({ amount: 1, id: parseInt(this.$route.params.gameId) })
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    submitComment() {
      if (this.commentText == '') {
        return
      }
      let currentUser = this.$root.$data.currentUser
      if (currentUser == null) {
        this.notLoggedIn = 'gameComponent.notLoggedIn'
        return
      }

      let newComment = {
        gameId: parseInt(this.$route.params.gameId),
        username: currentUser.username,
        comment: this.commentText,
      }

      let allComments = JSON.parse(localStorage.getItem('comments'))
      allComments.push(newComment)
      localStorage.setItem('comments', JSON.stringify(allComments))
      this.comments.push(newComment)
      this.commentText = ''
    },
    submitRating() {
      if (this.myRating == null) {
        this.ratingNotSelected = 'gameComponent.ratingNotSelected'
        return
      }
      if (this.$root.$data.currentUser == null) {
        this.notLoggedInRating = 'gameComponent.notLoggedIn'
        return
      }

      this.ratingNotSelected = ''

      this.ratingSum = 0.0
      this.numberOfRatings = 0
      let ratingsText = localStorage.getItem('ratings')
      let allRatings = JSON.parse(ratingsText)
      let found = false
      for (let i = 0; i < allRatings.length; i++) {
        if (allRatings[i].gameId == this.$route.params.gameId) {
          if (this.$root.$data.currentUser.username == allRatings[i].username) {
            allRatings[i].rating = this.myRating
            found = true
          }

          this.numberOfRatings += 1
          this.ratingSum += allRatings[i].rating
        }
      }

      if (found == false) {
        allRatings.push({
          username: this.$root.$data.currentUser.username,
          gameId: this.$route.params.gameId,
          rating: this.myRating,
        })
        this.numberOfRatings += 1
        this.ratingSum += this.myRating
      }
    },
  },
}
</script>
