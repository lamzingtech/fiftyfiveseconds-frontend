import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request
export async function GET(req: NextRequest) {
    try {
        // Extract the query parameter from the URL
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status'); // Get the 'status' parameter

        // Convert the status parameter to a boolean if it's a valid string "true" or "false"
        const isStatusValidBoolean = status === 'true' || status === 'false';
        const statusBoolean = isStatusValidBoolean ? status === 'true' : undefined;

        // Build the filter condition dynamically
        const filter: any = {};
        if (statusBoolean !== undefined) {
            filter.status = statusBoolean;
        }


        // Fetch data with the dynamic filter
        const tlist = await prisma.taskList.findMany({
            where: filter,
        });

        return NextResponse.json(tlist, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching task list:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
