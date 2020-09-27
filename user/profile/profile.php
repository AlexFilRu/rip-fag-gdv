<html>
<title>Регистрация</title>
</head>
<body>
<?php
// Прием данных через массив _POST
$LN = $_POST["lastName"];
$FN = $_POST["firstName"];
$P = $_POST["patronymic"];
$BD = $_POST["birthDate"];
$SEX = $_POST["sex"];
$COUNTRY = $_POST["country"];
$CITY = $_POST["city"];
$LOGIN = $_POST["login"];
$PASS = $_POST["password"];
$ftn = $_FILES["avatar"]["tmp_name"];

if ($FN && $COUNTRY) { // Если имя и страна были введены - сохраняем их в "куки"
    setcookie("firstName", $FN, time() + (86400 * 30), "/");
    setcookie("country", $COUNTRY, time() + (86400 * 30), "/");
}

if (copy($ftn, "image.png")) {
    print("<img src=\"image.png\" id=\"avatar\">");
    print("<h4>Вы зарегистрированы</h4>");
    print("<P>Фамилия: $LN");
    print("<P>Имя: $FN");
    print("<P>Отчество: $P");
    print("<P>Дата рождения: $BD");
    print("<P>Пол: $SEX");
    print("<P>Страна: $COUNTRY");
    print("<P>Город: $CITY");
    print("<P>Логин: $LOGIN");
    print("<P>Пароль: $PASS");
} else {
    print("Ошибка! Вы забыли загрузить аватарку.");
    print("<br><br><a href=\"../signup/signup.html\">Повторить регистрацию</a>");
}
print("<br><br><a href=\"../../home.html\">Вернуться на домашнюю страницу</a>");

?>
</body>
</html>