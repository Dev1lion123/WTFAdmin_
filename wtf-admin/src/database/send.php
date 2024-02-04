<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Подключаем PHPMailer
require 'path/to/your/PHPMailer/Exception.php';
require 'path/to/your/PHPMailer/PHPMailer.php';
require 'path/to/your/PHPMailer/SMTP.php';

// Получаем данные из формы
$name = $_POST['name'];
$email = $_POST['email'];
// Другие поля формы

// Создаем экземпляр PHPMailer
$mail = new PHPMailer();

// Настраиваем параметры для отправки через SMTP
$mail->isSMTP();
$mail->Host = 'smtp.your-email-provider.com'; // Укажите свой SMTP-сервер
$mail->SMTPAuth = true;
$mail->Username = 'your-email@example.com'; // Укажите свой email
$mail->Password = 'your-email-password'; // Укажите пароль от почты
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

// Настройки письма
$mail->setFrom('your-email@example.com', 'Your Name');
$mail->addAddress('recipient@example.com', 'Recipient Name');
$mail->Subject = 'Новая форма отправлена';
$mail->Body = "Имя: $name\nEmail: $email\n"; // Добавьте другие поля по необходимости

// Отправляем письмо
if ($mail->send()) {
    $response = ['success' => true, 'message' => 'Форма успешно отправлена'];
} else {
    $response = ['success' => false, 'message' => 'Ошибка отправки формы'];
}

// Возвращаем ответ клиенту в формате JSON
header('Content-type: application/json');
echo json_encode($response);
?>
