-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
