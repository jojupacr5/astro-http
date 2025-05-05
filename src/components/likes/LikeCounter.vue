<template>
  <button @click="likePost">
    Like Counter
  </button>
</template>

<script lang="ts" setup>

const likePost = () => {
  // Logic to like a post
  console.log("Post liked!");
};

</script>

<style scoped>
button {
  background-color: #5e51bc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #4a3f9a;
}
</style>