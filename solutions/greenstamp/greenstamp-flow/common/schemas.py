# common/schemas.py
from pydantic import BaseModel, Field

class Factor(BaseModel):
    factor_id: str  = Field(pattern=r"^[a-z0-9_]{3,}$")
    country_code: str = Field(min_length=2, max_length=2)
    value: float  = Field(gt=0)
    unit: str     = Field(regex=r"^(g|kg)_co2e(/kWh|/tkm)$")
