import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
    .then((res) => {
        console.info("DB connection established");
        server.listen(PORT, () => console.info(`Server listening on port ${PORT}`))
}).catch((error: unknown) => console.error(error));
