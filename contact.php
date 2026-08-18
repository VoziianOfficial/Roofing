<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

const CONTACT_EMAIL = 'hello@roofly.network';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Only POST requests are accepted.']);
    exit;
}

$fullName = trim((string)($_POST['full_name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$service = trim((string)($_POST['service'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$consent = (string)($_POST['privacy_consent'] ?? '');
$honeypot = trim((string)($_POST['website'] ?? ''));

if ($honeypot !== '') {
    echo json_encode(['success' => true, 'message' => 'Thanks.']);
    exit;
}

if ($fullName === '' || mb_strlen($fullName) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL) || $service === '' || $message === '' || mb_strlen($message) > 5000 || $consent !== 'yes') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please complete all required fields and try again.']);
    exit;
}

$subject = 'New Roofly enquiry: ' . $service;
$body = "Name: {$fullName}\nEmail: {$email}\nService: {$service}\n\nMessage:\n{$message}";
$headers = "From: " . CONTACT_EMAIL . "\r\nReply-To: " . $email . "\r\nContent-Type: text/plain; charset=UTF-8\r\n";

// On a configured host this sends the enquiry. The JSON response keeps the browser flow asynchronous.
@mail(CONTACT_EMAIL, $subject, $body, $headers);

echo json_encode(['success' => true, 'message' => 'Your request has been received.']);
