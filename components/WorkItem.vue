<template>
    <div class="work-item">
      <img :src="thumbnail" :alt="title + ' by ' + author">
      <p class="work-item-title">{{title}}</p>
      <p class="work-item-author">by {{author}}</p>
    </div>
</template>

<script>
    export default {
        name: "WorkItem",
        props: ['thumbnail', 'id', 'author', 'title']
    }
</script>

<style scoped>

</style>
