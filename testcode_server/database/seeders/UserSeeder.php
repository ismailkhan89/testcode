<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    /**
     * Insert admin details for login
     *
     */
    echo "\e[32mSeeding:\e[0m UserSeeder\r\n";

    if (User::where('email', '=', 'admin@admin.com')->first() === null) {
      User::create([
        'name'              => 'Super Admin',
        'email'             => 'admin@admin.com',
        'email_verified_at' => now(),
        'password'          => Hash::make('admin'),
        'gender'            => 'male',
        'is_admin'          => 1,
        'status'            => 1
      ]);

      echo "\e[32mSeeding:\e[0m UserSeeder - user:admin@admin.com\r\n";
    }

    if (User::where('email', '=', 'user@gmail.com')->first() === null) {
      User::create([
        'name'              => 'New User',
        'email'             => 'user@gmail.com',
        'gender'            => 'male',
        'email_verified_at' => now(),
        'password'          => Hash::make('password'),
        'is_admin'          => 0,
        'status'            => 1
      ]);

      echo "\e[32mSeeding:\e[0m UserSeeder - user:user@gmail.com\r\n";
    }
  }
}
