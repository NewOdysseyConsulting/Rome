# flows/lcdn_pef.py
from prefect import flow, task
import zipfile
import requests
import io

@task
def download_pef_databases():
    urls = {
        "lite": "https://nexus.openlca.org/ws/files/36222",
        "methods": "https://nexus.openlca.org/ws/files/36223",
    }
    data = {}
    for name, url in urls.items():
        resp = requests.get(url)
        data[name] = io.BytesIO(resp.content)
    return data

@flow
def lcdn_pef_flow():
    archives = download_pef_databases()
    # e.g. unzip and parse ILCD XML files as needed
    return archives
