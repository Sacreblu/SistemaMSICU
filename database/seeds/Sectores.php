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
        $sector = array('Evento Académico', 'Productivo', 'Social', 'Gubernamental', 'Estancia Académica', 'Congreso');
        for ($i=0; $i < count($sector); $i++) { 
            DB::table('sectores')->insert([
                'Sector' => $sector[$i]
            ]);
        }
    }
}
