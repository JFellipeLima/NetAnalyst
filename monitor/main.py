#!/bin/python3
"""
This script monitors a pre-determined domain and saves its information 
to a database for consumption.
"""
import asyncio
import httpx

#Funçôes
async def save_data(log):
    '''Save the log information in database'''
    print(log)


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
    HEADERS = {
            "Accept-Encoding": "gzip, deflate",
            "accept": "application/json"
            }
    URL = "https://google.com"
    try:
        asyncio.run(verify(URL, HEADERS))
    except KeyboardInterrupt:
        print("Manually interrupted")
