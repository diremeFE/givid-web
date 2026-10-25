-- CreateTable
CREATE TABLE "MaintenanceLog" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "contactFormOk" BOOLEAN NOT NULL DEFAULT false,
    "brokenLinksOk" BOOLEAN NOT NULL DEFAULT false,
    "languagesOk" BOOLEAN NOT NULL DEFAULT false,
    "sslOk" BOOLEAN NOT NULL DEFAULT false,
    "speedOk" BOOLEAN NOT NULL DEFAULT false,
    "searchConsoleOk" BOOLEAN NOT NULL DEFAULT false,
    "securityUpdatesOk" BOOLEAN NOT NULL DEFAULT false,
    "backupsOk" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaintenanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaintenanceLog_month_key" ON "MaintenanceLog"("month");
