<template>
    <div class="row">
        <div class="col-3 bg">
            <i class="fas fa-burn"></i>
            <i class="fas fa-bolt"></i>
            <i class="fas fa-tint"></i>
        </div>
        <div class="col">TEST</div>
        <div class="col-12">

        </div>
    </div>
</template>

<script>
  // @ is an alias to /src
  import Chart from 'chart.js'

  export default {
    name: 'home',
    components: {
    },
    mounted() {
      let myLineChart = new Chart(ctx, {
        type: 'line',
        data: [1,2,3,4,5,6,7]
      });
    }
  }
</script>

<style scoped>

    .bg {
        background: #dfdfdf;
    }
</style>