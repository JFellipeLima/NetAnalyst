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
            res = None
            try:
                res = await client.head(domain)
                res.raise_for_status()

            except httpx.HTTPStatusError as exc:
                print(f"\033[33mStatus code error for {domain}: {exc.response.status_code}, retrying...\033[33m\n")
                try:
                    res = await client.get(domain)

                except Exception as exc:
                    print(f"\033[31mError occurred while retrying with GET method for {domain}\033[0m\n")
                    log_error(exc)

            except (httpx.ConnectError, httpx.TimeoutException) as exc:
                print(f"\033[31mConnection error for {domain}\033[0m\n")
                log_error(exc)

            finally:
                if res:
                    latency = res.elapsed.total_seconds() * 1000
                    await save_ping(domain, res.status_code, latency, res.request.method)

                await save_data(cnn, domain)
                await asyncio.sleep(5)
