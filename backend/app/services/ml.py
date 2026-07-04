import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from typing import Dict, Any

def train_model(file_paths: list[str], algorithm: str) -> Dict[str, float]:
    """Train machine learning model on uploaded CSV files."""
    
    # Combine datasets if multiple
    dfs = [pd.read_csv(fp) for fp in file_paths]
    if not dfs:
        raise ValueError("No datasets provided for training.")
        
    combined_df = pd.concat(dfs, ignore_index=True)
    
    # Assume last column is target variable
    X = combined_df.iloc[:, :-1]
    y = combined_df.iloc[:, -1]
    
    # Check if target is categorical or numerical. For classification it should be discrete.
    # If not, we might need preprocessing, but let's assume valid classification data.
    
    # Split 80% train, 20% test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Select algorithm
    if algorithm == "Logistic Regression":
        model = LogisticRegression(max_iter=1000)
    elif algorithm == "Decision Tree":
        model = DecisionTreeClassifier()
    elif algorithm == "Random Forest":
        model = RandomForestClassifier()
    else:
        raise ValueError(f"Unsupported algorithm: {algorithm}")
        
    # Train
    model.fit(X_train, y_train)
    
    # Predict
    y_pred = model.predict(X_test)
    
    # Determine average type based on target multiclass or binary
    avg_type = 'weighted' if len(y.unique()) > 2 else 'binary'
    
    try:
        accuracy = accuracy_score(y_test, y_pred) * 100
        precision = precision_score(y_test, y_pred, average=avg_type, zero_division=0) * 100
        recall = recall_score(y_test, y_pred, average=avg_type, zero_division=0) * 100
        f1 = f1_score(y_test, y_pred, average=avg_type, zero_division=0) * 100
    except Exception as e:
        # Fallback if binary fails on some data shapes
        precision, recall, f1 = 0.0, 0.0, 0.0
        accuracy = accuracy_score(y_test, y_pred) * 100
    
    return {
        "accuracy": round(accuracy, 2),
        "precision": round(precision, 2),
        "recall": round(recall, 2),
        "f1_score": round(f1, 2)
    }
