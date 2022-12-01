<template>
    <v-container>
        <v-app class="mr-7">
            <v-main class="container align-center mt-0">
                <v-toolbar flat>
                    <v-toolbar-title>Patrimônios</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical />
                    <v-text-field
                        v-model="textSearch"
                        append-icon="mdi-magnify"
                        label="Pesquisar"
                        @change="doSearch()"
                        single-line
                        hide-details
                    />
                    <v-row align="center"> </v-row>
                    <v-spacer />
                    <v-dialog v-model="dialog" max-width="600px">
                        <template v-slot:activator="{ on }">
                            <div class="d-flex">
                                <v-btn color="cyan" dark class="ml-auto ma-3" v-on="on">
                                    Novo Item
                                </v-btn>
                            </div>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline" v-if="editedItem.id_patrimonio_item"
                                    >Editar {{ editedItem.descricao }}</span
                                >
                                <span class="headline" v-else>Inserir Item</span>
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-text-field
                                            v-model="editedItem.descricao"
                                            label="Descrição"
                                        />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-text-field
                                            v-model="editedItem.numero_serie"
                                            label="Num Série"
                                        />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-text-field
                                            v-model="editedItem.numero_patrimonio"
                                            label="Num Patrimônio"
                                        />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-text-field
                                            v-model="editedItem.item_nota_fiscal"
                                            label="Nota Fiscal"
                                        />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-file-input
                                            v-model="editedItem.imagePath"
                                            label="Imagem"
                                            truncate-length="10"
                                            @change="upaImagem"
                                        />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-text-field v-model="editedItem.local" label="Local" />
                                    </v-col>
                                    <v-col cols="11" sm="4" md="3">
                                        <v-text-field
                                            v-model="editedItem.codigo_barra"
                                            label="Cod Barra"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="red accent-1" text @click="showEditDialog(item)">
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    color="light-green lighten-1"
                                    text
                                    @click="salvar(editedItem, imagePath)"
                                >
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
                <v-card>
                    <v-data-table
                        :headers="headers"
                        :items="items"
                        :footer-props="{ 'items-per-page-text': 'Itens por página' }"
                    >
                        <template v-slot:item.actions="{ item }">
                            <div class="text-truncate">
                                <v-btn class="ma-2" fab dark x-small color="cyan">
                                    <v-icon small color="white" @click="showEditDialog(item)">
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                <v-btn class="ma-2" fab dark x-small color="cyan">
                                    <v-icon small color="white" @click="moviment(item)">
                                        mdi-shuffle-variant
                                    </v-icon>
                                </v-btn>
                                <v-btn class="mx-2" fab dark x-small color="#EF5350">
                                    <v-icon small color="white" @click="deleta(item)">
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </div>
                        </template>
                        <template #item.imagem="{ value }">
                            <div class="text-truncate" style="width: 140px">
                                <a :href="value" target="_blank">{{ value }}</a>
                            </div>
                        </template>
                    </v-data-table>

                </v-card>
            </v-main>
        </v-app>
    </v-container>
</template>
<script>
import api from "../api/api";
import axios from "axios";
import axiosInstance from "../api/apiInstance";
export default {
    name: "AppPatrimonio",
    mixins: [api],
    data() {
        return {
            headers: [
                { text: "ID", value: "id_patrimonio_item", name: "id" },
                { text: "Descrição", align: "start", value: "descricao", sortable: false },
                { text: "Número de Série", value: "numero_serie", sortable: false },
                { text: "Número Patrimonio", value: "numero_patrimonio", sortable: false },
                { text: "Local", value: "local", sortable: false },
                { text: "Nota Fiscal", value: "item_nota_fiscal", sortable: false },
                { text: "Imagem", value: "imagem" },
                { text: "Ações", value: "actions", sortable: false },
            ],
            items: [],
            dialog: false,
            editedItem: [],
            dialogDelete: false,
            dialogMoviment: false,
            itemToEdit: [],
            itemToMoviment: [],
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString(),
            dateFormatted: "",
            itemToDelete: [],
            imagePath: "",
            menu1: false,
            regra: [(v) => !!v || "Campo obrigatório"],
            textSearch: "",
            tiposMovimentacao: [],

        };
    },
    components: {

    },
    computed: {
        computedDateFormatted() {
            return this.formatDate(this.date);
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        },
    },
    mounted() {
        this.carrega();
        this.carregaTiposMovimentacao();
    },
    methods: {
        deleta(item) {
            this.$router.push(`/patrimonios/delete/${item.id_patrimonio_item}`);
        },
        moviment(){
            this.$router.push(`/patrimonios/movimentar`);
        },
        altera(item, imagePath) {
            const data = {
                ...item,
                imagem: imagePath,
            };
            this.patch(`/curso/patrimonio/alterar/${item.id_patrimonio_item}`, data)
                .then((res) => {
                    this.carrega();
                    this.dialog = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        salvar(item, imagePath) {
            console.log(item.id_patrimonio_item);
            const data = {
                ...item,
                imagem: imagePath,
            };
            if (item.id_patrimonio_item) {
                this.altera(item, imagePath);
            } else {
                this.post(`/curso/patrimonio/criarPatrimonio`, data)
                    .then((res) => {
                        this.carrega();
                        this.dialog = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
       
        doSearch() {
            if (this.textSearch) {
                this.get(`/curso/patrimonio/buscar/${this.textSearch}`)
                    .then((res) => {
                        this.carrega();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        showEditDialog(item) {
            this.editedItem = item || {};
            this.dialog = !this.dialog;
        },
        showDeleteDialog(item) {
            this.itemToDelete = item;
            this.dialogDelete = !this.dialogDelete;
        },
        showMovimentDialog(item) {
            this.itemToMoviment = item;
            this.dialogMoviment = !this.dialogMoviment;
        },
        upaImagem(file) {
            let formData = new FormData();
            formData.append("upload_preset", "criijqf2");
            formData.append("folder", "cloudinary-demo");
            formData.append("file", file);
            axios
                .post("https://api.cloudinary.com/v1_1/drkpkbqdo/upload", formData)
                .then((res) => {
                    if (res.status == 200) {
                        console.log(file);
                        let url = res.data.url;
                        this.imagePath = url;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        movimentos() {
            this.$router.push(`/patrimonios/movimentos`);
        },
        carrega() {
            console.log(this.$route.params.id_curso);
            this.items = [];
            this.get(`/curso/patrimonio/lista`)
                .then((response) => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        carregaTiposMovimentacao(){
            this.tiposMovimentacao = [];
            this.get(`/curso/patrimonio/tipoMov`)
                .then((response) => {
                    this.tiposMovimentacao = response.data;
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
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
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        closeDelete(){
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.itemToDelete = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });

        },
    },
    configuration: {
        cloudName: "drkpkbqdo",
    },
};
</script>
<style scoped>
.v-main {
    flex: 0.2 0 auto;
}
</style>
