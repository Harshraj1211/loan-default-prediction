from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import joblib
import pandas as pd

app = FastAPI(title="Loan Default Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
BASE_DIR = Path(__file__).resolve().parent

model = joblib.load(BASE_DIR / "Loan_Default_Final.pkl")
scaler = joblib.load(BASE_DIR / "Scaler.pkl")


class LoanInput(BaseModel):
    Age: int
    Income: float
    LoanAmount: float
    CreditScore: int
    MonthsEmployed: int
    NumCreditLines: int
    InterestRate: float
    LoanTerm: int
    DebtToIncomeRatio: float
    Education: str
    EmploymentType: str
    MaritalStatus: str
    HasMortgage: str
    HasDependents: str
    LoanPurpose: str
    HasCoSigner: str


@app.post("/api/predict")
def predict(data: LoanInput):

    # Create feature dictionary
    features = {
        "Age": data.Age,
        "Income": data.Income,
        "LoanAmount": data.LoanAmount,
        "CreditScore": data.CreditScore,
        "MonthsEmployed": data.MonthsEmployed,
        "NumCreditLines": data.NumCreditLines,
        "InterestRate": data.InterestRate,
        "LoanTerm": data.LoanTerm,
        "DebtToIncomeRatio": data.DebtToIncomeRatio,
        "Education": data.Education,
        "EmploymentType": data.EmploymentType,
        "MaritalStatus": data.MaritalStatus,
        "HasMortgage": data.HasMortgage,
        "HasDependents": data.HasDependents,
        "LoanPurpose": data.LoanPurpose,
        "HasCoSigner": data.HasCoSigner,
    }

    # Convert to DataFrame
    df = pd.DataFrame([features])

    # One-hot encode categorical columns
    categorical_cols = [
        "Education",
        "EmploymentType",
        "MaritalStatus",
        "HasMortgage",
        "HasDependents",
        "LoanPurpose",
        "HasCoSigner",
    ]

    df = pd.get_dummies(
        df,
        columns=categorical_cols,
        drop_first=True,
        dtype=int
    )

    # Expected columns from training
    expected_cols = [
        "Age",
        "Income",
        "LoanAmount",
        "CreditScore",
        "MonthsEmployed",
        "NumCreditLines",
        "InterestRate",
        "LoanTerm",
        "DebtToIncomeRatio",
        "Education_High School",
        "Education_Master's",
        "Education_PhD",
        "EmploymentType_Part-time",
        "EmploymentType_Self-employed",
        "EmploymentType_Unemployed",
        "MaritalStatus_Married",
        "MaritalStatus_Single",
        "HasMortgage_Yes",
        "HasDependents_Yes",
        "LoanPurpose_Business",
        "LoanPurpose_Education",
        "LoanPurpose_Home",
        "LoanPurpose_Other",
        "HasCoSigner_Yes",
    ]

    # Add missing columns
    for col in expected_cols:
        if col not in df.columns:
            df[col] = 0

    # Keep columns in exact training order
    df = df[expected_cols]

    # Scale numeric columns
    numeric_cols = [
        "Age",
        "Income",
        "LoanAmount",
        "CreditScore",
        "MonthsEmployed",
        "NumCreditLines",
        "InterestRate",
        "LoanTerm",
        "DebtToIncomeRatio",
    ]

    df[numeric_cols] = scaler.transform(df[numeric_cols])

    # Predict
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return {
        "prediction": int(prediction),
        "result": "Default" if prediction == 1 else "No Default",
        "probability": round(float(probability) * 100, 2),
    }


@app.get("/api/health")
def health():
    return {"status": "ok"}