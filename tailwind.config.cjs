module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-night': "url('./src/assets/bg-night.jpg')",
        'bg-daytime': "url('./src/assets/bg-daytime.png')",
        'bg-cloud-daytime': "url('./src/assets/bg-cloud-daytime.png')",
      }
    },
  },
  plugins: [],
}