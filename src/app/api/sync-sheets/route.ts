import { NextRequest, NextResponse } from 'next/server';
import { readGoogleSheet, testGoogleSheetsConnection } from '@/lib/google-sheets';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Configuration
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const SHEET_RANGE = process.env.SHEET_RANGE || 'Tasks!A:K'; // Default range

export async function GET() {
  try {
    // Check if Google Sheet ID is configured
    if (!GOOGLE_SHEET_ID) {
      return NextResponse.json({ 
        error: 'Google Sheet ID not configured',
        message: 'Please set GOOGLE_SHEET_ID in environment variables'
      }, { status: 400 });
    }

    console.log('Starting Google Sheets sync...');
    console.log('Sheet ID:', GOOGLE_SHEET_ID);
    console.log('Range:', SHEET_RANGE);

    // Test connection first
    const connectionTest = await testGoogleSheetsConnection(GOOGLE_SHEET_ID);
    if (!connectionTest) {
      return NextResponse.json({ 
        error: 'Failed to connect to Google Sheets',
        message: 'Please check your service account credentials and sheet permissions'
      }, { status: 500 });
    }

    // Read data from Google Sheets
    const tasks = await readGoogleSheet(GOOGLE_SHEET_ID, SHEET_RANGE);
    
    console.log(`Successfully read ${tasks.length} tasks from Google Sheets`);

    // Update local tasks file
    await updateTasksFile(tasks);

    // Trigger hot reload in development
    try {
      const triggerPath = join(process.cwd(), 'src/data/last-update.ts');
      writeFileSync(triggerPath, `export const lastUpdate = "${new Date().toISOString()}";`);
    } catch (error) {
      console.warn('Could not trigger hot reload:', error);
    }

    return NextResponse.json({ 
      success: true,
      message: `Successfully synced ${tasks.length} tasks from Google Sheets`,
      timestamp: new Date().toISOString(),
      tasksCount: tasks.length,
      sheetId: GOOGLE_SHEET_ID,
      range: SHEET_RANGE
    });

  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ 
      error: 'Sync failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Allow manual sync with custom parameters
    const body = await request.json();
    const sheetId = body.sheetId || GOOGLE_SHEET_ID;
    const range = body.range || SHEET_RANGE;

    if (!sheetId) {
      return NextResponse.json({ 
        error: 'Sheet ID required',
        message: 'Please provide sheetId in request body or set GOOGLE_SHEET_ID environment variable'
      }, { status: 400 });
    }

    console.log('Manual sync requested...');
    console.log('Sheet ID:', sheetId);
    console.log('Range:', range);

    // Test connection
    const connectionTest = await testGoogleSheetsConnection(sheetId);
    if (!connectionTest) {
      return NextResponse.json({ 
        error: 'Failed to connect to Google Sheets',
        message: 'Please check sheet ID and permissions'
      }, { status: 500 });
    }

    // Read and update
    const tasks = await readGoogleSheet(sheetId, range);
    await updateTasksFile(tasks);

    // Trigger hot reload
    try {
      const triggerPath = join(process.cwd(), 'src/data/last-update.ts');
      writeFileSync(triggerPath, `export const lastUpdate = "${new Date().toISOString()}";`);
    } catch (error) {
      console.warn('Could not trigger hot reload:', error);
    }

    return NextResponse.json({ 
      success: true,
      message: `Manual sync completed: ${tasks.length} tasks`,
      timestamp: new Date().toISOString(),
      tasksCount: tasks.length
    });

  } catch (error) {
    console.error('Manual sync error:', error);
    return NextResponse.json({ 
      error: 'Manual sync failed',
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
// Total tasks: ${tasks.length}

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
