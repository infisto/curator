<template>
    <router-view></router-view>
    <Footer></Footer>
</template>

<style lang="scss">
@import "../styles/variable";

</style>
<script>
import Footer from "@/components/Footer";
export default {
  components: {Footer}
}
</script>