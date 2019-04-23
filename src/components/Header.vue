<template>
    <div class="row header margin-t-10">


        <div class="col-md-12 padding-10">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="navbar-brand">Fatura Takip</div>
                <button class="navbar-toggler" type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav order-md-last order-0">
                        <li class="nav-item">
                            <a href="javascript:void(0)" class="nav-link" @click="setForm('Doğalgaz')">
                                <i class="fas fa-burn"></i>
                                Doğalgaz
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" class="nav-link" @click="setForm('Elektrik')">
                                <i class="fas fa-bolt"></i>
                                Elektrik
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" class="nav-link" @click="setForm('Su')">
                                <i class="fas fa-tint"></i>
                                Su
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" class="nav-link" @click="setForm('İnternet')">
                                <i class="fas fa-globe"></i>
                                İnternet
                            </a>
                        </li>
                        <li v-if="token">
                            <a href="javascript:void(0)" class="nav-link text-danger" @click="logout()">
                                <i class="fas fa-times"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
  import firebase from 'firebase'
  import router from '@/router'
  import store from '@/store'

  export default {
    name: "MainHeader",
    methods: {
      logout() {

        firebase.auth().signOut().then(function () {
          // Sign-out successful.
          store.dispatch("setAuthUser", null);
          store.dispatch("setToken", false);

          router.push('/login')

        }).catch(function (error) {
          // An error happened.
        });

      },
      setForm(ref) {
        store.dispatch("setCreateForm", ref);
      }
    },
    computed: {
      token() {
        return store.getters.getToken;
      }
    }
  }
</script>