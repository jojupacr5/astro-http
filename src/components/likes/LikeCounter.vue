<template>

  <div v-if="isLoading">
    Loading...
  </div>

  <button v-else-if="likeCount === 0" @click="likePost">
    Like this post
  </button>

  <button v-else @click="likePost">
    Likes {{ likeCount }}
  </button>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Pops {
  postId: string;
}

const props = defineProps<Pops>();
const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch( likeCount, () => {
  fetch(`/api/posts/likes/${props.postId}`, {
    method: 'PUT',
    body: JSON.stringify({ likes: likeClicks.value }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  likeClicks.value = 0;
});

const likePost = () => {
  // Logic to like a post
  likeCount.value += 1;
  likeClicks.value += 1;
};

const getCurrentLikes = async () => {
  const resp = await fetch(`/api/posts/likes/${props.postId}`);
  if(!resp.ok) return;

  const data = await resp.json();
  likeCount.value = data.likes;
  isLoading.value = false;
}

getCurrentLikes();

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