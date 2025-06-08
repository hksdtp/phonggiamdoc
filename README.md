# Work Tracker - Công việc phòng Giám Đốc

Modern task management web application with real-time Google Sheets integration.

## ✨ Features

- 📱 **Mobile-first design** - Optimized for mobile devices
- 🎨 **Modern UI** - Clean, elegant interface inspired by iOS/macOS
- 👥 **Multi-user support** - Separate views for different team members
- 📊 **Real-time stats** - Progress tracking and completion metrics
- 🔍 **Advanced filtering** - Search, status, and category filters
- 📈 **Progress visualization** - Visual progress bars and status indicators
- 🔄 **Google Sheets sync** - Automatic synchronization with Google Sheets
- 📱 **Responsive design** - Works perfectly on all devices

## 🚀 Tech Stack

- **Frontend:** Next.js 15, React, TypeScript
- **Styling:** Tailwind CSS
- **Integration:** Google Sheets API
- **Deployment:** Vercel

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- Google Cloud Project with Sheets API enabled
- Google Service Account credentials

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd work-tracker
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env.local
```

4. Configure Google Sheets integration
- Create a Google Sheet with the required columns
- Share it with your service account email
- Update GOOGLE_SHEET_ID in .env.local

5. Run development server
```bash
npm run dev
```

## 📊 Google Sheets Integration

### Required Columns

| Column | Description |
|--------|-------------|
| ID | Unique task identifier |
| Title | Task title |
| Description | Task description |
| Department | Department/category |
| Assignee | Person responsible |
| Progress | Completion percentage (0-100) |
| Status | Current status |
| Start_Date | Start date (dd/MM/yyyy) |
| End_Date | End date (dd/MM/yyyy) |
| Notes | Additional notes |
| Feedback | Feedback/comments |

### Auto-sync

The application automatically syncs with Google Sheets when:
- Page loads
- Data changes in the sheet (with webhook setup)

## 🚀 Deployment

### Vercel Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Environment Variables

```env
GOOGLE_SHEET_ID=your_sheet_id
SHEET_RANGE=Tasks!A:K
WEBHOOK_SECRET=your_secret_token
GOOGLE_SERVICE_ACCOUNT_KEY=base64_encoded_credentials
```

## 📱 Usage

1. **View Tasks** - Browse tasks by assignee (Mr Hùng/Ninh)
2. **Filter Tasks** - Use search, status, and category filters
3. **Track Progress** - Monitor completion status and progress
4. **Click Stats** - Filter by total or completed tasks
5. **Task Details** - Click any task to view full details

## 🎨 Design Features

- **Glassmorphism** - Modern transparent design elements
- **Smooth animations** - Fluid transitions and interactions
- **Color-coded categories** - Visual organization by department
- **Progress indicators** - Clear visual progress tracking
- **Mobile optimization** - Touch-friendly interface

## 🔧 Development

### Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # React components
├── data/               # Static data files
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

### Key Components

- `MobileTabLayout` - Main layout with user tabs
- `MobileTaskTable` - Task list with filtering
- `TaskModal` - Detailed task view
- Google Sheets integration in `lib/google-sheets.ts`

## 📄 License

MIT License - see LICENSE file for details.
