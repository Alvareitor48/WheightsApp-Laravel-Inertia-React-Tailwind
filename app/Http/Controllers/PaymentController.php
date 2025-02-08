<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
