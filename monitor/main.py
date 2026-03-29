#!/bin/python3
import asyncio
import httpx

#Funçôes
async def save_data(response):
    '''Save the log information in database'''
    print(response)


async def verify(domain, header):
    '''Connect and get information with host'''
    async with httpx.AsyncClient(
            headers=header,
            http2=True,
            follow_redirects=True,
            timeout=10
            ) as client:
        while True:
            response = await client.head(domain)
            await save_data(response.status_code)
            await asyncio.sleep(15)


#Tests
if __name__ == "__main__":
    header = {
            "Accept-Encoding": "gzip, deflate",
            "accept": "application/json"
            }
    domain = "https://google.com"
    try:
        asyncio.run(verify(domain, header))
    except KeyboardInterrupt:
        print("Manually interrupt")
