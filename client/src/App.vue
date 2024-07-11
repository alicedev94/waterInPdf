<template>
  <div>
    <input type="file" name="pdfFile" @change="handleChange" />
    <button @click="handleClick">Enviar al backend</button>
    <!-- <button @click="ExeDonwload">Descargar archivo modificado</button> -->
    <a :href="'http://localhost:3000/download/' + nameStaticFile">Descargar</a>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const staticFile = ref(null)
const nameStaticFile = ref('')

const handleChange = (e) => {
  let file = e.target.files[0];
  staticFile.value = file;
  nameStaticFile.value = staticFile.value.name;
}

const handleClick = async () => {
  const formData = new FormData();
  const fileToUpload = staticFile.value;
  formData.append('filePdf', fileToUpload);
  const { data } = await axios.post('http://localhost:3000/upload', formData);
  return data
}
</script>
