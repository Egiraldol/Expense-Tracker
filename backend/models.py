from database import Base
from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from datetime import datetime, date


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True)
    amount = Column(Float)
    category = Column(String(50))  
    description = Column(String(100), nullable=True)
    date = Column(Date)
    created_at = Column(DateTime, default=datetime.now)
