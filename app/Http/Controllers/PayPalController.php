<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PayPalController extends Controller
{
    public function createOrder(Request $request)
    {
        $client_id = config('services.paypal.client_id');
        $secret = config('services.paypal.secret');

        if (!$client_id || !$secret) {
            return response()->json(['error' => 'Credenciales de PayPal no configuradas'], 500);
        }

        $total = $request->input('total');

        if (!$total || !is_numeric($total)) {
            return response()->json(['error' => 'El valor de total es inválido'], 400);
        }

        try {
            $response = Http::withBasicAuth($client_id, $secret)
                ->post('https://api-m.sandbox.paypal.com/v2/checkout/orders', [
                    'intent' => 'CAPTURE',
                    'purchase_units' => [[
                        'amount' => [
                            'currency_code' => 'EUR',
                            'value' => $total
                        ]
                    ]]
                ]);

            $data = $response->json();

            if (!isset($data['id'])) {
                return response()->json(['error' => 'No se pudo crear la orden', 'details' => $data], 500);
            }

            return response()->json(['id' => $data['id']]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la API de PayPal', 'details' => $e->getMessage()], 500);
        }
    }
    public function capturePayment(Request $request)
    {
        $orderId = $request->input('orderId');
        $user = User::find($request->input('userId'));
        if ($user->hasRole('premium')||$user->hasRole('admin')) {
            return response()->json(['message' => 'El usuario ya tiene privilegios, pago no necesario'], 200);
        }
        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        if (!$orderId) {
            return response()->json(['error' => 'OrderId no recibido'], 400);
        }

        try {
            $response = Http::withBasicAuth(config('services.paypal.client_id'), config('services.paypal.secret'))
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ])
                ->post("https://api-m.sandbox.paypal.com/v2/checkout/orders/{$orderId}/capture", null);

            $data = $response->json();
            if (isset($data['status']) && $data['status'] === 'COMPLETED') {
                $user->syncRoles(['premium']);
                return response()->json([
                    'message' => 'Pago exitoso',
                    'transaction_id' => $data['id'] ?? null,
                    'redirect' => route('dashboard')
                ]);
            }
            return response()->json(['error' => 'No se pudo capturar el pago', 'details' => $data], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la API de PayPal', 'details' => $e->getMessage()], 500);
        }
    }
}
