<template>
    <div v-if="this.$store.state.perfil == 'biblioteca'" class="d-flex flex-wrap justify-end">
        <v-btn @click="goAutor()" class="ml-2 mb-2" color="primary">
            <v-icon class="mr-1">mdi-account-credit-card-outline</v-icon>
            Autor
        </v-btn>
        <v-btn @click="goGenero()" class="ml-2 mb-2" color="primary">
            <v-icon class="mr-1">mdi-bookshelf</v-icon>
            Genero
        </v-btn>
        <v-btn @click="goEditora()" class="ml-2 mb-2" color="primary">
            <v-icon class="mr-1">mdi-domain</v-icon>
            Editora
        </v-btn>
    </div>
</template>
<script>
export default {
    name: 'ButtonsAGE',
    data() {
        return {

        };
    },
    methods: {
        goAutor() {
            this.$router.push("biblioteca/autor");
        },
        goGenero() {
            this.$router.push("biblioteca/genero");
        },
        goEditora() {
            this.$router.push("biblioteca/editora");
        },
    }
}
</script>