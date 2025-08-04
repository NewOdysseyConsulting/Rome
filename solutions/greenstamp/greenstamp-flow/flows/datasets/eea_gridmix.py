# flows/datasets/eea_gridmix.py
from prefect import flow, task
import pandas as pd, io, requests
from common import s3, db, schemas, validation

RAW_BUCKET = "gs-raw-factors"
CUR_BUCKET = "gs-curated-factors"

@task(retries=3, retry_delay_seconds=15)
def download_eea() -> bytes:
    url = ("https://energy-data.europa.eu/download?dataset""=ener_ier041&format=CSV")
    resp = requests.get(url, timeout=60)
    resp.raise_for_status()
    return resp.content

@task
def stage_raw(payload: bytes) -> str:
    key = f"eea/gridmix_{pd.Timestamp.utcnow():%Y%m%d}.csv"
    s3.upload_bytes(bucket=RAW_BUCKET, key=key, data=payload)
    return key

@task
def parse_map(raw_key: str) -> pd.DataFrame:
    csv = s3.download_bytes(RAW_BUCKET, raw_key)
    df = pd.read_csv(io.BytesIO(csv))
    mapped = (
        df.rename(columns={
            "unit": "unit",
            "geo\\time": "country_code",
            "2024": "value"})    # simplified
        .assign(factor_id=lambda x: "eea_" + x.country_code + "_2024")
    )
    return mapped[["factor_id", "country_code", "value", "unit"]]

@task
def validate(df: pd.DataFrame) -> list[schemas.Factor]:
    return [schemas.Factor(**row) for row in df.to_dict("records")]

@task
def write_curated(df: pd.DataFrame):
    key = f"eea/gridmix_cur_{pd.Timestamp.utcnow():%Y%m%d}.parquet"
    s3.upload_df(bucket=CUR_BUCKET, key=key, df=df)

@task
def upsert_db(models: list[schemas.Factor]):
    db.bulk_upsert(models)

@flow
def eea_flow():
    raw = download_eea()
    raw_key = stage_raw(raw)
    df = parse_map(raw_key)
    models = validate(df)
    write_curated(df)
    upsert_db(models)
