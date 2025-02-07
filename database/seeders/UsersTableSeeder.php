<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::factory()
            ->state([
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('1234'),
            ])
            ->create();

        $admin->assignRole('admin');

        $user = User::factory()
            ->state([
                'name' => 'User',
                'email' => 'user@user.com',
                'password' => bcrypt('1234'),
            ])
            ->create();

        $user->assignRole('user');

        $premium = User::factory()
            ->state([
                'name' => 'Premium',
                'email' => 'premium@premium.com',
                'password' => bcrypt('1234'),
            ])
            ->create();

        $premium->assignRole('premium');
    }
}
