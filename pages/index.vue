<template>
  <div id="home">
    <section id="home-header">
      <div class="row">
         <div class="col-sm-5 col-sm-offset-2" id="home-header-content">
           <h1><small>A Web Collage</small><br>Experiment</h1>
           <p>
             Like all <strike>weird</strike> peculiar projects, this one started with a story as well.
             <br><br>
             It is an experiment. A proof of concept, that we (and you) can (re)use online digital art in the form of web sites to create something new. A new work. A new piece of art.
             <br><br>
             All of this comes with some <a href="#home-disclaimer">limitations and quirks</a>. You can <a
             href="#home-footer">help</a> or just have fun and <nuxt-link to="/editor">create something new</nuxt-link>.
           </p>
           <br><br>
           <a href="#home-list" class="btn">view collages</a>
         </div>
        <div class="col-sm-5" id="home-header-image">
          <div class="dots"><span class="h">W<small>coll</small></span></div>
          <div class="dog">
            <img src="/header-right.png" alt="Dog Collage. So much Wow!">
            <span class="h">E<small>x</small></span>
          </div>
        </div>
      </div>
    </section>
    <section id="home-disclaimer"></section>
    <section id="home-list"></section>
    <section id="home-cat"></section>
    <section id="home-editor"></section>
    <section id="home-footer"></section>
    <div>
      <work-item v-for="(work, i) of works" :key="i" :id="work.id" :thumbnail="work.thumbnail" :title="work.title" :author="work.author"></work-item>
    </div>
  </div>
</template>

<script>
  import WorkItem from '~/components/WorkItem.vue'

  export default {
    components: {
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
  #home {}
  #home-header {
    position: relative;
    &-content {
      padding-top: 72px;
      h1 {
        display: block;
        position: relative;
        font-size: 72px;
        line-height: 50px;
        margin-bottom: 52px;
        small {
          font-size: 48px;
          margin-left: -48px;
        }
        &:before {
          content: '';
          display: block;
          position: absolute;
          width: 664px;
          height: 122px;
          left: -210px;
          top: -28px;
          background: rgba(250, 216, 73, 0.5);
          mix-blend-mode: multiply;
        }
      }
      p {
        position: relative;
        max-width: 430px;
        line-height: 33px;
        font-size: 20px;
        letter-spacing: -0.01em;
      }
      .btn {
        margin-left: -39px;
      }
    }
    &-image {
      .dots {
        position: relative;
        height: 408px;
        background: url(/dots.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: left bottom;
      }
      .dog {
        img {}
        .h {

          small {}
        }
      }
    }
  }
  #home-disclaimer {}
  #home-list {}
  #home-cat {}
  #home-editor {}
  #home-footer {}
</style>

