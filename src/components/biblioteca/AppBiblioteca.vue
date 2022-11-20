<template>
    <v-container>
        <v-container fluid>
            <div class="d-flex justify-space-between">
                <h2>
                    <v-btn @click="goBack()" icon class="mr-2">
                        <v-icon>mdi-arrow-left-bottom</v-icon>
                    </v-btn>Faça sua pesquisa por sua obra desejada
                </h2>
                <buttons />
            </div>
            <form class="mb-n2" action="" @submit="enviarForm()">
                <div>
                    <v-text-field @click:prepend="enviarForm()" label="Pesquise por sua obra..."
                        prepend-icon="mdi-magnify" type="text" v-model="search"></v-text-field>
                </div>
            </form>
            <v-chip-group active-class="primary--text" mandatory show-arrows="desktop" class="mb-4">
                <v-chip v-for="genero in generos" :key="genero.id_genero" @click="obraGenero(genero.id_genero)">
                    {{ genero.nome }}
                </v-chip>
            </v-chip-group>
            <v-row>
                <v-col class="d-flex flex-wrap">
                    <v-card v-for="obraGenero in obrasGenero" :key="obraGenero.id_obra" :cols="obraGenero.titulo"
                        class="mb-4 mr-4" max-width="250">
                        <v-img :src="obraGenero.img" height="200px"></v-img>

                        <v-card-title v-text="obraGenero.titulo"></v-card-title>

                        <v-card-subtitle v-text="obraGenero.autor"></v-card-subtitle>

                        <v-chip v-if="obraGenero.situacao == 'disponivel'" class="ma-2" color="green" label
                            text-color="white">
                            <v-icon left>
                                mdi-check-circle
                            </v-icon>
                            Disponível
                        </v-chip>
                        <v-chip v-if="obraGenero.situacao == 'indisponivel'" class="ma-2" color="red" label
                            text-color="white">
                            <v-icon left>
                                mdi-close-circle
                            </v-icon>
                            Indisponível
                        </v-chip>
                        <v-btn text @click="detalhesObra(obraGenero.id_obra)">Ver mais</v-btn>

                    </v-card>
                </v-col>
            </v-row>

            <h2 class="mb-4">Sugestões...</h2>

            <v-row>
                <v-col class="d-flex flex-wrap">
                    <v-card v-for="obra in obras" :key="obra.id_obra" :cols="obra.titulo" class="mb-4 mr-4" cols="12"
                        max-width="250">
                        <v-img :src="obra.img" height="200px"></v-img>

                        <v-card-title v-text="obra.titulo"></v-card-title>

                        <v-card-subtitle v-text="obra.autor"></v-card-subtitle>

                        <v-chip v-if="obra.situacao == 'disponivel'" class="ma-2" color="green" label
                            text-color="white">
                            <v-icon left>
                                mdi-check-circle
                            </v-icon>
                            Disponível
                        </v-chip>
                        <v-chip v-if="obra.situacao == 'indisponivel'" class="ma-2" color="red" label
                            text-color="white">
                            <v-icon left>
                                mdi-close-circle
                            </v-icon>
                            Indisponível
                        </v-chip>
                        <v-btn text @click="detalhesObra(obra.id_obra)">Ver mais</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
<script>
import api from '../api/api';
import Loading from '../loading/Loading.vue';
import BackButton from '../navigation/BackButton.vue';
import Buttons from '../biblioteca/menuComponent/ButtonsAGE.vue';

export default {
    name: 'AppBiblioteca',
    components: { Loading, BackButton, Buttons },
    mixins: [api],
    data() {
        return {
            searchOnGoing: false,
            obras: [],
            generos: [],
            search: "",
            obrasGenero: [],
        };
    },
    created() {
        this.get('/biblioteca/genero').then((response) => {
            console.log(response.data)
            this.generos = response.data
            this.get('/biblioteca/obra/preset').then((response) => {
                console.log(response.data)
                this.obrasGenero = response.data
                this.get('/biblioteca/obra').then((response) => {
                    console.log(response.data)
                    this.obras = response.data

                })
            })
        })
    },
    methods: {
        detalhesObra(id_obra) {
            this.$router.push("/biblioteca/obra/" + id_obra);
        },
        enviarForm() {
            if (this.search != this.$route.params.search) {
                this.$router.push("/biblioteca/obras/" + this.search);
                console.log(this.$route.params.search);
            }
        },
        obraGenero(id_genero) {
            this.get('/biblioteca/obra/genero/' + id_genero).then((response) => {
                console.log(response.data)
                this.obrasGenero = response.data;
            });
        },
        goBack() {
            this.$router.push("/");
        }
    }
}
console.log(window.localStorage.perfil);

</script>