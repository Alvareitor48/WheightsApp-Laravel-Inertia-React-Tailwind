<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    /**
     * Muestra la página de pago.
     */
    public function index(): Response
    {
        return Inertia::render('payment/pages/Payment', []);
    }
}
