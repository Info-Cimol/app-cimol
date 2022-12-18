<template>
    <v-container>
        <v-app class="mr-7 mb-0">
            <v-main class="container align-center mt-0">
                <v-toolbar flat>
                    <v-toolbar-title>Movimentações</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical />
                    <v-row align="center"> </v-row>
                    <v-spacer />
                </v-toolbar>
                <v-card>
                    <v-data-table
                        :headers="headers"
                        :items="movimentos"
                        :footer-props="{ 'items-per-page-text': 'Itens por página' }"
                        class="elevation-1"
                    >
                        <template v-slot:item.actions="{ item }">
                            <div class="text-truncate">
                                <v-btn class="ma-2" fab dark x-small color="cyan">
                                    <v-icon small color="white" @click="showEditDialog(item)">
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                <v-btn class="ma-2" fab dark x-small color="cyan">
                                    <v-icon small color="white" @click="historico(item)">
                                        mdi-eye
                                    </v-icon>
                                </v-btn>
                            </div>
                        </template>
                    </v-data-table>
                </v-card>
                <v-dialog v-model="dialog" max-width="800px">
                    <v-card>
                        <template v-slot:activator="{ on }">
                            <div class="d-flex" v-on="on"></div>
                        </template>
                        <v-card-title>
                            <span class="headline">Editar Movimentação</span></v-card-title
                        >
                        <v-card-text>
                            <v-row>
                                <v-col cols="10" sm="6" md="3">
                                    <v-textarea
                                        v-model="itemToMoviment.descricao"
                                        :rules="regra"
                                        label="Descrição"
                                        rows="2"
                                    />
                                </v-col>
                                <v-col cols="10" sm="6" md="3">
                                    <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        :rules="regra"
                                        transition="scale-transition"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="dateFormatted"
                                                label="Data"
                                                persistent-hint
                                                readonly
                                                v-bind="attrs"
                                                @blur="date = parseDate(dateFormatted)"
                                                v-on="on"
                                            >
                                            </v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            locale="pt-br"
                                            @input="menu1 = false"
                                        />
                                    </v-menu>
                                </v-col>
                                <v-col cols="10" sm="6" md="3">
                                    <v-select
                                        v-model="itemToMoviment.id_patrimonio_tipo_movimento"
                                        :items="tiposMovimentacao"
                                        item-text="nome"
                                        item-value="nome"
                                        label="Tipo Movimentação"
                                        :rules="regra"
                                    />
                                </v-col>
                                <v-col cols="10" sm="6" md="3">
                                    <v-select
                                        v-model="itemToMoviment.categoria"
                                        :items="categoriaPat"
                                        item-text="nome"
                                        item-value="nome"
                                        label="Categoria"
                                        :rules="regra"
                                    />
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="red accent-1" text @click="dialog = false">
                                Fechar
                            </v-btn>
                            <v-btn
                                color="light-green lighten-1"
                                text
                                @click="salvar(itemToMoviment)"
                            >
                                Salvar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <back-button />
            </v-main>
        </v-app>
    </v-container>
</template>

<script>
import BackButton from "../navigation/BackButton.vue";
import api from "../api/api";
export default {
    name: "appMovimentos",
    mixins: [api],
    components: {
        BackButton,
    },
    data() {
        return {
            headers: [
                { text: "ID", value: "id_patrimonio_movimento" },
                { text: "Descrição", value: "descricao" },
                { text: "Data", value: "data" },
                {
                    text: "Tipo Movimentação",
                    value: "patrimonio_tipo_movimento_id_patrimonio_tipo_movimento",
                },
                { text: "Categoria", value: "categoria" },
                { text: "Ações", value: "actions", sortable: false },
            ],
            movimentos: [],
            tiposMovimentacao: [],
            categoriaPat: [],
            dialog: false,
            itemToMoviment: [],
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
            dateFormatted: this.formatDate(
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
            ),
            menu1: false,
            regra: [(v) => !!v || "Campo obrigatório"],

        };
    },
    mounted() {
        this.carregaMov();
        this.categoriaPatrimonio();
        this.carregaTipoMov()
    },
    computed: {
        computedDateFormatted() {
            return this.formatDate(this.date);
        },
    },
    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        },
    },
    methods: {
        carregaMov() {
            this.movimentos = [];
            this
                .get("/curso/patrimonio/movimentacao")
                .then((response) => {
                    this.movimentos = response.data.patrimonio;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async salvar(item) {
            console.log(item);
            const data = {
                ...item,
                date: this.date,
            };
            try {
                const res = await this.patch(
                    `/curso/patrimonio/alterarMov/${item.id_patrimonio_movimento}`,
                    data
                );

            } catch (error) {
                console.log(error);
            }
            this.carregaMov();
            this.dialog = false;
        },
        historico(item) {
            this.$router.push(`/patrimonios/historico/${item.id_patrimonio_movimento}`);
        },
        showEditDialog(item) {
            this.itemToMoviment = item || {};
            this.dialog = !this.dialog;
        },
        async categoriaPatrimonio() {
            this.categoriaPat = [];
            try {

                const res = await this.get(`/curso/patrimonio/categoria`)
                this.categoriaPat = res.data.patrimonio;
            }
            catch (e) {
                console.log(e);
            }
        },
        async carregaTipoMov() {
            this.tiposMovimentacao = [];
            try {
                const tipos = await this.get(`/curso/patrimonio/tipoMov`);
                this.tiposMovimentacao = tipos.data.patrimonio;
            } catch (error) {
                console.log("teste");
            }
        },
        formatDate(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },
        parseDate(date) {
            if (!date) return null;
            const [month, day, year] = date;
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        },
    },
};
// 🤓
</script>
<style scoped>
.v-main {
    flex: 0 0 auto;
}
</style>
