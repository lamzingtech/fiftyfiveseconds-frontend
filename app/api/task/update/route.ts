import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json(); // Parse JSON body
    const { email, uuid, task_id, status, in_s3_uri, out_s3_uri, times_run, skip } = body;

    if (!uuid) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedTask = await prisma.taskList.update({
      where: { uuid },
      data: { email, task_id, status, in_s3_uri, out_s3_uri, times_run, skip },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
