
import { createApp } from "./app";

const app = createApp().listen({
    port: 3000,
    hostname: "0.0.0.0",
  });

console.log(`🔥 Server running at http://localhost:3000`);

