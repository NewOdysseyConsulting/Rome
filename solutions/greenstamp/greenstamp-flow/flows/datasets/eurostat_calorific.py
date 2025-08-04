# flows/eurostat_calorific.py
from prefect import flow, task
import pandas as pd

@task
def download_calorific() -> pd.DataFrame:
    # Please verify the product code 'nrg_ind_fd' in the Eurostat database
    url = (
        "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/"
        "nrg_ind_fd?compressed=true&format=TSV"
    )
    df = pd.read_csv(url, sep='\t')
    return df

@flow
def eurostat_calorific_flow():
    df = download_calorific()
    # ... further processing ...
    return df
