import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_whatsapp = os.getenv("TWILIO_WHATSAPP_NUMBER")
user_whatsapp = os.getenv("MY_WHATSAPP_NUMBER")

client = Client(account_sid, auth_token)

def send_whatsapp_alert(message):
    try:
        msg = client.messages.create(
            from_=twilio_whatsapp,
            body=message,
            to=user_whatsapp
        )
        print(f"WhatsApp message sent. SID: {msg.sid}")
    except Exception as e:
        print(f"Error sending WhatsApp message: {e}")


# report = """
# Medical Report Summary:
# - Symptoms: Breathlessness, sweating
# - Possible Cause: Heatstroke or anxiety
# - Recommendation: Seek medical attention or call helpline
# """
# send_whatsapp_alert(report)
