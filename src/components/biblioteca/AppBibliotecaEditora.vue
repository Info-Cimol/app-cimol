<template>
    <v-container>
        <v-container fluid v-if="this.$store.state.perfil == 'biblioteca'">
            <div class="d-flex justify-space-between">
                <h2 class="mb-2">
                    <v-btn @click="goBack()" icon class="mr-2">
                        <v-icon>mdi-arrow-left-bottom</v-icon>
                    </v-btn>Editar Editoras
                </h2>
            </div>
            <v-card>
                <v-card-title>
                    <v-dialog v-model="dialog" max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mr-4 mt-4 primary" dark v-bind="attrs" v-on="on">
                                <v-icon class="mr-2">mdi-plus</v-icon>
                                Nova Editora
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Nova Editora</span>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <form @submit="criarEditora()">
                                                <v-text-field autofocus v-model="novaEditora" label="Nome Editora">
                                                </v-text-field>
                                            </form>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialog = false">
                                    FECHAR
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="criarEditora()">
                                    CRIAR
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquise..." single-line
                        hide-details>
                    </v-text-field>

                </v-card-title>

                <v-data-table :headers="headers" :items="editora" :search="search" :items-per-page="20"
                    :header-props="headerProps">
                    <template v-slot:item.acao="{ item }">
                        <v-btn small class="mr-2" @click="editItem(item)">
                            <v-icon small class="mr-2">
                                mdi-pencil
                            </v-icon>
                            Editar
                        </v-btn>
                        <v-btn small v-if="item.apagar == 1" @click="deleteItem(item)">
                            <v-icon small class="mr-2">
                                mdi-delete
                            </v-icon>
                            Apagar
                        </v-btn>
                    </template>
                </v-data-table>

                <v-dialog v-model="dialogEdit" max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Editar Editora</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <form @submit="salvarEditora()">
                                            <v-text-field autofocus v-model="editarEditora" label="Nome Editora">
                                            </v-text-field>
                                        </form>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogEdit = false">
                                FECHAR
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="salvarEditora()">
                                SALVAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="450px">
                    <v-card>
                        <v-card-title>Tem certeza que quer apagar essa Editora?</v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="deletarEditora">Sim</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-container>
        <v-container v-else fluid>
            <div class="d-flex flex-column align-center mt-16" height="100">
                <v-icon color="grey darken-1" size="100px">mdi-alert-outline</v-icon>
                <h1 style="color: #757575;" class="mb-2">Acesso Restrito</h1>

                <v-btn @click="goBack()" class="mr-2">
                    <v-icon>mdi-arrow-left-bottom</v-icon>
                    VOLTAR
                </v-btn>
            </div>
        </v-container>
    </v-container>
</template>
<script>
import api from '../api/api';
export default {
    name: 'AppBibliotecaEditora',
    mixins: [api],
    data() {
        return {
            search: '',
            headers: [
                { text: 'ID', value: 'id_editora' },
                { text: 'Nome', value: 'nome' },
                { text: 'Ações', value: 'acao', sortable: false },
            ],
            editora: [{ id_editora: "", nome: "", apagar: "" }],
            dialog: false,
            dialogDelete: false,
            dialogEdit: false,
            novaEditora: "",
            editoraExiste: false,
            editarEditora: "",
            headerProps: {
                sortByText: "Filtrar por..."
            },
            itemDelete: {},
            itemEdit: {},
        }
    },
    created() {
        this.get('/biblioteca/editora').then((response) => {
            console.log(response.data)
            this.editora = response.data
        })
    },
    methods: {
        goBack() {
            this.$router.push("/biblioteca");
        },
        criarEditora() {
            if (this.novaEditora) {
                this.editora.forEach(el => {
                    if (el.nome.toLowerCase() == this.novaEditora.toLowerCase()) {
                        this.editoraExiste = true;
                    }
                })
                if (this.editoraExiste == false) {
                    this.post(`/biblioteca/editora`, { nome: this.novaEditora }).then((response) => {
                        this.get('/biblioteca/editora').then((response) => {
                            console.log(response.data)
                            this.editora = response.data
                        })
                        this.dialog = false
                        this.novaEditora = ""
                        this.editoraExiste = false
                    })
                } else {
                    this.$store.commit('showErrorMessage', 'Essa Editora já existe')
                    this.editoraExiste = false
                }

            } else {
                this.$store.commit('showErrorMessage', 'Você deve informar algo no campo Editora')
            }
        },
        deletarEditora() {
            this.delete(`/biblioteca/editora/${this.itemDelete.id_editora}`).then((response) => {
                console.log(response);
                this.get('/biblioteca/editora').then((response) => {
                    console.log(response.data)
                    this.editora = response.data
                })
                this.dialogDelete = false
                this.itemDelete = {}
            })
        },
        salvarEditora() {
            if (this.editarEditora) {
                this.put(`/biblioteca/editora/${this.itemEdit.id_editora}`, { nome: this.editarEditora }).then((response) => {
                    this.get('/biblioteca/editora').then((response) => {
                        console.log(response.data)
                        this.editora = response.data
                    })
                    this.dialogEdit = false
                    this.editarEditora = ""
                })
            } else {
                this.$store.commit('showErrorMessage', 'Você deve informar algo no campo Editora')
            }
        },
        editItem(item) {
            this.dialogEdit = true
            this.itemEdit = item
            this.editarEditora = this.itemEdit.nome
        },

        deleteItem(item) {
            this.dialogDelete = true
            this.itemDelete = item
        }
    }
}
</script>