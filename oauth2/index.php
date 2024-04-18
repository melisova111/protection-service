<?php
include "../vendor/autoload.php";
use AmoCRM\{AmoAPI, AmoAPIException};
use AmoCRM\TokenStorage\{FileStorage, TokenStorageException};

try {
    // Параметры авторизации по протоколу oAuth 2.0
    $clientId     = "dfdf0972-8787-458d-85d0-9b9a8110024c";
    $clientSecret = "sbaasAj2fUb8vr6zCih4kAu9nDviaKRWNXk3l42fS9B9ohDY6B5BfjIBO501WH5y";
    $authCode     = "def50200af68871befe3fc5c1e9510c14bc86d8509c3d2cd5528fbe8c993decf9b8dadd051534d8b4337fe954b4f27f633a631b53e7593678a6db6814cca5c8cfa41e5c04e3967a470f4d452d03d41d052fa89400fbda786cbbd32c4ff7a7e2c6a3e5cde33a4a7bba5bd6bdc2739c9eddcae1e0a8e872017dad37d6037536fbba161ac468285542628f7bd152792d975d52d792f5eecb81dd9c403950d080f51eb55b65e067b258f996bea491fa4aae991673dddbde29d0db8d7ef370cccb025014fe219b0635c6469d6484ffd238a70b98d99faf7e611bcb8798edbedcf0272abbd500874bf53324af1825f4317ca10972948fe3f93ffdc97dc9c7b2d4d755ac2d36edb8aa192603e39ba89cb74a9fcfd09f5f10b6e49906283bfb4f7410f2a272ca2ccc36a2b8c9f4c036f2747e5a9e82413ea43b095f101d2b84bfa8f07fd01389c22a300853b54f435e6c45acc31b59f4c4441bc3d7ef7f956db2580a806ca5d65e7b0dfbbab0d454d2c61c670663ef3be905a7f867b29c79af63ec11484a7b5ffaf2974e958f619a2319bc364dfb88c703d2e0b299b2136643abe3d3adc1572005a4d0384dc7f353b6cd12ae1c79f0957b601455aeae7cfcf59f7958dffee4d5cff17462e";
    $redirectUri  = "https://expert77.ru/oauth2/";
    $subdomain    = 'mosexpert77';

    $domain = AmoAPI::getAmoDomain($subdomain);
    $isFirstAuth = !(new FileStorage())->hasTokens($domain);

    if ($isFirstAuth) {
        // Первичная авторизация
        AmoAPI::oAuth2($subdomain, $clientId, $clientSecret, $redirectUri, $authCode);
    } else {
        // Последующие авторизации
        AmoAPI::oAuth2($subdomain);
    }

    // Получение информации об аккаунте вместе с пользователями и группами
    print_r(AmoAPI::getAccount($with = 'users,groups'));

} catch (AmoAPIException $e) {
    printf('Ошибка авторизации (%d): %s' . PHP_EOL, $e->getCode(), $e->getMessage());
} catch (TokenStorageException $e) {
    printf('Ошибка обработки токенов (%d): %s' . PHP_EOL, $e->getCode(), $e->getMessage());
}