from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine
from presidio_analyzer import RecognizerResult

def redact_selected_pii(text: str) -> tuple:
    # Initialize the analyzer and anonymizer engines
    analyzer = AnalyzerEngine()
    anonymizer = AnonymizerEngine()

    # Analyze the text for PII
    results = analyzer.analyze(text=text, language="en")

    redacted_text = text
    masked_pii = []

    # Redact each PII entity found
    for result in results:
        if result.entity_type in ["PERSON", "EMAIL", "PHONE", "CREDIT_CARD", "BANK_ACCOUNT"]:
            redacted_text = redacted_text[:result.start] + "[REDACTED]" + redacted_text[result.end:]
            masked_pii.append(result)

    return redacted_text
