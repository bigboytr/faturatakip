<template>
    <div class="row" v-if="token">

        <div class="col-4">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <h4>
                            <i class="fas fa-filter"></i> Filtre
                        </h4>
                        <small>Yıl değiştirildiğinde grafik yeniden çizilir.</small>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-7">
                                <select class="form-control float-right" v-model="year">
                                    <option v-for="y in years" :value="y">{{y}}</option>
                                </select>
                            </div>
                            <div class="col-5">
                                <button class="btn btn-primary" @click="createGraph()">
                                    Göster
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-8" >
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <h4>
                            <i class="fas fa-filter"></i> {{createForm}}
                        </h4>
                        <small>Seçilen kategori için veri kaydedin</small>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-3">
                                <select class="form-control float-right" v-model="dto.y">
                                    <option v-for="y in years" :value="y">{{y}}</option>
                                </select>
                            </div>
                            <div class="col-3">
                                <select class="form-control float-right" v-model="dto.m">
                                    <option v-for="(m, i) in months" :value="i">{{m}}</option>
                                </select>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="dto.val">
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <button class="btn btn-primary" @click="createDataset()">
                                        <i class="fas fa-check"></i>
                                        DataSet
                                    </button>
                                    <button class="btn btn-primary" @click="saveData()">
                                        <i class="fas fa-check"></i>
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 margin-t-20">
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<script>
  // @ is an alias to /src
  import Chart from 'chart.js'
  import firebase from 'firebase'
  import store from '@/store'
  import router from '@/router'

  const d = new Date();


  export default {
    name: 'home',
    data() {
      return {
        color1: "#F8F991",
        color2: "#9AB87A",
        color3: "#708B75",
        color4: "#444B6E",
        years: [2015, 2016, 2017, 2018, 2019],
        months: {
          0: "Ocak",
          1: "Şubat",
          2: "Mart",
          3: "Nisan",
          4: "Mayıs",
          5: "Haziran",
          6: "Temmuz",
          7: "Ağustos",
          8: "Eylül",
          9: "Ekim",
          10: "Kasım",
          11: "Aralık"
        },
        year: 2017,
        elektrik: [],
        su: [],
        dogalgaz: [],
        internet: [],
        dto: {
          ref: null,
          y: d.getFullYear(),
          m: d.getMonth(),
          val: 0
        }
      }
    },
    mounted() {
      this.createGraph();
    },
    methods: {
      createGraph() {
        const db = firebase.database();
        const elektrik = db.ref("faturalar/Elektrik");
        const su = db.ref("faturalar/Su");
        const dogalgaz = db.ref("faturalar/Doğalgaz");
        const internet = db.ref("faturalar/İnternet");

        const self = this;
        elektrik.on("value", function (snapshot) {
          self.elektrik = snapshot.val();
        });

        su.on("value", function (snapshot) {
          self.su = snapshot.val();
        });

        dogalgaz.on("value", function (snapshot) {
          self.dogalgaz = snapshot.val();
        });

        internet.on("value", function (snapshot) {
          self.internet = snapshot.val();
        });


        let ctx = document.getElementById('canvas').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
            datasets: [{
              label: 'Elektrik',
              backgroundColor: self.color1,
              data: this.elektrik[this.year]
            }, {
              label: 'Su',
              backgroundColor: self.color2,
              data: this.su[this.year]
            }, {
              label: 'Doğalgaz',
              backgroundColor: self.color3,
              data: this.dogalgaz[this.year]
            }, {
              label: 'İnternet',
              backgroundColor: self.color4,
              data: this.su[this.year]
            }]
          },
          options: {
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true
              }]
            }
          }
        });
      },
      createDataset() {

        const db = firebase.database();

        let updates = {};

        Object.keys(this.months).map((key) => {

          updates['/faturalar/' + this.dto.ref + "/" + this.dto.y + "/" + key] = 0;

          db.ref().update(updates);

        });



      },
      saveData() {

        const db = firebase.database();

        let updates = {};
        updates['/faturalar/' + this.dto.ref + "/" + this.dto.y + "/" + this.dto.m] = parseFloat(this.dto.val).toFixed(2);

        db.ref().update(updates).then(() => {
          this.createGraph();
        });

        /*switch (this.dto.ref) {

          case "Elektrik": {

          } break;
        }*/
      }
    },
    computed: {
      token() {
        return store.getters.getToken
      },
      createForm() {
        this.dto.ref = store.getters.getCreateForm;
        return store.getters.getCreateForm;
      }
    }
  }
</script>
