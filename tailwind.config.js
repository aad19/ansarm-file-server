module.exports = {
    content: [
      './src/app/**/*.{js,jsx,ts,tsx}',
      './src/components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
      },
    },
    plugins: [],
    corePlugins: {
      preflight: process.env.NODE_ENV === 'production' ? false : true, 
  }
}