#!/bin/python3
import httpx
import asyncio 

#Funçôes
async def Save_data(response):
    '''Save the log information in database'''
    body = response
    print(body)


async def Verify(HOST, HEADERS):
    '''Connecr and get informarion with host'''
    async with httpx.AsyncClient(headers=HEADERS,http2=True, follow_redirects=True,timeout=10) as client:
        while True:
            response = await client.head(HOST)
            await Save_data(response.status_code)
            await asyncio.sleep(15)

        return "Connection time expired"


#Testes
if __name__ == "__main__":
    HEADERS= {
            "Accept-Encoding": "gzip, deflate",
            "accept": "application/json"
            }
    HOST= "https://bancocn.com"
    try:
        asyncio.run(Verify(HOST, HEADERS))
    except KeyboardInterrupt:
        print("Manualy interrompted")
