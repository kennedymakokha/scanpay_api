declare namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      JWT_SECRET: string;
    }
  }