<template>
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title>Deletar</v-card-title>
            <v-card-title class="text-h6 .align-self-center">
                Tem certeza que deseja deletar {{ itemToDelete.descricao }}?
            </v-card-title>
            <v-card-text class="text-h7 .align-self-center">
                <strong class="red--text text--lighten-1"
                    >(Esta ação não poderá ser desfeita!)</strong
                >
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-btn color="light-green lighten-1" text @click="dialogDelete = false">
                    Fechar
                </v-btn>
                <v-btn color="red accent-1" text @click="deleta(itemToDelete)"> Deletar </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import api from "../api/api";
import axiosInstance from "../api/axiosInstance";
export default {
    data(){
        return {
            dialogDelete: false,
            itemToDelete: {},
        }
    },
    methods: {
        deleta(item) {
            axiosInstance
                .delete(`/curso/patrimonio/remover/${item.id_patrimonio_item}`)
                .then((response) => {
                    this.$emit("deletado", item);
                    this.dialogDelete = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
}
</script>
