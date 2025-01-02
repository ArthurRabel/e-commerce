-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
