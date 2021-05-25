<?php

use Illuminate\Database\Seeder;

class Pais extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $paises = array('Estados Unidos', 'México', 'Canadá', 'España', 'Guatemala', 'Colombia', 'Ecuador', 'Argentina', 'Chile');
        for ($i=0; $i < count($paises); $i++) { 
            DB::table('paises')->insert([
                'Pais' => $paises[$i]
            ]);
        }
    }
}
