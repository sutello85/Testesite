<?php
header('Content-Type: application/json');

// Captura a entrada bruta
$inputJSON = file_get_contents("php://input");

// Log para debug
file_put_contents("log_pagamento.txt", "Recebido: " . $inputJSON . PHP_EOL, FILE_APPEND);

// Decodifica os dados
$dados = json_decode($inputJSON, true);

if (!$dados) {
    echo json_encode(["erro" => "Nenhum dado recebido pelo servidor."]);
    exit;
}

echo json_encode(["sucesso" => "Dados recebidos", "dados" => $dados]);
?>

<?php
require __DIR__ . '/vendor/autoload.php';

MercadoPago\SDK::setAccessToken('APP_USR-4586526341093577-021012-6071125074c9db69fa9d58172bf2208c-536861086'); // Substitua pelo seu Access Token

$dados = json_decode(file_get_contents("php://input"), true);

$preference = new MercadoPago\Preference();

// Criando item de pagamento
$item = new MercadoPago\Item();
$item->title = "Plano - " . ($dados['plano'] == '1ano' ? "1 Ano, Sem Música" : "Para Sempre, Com Música");
$item->quantity = 1;
$item->currency_id = "BRL";
$item->unit_price = $dados['plano'] == '1ano' ? 9.90 : 19.90;

$preference->items = array($item);

// URLs de redirecionamento após pagamento
$preference->back_urls = array(
    "success" => "confirmacao.html?email=" . urlencode($dados['email']) . "&nome=" . urlencode($dados['nome']),
    "failure" => "index.html",
    "pending" => "index.html"
);
$preference->auto_return = "approved";

$preference->save();

echo json_encode(["init_point" => $preference->init_point]);
?>