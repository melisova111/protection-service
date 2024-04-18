<?php
include "vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use AmoCRM\{AmoAPI, AmoLead, AmoContact, AmoNote, AmoIncomingLeadForm, AmoAPIException};
use AmoCRM\TokenStorage\{FileStorage, TokenStorageException};
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('o.n.kurochkin@gmail.com', 'Заявка с сайта');
//Кому отправить
$mail->addAddress('o.n.kurochkin@gmail.com');
//Тема письма
$mail->Subject = '"Московский центр судебных экспертиз и правовых услуг"';

//Тело письма
$body = '<h2>Информация</h2>';
$txt2 = "";
if (trim(!empty($_POST['name']))) {
	$body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
	$name = $_POST['name'];
	$txt2 .= "Имя: {$_POST['name']} \r\n";
}else{
	$name = "Уточнить имя!";
}

if (trim(!empty($_POST['area']))) {
	$body .= '<p><strong>Площадь квартиры, кв.м.:</strong> ' . $_POST['area'] . '</p>';
	$txt2 .= "Площадь квартиры, кв.м.: {$_POST['area']} \r\n";

}

if (trim(!empty($_POST['cost']))) {
	$body .= '<p><strong>Стоимость квартиры по ДДУ, руб:</strong> ' . $_POST['cost'] . '</p>';
	$txt2 .= "Стоимость квартиры по ДДУ, руб: {$_POST['cost']} \r\n";

}

if (trim(!empty($_POST['nameJK']))) {
	$body .= '<p><strong>Название ЖК:</strong> ' . $_POST['nameJK'] . '</p>';
	$txt2 .= "Название ЖК: {$_POST['nameJK']} \r\n";

}

if (trim(!empty($_POST['phone']))) {
	$body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';
	$txt2 .= "Телефон: {$_POST['phone']} \r\n";

}

if (trim(!empty($_POST['checkbox']))) {
	$body .= '<p><strong>Политика конфидециальности:</strong> ' . $_POST['checkbox'] . '</p>';
	$txt2 .= "Политика конфидециальности: {$_POST['checkbox']} \r\n";

}

$mail->Body = $body;

//Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = '<div class="popup-text"><h4>Спасибо, ваша <br> заявка принята!</h4> <p>А пока вы ожидаете звонок, <b>посмотрите наше полезное видео</b> «Как увеличить компенсацию по недостаткам на 50 000 руб за счет действительно профессиональной приемки жилья»</p></div> <div class="popup-image"><img src="img/application.jpg" /> <a data-fancybox="service-1" href="https://www.youtube.com/watch?v=AKNYaCLHNT8"><img src="img/play.png"></a> </div><span class="popup-close"> <img src="img/close.png"/> </span>';
}
$subdomain    = 'mosexpert77';
try {
	AmoAPI::oAuth2($subdomain);
	$search = AmoAPI::getContacts([
        'filter' => [
            'query' => str_replace(['(',')',' ','-'],'',$_POST['phone']),
            ]
    ]);
	if($search !=''){
        $txt = "Повторная заявка \r\n".$txt2;

        $contactId = $search[0]['id'];
        $lead = new AmoLead([
            'name' => "Заявка с сайта expert77.ru",
            'pipeline' => [ 'id' => 4767400 ]
        ]);
		$lead->addTags('expert77.ru');
        $lead->setCustomFields([ 777793 => $_POST['nameJK'] ]);
		$lead->setCustomFields([ 777795 => $_POST['area'] ]);
		$lead->setCustomFields([ 817645 => $_POST['submit']  ]);
		$lead->setCustomFields([ 817647 => $_POST['submit']  ]);
		$lead->setCustomFields([ 817713 => $_POST['cost']  ]);
		

        $lead->setCustomFields([ 365733 => $_COOKIE['utm_source'] ]);
        $lead->setCustomFields([ 365727 => $_COOKIE['utm_content'] ]);
        $lead->setCustomFields([ 365729 => $_COOKIE['utm_medium'] ]);
        $lead->setCustomFields([ 365731 => $_COOKIE['utm_campaign'] ]);
        $lead->setCustomFields([ 365735 => $_COOKIE['utm_term'] ]);
        $lead->addContacts($contactId);
        $leadId = $lead->save();
   
    }else{
		$txt = $txt2;
        // Добавляем параметры сделки
        $lead = new AmoLead([
            'name' => "Заявка с сайта expert77.ru",
            'pipeline' => [ 'id' => 4767400 ]
        ]);
		$lead->addTags('expert77.ru');
        $lead->setCustomFields([ 777793 => $_POST['nameJK'] ]);
		$lead->setCustomFields([ 777795 => $_POST['area'] ]);
		$lead->setCustomFields([ 817645 => $_POST['submit']  ]);
		$lead->setCustomFields([ 817647 => $_POST['submit']  ]);
		$lead->setCustomFields([ 817713 => $_POST['cost']  ]);
        $lead->setCustomFields([ 365733 => $_COOKIE['utm_source'] ]);
        $lead->setCustomFields([ 365727 => $_COOKIE['utm_content'] ]);
        $lead->setCustomFields([ 365729 => $_COOKIE['utm_medium'] ]);
        $lead->setCustomFields([ 365731 => $_COOKIE['utm_campaign'] ]);
        $lead->setCustomFields([ 365735 => $_COOKIE['utm_term'] ]);
        $leadId = $lead->save();

        $contact = new AmoContact([
            'name' => $name,
        ]);
        $contact->setCustomFields([
            '365719' => [[
                'value' => str_replace(['(',')',' ','-'],'',$_POST['phone']),
                'enum'  => 'WORK'
            ]],
            
        ]);

        $contact->addLeads([ $leadId ]);
        $contactId = $contact->save();
    }
	if($txt !=''){
		// Создание нового события типа "обычное примечание", привязанного к сделке
		$note = new AmoNote([
			'element_id'   => $leadId,
			'note_type'    => AmoNote::COMMON_NOTETYPE,
			'element_type' => AmoNOTE::LEAD_TYPE,
			'text'         => $txt
	  ]);
      $note->save();
    }
}catch (AmoAPIException $e) {
	printf('Ошибка (%d): %s' . PHP_EOL, $e->getCode(), $e->getMessage());
}


$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
