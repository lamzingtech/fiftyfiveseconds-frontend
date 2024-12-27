import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, uuid, task_id, status, in_s3_uri, out_s3_uri, times_run, skip, summary } = await req.json();

    if (!email || !uuid || !task_id ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
   
    const task = await prisma.taskList.create({
      data: {
        email,
        uuid,
        task_id,
        status,
        in_s3_uri,
        out_s3_uri,
        times_run,
        skip,
        summary
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
