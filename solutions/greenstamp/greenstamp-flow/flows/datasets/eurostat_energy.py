# flows/eurostat_energy.py
from prefect import flow, task
import pandas as pd

@task
def download_energy_balance() -> pd.DataFrame:
    url = (
        "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/"
        "nrg_bal_c?compressed=true&format=TSV"
    )
    df = pd.read_csv(url, sep='\t')
    return df

@flow
def eurostat_energy_flow():
    df = download_energy_balance()
    # ... further processing ...
    return df
