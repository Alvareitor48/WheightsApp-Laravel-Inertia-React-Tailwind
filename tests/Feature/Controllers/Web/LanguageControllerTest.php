<?php

use Illuminate\Support\Facades\App;
use function Pest\Laravel\get;

it('sets the locale correctly when a valid language is provided', function ($locale) {
    $response = get(route('setLocale', ['locale' => $locale]));

    $response->assertStatus(200);

    expect(session('locale'))->toBe($locale);

    expect(App::getLocale())->toBe($locale);
})->with(['en', 'es', 'fr', 'de']);

it('returns 400 when an invalid language is provided', function () {
    get(route('setLocale', ['locale' => 'invalid-lang']))->assertStatus(400);
});

