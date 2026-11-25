type PostCSSConfig = {
  plugins: Record<string, Record<string, never>>;
};

const config: PostCSSConfig = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
