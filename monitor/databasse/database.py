"""
Connect with the database
"""
from os import getenv
from motor.motor_asyncio import AsyncIOMotorClient
from err_save import log_error
from dotenv import load_dotenv

load_dotenv()

async def database_connect():
    """Open the connection with the database"""
    try:
        cnn = AsyncIOMotorClient(
            getenv("MONGO_PYTHON_URL"), serverSelectionTimeoutMS=5000
        )
        ping = await cnn.admin.command("ping")
        if ping:
            print("Connected to the database!\n")
            return cnn["netAnalyst"]

    except Exception as error:
        log_error(error)
        return None
