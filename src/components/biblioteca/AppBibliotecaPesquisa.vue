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
            <form action="" @submit="enviarForm()">
                <div>
                    <v-text-field class="mb-n2" @click:prepend="enviarForm()" label="Pesquise por sua obra..."
                        prepend-icon="mdi-magnify" type="text" v-model="search"></v-text-field>
                </div>
            </form>
            <div>
                <h3 class="mb-2">Você buscou por "{{ this.$route.params.search }}"</h3>
            </div>
            <v-row>
                <v-col class="d-flex flex-wrap">
                    <v-card v-for="obra in obras" :key="obra.id_obra" :cols="obra.titulo" class="mb-4 mr-4"
                        max-width="250">
                        <v-img :src="obra.img" height="200px"></v-img>

                        <v-card-title v-text="obra.titulo"></v-card-title>

                        <v-card-subtitle v-text="obra.titulo"></v-card-subtitle>

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
import Buttons from '../biblioteca/menuComponent/ButtonsAGE.vue';

export default {

    name: 'AppBibliotecaPesquisa',
    components: { Buttons },
    mixins: [api],
    data() {
        return {
            searchOnGoing: false,
            obras: [],
        };
    },
    created() {
        this.get(`biblioteca/obras/${this.$route.params.search}`).then((response) => {
            console.log(response.data)
            this.obras = response.data;
        });
    },
    methods: {
        detalhesObra(id_obra) {
            this.$router.push("/biblioteca/obra/" + id_obra);
        },
        enviarForm() {
            if (this.search != this.$route.params.search) {
                this.$router.push("/biblioteca/obras/" + this.search);
                console.log(`biblioteca/obras/${this.$route.params.search}`);
                this.get(`biblioteca/obras/${this.$route.params.search}`).then((response) => {
                    console.log(response.data)
                    this.obras = response.data;
                })
            }
        },
        goBack() {
            this.$router.push("/biblioteca")
        },
    }
}
console.log(window.localStorage.perfil);

</script>