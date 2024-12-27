import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

      
    const instanceStatus = await prisma.instanceStatus.findUnique({
      where: { uuid: uuid }, // Ensure this matches your schema field name
    });

    if (!instanceStatus) {
      return NextResponse.json({ error: 'Instance status not found' }, { status: 404 });
    }

    return NextResponse.json(instanceStatus, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching instance status:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
