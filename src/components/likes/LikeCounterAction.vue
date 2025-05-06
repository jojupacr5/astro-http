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
import { actions } from 'astro:actions';

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

const likePost = async () => {
  // Logic to like a post
  likeCount.value += 1;
  likeClicks.value += 1;

  const { data, error } = await actions.getGreeting({
    age: 20,
    name: 'John Doe',
    isActive: true,
  })

  if( error ) {
    console.error('Algo salio mal', error);
    return;
  }

  console.log(data);
};

const getCurrentLikes = async () => {
  const { data, error } = await actions.getPostLikes( props.postId );

  if( error ) {
    return alert(error);
  }
  
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