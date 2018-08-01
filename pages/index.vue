<template>
  <div id="home">
    <section id="home-header">
      <div class="row">
         <div class="col-md-3 col-md-offset-3 col-sm-5 col-sm-offset-2" id="home-header-content">
           <h1><small>A Web Collage</small><br>Experiment</h1>
           <p>
             Like all <strike>weird</strike> peculiar projects, this one started with a story as well.
             <br><br>
             It is an experiment. A proof of concept, that we (and you) can (re)use online digital art in the form of web sites to create something new. A new work. A new piece of art.
             <br><br>
             All of this comes with some <a href="#home-disclaimer">limitations and quirks</a>. You can <a href="#home-footer">help</a> or just have fun and <nuxt-link to="/editor">create something new</nuxt-link>.
           </p>
           <br><br>
           <a href="#home-list" class="btn">view collages</a>
         </div>
        <div class="col-md-6 col-sm-5" id="home-header-image">
          <div class="dots"><span class="h">W<small>coll</small></span></div>
          <div class="dog row center-sm">
            <div class="inner-wrap">
              <img src="/header-right.png" alt="Dog Collage. So much Wow!">
              <span class="h">E<small>x</small></span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="home-disclaimer">
      <div class="row">
        <div class="col-md-8 col-md-offset-3 col-sm-9 col-sm-offset-2 row middle-sm">
          <h2 class="h col-sm-3" id="home-disclaimer-title">A Friendly Disclaimer</h2>
          <p class="col-sm-9" id="home-disclaimer-content">
            Collages are assembled from different webpages. Opening one will load multiple websites, which can get quite data transfer intensive. <strong>You probably don’t want to open collages on your mobile data</strong> and would make more sense to check it out on desktop computer. Also: this is a ‘weekend’ project, so everything doesn’t work as it should.
            <a href="#home-footer">Click here to help</a>.
          </p>
        </div>
      </div>
    </section>
    <section id="home-list"></section>
    <section id="home-cat">
      <img src="/cat.png" alt="'If it fits i sits' - cat">
    </section>
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
  $yellow: rgba(250, 216, 73, 0.75);
  $pink: #F8A597;
  #home {
    position: relative;
  }
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
          background: $yellow;
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
        background: url(/halftone.png);
        background-repeat: repeat-x;
        background-size: contain;
        background-position: left bottom;
        .h {
          position: absolute;
          bottom: -60px;
          left: -60px;
          font-size: 288px;
          color: white;
          small {
            font-size: 180px;
            margin-left: -40px;
          }
        }
      }
      .dog {
        position: relative;
        margin-top: -160px;
        img {
          position: relative;
          z-index: 1;
        }
        .h {
          position: relative;
          font-size: 288px;
          margin-left: -90px;
          bottom: 50px;
          small {
            font-size: 180px;
            color: #F8A597;
            margin-left: -52px;
          }
        }
        .inner-wrap {
          position: relative;
          &:after {
            content: '';
            position: absolute;
            display: block;
            width: 474px;
            height: 65px;
            top: 80px;
            left: 130px;
            background-image: linear-gradient(to right, $yellow 80%, rgba(250, 216, 73, 0) 100%);
            mix-blend-mode: multiply;
            z-index: 2;
          }
        }
      }
    }
  }
  #home-disclaimer {
    position: relative;
    padding: 63px 0;
    margin-top: -129px;
    &:before {
      $padding: 26px;
      content: '';
      position: absolute;
      display: block;
      top: 0;
      left: $padding;
      width: calc(100% - (#{$padding} * 2));
      height: 100%;
      background-color: $yellow;
    }
    &-title {
      position: relative;
      font-size: 48px;
      line-height: 51px;
    }
    &-content {
      position: relative;
    }
  }
  #home-list {}
  #home-cat {
    $img-top: 1269px;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(#{$img-top} + 356px);
    img {
      position: absolute;
      display: block;
      left: 0;
      bottom: 0;
    }
    &:before {
      content: '';
      position: absolute;
      display: block;
      height: calc(100% - 150px);
      width: 101px;
      left: 120px;
      top: 0;
      background-color: $pink;
    }
  }
  #home-editor {}
  #home-footer {}
</style>

