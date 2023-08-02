<template>
  <div>
    app page
  </div>
</template>

<script setup lang="ts">
const xhr = new XMLHttpRequest()
xhr.open('GET', '/api/users')
xhr.onload = () => {
  console.log(xhr.responseText)
}
xhr.send()
</script>
