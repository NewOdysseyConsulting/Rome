# flows/factor_sync.py
from prefect import flow
from datasets.eea_gridmix import eea_flow
from datasets.eurostat_energy import eurostat_flow
from datasets.jrc_freight import jrc_flow
from datasets.lcd_network import lcd_flow

@flow(log_prints=True, retries=2, retry_delay_seconds=30)
def factor_sync_master():
    eea_flow()
    eurostat_flow()
    jrc_flow()
    lcd_flow()

if __name__ == "__main__":
    factor_sync_master()
