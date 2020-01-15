module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/global.scss";', // on fail, run npm rebuild node-sass.
      },
    },
  },
};
