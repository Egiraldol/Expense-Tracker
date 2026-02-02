from pydantic import BaseModel, ConfigDict
from datetime import date, datetime
from typing import Optional, Literal


class ExpenseBase(BaseModel):
    amount: float
    category: Literal["Comida", "Transporte", "Entretenimiento", "Servicios", "Salud", "Compras", "Otros"]
    description: Optional[str] = None
    date: date


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseResponse(ExpenseBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
