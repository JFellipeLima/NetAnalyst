#!/bin/python3
"""
This script monitors a pre-determined domain and saves that information
to a database for consumption and vidualization of graphic.
"""
import os
import asyncio
from dotenv import load_dotenv
from databasse.database import database_connect
from verify import verify

load_dotenv()

async def local_check(domain_list, total):
    """Check if the domain is down"""
    while True:
        check = [i for i in domain_list.values() if i == 0]
        if len(check) == len(total):
            print(
                "\033[33m Local network error detected.., check your connection.\033[0m\n"
            )
        await asyncio.sleep(5)

async def main():
    """Organize and run script"""
    db = await database_connect()
    if db is None:
        print("Failed to connect to the database. Verify wifi or credentials.\n")
        return

    domain_list = {}

    headers = {"Accept-Encoding": "gzip, deflate", "accept": "application/json"}
    domains = [verify(url, headers, db, domain_list) for url in os.getenv("DOMAINS").split(",")] 
    await asyncio.gather(
        *domains,
        local_check(domain_list, domains)
    )

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Keyboard interrupted")
