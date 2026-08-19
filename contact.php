<?php
declare(strict_types=1);

const CONTACT_EMAIL = 'hello@roofly.network';

function send_json(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => $success,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function field(string $name): string
{
    return trim((string)($_POST[$name] ?? ''));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(false, 'Only POST requests are accepted.', 405);
}

$fullName = field('full_name');
$email = field('email');
$service = field('service');
$message = field('message');
$consent = field('privacy_consent');
$honeypot = field('website');

if ($honeypot !== '') {
    send_json(true, 'Thank you. Your request has been received.');
}

if (
    $fullName === '' ||
    strlen($fullName) > 120 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $service === '' ||
    $message === '' ||
    strlen($message) > 5000 ||
    $consent !== 'yes'
) {
    send_json(false, 'Please complete all required fields and try again.', 422);
}

$safeName = str_replace(["\r", "\n"], ' ', $fullName);
$safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
$safeService = str_replace(["\r", "\n"], ' ', $service);
$subject = 'New Roofly enquiry: ' . $safeService;
$body = implode("\n", [
    'New enquiry from Roofly',
    '',
    'Name: ' . $safeName,
    'Email: ' . $safeEmail,
    'Service: ' . $safeService,
    '',
    'Message:',
    $message,
]);
$headers = [
    'From: Roofly <' . CONTACT_EMAIL . '>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=UTF-8',
];

if (PHP_SAPI !== 'cli' && PHP_SAPI !== 'cli-server') {
    @mail(CONTACT_EMAIL, $subject, $body, implode("\r\n", $headers));
}

send_json(true, 'Thank you. Your request has been received.');
