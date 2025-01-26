import asyncio
from telegram import Bot

# Replace with your bot's API token and chat ID
API_TOKEN = '8151423501:AAEKi3ApM2LX_jhkVnfm7_GqJDw490pRlXg'
CHAT_ID = '6618544268'

# Initialize the bot
bot = Bot(token=API_TOKEN)

async def send_telegram_message(message: str):
    """
    Sends a message to the specified Telegram chat.
    Args:
        message (str): The message to send.
    """
    try:
        await bot.send_message(chat_id=CHAT_ID, text=message)
        print(f"[INFO] Message sent: {message}")
    except Exception as e:
        print(f"[ERROR] Failed to send message: {e}")
