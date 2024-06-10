const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Bratzos" },
                { name: "Sorelos" },
                { name: "Jordash" },
                { name: "Dynos" },
                { name: "Stankios" },
                { name: "Marcelos" },
                { name: "Krepullian" },
            ]
        });

        console.log("Success");
    } catch {
        console.log("Error seeding the database categories", error);

    } finally {
        await database.$disconnect();
    }
}

main();