import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities:["src/**/*.entity.ts"],
    // entities:[join(__dirname, '**', '*.entity.{ts,js}')],
    migrations :["src/migrations/*.ts"]
})
export default AppDataSource;
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
