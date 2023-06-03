<template>
    <v-container fluid>
		<!--Panel de busqueda-->
        <v-row>
			<v-card elevation="2" width="100%" dense class="ml-5 mr-5" >
				<v-card-title>Búsqueda</v-card-title>
					<v-card-text>
						<v-form ref="formBusqueda" v-model="valid">
							<v-row>
								<v-col cols="12" md="4" sm="6">
									<v-text-field 
										v-model="filtro.numPersonal" 
										label="NDP"
										type="number"
										min="0"
										max="100"
										/>
									</v-col>
									<v-col cols="12" md="4" sm="6">
								    <v-text-field 
										v-model="filtro.nombre" 
										label="Nombre"
										maxlength="80"
										counter
										/> 
									</v-col>
									<v-col cols="12" md="4" sm="6">
									<v-text-field
									    v-model="filtro.apellidoPaterno" 
										label="Apellido Paterno" />
								</v-col>				
							</v-row>
						</v-form>
					</v-card-text>
				<v-card-actions>
				   <v-spacer></v-spacer>
					<v-btn rounded color="#1C4C96" dark small @click="onClickBuscar">
						<v-icon dark left> mdi-magnify</v-icon>
						Buscar
					</v-btn>
						
					<v-btn rounded color="orange" dark small @click="onClickLimpiar">
						<v-icon dark left> mdi-backspace</v-icon>
						Limpiar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-row>
		<!--Seccion tabla principal-->
		<v-row align="start" justify="start">
			<v-col cols="2">
				<v-btn rounded color="#1C4C96" @click="onClickNuevoPersonal">
					<v-icon dark left> mdi-plus </v-icon>
					Nuevo Personal
				</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-data-table
					:headers="encabezados"
					:items="datos"
					:items-per-page="5"
					class="ml-5 mr-5"
					dense
				>
				<template v-slot:item.acciones="{ item }">
					<row>
						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon v-bind="attrs" @click="onClickEditarPersonal(item)">
									<v-icon color="#1C4C96" v-on="on"> mdi mdi-pencil </v-icon>
								</v-btn>
							</template>
							<span>Editar</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon v-bind="attrs" @click="onClickEliminarPersonal(item)">
									<v-icon color="#ED3F15" v-on="on"> mdi mdi-delete </v-icon>
								</v-btn>
							</template>
							<span>Eliminar</span>
						</v-tooltip>
					</row>
				</template>
				<template v-slot:item.idPersonal="{ item }">
					<span class="font-weight-bold red--text">
						{{ item.idPersonal }}
					</span>
				</template>
			</v-data-table>
			</v-col>
		</v-row>
		

		<!--Seccion Detalle-->
		<v-row></v-row>
		
		<v-dialog
		v-model="dialogoPersonal"
		persistent
		max-width="600"
		transition="dialog-transition"
		>
			<v-card>
				<v-card-title>Personal</v-card-title>
				<v-card-text>
					<v-form ref="formPersonal" v-model="valid">
						<v-row align="center" justify="start">
							<v-col cols="12" md="6" sm="4">
								<v-text-field v-model="personal.nombre" label="Nombre"></v-text-field>
							</v-col>
							<v-col cols="12" md="6" sm="4">
								<v-text-field v-model="personal.apellidoPaterno" label="Apellido Paterno"></v-text-field>
							</v-col>
							<v-col cols="12" md="6" sm="4">
								<v-text-field v-model="personal.apellidoMaterno" label="Apellido Materno"></v-text-field>
							</v-col>
							<v-col cols="12" md="6" sm="4">
								<v-text-field v-model="personal.curp" label="CURP"></v-text-field>
							</v-col>
							<v-col cols="12" md="6" sm="4">
								<v-text-field v-model="personal.rfc" label="RFC"></v-text-field>
							</v-col>
							<v-col cols="12" md="6" sm="4"> 
								<v-select 
								:items="catPaises" 
								label="Pais" 
								item-value="id" 
								item-text="nombre"
								@change="changePais">
								</v-select>
							</v-col>
							<v-col cols="12" md="6" sm="4"> 
								<v-select 
								:items="catEstados" 
								label="Estados" 
								item-value="id" 
								item-text="nombre"
								@change="changeEstados">
								</v-select>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer/>
					<v-btn elevation="0" dark rounded width="120" class="green px13 font-weight-regular pr-4"
					small @click="onClickGuardarPersonal">
						<v-icon left>mdi-check </v-icon>Guardar
					</v-btn>
					<v-btn elevation="0" rounded text width="100" class="red--text px13 font-weight-bold"
					small @click="onClickCerrarPersonal">
						<v-icon left> mdi mdi-close-circle</v-icon>Cerrar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
    </v-container>
</template>
<script>
export default {
	 name: "Pagina2",
	 props: {},
	 data(){
		return{
			valid: false,
			filtro:{
				numPersonal:null,
				nombre:null,
				apellidoPaterno:null,
			},
			encabezados:[
			{
				text: "Acciones",
				value: "acciones",
				sortable: false,
				windth: 100,
				},
				{
				text: "NDP",
				value: "idPersonal",
				aling: "start",
				sortable: true,
				windth: 255,
				},
				{
				text: "Nombre",
				value: "name",
				aling: "start",
				sortable: true,
				windth: 255,
				},
				{
				text: "Apellido Paterno",
				value: "apellidoPaterno",
				aling: "start",
				sortable: true,
				windth: 255,
				},
				{
				text: "Apellido Materno",
				value: "apellidoMaterno",
				aling: "start",
				sortable: true,
				windth: 255,
				},
				{
				text: "CURP",
				value: "curp",
				aling: "start",
				sortable: true,
				windth: 255,
				},
				{
				text: "NRC",
				value: "nrc",
				aling: "start",
				sortable: true,
				windth: 255,
				},
				{
				text: "Fecha de Nacimiento",
				value: "fechaNacimiento",
				aling: "start",
				sortable: true,
				windth: 255,
				},
				{
				text: "Sexo",
				value: "sexo",
				aling: "start",
				sortable: true,
				windth: 255,
				},
			],
			datos:[
				{
				idPersonal:'11223',
				sexo: 'F',
				fechaNacimiento: '11/09/2001',
				rfc: 'DFD234',
				curp: 'CP24DF3',
				apellidoPaterno: 'Baizabal',
				apellidoMaterno: 'Pacheco',
				nombre: 'Carol Celina',
				},	
			],
			dialogoPersonal: false,
			personal:{
				idPersonal:null,
				nombre: null,
				apellidoPaterno:null,
				apellidoMaterno:null,
				rfc:null,
				curp:null,
				sexo:null,
				fechaNacimiento:null,
			},
			catPaises: [
				{id:1, nombre:'Mexico'},
				{id:56, nombre:'Brazil'},
				{id:12, nombre:'Argentina'},
				{id:20, nombre:'Colombia'},
		    ],
			//estandariza r y regresar dos elementos en el proyecto
			catEstados: [

		    ],
		};
	 },
	 created(){},
	 mounted(){},
	 computed: {},
	 watch: {},
	 methods: {
		onClickBuscar(){},
		onClickLimpiar(){
			this.$refs.formBusqueda.reset();
		},
		onClickNuevoPersonal(){
			this.dialogoPersonal = true;
		},
		onClickEditarPersonal(item){
			this.personal={...item}
			this.dialogoPersonal = true;
		},
		onClickEliminarPersonal(item){
		},
		onClickGuardarPersonal(){},
		onClickCerrarPersonal(){
			this.$refs.formPersonal.reset();
			this.dialogoPersonal = false;
		},
		changePais(value){
			if(value==1){
				this.catEstados=[
					{id:1, nombre:'Veracruz'},
					{id:2, nombre:'Colimna'},
					{id:3, nombre:'Tampico'},
					{id:4, nombre:'Puebla'},
				];
				//Servicios web mediante un Sp
			}
			if(value==56){
				this.catEstados=[
					{id:1, nombre:'B1'},
					{id:2, nombre:'B2'},
					{id:3, nombre:'B3'},
					{id:4, nombre:'B4'},
				];
			}
		}

	 },
}
</script>

<style>

</style>