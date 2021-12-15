import "reflect-metadata";
import app from "./app";
import connectDb from "./connectDb";

const main = async () => {
  const port = process.env.PORT || 5000;

  await connectDb();

  app.listen({ port }, () => console.log(`🚀 Server ready and listening at ==> http://localhost:${port}`));
};

main().catch((error) => console.log("🛑 Error:", error));
