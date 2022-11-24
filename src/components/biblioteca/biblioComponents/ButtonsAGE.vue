<template>
    <div v-if="this.$vuetify.breakpoint.xsOnly" class="d-flex flex-wrap justify-start mt-2">
        <button-criar/>
        <v-btn fab @click="goAutor()" class="mr-2 mb-2 elevation-3" color="primary">
            <v-icon class="">mdi-account-credit-card-outline</v-icon>
        </v-btn>
        <v-btn fab @click="goGenero()" class="mr-2 mb-2 elevation-3" color="primary">
            <v-icon class="">mdi-bookshelf</v-icon>
        </v-btn>
        <v-btn fab @click="goEditora()" class="mr-2 mb-2 elevation-3" color="primary">
            <v-icon class="">mdi-domain</v-icon>
        </v-btn>
        <v-btn fab @click="goRetirada()" class="mr-2 mb-2 elevation-3" color="primary">
            <v-icon class="">mdi-format-list-bulleted-square</v-icon>
        </v-btn>
    </div>
    <div v-else class="d-flex flex-wrap justify-end" >
        <button-criar/>
        <v-btn @click="goAutor()" class="ml-2 mb-2" color="primary">
            <v-icon class="mr-1">mdi-account-credit-card-outline</v-icon>
            Autor
        </v-btn>
        <v-btn @click="goGenero()" class="ml-2 mb-2" color="primary">
            <v-icon class="mr-1">mdi-bookshelf</v-icon>
            Tópico
        </v-btn>
        <v-btn @click="goEditora()" class="ml-2 mb-2" color="primary">
            <v-icon class="mr-1">mdi-domain</v-icon>
            Editora
        </v-btn>
        <v-btn @click="goRetirada()" class="ml-2 mb-2" color="primary">
            <v-icon class="mr-1">mdi-domain</v-icon>
            Retiradas
        </v-btn>
    </div>
</template>
<script>
import ButtonCriar from './ButtonCriar.vue';
export default {
    name: 'ButtonsAGE',
    components: { ButtonCriar },
    data() {
        return {
          dialog: false,
        };
    },
    methods: {
        goAutor() {
            this.$router.push("biblioteca/autor");
        },
        goGenero() {
            this.$router.push("biblioteca/topico");
        },
        goEditora() {
            this.$router.push("biblioteca/editora");
        },
        goRetirada() {
            this.$router.push("biblioteca/retirada");
        }
    }
}
</script>