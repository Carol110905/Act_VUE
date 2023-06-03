<template>
    <div>
    <span>{{ msj }}</span>
    <button @click="mensajeReverso">Mensaje Reverso</button>
	</div>
</template>
<script>
export default {
	 name: "Principal",
	 props: {},
	 data(){
		return{
                msj:"Hola soy la pagina principal",
		}
	},
		 created(){},
		 mounted(){},
		 computed: {},
		 watch: {},
		 methods: {
            mensajeReverso(){
                console.log("Hola...:D")
                this.msj = this.msj.split("").reverse().join("");
            },
         },
}
</script>

<style>

</style>