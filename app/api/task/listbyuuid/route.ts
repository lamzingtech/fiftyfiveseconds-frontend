import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request to fetch a task by uuid
export async function GET(req: NextRequest) {
  try {
    // Extract the uuid from the query parameters
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid'); // Get 'uuid' parameter

    if (!uuid) {
      return NextResponse.json(
        { error: 'UUID parameter is required' },
        { status: 400 }
      );
    }

    // Fetch the task by uuid
    const task = await prisma.taskList.findUnique({
      where: {
        uuid: uuid, // Use the uuid to fetch the task
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching task:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
