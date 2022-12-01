<template>
    <v-container>
        <v-app class="mr-7">
            <v-main class="container align-center mt-0">
            <v-card>
                <template v-slot:activator="{ on }">
                    <div class="d-flex" v-on="on"></div>
                </template>
                <v-card-title> <span class="headline">Movimentar</span></v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="10" sm="6" md="3">
                            <v-text-field
                                v-model="itemToMoviment.descricao"
                                :rules="regra"
                                label="Descrição"
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
                                        readonly
                                        label="Data"
                                        persistent-hint
                                        v-bind="attrs"
                                        @blur="date = parseDate(dateFormatted)"
                                        v-on="on"
                                    >
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title @input="menu1 = false">
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="10" sm="6" md="3">
                            <v-select
                                v-model="tiposMovimentacao"
                                label="Tipo Movimentação"
                                :rules="regra"
                            />
                        </v-col>
                        <v-col cols="10" sm="6" md="3">
                            <v-text-field
                                v-model="itemToMoviment.id_patrimonio_item"
                                :rules="regra"
                                label="ID"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="red accent-1" text @click="dialogMoviment = false">
                        Fechar
                    </v-btn>
                    <v-btn
                        color="light-green lighten-1"
                        text
                        :rules="regra"
                        @click="movimenta(itemToMoviment)"
                    >
                        Movimentar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-main>
    </v-app>

    </v-container>
</template>
<script> 
  import api from '../api/api';
  import axiosInstance from "../api/apiInstance";
export default {
    mixins: [api],
    name: "movimenta",
    data() {
        return {
            dialogMoviment: false,
            itemToMoviment: [],
            tiposMovimentacao: {},
            date: new Date().toISOString(),
            dateFormatted: "",
            menu1: false,
            regra: [(v) => !!v || "Campo obrigatório"],
        };
    },
    mounted(){
        this.getTiposMovimentacao();
    },
    methods: {
        movimenta(item) {
            const data = {
                ...item,
                date: this.dateFormatted,
            };
            this.post(`/curso/patrimonio/movimentacao/${item.id_patrimonio_item}`, data)
                .then((res) => {
                    this.$router.push(`/patrimonios`)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getTiposMovimentacao() {
            this
                .get("/curso/patrimonio/tipoMov")
                .then((res) => {
                    console.log(res.data);
                   this.tiposMovimentacao = res.data.patrimonio;
                })
                .catch((err) => {
                    console.log(err);
                });
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
</script>
<style scoped>
.v-main {
    flex: 0.2 0 auto;
}
</style>