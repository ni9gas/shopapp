import { readFileSync } from "fs";
import { createServer } from "https";
import next from "next";
const PORT = process.env.PORT || 3000;
const app = next({ dev: true, hostname: "0.0.0.0", port: PORT });
const handle = app.getRequestHandler();
const httpsOptions = {
  key: readFileSync("key.pem"),
  cert: readFileSync("cert.pem"),
};
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    handle(req, res);
  }).listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Next.js running at https://38.46.220.9:${PORT}`);
  });
});
