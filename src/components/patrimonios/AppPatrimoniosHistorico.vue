<template>
    <v-container>
    <v-app class="mr-7 mb-0">
        <v-main class="container align-center mt-0">
            <v-toolbar flat>
                <v-toolbar-title>Histórico</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-row align="center"> </v-row>
                <v-spacer />
            </v-toolbar>
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="historico"
                    :items-per-page="5"
                    class="elevation-1"
                ></v-data-table>
            </v-card>
        </v-main>
        <back-button/>
    </v-app>
    </v-container>
    
</template>
<script>
import api from "../api/api";
import BackButton from "../navigation/BackButton.vue";
export default {
    name: "appHistorico",
    mixins: [api],
    components: {
        BackButton,
    },
    data() {
        return {
            headers: [
                { text: "ID", value: "id_historico" },
                { text: "Descrição", value: "descricao" },
                { text: "Data", value: "data" },
                { text: "Categoria", value: "categoria" },
                { text: "Tipo Movimentação", value: "tipoMovimento" },
            ],
            historico: [],
        };
    },
    mounted() {
        this.carregaHistorico();
    },
    methods: {
        carregaHistorico() {
            this.historico = [];
            this.get(`/curso/patrimonio/listaHistorico/${this.$route.params.idMovimento}`)
                .then((response) => {
                    console.log(response);
                    this.historico = response.data.patrimonio;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
<style scoped>
.v-main {
    flex: 0 0 auto;
}
</style>