import { google } from 'googleapis';
import { Task } from '@/types';
import path from 'path';

// Google Sheets configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Get service account credentials
 */
function getServiceAccountCredentials() {
  // Try environment variable first (for production)
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    try {
      return JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, 'base64').toString());
    } catch (error) {
      console.error('Error parsing service account from environment:', error);
    }
  }

  // Fallback to file (for development)
  try {
    const SERVICE_ACCOUNT_PATH = path.join(process.cwd(), 'credentials', 'service-account.json');
    return require(SERVICE_ACCOUNT_PATH);
  } catch (error) {
    console.error('Error loading service account file:', error);
    throw new Error('Service account credentials not found');
  }
}

/**
 * Initialize Google Sheets API client
 */
export async function getGoogleSheetsClient() {
  try {
    const credentials = getServiceAccountCredentials();

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw error;
  }
}

/**
 * Read data from Google Sheets
 */
export async function readGoogleSheet(spreadsheetId: string, range: string): Promise<Task[]> {
  try {
    const sheets = await getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found in sheet');
      return [];
    }

    // First row contains headers
    const headers = rows[0].map(header => header.toLowerCase().trim());
    const tasks: Task[] = [];

    // Process each data row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const task: Partial<Task> = {};

      // Map each column to task properties
      headers.forEach((header, index) => {
        const value = row[index] || '';
        
        switch (header) {
          case 'id':
            task.id = parseInt(value) || i;
            break;
          case 'title':
          case 'tiêu đề':
          case 'công việc':
            task.title = value;
            break;
          case 'description':
          case 'mô tả':
          case 'chi tiết':
            task.description = value;
            break;
          case 'department':
          case 'phòng ban':
          case 'bộ phận':
            task.department = value;
            break;
          case 'assignee':
          case 'người thực hiện':
          case 'phụ trách':
            task.assignee = value;
            break;
          case 'progress':
          case 'tiến độ':
          case '%':
            task.progress = Math.max(0, Math.min(100, parseInt(value) || 0));
            break;
          case 'status':
          case 'trạng thái':
            task.status = value;
            break;
          case 'start_date':
          case 'startdate':
          case 'ngày bắt đầu':
            task.startDate = formatDate(value);
            break;
          case 'end_date':
          case 'enddate':
          case 'deadline':
          case 'ngày kết thúc':
            task.endDate = formatDate(value);
            break;
          case 'notes':
          case 'ghi chú':
          case 'vướng mắc':
            task.notes = value;
            break;
          case 'feedback':
          case 'nhận xét':
            task.feedback = value;
            break;
        }
      });

      // Only add task if it has a title
      if (task.title && task.title.trim() !== '') {
        tasks.push({
          id: task.id || i,
          title: task.title || '',
          description: task.description || '',
          department: task.department || '',
          assignee: task.assignee || '',
          progress: task.progress || 0,
          status: task.status || '',
          startDate: task.startDate || '',
          endDate: task.endDate || '',
          notes: task.notes || '',
          feedback: task.feedback || ''
        });
      }
    }

    console.log(`Successfully read ${tasks.length} tasks from Google Sheets`);
    return tasks;

  } catch (error) {
    console.error('Error reading Google Sheet:', error);
    throw error;
  }
}

/**
 * Write data to Google Sheets
 */
export async function writeGoogleSheet(
  spreadsheetId: string, 
  range: string, 
  tasks: Task[]
): Promise<void> {
  try {
    const sheets = await getGoogleSheetsClient();

    // Prepare headers
    const headers = [
      'ID', 'Title', 'Description', 'Department', 'Assignee', 
      'Progress', 'Status', 'Start_Date', 'End_Date', 'Notes', 'Feedback'
    ];

    // Prepare data rows
    const rows = tasks.map(task => [
      task.id,
      task.title,
      task.description,
      task.department,
      task.assignee,
      task.progress,
      task.status,
      task.startDate,
      task.endDate,
      task.notes,
      task.feedback
    ]);

    // Combine headers and data
    const values = [headers, ...rows];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log(`Successfully wrote ${tasks.length} tasks to Google Sheets`);

  } catch (error) {
    console.error('Error writing to Google Sheet:', error);
    throw error;
  }
}

/**
 * Format date from various formats to dd/MM/yyyy
 */
function formatDate(dateValue: string): string {
  if (!dateValue || dateValue.trim() === '') return '';
  
  try {
    // Try to parse the date
    const date = new Date(dateValue);
    
    if (isNaN(date.getTime())) {
      // If parsing failed, return original value
      return dateValue;
    }
    
    // Format as dd/MM/yyyy
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
    
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateValue;
  }
}

/**
 * Test Google Sheets connection
 */
export async function testGoogleSheetsConnection(spreadsheetId: string): Promise<boolean> {
  try {
    const sheets = await getGoogleSheetsClient();
    
    // Try to get spreadsheet metadata
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    
    console.log('Google Sheets connection successful!');
    console.log('Spreadsheet title:', response.data.properties?.title);
    
    return true;
    
  } catch (error) {
    console.error('Google Sheets connection failed:', error);
    return false;
  }
}
