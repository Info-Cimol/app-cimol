<template>
    <div>
        <v-btn v-if="this.$store.state.perfil == 'biblioteca'" @click="openDialog()" class="ma-2">
            <v-icon class="mr-1">mdi-pencil</v-icon>
            Editar
        </v-btn>
        <v-dialog v-model="dialog" max-width="700px" scrollable>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Editar {{ titulo }}</span>
                </v-card-title>
                <v-card-subtitle>* Indica campos obrigatórios</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <form @submit="editarObra()">
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
                                        <v-textarea auto-grow v-model="sinopse" label="Sinopse *"></v-textarea>
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
                    <v-btn color="red darken-1" text @click="dialogDelete = true">
                        EXCLUIR
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="editarObra()">
                        SALVAR
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-dialog v-model="dialogDelete" max-width="450px">
                <v-card>
                    <v-card-title>Tem certeza que quer apagar {{ titulo }}?</v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="deletarObra()">Sim</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-dialog>
    </div>
</template>
<script>
import api from '../../api/api';
export default {
    name: 'ButtonsAGE',
    props: ['idObra'],
    mixins: [api],
    data() {
        return {
            dialog: false,
            dialogDelete: false,
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

            this.get(`/biblioteca/obra/${this.idObra}`).then((response) => {
                console.log(response.data);
                this.titulo = response.data[0].titulo;
                this.isbn = response.data[0].isbn;
                this.editora = response.data[0].editora;
                this.img = response.data[0].img;
                this.sinopse = response.data[0].sinopse;
                this.tipo = response.data[0].tipo;
                this.nPaginas = response.data[0].n_paginas;
                this.nEdicao = response.data[0].n_edicao;
                this.get(`/biblioteca/generos/${this.idObra}`).then((response) => {
                    console.log(response.data);
                    response.data.forEach(el => {
                        this.genero = this.genero.concat(el.nome)
                    })
                    this.get(`/biblioteca/autores/${this.idObra}`).then((response) => {
                        console.log(response.data);
                        this.autor = response.data;
                        if (this.autor.length == 1) {
                            this.autor1 = response.data[0].nome;
                        } else if (this.autor.length == 2) {
                            this.autor1 = response.data[0].nome;
                            this.autor2 = response.data[1].nome;
                        }
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
                    });
                });
            });


        },
        closeDialog() {
            this.dialog = false
        },
        remove(item) {
            this.genero.splice(this.genero.indexOf(item), 1)
        },
        editarObra() {

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
                this.put(`/biblioteca/obra/${this.idObra}`, { img: this.img, titulo: this.titulo, isbn: this.isbn, sinopse: this.sinopse, n_paginas: this.nPaginas, n_edicao: this.nEdicao, tipo: this.tipo, editora: this.editora, genero: this.genero, autor: this.autor }).then((response) => {
                    console.log(this.genero);
                    this.dialog = false
                    this.img = ""
                    this.titulo = ""
                    this.isbn = ""
                    this.nPaginas = ""
                    this.nEdicao = ""
                    this.autor = ""
                    this.tipo = ""
                    this.editora = ""
                    this.genero = []
                    this.sinopse = ""
                    this.$router.go()
                })
            } else {
                this.$store.commit('showErrorMessage', 'Você deve prencher todos os campos obrigatórios')
            }
        },
        deletarObra() {
            this.delete(`/biblioteca/obra/${this.idObra}`).then((response) => {
                console.log(response);
                this.dialogDelete = false;
                this.dialog = false;
                this.$router.go()
            })

        }
    }
}
</script>