""""Get information from host"""
import asyncio

import httpx
from err_save import log_error
from databasse.data import save_data
from databasse.ping import save_ping

async def verify(domain, header, cnn):
    """Connect and get information with host"""
    async with httpx.AsyncClient(
        headers=header,
        http2=True,
        follow_redirects=True,
        timeout=10,
        verify=False
    ) as client:
        while True:
            try:
                res = await client.head(domain)
                res.raise_for_status()
                latency_ms = res.elapsed.total_seconds() * 1000
                
                await save_ping(domain, res.status_code, cnn, latency_ms, res.request.method)
                                
            except (httpx.RequestError, httpx.HTTPStatusError):
                print(f"Error connecting to {domain}, retrying...")
                
                res = await client.get(domain)
                latency_ms = res.elapsed.total_seconds() * 1000
                
                await save_ping(domain, res.status_code, cnn, latency_ms, res.request.method)
                
            except Exception as exc:
                print(f"An {type(exc).__name__} occurred, check the error.txt file for more details")
                log_error(domain, cnn)
                
            finally:
                await save_data(cnn, domain)
                await asyncio.sleep(5)