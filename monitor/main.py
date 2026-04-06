#!/bin/python3
"""
This script monitors a pre-determined domain and saves its information 
to a database for consumption.
"""
import time
import os
import datetime

from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from dotenv import load_dotenv
import httpx

#Load Dotenv
load_dotenv()

#Connection with database
async def database_connect():
    """Open the connection with the database"""
    try:
        cnn = AsyncIOMotorClient(os.getenv("MONGO_PYTHON_URL"))

        print("Connected to database.")
        db = cnn["netAnalyst"]["logs"]
        return db

    except Exception as error:
        print(error)

async def data_analyst(_db):
    """get the same data and transform this a information to graphic"""

async def save_data(url, status, log):
    '''Save the log information in database'''
    try:
        await log.insert_one({
            "domain": url,
            "status_code": status,
            "date": datetime.datetime.now(datetime.UTC)
            })
        print("OK")
    except Exception as error:
        print(error)

async def verify(domain, header, cnn):
    '''Connect and get information with host'''
    async with httpx.AsyncClient(
            headers=header,
            http2=True,
            follow_redirects=True,
            timeout=10
            ) as client:
        while True:
            try:
                response = await client.head(domain)
                await save_data(domain, response.status_code, cnn)
                await asyncio.sleep(5)
            except Exception as error:
                print(error)


async def main():
    """Organize and run script"""
    db = await database_connect()
    headers = {
            "Accept-Encoding": "gzip, deflate",
            "accept": "application/json"
            }
    url = os.getenv("DOMAIN")
    try:
        await verify(url, headers, db)
    except KeyboardInterrupt:
        print("Manually interrupted")

if __name__ == "__main__":
    asyncio.run(main())
