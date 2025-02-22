<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class SetupProject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setup the Laravel project (one-time setup)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Iniciando configuración del proyecto...');
        Artisan::call('key:generate');
        $this->info('Clave de aplicación generada');

        Artisan::call('migrate:fresh --seed');
        $this->info('Migraciones y seeders ejecutados');

        $this->info('Creando usuario administrador...');
        $email = $this->ask('Ingresa el email del administrador');
        $password = $this->secret('Ingresa la contraseña del administrador');

        $admin = User::create([
            'name' => 'Admin',
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $admin->assignRole('admin');

        $this->info("Usuario administrador creado: $email");

        Artisan::call('config:clear');
        Artisan::call('cache:clear');
        Artisan::call('route:clear');
        Artisan::call('view:clear');
        $this->info('Caché limpiado');

        $this->info('Instalando dependencias de NPM y construyendo frontend...');
        exec('npm install && npm run build');

        $this->info('Proyecto configurado con éxito.');
    }
}