<template>
  <div class="container">
    <main-header></main-header>
    <router-view/>
  </div>
</template>

<script>

  import mainHeader from '@/components/Header'

  export default {
    name: "App",
    components: {
      mainHeader
    }
  }
</script>