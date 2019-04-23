<template>
    <div class="row grid">
        <div class="col centerBox">
            <p>
                Google hesabınızla sisteme giriş yapabilirsiniz.
            </p>
            <p>
                <button class="btn btn-danger" @click="loginPopup">
                    Google
                </button>
            </p>


        </div>
    </div>

</template>

<script>
    import store from '@/store'
    import router from '@/router'
    import firebase from 'firebase'

    export default {
      name: "Login",
      created() {

        /*firebase.auth().onAuthStateChanged((user) => {

          if (user) {

            store.dispatch("setAuthUser", this.userPayload(user))
            store.dispatch("setToken", true);

            router.push("/");
          } else {
            router.push("/login")
          }
        });*/

      },
      methods: {
        loginPopup() {
          const provider = new firebase.auth.GoogleAuthProvider();

          firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.

            const user = result.user;

            if (user) {

              store.dispatch("setAuthUser", this.userPayload(user))
              store.dispatch("setToken", true)

              router.push('/')

            } else {
              // No user is signed in.
            }

          }).catch(function(error) {
            // Handle Errors here.
            console.log(error)
          });

          /**/
        },

        userPayload(user) {

          return {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous
          }
        }
      }
    }
</script>

<style scoped>
    * {box-sizing: border-box;}
    .grid {
        display: grid !important;
    }
    .centerBox {
        text-align: center;
        align-self: center;
        justify-self: center;
    }
</style>