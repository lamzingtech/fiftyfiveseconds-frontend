-- CreateTable
CREATE TABLE "TaskList" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "status" BOOLEAN,
    "in_s3_uri" TEXT,
    "out_s3_uri" TEXT,
    "times_run" INTEGER,
    "skip" BOOLEAN,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstanceStatus" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "public_ip" TEXT NOT NULL,
    "instance_id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "cron_count" TEXT NOT NULL,
    "in_use" BOOLEAN NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstanceStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebugLogs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "num_count" INTEGER NOT NULL,
    "debug_log" JSONB NOT NULL,

    CONSTRAINT "DebugLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskList_uuid_key" ON "TaskList"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "InstanceStatus_public_ip_key" ON "InstanceStatus"("public_ip");

-- CreateIndex
CREATE UNIQUE INDEX "InstanceStatus_uuid_key" ON "InstanceStatus"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "DebugLogs_uuid_key" ON "DebugLogs"("uuid");
