<template>
  <section class="container">
    <image-header :image="headerImage">
      <h1><span class="box">{{loader}}</span>A Web Collage Experiment</h1>
      <p class="big">Write some story about collages , bla, bla bla It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
    </image-header>
    <div>
      <work-item v-for="(work, i) of works" :key="i" :id="work.id" :thumbnail="work.thumbnail" :title="work.title" :author="work.author"></work-item>
    </div>
  </section>
</template>

<script>
  import WorkItem from '~/components/WorkItem.vue'
  import ImageHeader from '~/components/ImageHeader.vue'

  export default {
    components: {
      ImageHeader,
      WorkItem
    },
    data() {
      return {
        headerImage: '/pattern3.jpg', // http://thepatternlibrary.com/#magnus-2050,
        loader: '|'
      }
    },
    asyncData: async (context) => {
      let { data } = await context.app.$axios.get(`${context.env.baseUrl}/api/works`);
      if (data.code === 200) {
        return {
          works: data.payload.posts.map(x => {
            x.thumbnail = `${context.env.baseUrl}/thumbnails/${x.thumbnail}`;
            return x;
          })
        };
      } else {
        return { works: [] };
      }
    },
    mounted() {
      this.changeLoader();
    },
    methods: {
      changeLoader() {
        const chars = ['|', '/', '—', '\\'];
        const index = chars.indexOf(this.loader) + 1;
        this.loader = chars[index < chars.length ? index : 0];
        setTimeout(function () {
            this.changeLoader();
        }.bind(this), 150);
      }
    }
  }
</script>

<style scoped lang="scss">
  .box {
    display: inline-block;
    position: relative;
    vertical-align: top;
    font-weight: 600;
    padding: 1em;
    top: 10px;
    min-width: 3.5em;
    margin-right: 20px;
    text-align: center;
    font-size: 1.1rem;
    background-color: black;
    color: white;
    height: 100%;
  }
</style>

