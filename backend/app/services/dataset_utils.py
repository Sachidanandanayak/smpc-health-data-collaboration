import os
import shutil
import pandas as pd
from fastapi import UploadFile

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def save_upload_file(upload_file: UploadFile, user_id: int) -> str:
    """Save the uploaded file to the uploads directory."""
    file_path = os.path.join(UPLOAD_DIR, f"{user_id}_{upload_file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    return file_path

def process_csv(file_path: str) -> dict:
    """Read CSV using Pandas and return required stats."""
    try:
        df = pd.read_csv(file_path)
        rows_count = len(df)
        columns_count = len(df.columns)
        column_names = df.columns.tolist()
        
        return {
            "rows_count": rows_count,
            "columns_count": columns_count,
            "column_names": column_names
        }
    except Exception as e:
        raise ValueError(f"Error processing CSV: {str(e)}")
