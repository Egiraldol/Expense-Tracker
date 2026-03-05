from pydantic import BaseModel, ConfigDict, Field
from datetime import date, datetime
from typing import Optional, Literal
from enum import Enum


class Category(str, Enum):
    Food = "Food"
    Transport = "Transport"
    Entertainment = "Entertainment"
    Services = "Services"
    Health = "Health"
    Shopping = "Shopping"
    Others = "Others"


class ExpenseBase(BaseModel):
    amount: float = Field(gt=0, le=1000000000)
    category: Category
    description: Optional[str] = Field(default=None, max_length=200)
    date: date 


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(BaseModel):
    amount: Optional[float] = Field(None, gt=0)
    category: Optional[Category] = None
    description: Optional[str] = Field(None, max_length=200)
    date: Optional[date]


class ExpenseResponse(ExpenseBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
