<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<script lang="ts">

    import Vue from "vue";
    import {Component} from "vue-property-decorator";


    @Component({
        components: {}
    })
    export default class App extends Vue {


    }

</script>
<style lang="sass">

    @import '~vuetify/dist/vuetify.min.css'
    @import '~@mdi/font/css/materialdesignicons.css'

</style>
