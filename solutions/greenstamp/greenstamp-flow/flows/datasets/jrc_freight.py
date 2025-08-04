# flows/jrc_freight.py
from prefect import flow, task
import pandas as pd
import requests

@task
def download_jrc_freight() -> pd.DataFrame:
    # Landing page for the EDGAR transport emissions dataset; 
    # use CKAN API to fetch the exact CSV resource URL programmatically.
    catalog_url = "https://data.jrc.ec.europa.eu/api/3/action/package_show"
    params = {"id": "EDGAR_2024_GHG"}
    r = requests.get(catalog_url, params=params).json()
    # pick the first resource with format CSV
    resources = r['result']['resources']
    csv_url = next(res['url'] for res in resources if res['format']=='CSV')
    df = pd.read_csv(csv_url)
    return df

@flow
def jrc_freight_flow():
    df = download_jrc_freight()
    # ... filter for freight‐transport sectors ...
    return df
