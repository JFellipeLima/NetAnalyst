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


async def main():
    """Organize and run script"""
    db = await database_connect()

    headers = {"Accept-Encoding": "gzip, deflate", "accept": "application/json"}
    url = os.getenv("DOMAIN")
    domains_test = [
        "https://www.google.com",
        "https://www.twitter.com",
    ]
    progress = [verify(url, headers, db) for url in domains_test]

    await asyncio.gather(*progress)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Keyboard interrupted")
