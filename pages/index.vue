<template>
  <div id="home">
    <section id="header-content">
      <h1><small>A Web Collage</small><br><big>Experiment</big></h1>
      <p>
        Like all <strike>weird</strike> peculiar projects, this one started with a story as well.
        <br><br>
        It is an experiment. A proof of concept, that we (and you) can (re)use online digital art in the form of web sites to create something new. A new work. A new piece of art.
        <br><br>
        All of this comes with some <a href="#disclaimer">limitations and quirks</a>. You can <a href="#footer">help</a> or just have fun and <nuxt-link to="/editor">create something new</nuxt-link>.
      </p>
      <a href="#list" class="btn">view collages</a>
    </section>
    <div id="header-image">
      <div class="dots"><span class="h">W<small>coll</small></span></div>
      <div class="dog">
        <div class="inner-wrap">
          <img src="/header-right.png" alt="Dog Collage. So much Wow!">
          <span class="h">E<small>x</small></span>
        </div>
      </div>
    </div>
    <section id="disclaimer">
      <h2 class="h" id="disclaimer-title">A Friendly Disclaimer</h2>
      <p id="disclaimer-content">
        Collages are assembled from different webpages. Opening one will load multiple websites, which can get quite data transfer intensive. <strong>You probably don’t want to open collages on your mobile data</strong> and would make more sense to check it out on desktop computer. Also: this is a ‘weekend’ project, so everything doesn’t work as it should.
        <a href="#home-footer">Click here to help</a>.
      </p>
    </section>
    <section id="collages">
      <h2 id="collages-title">
        <big>Collages</big>
        <hr>
        <small>Click on them to open <em>*duh*</em></small>
      </h2>
      <div id="collages-list">
        <nuxt-link v-for="(work, i) of works" :to="`/work/${work._id}`" class="collages-item" :key="i">
          <work-item :id="work._id" :thumbnail="work.thumbnail" :title="work.title" :author="work.author"></work-item>
        </nuxt-link>
        <div id="collages-cta">
          <p>
            Collages are sorted by date. There is no like button and no rating, so don’t be confused ... we just like everything. Actual works also look better than thumbnails on this page. <strong>Do you also want to show off?</strong>
          </p>
          <br>
          <nuxt-link to="/editor" class="btn">make your own web collage</nuxt-link>
        </div>
        <div id="collages-pagination" v-if="pages > 1">
          <button class="collages-pagination-btn" v-for="(p, i) in pagination" :key="i" :data-current="p === page" :data-active="p !== '...' && p !== page" @click="setPage(p)">{{p}}</button>
          <p><nuxt-link to="/works">or click here to view all collages</nuxt-link></p>
        </div>
      </div>
    </section>
    <div id="cat">
      <img src="/cat.png" alt="'If it fits i sits' - cat">
    </div>
    <section id="editor"></section>
    <section id="footer"></section>
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
        page: 1
      }
    },
    asyncData: async (context) => {
      let { data } = await context.app.$axios.get(`${context.env.baseUrl}/api/works/1`);
      if (data.code === 200) {
        return {
          count: data.payload.count,
          hasNext: data.payload.hasNext,
          hasPrev: data.payload.hasPrev,
          pages: data.payload.pages,
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
    computed: {
      pagination() {
        if (this.pages <= 3) {
          const r = [];
          for (let i = 1; i <= this.pages; i++) r.push(i);
          return r;
        } else {
          switch (this.page) {
            case 1:
            case 2:
                return [1, 2, 3, '...', this.pages];
                break;
            case 3:
                return [1, 2, 3, 4, '...', this.pages];
                break;
            case (this.pages - 2):
                return [1, '...', (this.pages - 3), (this.pages - 2), (this.pages - 1), this.pages];
                break;
            case (this.pages - 1):
            case (this.pages):
                return [1, '...', (this.pages - 2), (this.pages - 1), this.pages];
                break;
            default:
                return [1, '...', (this.page - 1), (this.current), (this.current + 1), '...', this.pages];
                break;
          }
        }
      }
    },
    watch: {
      page: async function () {
        let { data } = await this.$axios.get(`${window.location.origin}/api/works/${this.page}`);
        if (data.code === 200) {
          this.hasNext = data.payload.hasNext;
          this.hasPrev = data.payload.hasPrev;
          this.works = data.payload.posts.map(x => {
              x.thumbnail = `${window.location.origin}/thumbnails/${x.thumbnail}`;
              return x;
          });
        } else {
          this.works = [];
        }
        
      }
    },
    methods: {
      changeLoader() {
        const chars = ['|', '/', '—', '\\'];
        const index = chars.indexOf(this.loader) + 1;
        this.loader = chars[index < chars.length ? index : 0];
        setTimeout(function () {
            this.changeLoader();
        }.bind(this), 150);
      },
      setPage(page) {
        if (!isNaN(page)) this.page = page;
      }
    }
  }
</script>

<style scoped lang="scss">
  $yellow: rgba(250, 216, 73, 0.75);
  $pink: #F8A597;
  $gap: 12px;
  $column-width: calc((100vw - (11 * #{$gap})) / 12);
  #home {
    position: relative;
    display: grid;
    // define grid
    grid-template-columns: repeat(12, 1fr);
    column-gap: $gap;
    grid-template-rows: [header-start] auto [header-end disclaimer-start] auto [disclaimer-end list-start] auto [list-end editor-start] auto [editor-end footer-start] auto [footer-end];
    grid-template-areas: 
      "header-content header-content header-content header-content header-content header-content header-content header-image header-image header-image header-image header-image"
      "disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer"
      ". . . . list list list list list list list ."
      ". . . editor editor editor editor editor . . . ."
      "footer footer footer footer footer footer footer footer footer footer footer footer";
    
    
  }
  #header-content {
    display: grid;
    grid-area: header-content;
    padding-top: 72px;
    place-self: start stretch;
    grid-gap: $gap;
    grid-row-gap: 52px;
    // define grid
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: [header-title-start] auto [header-title-end header-body-start] auto [header-body-end header-cta-start] auto [header-cta-end];
    grid-template-areas:
      ". . header-content-title header-content-title header-content-title header-content-title header-content-title"
      ". . . header-content-body header-content-body header-content-body header-content-body"
      ". . . header-content-cta header-content-cta header-content-cta header-content-cta";
    place-items: start start;
    z-index: 1;
    h1 {
      grid-area: header-content-title;
      display: block;
      position: relative;
      font-size: 72px;
      line-height: 50px;
      small {
        font-size: 48px;
      }
      big {
        margin-left: 48px;
      }
      &:before {
        content: '';
        display: block;
        position: absolute;
        width: 664px;
        height: 122px;
        left: -152px;
        top: -28px;
        background: $yellow;
        mix-blend-mode: multiply;
      }
    }
    p {
      grid-area: header-content-body;
      position: relative;
      max-width: 430px;
      line-height: 33px;
      font-size: 20px;
      letter-spacing: -0.01em;
    }
    .btn {
      grid-area: header-content-cta;
      margin-left: -39px;
    }
  } 
  #header-image {
    grid-area: header-image;
    .dots {
      position: relative;
      height: 408px;
      background: url(/halftone.png);
      background-repeat: repeat-x;
      background-size: cover;
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
      overflow: hidden;
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
        white-space: nowrap;
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
  #disclaimer {
    grid-area: disclaimer;
    display: grid;
    position: relative;
    padding: 63px 0;
    margin-top: -129px;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      ". . disclaimer-title disclaimer-title disclaimer-title disclaimer-body disclaimer-body disclaimer-body disclaimer-body disclaimer-body disclaimer-body .";
    grid-gap: $gap;
    place-items: center stretch;
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
      grid-area: disclaimer-title;
      position: relative;
      font-size: 48px;
      line-height: 51px;
      padding-left: 10px;
    }
    &-content {
      grid-area: disclaimer-body;
      position: relative;
      font-size: 17px;
    }
  }
  #collages {
    grid-area: list;
    position: relative;
    margin-top: 30px;
    &-title {
      position: relative;
      margin-left: -52px;
      margin-bottom: 49px;
      big {
        font-size: 96px;
      }
      small {
        display: block;
        font-size: 36px;
        margin-top: -18px;
        margin-left: 50px;
        em {
          font-weight: normal;
          font-style: normal;
        }
      }
      hr {
        display: block;
        position: absolute;
        top: 110px;
        left: -30px;
        margin: 0;
        border: none;
        height: 3px;
        width: 252px;
        background-color: black;
      }
    }
    &-list {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(4, auto);
      grid-template-areas:
        "collages-item-1 collages-item-1 collages-item-1 collages-cta collages-cta collages-cta collages-cta"
        "collages-item-2 collages-item-2 collages-item-2 collages-item-3 collages-item-3 collages-item-3 ."
        "collages-item-4 collages-item-4 collages-item-4 collages-item-5 collages-item-5 collages-item-5 ."
        "collages-pagination collages-pagination collages-pagination collages-pagination collages-pagination collages-pagination .";
      grid-gap: $gap;
      grid-row-gap: $gap;
    }
    &-cta {
      grid-area: collages-cta;
      align-self: center;
      p {
        text-align: justify;
        max-width: 340px;
        line-height: 26px;
        font-size: 18px;
        padding-left: 27px;
      }
    }
    &-pagination {
      grid-area: collages-pagination;
      text-align: center;
      margin-top: 20px;
      button {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        width: 40px;
        height: 40px;
        line-height: 36px;
        text-align: center;
        background: none;
        border: 3px solid transparent;
        box-sizing: border-box;
        font-weight: bold;
        font-size: 18px;
        padding: 0;
        font-family: Roboto Slab, sans-serif;
        outline: none;
        &[data-active="true"] {
          cursor: pointer;
        }
        &[data-current="true"] {
          border-color: $pink;
        }
      }
      p {
        position: relative;
        font-size: 18px;
        margin-top: 17px;
      }
    }
    .collages-item {
      $left: 27px;
      position: relative;
      border: 3px solid $yellow;
      box-sizing: border-box;
      background-color: white;
      cursor: pointer;
      //box-shadow: 3px 3px 0 $yellow;
      &:nth-child(1) { grid-area: collages-item-1; }
      &:nth-child(2) { grid-area: collages-item-2; left: $left; }
      &:nth-child(3) { grid-area: collages-item-3; left: $left; }
      &:nth-child(4) { grid-area: collages-item-4; }
      &:nth-child(5) { grid-area: collages-item-5; }
    }
  }
  #cat {
    position: absolute;
    top: 0;
    left: 0;
    height: 1685px;
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
      width: $column-width;
      left: calc(#{$column-width} + #{$gap});
      top: 0;
      background-color: $pink;
    }
  }
  #editor {
    grid-area: editor;
  }
  #footer {
    grid-area: footer;
  }
</style>

