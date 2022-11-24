<template>
    <v-container>
        <v-container fluid>
            <div class="d-flex justify-space-between">
                <h2>
                    <v-btn @click="goBack()" icon class="mr-2">
                        <v-icon>mdi-arrow-left-bottom</v-icon>
                    </v-btn>{{obra[0].titulo}}
                </h2>
            </div>
            <v-row dense>
                <v-col cols="12" sm="5">
                    <v-card class="mx-auto">
                        <div style="background: lightgray" class="d-flex  justify-center">

                            <v-img class="ma-4" max-width="200" :src="obra[0].img">

                            </v-img>
                            <div v-if="this.$store.state.perfil == 'biblioteca'">
                                <div v-if="obra[0].situacao == 'disponivel'">
                                    <v-chip style="position: absolute; left: 0" v-if="obra[0].situacao == 'disponivel'"
                                        class="ma-2" color="green" label text-color="white">
                                        <v-icon left>
                                            mdi-check-circle
                                        </v-icon>
                                        Disponível
                                    </v-chip>
                                    <v-chip style="position: absolute; left: 0; top: 38px;"
                                        @click="dialogIndisponivelF()" class="ma-2" color="white" label
                                        text-color="red">
                                        <v-icon left>
                                            mdi-close-circle
                                        </v-icon>
                                        Indisponível
                                    </v-chip>
                                </div>
                                <div v-if="obra[0].situacao == 'indisponivel'">
                                    <v-chip style="position: absolute; left: 0;" class="ma-2" color="red" label
                                        text-color="white">
                                        <v-icon left>
                                            mdi-close-circle
                                        </v-icon>
                                        Indisponível
                                    </v-chip>
                                    <v-chip style="position: absolute; left: 0; top: 38px;"
                                        @click="dialogDisponivel = true" class="ma-2" color="white" label
                                        text-color="green">
                                        <v-icon left>
                                            mdi-check-circle
                                        </v-icon>
                                        Disponível
                                    </v-chip>
                                </div>
                                <button-editar :idObra="obra[0].id_obra" style="position: absolute; right: 0;"/>
                            </div>
                            <div v-else>
                                <v-chip style="position: absolute; left: 0" v-if="obra[0].situacao == 'disponivel'"
                                    class="ma-2" color="green" label text-color="white">
                                    <v-icon left>
                                        mdi-check-circle
                                    </v-icon>
                                    Disponível
                                </v-chip>
                                <v-chip style="position: absolute; left: 0" v-if="obra[0].situacao == 'indisponivel'"
                                    class="ma-2" color="red" label text-color="white">
                                    <v-icon left>
                                        mdi-close-circle
                                    </v-icon>
                                    Indisponível
                                </v-chip>
                            </div>

                        </div>
                        <div class="d-flex flex-wrap">
                            <v-chip @click="pesquisaGenero(genero.nome)" v-for="genero in generos" :key="genero.id_genero" :cols="genero.nome" class="ma-2" color="primary" label>
                                {{genero.nome}}
                            </v-chip>
                        </div>
                    </v-card>

                </v-col>
                <v-col>
                    <v-row no-gutters class="justify-space-between">
                        <v-col cols="12">
                            <v-text-field label="Título" readonly :value="obra[0].titulo">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="justify-space-between">
                        <v-col cols="12">
                            <v-text-field class="teste" label="Autores" readonly :value="autores.join(', ')">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="justify-space-between">
                        <v-col cols="12" sm="4">
                            <v-text-field label="ISBN" readonly :value="obra[0].isbn">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="7">
                            <v-text-field label="Editora" readonly :value="obra[0].editora">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="justify-space-between">
                        <v-col cols="12" sm="4">
                            <v-text-field label="Tipo" readonly :value="obra[0].tipo">
                            </v-text-field>
                        </v-col>
                        <v-col cols="5" sm="3">
                            <v-text-field label="Nº Páginas" readonly :value="obra[0].n_paginas">
                            </v-text-field>
                        </v-col>
                        <v-col cols="5" sm="3">
                            <v-text-field label="Nº Edição" readonly :value="obra[0].n_edicao">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="justify-space-between">
                        <v-col cols="12">
                            <v-textarea class="text-justify" auto-grow label="Sinopse" readonly :value="obra[0].sinopse"></v-textarea>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="dialogDisponivel" max-width="500px">
            <v-card>
                <v-card-title>{{ obra[0].titulo }} está disponível?</v-card-title>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogDisponivel = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="disponivel">Sim</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogIndisponivel" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Retirada</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <form @submit="salvarRetirada()">
                                    <v-row no-gutters class="justify-space-between">
                                        <v-col cols="12">
                                            <v-select :items="emails" item-text="email" v-model="email"
                                                label="Email da Pessoa"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="justify-space-between">
                                        <v-col cols="12" sm="5">
                                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                :return-value.sync="dateRetirada" transition="scale-transition" offset-y
                                                min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="dateRetirada" label="Data da Retirada"
                                                        hint="AAAA/DD/MM" prepend-icon="mdi-calendar" readonly
                                                        v-bind="attrs" v-on="on">
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="dateRetirada" no-title scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="menu = false">
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn text color="primary" @click="$refs.menu.save(dateRetirada)">
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="12" sm="5">
                                            <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                                                :return-value.sync="dateEntrega" transition="scale-transition" offset-y
                                                min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="dateEntrega" label="Data da Retirada"
                                                        hint="AAAA/DD/MM" prepend-icon="mdi-calendar" readonly
                                                        v-bind="attrs" v-on="on">
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="dateEntrega" no-title scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="menu2 = false">
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn text color="primary" @click="$refs.menu2.save(dateEntrega)">
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </form>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogIndisponivel = false">
                        FECHAR
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="salvarRetirada()">
                        SALVAR
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>


</template>
<script>
import api from '../api/api';
import ButtonEditar from './biblioComponents/ButtonEditar.vue';
export default {
    name: 'AppBibliotecaDetalhes',
    components: { ButtonEditar },
    mixins: [api],
    data() {
        return {
            dateRetirada: new Date(Date.now()).toISOString().substr(0, 10),
            dateEntrega: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10),

            menu: false,
            menu2: false,
            searchOnGoing: false,
            obra: {},
            generos: [],
            autores: [],
            emails: [],
            email: "",

            dialogDisponivel: false,
            dialogIndisponivel: false,
        };
    },
    created() {
        this.get(`/biblioteca/obra/${this.$route.params.id_obra}`).then((response) => {
            console.log(response.data);
            this.obra = response.data;
            this.get(`/biblioteca/generos/${this.$route.params.id_obra}`).then((response) => {
                console.log(response.data);
                this.generos = response.data;
                this.get(`/biblioteca/autores/${this.$route.params.id_obra}`).then((response) => {
                    console.log(response.data);
                    response.data.forEach(el => {
                        this.autores = this.autores.concat(el.nome)
                    })
                });
            });
        });

    },
    methods: {
        goBack() {
            this.$router.push("/biblioteca")
        },
        indiponivel() {
            console.log("OI");
        },
        disponivel() {
            this.put(`/biblioteca/statusdisp/${this.$route.params.id_obra}`, {}).then((response) => {
                console.log(response.data)
                this.$router.go()
            })
        },
        salvarRetirada() {
            this.put(`/biblioteca/status/${this.$route.params.id_obra}`, { email: this.email, data_retirada: this.dateRetirada, data_devolucao: this.dateEntrega }).then((response) => {
                console.log(response.data)
                this.$router.go()
            })
        },
        dialogIndisponivelF() {
            this.dialogIndisponivel = true;
            this.get(`/biblioteca/email`).then((response) => {
                console.log(response.data);
                this.emails = response.data;
                console.log(this.emails)
            })
        },
        pesquisaGenero(genero){
            this.$router.push("/biblioteca/obras/"+genero)
        }
    }
}
let params = new URL(location.href).searchParams.get('id_obra');
</script>
<style lang="scss" scoped>
  .v-text-field ::v-deep label {
    font-size: 20px;
}
</style>