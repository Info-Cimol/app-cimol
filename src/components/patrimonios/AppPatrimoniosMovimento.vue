<template>
    <v-container>
        <v-app class="mr-7">
            <v-main class="container align-center mt-0">
                <v-toolbar flat>
                    <v-toolbar-title>Movimentações</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical />
                    <v-row align="center">
                    </v-row>
                    <v-spacer />
                </v-toolbar>
                <v-card>
                    <v-data-table :headers="headers" :items="movimentos"
                        :footer-props="{ 'items-per-page-text': 'Itens por página' }" class="elevation-1">
                    </v-data-table>
                </v-card>
            </v-main>
        </v-app>
    </v-container>
</template>
<script>
import api from "../api/api";
export default {
    name: "appMovimentos",
    mixins: [api],
    data() {
        return {
            headers: [
                { text: "ID", value: "id_patrimonio_movimento" },
                { text: "Descrição", value: "descricao" },
                { text: "Data", value: "data" },
                { text: "Tipo Movimentação", value: "nome" },
            ],
            movimentos: [],
            tipoMov:[],
        };
    },
    mounted() {
        this.carregaMov();
    },
    methods: {
        carregaMov() {
            this.movimentos = [];
            this.get("/curso/patrimonio/movimentacao")
                .then(response => {
                    this.movimentos = response.data.patrimonio;
                }).catch((error) => {
                    console.log(error);
                });
        },
    }
}
</script>
<style scoped>
.v-main {
    flex: 0 0 auto;
}
</style>