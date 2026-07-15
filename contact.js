document.getElementById('studioVerificationForm').addEventListener('submit', function(eventInstance) {
    eventInstance.preventDefault();

    const nameVal = document.getElementById('studioInputName').value.trim();
    const emailVal = document.getElementById('studioInputEmail').value.trim();
    const phoneVal = document.getElementById('studioInputPhone').value.trim();
    const messageVal = document.getElementById('studioInputMessage').value.trim();
    const feedbackConsole = document.getElementById('studioValidationAlertConsole');

    feedbackConsole.classList.add('state-hidden');
    feedbackConsole.innerHTML = "";

    let capturedLogs = [];

    if (!nameVal || !emailVal || !phoneVal || !messageVal) {
        capturedLogs.push("Error noticed: Missing text inside required form blocks.");
    }

    const standardMailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailVal && !standardMailExpression.test(emailVal)) {
        capturedLogs.push("Validation Failure: Structured email domain configuration invalid.");
    }

    const purelyDigitsExpression = /^\d+$/;
    if (phoneVal && !purelyDigitsExpression.test(phoneVal)) {
        capturedLogs.push("Type Mismatch: Telephone entries permit numeric string data purely.");
    }

    if (capturedLogs.length > 0) {
        feedbackConsole.innerHTML = capturedLogs.join('<br>');
        feedbackConsole.classList.remove('state-hidden');
        return;
    }

    alert("Validation Complete: All client parameters approved for mock environment dispatch.");
    document.getElementById('studioVerificationForm').reset();
});