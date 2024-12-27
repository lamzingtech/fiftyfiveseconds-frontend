import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request
export async function GET() {
  try {
    const instanceStatuses = await prisma.instanceStatus.findMany();
    return NextResponse.json(instanceStatuses, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching InstanceStatus:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle PUT request
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
 
    const { status, public_ip, instance_id, request_id, cron_count, in_use, uuid } = body;

    // Validate the required fields
    if (!uuid) {
      return NextResponse.json({ error: 'UUID is required to update an InstanceStatus' }, { status: 400 });
    }

    const updatedInstanceStatus = await prisma.instanceStatus.update({
      where: { uuid },
      data: {
        status,
        public_ip,
        instance_id,
        request_id,
        in_use,
        cron_count,
      },
    });

    return NextResponse.json(updatedInstanceStatus, { status: 200 });
  } catch (error: any) {
    console.error('Error updating InstanceStatus:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
