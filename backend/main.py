from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
import crud
import schemas
from database import get_db, Base, engine


Base.metadata.create_all(bind=engine)


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/expenses/", response_model=schemas.ExpenseResponse)
def create_expense_endpoint(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    return crud.create_expense(db=db, expense=expense)


@app.get("/expenses/", response_model=list[schemas.ExpenseResponse])
def get_expenses_endpoint(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return crud.get_expenses(db=db, skip=skip, limit=limit)


@app.get("/expenses/total/")
def get_total_expenses_endpoint(db: Session = Depends(get_db)):
    return {"total": crud.get_total_expense(db=db)}


@app.put("/expenses/{expense_id}", response_model=schemas.ExpenseResponse)
def update_expense_endpoint(expense: schemas.ExpenseCreate, expense_id: int, db: Session = Depends(get_db)):
    updated_expense = crud.update_expense(db=db, expense_id=expense_id, expense_data=expense)
    if updated_expense is None:
        raise HTTPException(status_code=404, detail=f"Expense {expense_id} not found")
    return updated_expense


@app.get("/expenses/{expense_id}", response_model=schemas.ExpenseResponse)
def get_expense_endpoint(expense_id: int, db: Session = Depends(get_db)):
    expense = crud.get_expense(db=db, expense_id=expense_id)    
    if expense is None:
        raise HTTPException(status_code=404, detail=f"Expense {expense_id} not found")
    return expense


@app.delete("/expenses/{expense_id}")
def delete_expense_endpoint(expense_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_expense(expense_id=expense_id, db=db)
    if not deleted:
        raise HTTPException(status_code=404, detail="Expense not found")
    return {"message": "Expense deleted successfully"}
