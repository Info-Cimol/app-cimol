<template>
    <v-dialog v-model="dialogMoviment" max-width="700px">
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
                            v-model="
                                itemToMoviment.patrimonio_tipo_movimento_id_patrimonio_tipo_movimento
                            "
                            :items="tiposMovimentacao"
                            label="Tipo Movimentação"
                            :rules="regra"
                        />
                    </v-col>
                    <v-col cols="10" sm="4" md="3">
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
                <v-btn color="red accent-1" text @click="dialogMoviment = false"> Fechar </v-btn>
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
    </v-dialog>
</template>
<script>
import api from "../../api/api";

export default {
    name: "CardMovimenta",
    mixins: [api],
    data() {
        return {
            dialogMoviment: false,
            itemToMoviment: {},
            date: new Date().toISOString().substr(0, 10),
            menu1: false,
            dateFormatted: "",
            tiposMovimentacao: [],
            regra: [(v) => !!v || "Campo obrigatório"],
        };
    },
    methods: {
        movimenta(item) {
            const data = {
                ...item,
                date: this.dateFormatted,
            };
            this.post(`/curso/patrimonio/movimentacao/${item.id_patrimonio_item}`, data)
                .then((response) => {
                    this.$emit("movimentado", item);
                    this.dialogMoviment = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
