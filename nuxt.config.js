module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  head: {
    title: 'Web collage experiment',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A webcollage app (server & frontend)' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lora|Source+Sans+Pro:300,600' }
    ]
  },
  loading: { color: '#3B8070' },
  modules: [
    ['nuxt-express-module', {
      expressPath: 'api',
      routesPath: 'api/routes.js'
    }],
    '@nuxtjs/axios',
  ],
  plugins: [
    { src: '~/plugins/vue-mrr-tool', ssr: false },
    { src: '~/plugins/vue-clip-tool', ssr: false }
  ],
  build: {
    vendor: ['@zipavlin/vue-mrr-tool', '@zipavlin/vue-clip-tool'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
};

