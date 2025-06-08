import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Security token for webhook authentication
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-secret-token';

export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${WEBHOOK_SECRET}`;
    
    if (authHeader !== expectedAuth) {
      console.error('Unauthorized webhook request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse webhook payload
    const payload = await request.json();
    console.log('Received webhook:', {
      timestamp: payload.timestamp,
      event: payload.event,
      dataCount: payload.data?.length || 0
    });

    // Validate payload structure
    if (!payload.data || !Array.isArray(payload.data)) {
      console.error('Invalid payload structure');
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Transform and validate task data
    const tasks = payload.data.map((task: Record<string, unknown>, index: number) => {
      return {
        id: task.id || index + 1,
        title: task.title || '',
        description: task.description || '',
        department: task.department || '',
        assignee: task.assignee || '',
        progress: Math.max(0, Math.min(100, parseInt(task.progress) || 0)),
        status: task.status || '',
        startDate: task.startDate || '',
        endDate: task.endDate || '',
        notes: task.notes || '',
        feedback: task.feedback || ''
      };
    }).filter(task => task.title.trim() !== ''); // Remove empty tasks

    console.log(`Processing ${tasks.length} valid tasks`);

    // Update tasks.ts file
    await updateTasksFile(tasks);

    // Trigger hot reload by touching a file (development only)
    if (process.env.NODE_ENV === 'development') {
      try {
        const triggerPath = join(process.cwd(), 'src/data/last-update.ts');
        writeFileSync(triggerPath, `export const lastUpdate = "${new Date().toISOString()}";`);
      } catch (error) {
        console.warn('Could not trigger hot reload:', error);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Updated ${tasks.length} tasks`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function updateTasksFile(tasks: Record<string, unknown>[]) {
  try {
    const tasksFilePath = join(process.cwd(), 'src/data/tasks.ts');
    
    // Generate TypeScript content
    const fileContent = `import { Task } from '@/types';

// Auto-generated from Google Sheets
// Last updated: ${new Date().toISOString()}

export const tasks: Task[] = ${JSON.stringify(tasks, null, 2)};
`;

    // Write to file
    writeFileSync(tasksFilePath, fileContent, 'utf8');
    console.log('Tasks file updated successfully');

  } catch (error) {
    console.error('Error updating tasks file:', error);
    throw error;
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Google Sheets Webhook Endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  });
}
