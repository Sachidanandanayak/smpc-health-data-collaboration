import random

def generate_secret_shares(value: float, num_shares: int = 3) -> list[float]:
    """Simulate generating secret shares for a given value."""
    shares = []
    current_sum = 0
    for _ in range(num_shares - 1):
        share = random.uniform(0, value)
        shares.append(share)
        current_sum += share
    
    # Last share makes the sum equal to the value
    shares.append(value - current_sum)
    return shares

def simulate_smpc_encryption(dataset_ids: list[int]) -> dict:
    """Simulate the SMPC process as requested in the requirements."""
    # Step 1: User selects multiple datasets (passed as dataset_ids)
    
    # Step 2: Display "Encrypting datasets..." (happens in frontend or logs)
    print(f"Encrypting datasets: {dataset_ids}...")
    
    # Step 3: Generate fake secret shares
    example_value = 100.0
    shares = generate_secret_shares(example_value, num_shares=3)
    
    # Step 4: Combine shares internally
    combined_value = sum(shares)
    
    return {
        "status": "ENCRYPTED",
        "message": "Datasets encrypted using simulated SMPC.",
        "example_shares": shares,
        "combined_value": combined_value
    }
