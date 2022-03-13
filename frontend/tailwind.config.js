module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary
        bright_blue: "hsl(220, 98%, 61%)",
        gradient_1: "hsl(192, 100%, 67%)",
        gradient_2: "hsl(280, 87%, 65%)",

        // Light Theme
        very_light_gray: "hsl(0, 0%, 98%)",
        very_light_grayish_blue: "hsl(236, 33%, 92%)",
        light_grayish_blue: "hsl(233, 11%, 84%)",
        dark_grayish_blue: "hsl(236, 9%, 61%)",
        very_dark_grayish_blue: "hsl(235, 19%, 35%)",

        // Dark Theme
        very_dark_blue: "hsl(235, 21%, 11%)",
        very_dark_desaturated_blue: "hsl(235, 24%, 19%)",
        light_grayish_blue: "hsl(234, 39%, 85%)",
        dark_grayish_blue: "hsl(234, 11%, 52%)",
        very_dark_grayish_blue: "hsl(233, 14%, 35%)",
      },
    },
  },
  plugins: [],
};
