# Focus App - Context & Flow

## Overview
A productivity application designed to help users focus on single tasks through AI-powered prioritization and distraction-free focus sessions.

## Core User Flow

### 1. Welcome & Onboarding
- Clean, minimalist welcome screen
- Email-based signup/login
- Brief onboarding explaining core features
  - Task management
  - AI prioritization
  - Focus sessions

### 2. Main Dashboard
- AI-prioritized task list
- Task management options:
  - Quick-add task button
  - AI chat interface for natural task entry
  - Task details: title, description, deadline, priority
- Visual task organization by priority levels
- Progress overview of daily/weekly achievements

### 3. Task Entry Methods
#### Quick Add
- Single-line task entry
- Basic fields: title, optional deadline
- AI automatically assigns priority

#### AI Chat Interface
- Natural conversation for task entry
- AI extracts task details from conversation
- Contextual suggestions for task organization
- Option to break down complex tasks

### 4. Focus Mode
#### Initiation
- Single-click entry from dashboard
- Displays current task details
- Configurable session duration
- Option to customize break intervals

#### During Session
- Notification blocking
- Timer display
- Current task prominently shown
- Emergency exit option

#### Post-Session
- Session summary
- Progress tracking
- Options to:
  - Start another session
  - Take a scheduled break
  - Return to dashboard

## Key Features

### AI Priority System
- Analyzes task urgency and importance
- Considers user work patterns
- Adapts to completion history
- Suggests optimal task ordering

### Focus Enhancement
- System-level notification blocking
- Distraction-free interface
- Progress tracking
- Break reminders

### Progress Tracking
- Session statistics
- Daily/weekly productivity metrics
- Task completion trends
- Focus time analytics

## Technical Considerations
- Real-time task updates
- Offline capability
- Cross-platform sync
- Secure data storage
- Privacy-first AI implementation

## User Preferences
- Customizable session durations
- Break interval settings
- Notification preferences
- Theme options
- AI interaction style

## Database Schema

### Users
- id: UUID (primary key)
- email: string (unique)
- password_hash: string
- name: string
- created_at: timestamp
- updated_at: timestamp
- preferences: jsonb
  - session_duration: integer
  - break_intervals: integer
  - notification_settings: json
  - theme: string

### Tasks
- id: UUID (primary key)
- user_id: UUID (foreign key)
- title: string
- description: text
- deadline: timestamp
- priority: integer
- status: enum (pending, in_progress, completed)
- created_at: timestamp
- updated_at: timestamp
- ai_metadata: jsonb

### FocusSessions
- id: UUID (primary key)
- user_id: UUID (foreign key)
- task_id: UUID (foreign key)
- start_time: timestamp
- end_time: timestamp
- duration: integer
- completed: boolean
- break_count: integer

### ActivityLogs
- id: UUID (primary key)
- user_id: UUID (foreign key)
- action_type: enum
- metadata: jsonb
- created_at: timestamp

## Project Structure

```
focus-app/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
│   │   │   ├── routes/
│   │   │   └── validators/
│   │   ├── config/
│   │   ├── db/
│   │   │   ├── migrations/
│   │   │   └── models/
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   ├── auth/
│   │   │   └── tasks/
│   │   └── utils/
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── focus/
│   │   │   └── tasks/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── tests/
│   └── package.json
├── docs/
│   ├── api/
│   ├── deployment/
│   └── context.md
└── README.md
```

I've added two new main sections:

1. Database Schema - Defines the core tables with their fields and relationships
2. Project Structure - Shows a comprehensive folder structure for both frontend and backend

The database schema follows best practices with:
- UUID primary keys for scalability
- Proper foreign key relationships
- Timestamp fields for tracking
- JSONB fields for flexible data storage
- Appropriate data types for each field

The folder structure follows a clean architecture approach with:
- Separate frontend and backend directories
- Clear separation of concerns
- Organized component structure
- Dedicated testing directories
- Comprehensive documentation setup

Would you like me to explain any specific part in more detail?
