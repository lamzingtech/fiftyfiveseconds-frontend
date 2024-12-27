import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle POST request
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json(); // Parse JSON body
    const { uuid, num_count, debug_log } = body;

    // Validate required fields
    if (!uuid || num_count === undefined || debug_log === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: uuid, num_count, and debug_log are mandatory' },
        { status: 400 }
      );
    }

    // Create a new DebugLogs record
    const newDebugLog = await prisma.debugLogs.create({
      data: {
        uuid,
        num_count,
        debug_log,
      },
    });

    return NextResponse.json(newDebugLog, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating debug log:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
