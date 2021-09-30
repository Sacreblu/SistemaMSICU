<?php

use Illuminate\Database\Seeder;

class Sectores extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sector = array('Practica de Movilidad en el Sector Social', 'Practica de Movilidad en el Sector Productivo', 'Practica de Movilidad en el Sector Gubernamental', 'Estancia Académica', 'Congreso');
        for ($i=0; $i < count($sector); $i++) { 
            DB::table('sectores')->insert([
                'Sector' => $sector[$i]
            ]);
        }
    }
}
