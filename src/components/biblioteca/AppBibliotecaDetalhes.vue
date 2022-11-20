<template>
    <v-container>
        <h1>Obra</h1>
        <h2>Detalhes</h2>
        <v-container fluid>
            <v-row dense>
                <v-col>
                    <v-card>
                        <v-img height="250" :src="obra[0].img"></v-img>
                        <v-card-title> {{ obra[0].titulo }} </v-card-title>
                        <v-card-subtitle v-for="autor in autores" :key="autor.id_autor">
                            {{ autor.nome }}
                        </v-card-subtitle>
                        <v-card-text><b>ISBN:</b> {{ obra[0].isbn }}</v-card-text>
                        <v-btn @click="goBack()">VER</v-btn>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
        <back-button v-if="this.$store.state.perfil == 'admin'"></back-button>
    </v-container>


</template>
<script>
import api from '../api/api';
import Loading from '../loading/Loading.vue';
import BackButton from '../navigation/BackButton.vue';
export default {
    name: 'AppBibliotecaDetalhes',
    components: { Loading, BackButton },
    mixins: [api],
    data() {
        return {
            searchOnGoing: false,
            obra: {},
            generos: [],
            autores: [],
        };
    },
    created() {
        this.get(`/biblioteca/obra/${this.$route.params.id_obra}`).then((response) => {
            console.log(response.data);
            this.obra = response.data;
        });

        this.get(`/biblioteca/generos/${this.$route.params.id_obra}`).then((response) => {
            console.log(response.data);
            this.generos = response.data;
        });

        this.get(`/biblioteca/autores/${this.$route.params.id_obra}`).then((response) => {
            console.log(response.data);
            this.autores = response.data;
        });

    },
    methods: {

    }
}
let params = new URL(location.href).searchParams.get('id_obra');
</script>