<template>
  <div class="container">
    <main-header v-if="token"></main-header>
    <router-view/>
  </div>
</template>

<script>

  import mainHeader from '@/components/Header'
  import store from '@/store'
  import firebase from 'firebase'
  import router from '@/router'

  export default {
    name: "App",
    data() {
      return {

      }
    },
    components: {
      mainHeader
    },
    mounted() {
      firebase.auth().onAuthStateChanged(function (user) {

      if (user) {

        store.dispatch("setToken", true);

      } else {
        router.push("/login")
      }
    });
    },
    computed: {
      token() {
        return store.getters.getToken;
      }
    }
  }
</script>