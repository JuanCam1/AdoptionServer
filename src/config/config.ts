type EnvConfig = {
  TOKEN_SECRET: string;
  PORT: string;
};

const config: EnvConfig = {
  PORT: Bun.env.PORT || "",
  TOKEN_SECRET: Bun.env.TOKEN_SECRET || "",
};

export default config;
