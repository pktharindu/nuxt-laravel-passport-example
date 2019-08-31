<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $users = [[
            'id'             => 1,
            'name'           => 'Admin',
            'email'          => 'admin@admin.com',
            'password'       => '$2y$10$f/Qo.ARmfeWoyKSZ34wDIeXKzmg8oz1RbpEuNAML4b6xt7YfylzUO',
            'remember_token' => null,
        ]];

        User::insert($users);
    }
}
