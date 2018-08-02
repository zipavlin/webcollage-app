<template>
    <div class="work-item">
      <img :src="thumbnail" class="work-item-image" :alt="title + ' by ' + author">
      <p class="work-item-title">{{title}} by {{author}}</p>
    </div>
</template>

<script>
    export default {
        name: "WorkItem",
        props: ['thumbnail', 'id', 'author', 'title']
    }
</script>

<style lang="scss">
    .work-item {
        &-image {
            display: block;
            position: relative;
            width: 100%;
            height: auto;
            object-fit: cover;
            object-position: center center;
        }
        &-title {
            position: absolute;
            display: block;
            line-height: 23px;
            font-size: 14px;
            color: #FFFFFF;
            background-color: black;
            padding: 9px 19px 9px 9px;
            bottom: 12px;
            left: -7px;
            font-style: normal;
            font-weight: normal;
        }
    }
</style>
