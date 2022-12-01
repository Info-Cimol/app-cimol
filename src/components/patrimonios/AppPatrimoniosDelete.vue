<template>
    <v-container>
        <v-app class="mr-7">
            <v-main class="container align-center mt-0">
                <v-card>
                    <v-card-title>Deletar</v-card-title>
                    <v-card-title class="text-h6 .align-self-center">
                        Tem certeza que deseja deletar {{ itemToDelete.descricao }}?
                    </v-card-title>
                    <v-card-text class="text-h7 .align-self-center">
                        <strong class="red--text text--lighten-1">
                            (Esta ação não poderá ser desfeita!)
                        </strong>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="light-green lighten-1" text @click="dialogDelete = false">
                            Fechar
                        </v-btn>
                        <v-btn color="red accent-1" text @click="deleta(itemToDelete)">
                            Deletar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-main>
        </v-app>
    </v-container>
</template>

<script>
import api from "../api/api";
export default {
    name: "deleta",
    mixins: [api],
    data() {
        return {
            dialogDelete: false,
            itemToDelete: {},

        };
    },
    methods: {
        deleta(item) {
            const url = `/curso/patrimonio/remover/${item.id_patrimonio_item}`;
            this.delete(url)
                .then((res) => {
                    this.$router.push(`/patrimonios`);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>
<style scoped>
.v-main {
    flex: 0.2 0 auto;
}
</style>