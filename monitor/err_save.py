from datetime import datetime, UTC
import traceback
import os

def log_error(exc):
    "Log the error in a file"
    filepath = os.path.join(os.path.dirname(__file__), "error.txt")
    try:
        with open(filepath, "a") as file:
            error_details = ''.join(traceback.format_exception(type(exc), exc, exc.__traceback__))
            file.write(f"{datetime.now(UTC)}: {error_details}\n")
            print(f"An {type(exc).__name__} occurred, check the error.txt file for more details\n")

    except Exception:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    except Exception as exc:
        log_error(exc)