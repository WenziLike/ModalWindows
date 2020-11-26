<?php
// Файлы phpmailer
require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

// require 'phpmailer/PHPMailer.php';
// require 'phpmailer/SMTP.php';
// require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['first_name'];
$surname = $_POST['last_name'];
$email = $_POST['email-address'];
$phone = $_POST['phone'];
$course = $_POST['courses'];
$connection = $_POST['connection'];
$schoolClass = $_POST['SchoolClass'];
$text = $_POST['comment']; // коментарии к письму
// $file = $_FILES['myfile'];// прикрепленный файл 

// Формирование самого письма
$title = "Вам заявка с сайта";
$body = "
<h1>Нове повідомлення</h1> 
<h2><b>Им'я:</b> $name<br></h2>
<h2><strong> Прізвище : </strong> $surname</h2>
<h2><strong> Пошта : </strong> $email</h2>
<h2><strong> Телефон : </strong> $phone</h2>
<h2><strong> Обраний курс : </strong> $course</h2>
<h2><strong> Зв'язок : </strong> $connection</h2>
<h2><strong> Клас : </strong> $schoolClass</h2>
<h2><strong> Повідомлення : </strong> $text</h2>
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function ($str, $level) {
        $GLOBALS['status'][] = $str;
    };

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'hestonamillera@gmail.com'; // Логин на почте
    $mail->Password   = '**************'; // Пароль на почте
    $mail->SMTPSecure = 'ssl'; // шифрование
    $mail->Port       = 465;
    $mail->setFrom('hestonamillera@gmail.com', 'My Test'); // Адрес самой почты и имя отправителя

    $mail->addAddress('slavamyraxin@icloud.com'); // тут устанавливаем на какую почту будет приходить 
    $mail->addAddress('hestonamillera@gmail.com'); // Ещё один, если нужен


    // Прикрипление файлов к письму
    // if (!empty($file['name'][0])) {
    //     for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
    //         $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
    //         $filename = $file['name'][$ct];
    //         if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
    //             $mail->addAttachment($uploadfile, $filename);
    //             $rfile[] = "Файл $filename прикреплён";
    //         } else {
    //             $rfile[] = "Не удалось прикрепить файл $filename";
    //         }
    //     }   
    // }
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    // Проверяем отравленность сообщения
    if ($mail->send()) {
        $result = "success";
    } else {
        $result = "error";
    }
} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
