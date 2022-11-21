import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/home/HomePage.vue';
import LoginPage from './components/login/LoginPage.vue';
import LogoutPage from './components/login/LogoutPage.vue';
import SetPerfilPage from './components/login/SetPerfilPage.vue';
import Cursos from './components/curso/AppCursos.vue';
import CursosDetalhes from './components/curso/AppCursosDetalhes.vue';
import ArmariosCurso from './components/armarios/AppArmariosCurso.vue';
import ArmariosCursoDetalhes from './components/armarios/AppArmariosCursoDetalhes.vue';
import Alunos from './components/alunos/AppAlunos.vue';
import Biblioteca from './components/biblioteca/AppBiblioteca.vue';
import BibliotecaDetalhes from './components/biblioteca/AppBibliotecaDetalhes.vue';
import BibliotecaPesquisa from './components/biblioteca/AppBibliotecaPesquisa';
import BibliotecaGenero from './components/biblioteca/bibliotecaria/AppBibliotecaGenero';
import BibliotecaEditora from './components/biblioteca/AppBibliotecaEditora';
import BibliotecaAutor from './components/biblioteca/bibliotecaria/AppBibliotecaAutor';

Vue.use(Router);

const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/logout', name: 'logout', component: LogoutPage },
    { path: '/setperfil', name: 'setperfil', component: SetPerfilPage },
    { path: '/cursos', name: 'cursos', component: Cursos },
    { path: '/curso/:id_curso', name: 'cursosDetalhes', component: CursosDetalhes },
    { path: '/curso/armarios/:id_curso', name: 'armariosCurso', component: ArmariosCurso },
    { path: '/curso/armario/:id_curso/:id_armario', name: 'armariosCursoDetalhes', component: ArmariosCursoDetalhes},
    { path: '/alunos', name: 'alunos', component: Alunos },
    { path: '/biblioteca', name: 'biblioteca', component: Biblioteca },
    { path: '/biblioteca/obra/:id_obra', name: 'bibliotecaDetalhes', component: BibliotecaDetalhes },
    { path: '/biblioteca/obras/:search', name: 'bibliotecaPesquisa', component: BibliotecaPesquisa },
    { path: '/biblioteca/obras/', name: 'bibliotecaPesquisaNull', component: BibliotecaPesquisa },
    { path: '/biblioteca/genero', name: 'bibliotecaGenero', component: BibliotecaGenero },
    { path: '/biblioteca/editora', name: 'bibliotecaEditora', component: BibliotecaEditora },
    { path: '/biblioteca/autor', name: 'bibliotecaAutor', component: BibliotecaAutor },
];

export default new Router({
    routes,
});

