<template>
    <v-container>
        <v-container fluid v-if="this.$store.state.perfil == 'biblioteca'">
            <div class="d-flex justify-space-between">
                <h2 class="mb-2">
                    <v-btn @click="goBack()" icon class="mr-2">
                        <v-icon>mdi-arrow-left-bottom</v-icon>
                    </v-btn>Editar Tópicos
                </h2>
            </div>
            <v-card>
                <v-card-title>
                    <v-dialog v-model="dialog" max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mr-4 mt-4 primary" dark v-bind="attrs" v-on="on">
                                <v-icon class="mr-2">mdi-plus</v-icon>
                                Novo Tópico
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Novo Tópico</span>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <form @submit="criarGenero()">
                                                <v-text-field autofocus v-model="novaGenero" label="Nome Genero">
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
                                <v-btn color="blue darken-1" text @click="criarGenero()">
                                    CRIAR
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquise..." single-line
                        hide-details>
                    </v-text-field>

                </v-card-title>

                <v-data-table :headers="headers" :items="genero" :search="search" :items-per-page="20"
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
                            <span class="text-h5">Editar Tópico</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <form @submit="salvarGenero()">
                                            <v-text-field autofocus v-model="editarGenero" label="Nome Genero">
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
                            <v-btn color="blue darken-1" text @click="salvarGenero()">
                                SALVAR
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="450px">
                    <v-card>
                        <v-card-title>Tem certeza que quer apagar esse Tópico?</v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="deletarGenero">Sim</v-btn>
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
    name: 'AppBibliotecaGenero',
    mixins: [api],
    data() {
        return {
            search: '',
            headers: [
                { text: 'ID', value: 'id_genero' },
                { text: 'Nome', value: 'nome' },
                { text: 'Ações', value: 'acao', sortable: false },
            ],
            genero: [{ id_genero: "", nome: "", apagar: "" }],
            dialog: false,
            dialogDelete: false,
            dialogEdit: false,
            novaGenero: "",
            editarGenero: "",
            headerProps: {
                sortByText: "Filtrar por..."
            },
            itemDelete: {},
            itemEdit: {},
            generoExiste: false,
        }
    },
    created() {
        this.get('/biblioteca/genero').then((response) => {
            console.log(response.data)
            this.genero = response.data
        })
    },
    methods: {
        goBack() {
            this.$router.push("/biblioteca");
        },
        criarGenero() {
            if (this.novaGenero) {
                this.genero.forEach(el => {
                    if (el.nome.toLowerCase() == this.novaGenero.toLowerCase()) {
                        this.generoExiste = true
                    }
                })
                if (this.generoExiste == false) {
                    this.post(`/biblioteca/genero`, { nome: this.novaGenero }).then((response) => {
                        this.get('/biblioteca/genero').then((response) => {
                            console.log(response.data)
                            this.genero = response.data
                        })
                        this.dialog = false
                        this.novaGenero = ""
                        this.generoExiste = false

                    })
                } else {
                    this.$store.commit('showErrorMessage', 'Essa Genero já existe')
                    this.generoExiste = false
                }

            } else {
                this.$store.commit('showErrorMessage', 'Você deve informar algo no campo Genero')
            }
        },
        deletarGenero() {
            this.delete(`/biblioteca/genero/${this.itemDelete.id_genero}`).then((response) => {
                console.log(response);
                this.get('/biblioteca/genero').then((response) => {
                    console.log(response.data)
                    this.genero = response.data
                })
                this.dialogDelete = false
                this.itemDelete = {}
            })
        },
        salvarGenero() {
            if (this.editarGenero) {
                this.put(`/biblioteca/genero/${this.itemEdit.id_genero}`, { nome: this.editarGenero }).then((response) => {
                    this.get('/biblioteca/genero').then((response) => {
                        console.log(response.data)
                        this.genero = response.data
                    })
                    this.dialogEdit = false
                    this.editarGenero = ""
                })
            } else {
                this.$store.commit('showErrorMessage', 'Você deve informar algo no campo Genero')
            }
        },
        editItem(item) {
            this.dialogEdit = true
            this.itemEdit = item
            this.editarGenero = this.itemEdit.nome
        },

        deleteItem(item) {
            this.dialogDelete = true
            this.itemDelete = item
        }
    }
}
</script>