<template>
    <div>
        <v-btn fab v-if="this.$vuetify.breakpoint.xsOnly" @click="openDialog()" class="mr-2 mb-2 elevation-3"
            color="primary">
            <v-icon class="">mdi-plus</v-icon>
        </v-btn>
        <v-btn v-else @click="openDialog()" class="ml-2 mb-2" color="primary">
            <v-icon class="mr-1">mdi-plus</v-icon>
            Obra
        </v-btn>
        <v-dialog v-model="dialog" max-width="700px" scrollable>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Cadastrar Obra</span>
                </v-card-title>
                <v-card-subtitle>* Indica campos obrigatórios</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <form @submit="criarObra()">
                                    <v-row no-gutters>
                                        <v-col cols="12" sm="3">
                                            <v-img v-if="this.$vuetify.breakpoint.xsOnly" class="mx-auto"
                                                max-width="140px" :src="img"></v-img>
                                            <v-img v-else class="mr-2" max-width="140px" :src="img"></v-img>
                                        </v-col>
                                        <v-col>
                                            <v-row no-gutters>
                                                <v-col>
                                                    <v-text-field autofocus v-model="titulo" label="Titulo *">
                                                    </v-text-field>
                                                    <v-text-field v-model="img" label="URL da Imagem *">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="justify-space-between">
                                                <v-col cols="12" sm="4">
                                                    <v-text-field label="ISBN *" v-model="isbn">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field type="number" label="Nº Páginas *" v-model="nPaginas">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field type="number" label="Nº Edição *" v-model="nEdicao">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>

                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="justify-space-between">
                                        <v-col cols="12" sm="6">
                                            <v-select :items="autor1Select" item-text="nome" v-model="autor1"
                                                label="Autor 1 *"></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="5">
                                            <v-select :items="autor2Select" item-text="nome" v-model="autor2"
                                                label="Autor 2">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="justify-space-between">
                                        <v-col cols="12" sm="4">
                                            <v-select :items="tipoSelect" item-text="nome" v-model="tipo"
                                                label="Tipo *"></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="7">
                                            <v-select :items="editoraSelect" item-text="nome" v-model="editora"
                                                label="Editora *">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <v-select v-model="genero" :items="generoSelect" item-text="nome" chips
                                                clearable label="Selecione os Tópicos *" multiple>
                                                <template v-slot:selection="{ item }">
                                                    <v-chip close color="primary" text-color="white"
                                                        @click:close="remove(item)">
                                                        <strong>{{ item.nome }}</strong>
                                                    </v-chip>
                                                </template>
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-textarea v-model="sinopse" label="Sinopse *"></v-textarea>
                                    </v-row>
                                </form>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog()">
                        FECHAR
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="criarObra()">
                        CADASTRAR
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import api from '../../api/api';
export default {
    name: 'ButtonsAGE',
    mixins: [api],
    data() {
        return {
            dialog: false,
            img: "",
            tipoSelect: [],
            editoraSelect: [],
            generoSelect: [],
            autor1Select: [],
            autor2Select: ["Sem Autor 2"],

            titulo: "",
            isbn: "",
            nPaginas: "",
            nEdicao: "",
            autor: [],
            autor1: "",
            autor2: "",
            tipo: "",
            editora: "",
            genero: [],
            sinopse: "",
            criar: false,
        };
    },
    methods: {
        openDialog() {
            this.dialog = true
            this.get('/biblioteca/tipo').then((response) => {
                console.log(response.data)
                this.tipoSelect = response.data
                this.get('/biblioteca/editora').then((response) => {
                    console.log(response.data)
                    this.editoraSelect = response.data

                    this.get('/biblioteca/genero').then((response) => {
                        console.log(response.data)
                        this.generoSelect = response.data
                        this.get('/biblioteca/autor').then((response) => {
                            console.log(response.data)
                            this.autor1Select = response.data
                            this.autor2Select = this.autor2Select.concat(response.data)
                        })
                    })
                })
            })
        },
        closeDialog() {
            this.dialog = false
        },
        remove(item) {
            this.chips.splice(this.chips.indexOf(item), 1)
        },
        criarObra() {

            if (this.autor1 && this.autor2 && this.autor2 != "Sem Autor 2") {
                if (this.autor1 == this.autor2) {
                    this.$store.commit('showErrorMessage', 'Você deve informar dois autores diferentes')
                    this.criar = false
                } else {
                    this.autor = [this.autor1, this.autor2]
                    console.log(this.autor)
                    this.criar = true
                }
            } else if (this.autor1) {
                this.autor = [this.autor1]
                console.log(this.autor)
                this.criar = true
            }

            if (this.criar && this.img && this.titulo && this.isbn && this.nPaginas && this.nEdicao && this.autor && this.tipo && this.editora && this.genero && this.sinopse) {
                this.post(`/biblioteca/obra`, { img: this.img, titulo: this.titulo, isbn: this.isbn, sinopse: this.sinopse, n_paginas: this.nPaginas, n_edicao: this.nEdicao, tipo: this.tipo, editora: this.editora, genero: this.genero, autor: this.autor }).then((response) => {
                    console.log({ img: this.img, titulo: this.titulo, isbn: this.isbn, sinopse: this.sinopse, n_paginas: this.nPaginas, n_edicao: this.nEdicao, tipo: this.tipo, editora: this.editora, genero: this.genero, autor: this.autor });
                    this.dialog = false
                    this.img = ""
                    this.titulo = ""
                    this.isbn = ""
                    this.nPaginas = ""
                    this.nEdicao = ""
                    this.autor = ""
                    this.tipo = ""
                    this.editora = ""
                    this.genero = ""
                    this.sinopse = ""
                })
            } else {
                this.$store.commit('showErrorMessage', 'Você deve prencher todos os campos obrigatórios')
            }
        },
        compare(a, b) {
            if (a.nome < b.nome)
                return -1;
            if (a.nome > b.nome)
                return 1;
            return 0;
        }
    }
}
</script>