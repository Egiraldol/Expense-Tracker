from sqlalchemy.orm import Session
from sqlalchemy import func
from models import Expense
from schemas import ExpenseCreate, ExpenseResponse


def create_expense(db: Session, expense: ExpenseCreate) -> Expense:
    db_expense = Expense(
        amount=expense.amount,
        category=expense.category,
        description=expense.description,
        date=expense.date
    )

    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    
    return db_expense


def update_expense(db: Session, expense_id: int, expense_data: ExpenseCreate) -> Expense | None:
    db_expense = get_expense(db, expense_id)

    if db_expense is None:
        return None
    
    db_expense.amount = expense_data.amount
    db_expense.category = expense_data.category
    db_expense.description = expense_data.description
    db_expense.date = expense_data.date

    db.commit()
    db.refresh(db_expense)
    
    return db_expense
    

def get_expenses(db: Session, skip: int = 0, limit: int = 100) -> list[Expense]:
    query = db.query(Expense)
    expenses = query.offset(skip).limit(limit).all()
    
    return expenses


def get_expense(db: Session, expense_id: int) -> Expense | None:
    query = db.query(Expense)
    expense = query.filter(Expense.id == expense_id).first()

    return expense


def get_total_expense(db: Session) -> float:
    total_expense = db.query(func.sum(Expense.amount)).scalar()

    if total_expense is None:
        return 0.0
    
    return total_expense


def delete_expense(db: Session, expense_id: int) -> bool:
    db_expense = get_expense(db, expense_id)
    if db_expense is None:
        return False
    
    db.delete(db_expense)
    db.commit()

    return True