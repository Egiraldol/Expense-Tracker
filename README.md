# Expense Tracker

A modern expense tracking application designed to help users manage, filter, and analyze their personal finances efficiently. The application provides a clean and responsive interface, allowing users to register, visualize, and filter expenses with ease.

## Features

### Expense Management
- Create new expenses with amount, category, description, and date
- Update existing expenses
- Delete expenses
- View a list of all recorded expenses

### Data Visualization and Organization
- Expenses sorted from latest to earliest
- Vertical scroll behavior for long lists
- Display total expenses dynamically
- Category-based organization

### Filtering System
- Filter by custom date range
- Filter by specific month
- Quick filters:
  - All
  - This month
  - Last month
  - Last 3 months
- Visual indicator of active filters
- Display of filtered results count

### User Experience Enhancements
- Empty state when no expenses are registered
- Responsive design for desktop and mobile
- Mobile optimization with collapsible form
- Consistent and modern UI styling

## Tech Stack

### Frontend
- React
- CSS (custom styling with variables)

### Backend
- FastAPI
- SQLAlchemy

### Database
- Relational database managed through SQLAlchemy ORM


## Installation

### Frontend

1. Navigate to the backend folder:
`cd frontend`

2. Install dependencies:
`npm install`

3. Start the development server:
`npm run dev`

### Backend
1. Navigate to the backend folder:
`cd backend`

2. Install dependencies:
`pip install -r requirements.txt`

3. Run the server:
`uvicorn main:app --reload`


## Usage

- Add a new expense using the form
- Use filters to refine displayed data
- Monitor totals and expense distribution
- Scroll through expenses in a responsive list

## Future Improvements

- Authentication and user accounts
- Data persistence per user
- Charts and analytics dashboard
- Export functionality
- Category customization

## License

This project is for educational and personal use.
