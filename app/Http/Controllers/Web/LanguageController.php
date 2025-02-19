<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class LanguageController extends Controller
{
    public function setLocale(Request $request, $locale)
    {
        if (!in_array($locale, ['en', 'es', 'fr', 'de'])) {
            abort(400);
        }
        session(['locale' => $locale]);
        App::setLocale($locale);
        return Inertia::render('home/pages/Home', [
            'locale' => $locale,
            'translations' => trans('messages'),
        ]);
    }
}