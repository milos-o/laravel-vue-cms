<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "name" => "Milos Ostojic",
            "email" => "milos@test.com",
            "email_verified_at" => now(),
            "password" => "user",
            "bio" => "Lorem ipsum",
            "photo" => "img/employee.png"
        ]);
        factory(User::class,5)->create();
    }
}
