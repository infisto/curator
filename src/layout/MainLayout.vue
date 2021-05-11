<template>
  <header>
    <the-navbar></the-navbar>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <Footer></Footer>
  </footer>
</template>

<script>
import {useStore} from 'vuex'
import TheNavbar from "@/components/TheNavbar";
import Footer from "@/components/Footer";
export default {
  setup() {
    const store = useStore()
    return {
      store
    }
  },
  components: {Footer, TheNavbar}
}
</script>

<style>
main {
  flex: 1 0 auto;
}
footer {
  flex: 0 0 auto;
}
@media (max-width: 768px) {
  main {
    margin-top: 40px;
  }
}
</style>