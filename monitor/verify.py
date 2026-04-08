import time
import asyncio

import httpx
from database import save_data, save_ping

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
                start = time.monotonic()
                res = await client.head(domain)
                latency_ms = (time.monotonic() - start) * 1000
                await save_data(cnn, domain)
                await save_ping(domain, res.status_code, cnn, latency_ms, res.request.method)
                await asyncio.sleep(5)
            except Exception as error:
                print(error)
