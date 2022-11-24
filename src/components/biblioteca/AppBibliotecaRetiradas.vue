<template>
    <v-container>
        <v-container fluid v-if="this.$store.state.perfil == 'biblioteca'">
            <div class="d-flex justify-space-between">
                <h2 class="mb-2">
                    <v-btn @click="goBack()" icon class="mr-2">
                        <v-icon>mdi-arrow-left-bottom</v-icon>
                    </v-btn>Retiradas
                </h2>
            </div>
            <v-card>
                <v-card-title>

                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquise..." single-line
                        hide-details>
                    </v-text-field>

                </v-card-title>

                <v-data-table :headers="headers" :items="obra" :search="search" :items-per-page="20"
                    :header-props="headerProps">
                    <template v-slot:item.dataDevolucao="{ item }">
                        <span>{{ new Date(item.data_devolucao).toISOString().substr(0, 10) }}</span>
                    </template>
                    <template v-slot:item.acao="{ item }">
                        <v-chip class="ma-2" color="white" label text-color="green" @click="disponivel(item)">
                            <v-icon left>
                                mdi-check-circle
                            </v-icon>
                            Está disponível?
                        </v-chip>
                    </template>
                </v-data-table>
            </v-card>
            <v-dialog v-if="obra != []" v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>{{ obra[0].titulo }} está disponível?</v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="obraDisponivel()">Sim</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
                { text: 'Título Obra', value: 'titulo' },
                { text: 'Pessoa com a Obra', value: 'nome' },
                { text: 'Turma', value: 'turma' },
                { text: 'Curso', value: 'curso' },
                { text: 'Data de Devolução', value: 'dataDevolucao' },
                { text: 'Ação', value: 'acao', sortable: false },
            ],
            obra: [{
                titulo: "",
                id_obra: "",
                data_devolucao: "",
                nome: "",
                id_pessoa: "",
                turma: "",
                curso: ""
            }],
            headerProps: {
                sortByText: "Filtrar por..."
            },
            dialog: false,
            itemDisponivel: "",
        }
    },
    created() {
        this.get('/biblioteca/obra/retirada').then((response) => {
            console.log(response.data)
            this.obra = response.data
        })
    },
    methods: {
        disponivel(item) {
            this.dialog = true
            this.itemDisponivel = item
        },
        obraDisponivel() {
            this.put(`/biblioteca/statusdisp/${this.itemDisponivel.id_obra}`, {}).then((response) => {
                console.log(response.data)
                this.get('/biblioteca/obra/retirada').then((response) => {
                    console.log("aqui");
                    console.log(response.data)
                    this.obra = response.data
                    this.dialog = false
                    
                })
            })
        },
        goBack() {
            this.$router.push("/biblioteca")
        }
    }
}
</script>