<?php

use Illuminate\Database\Seeder;

class GradoAcademico extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $grados = array('Licenciatura', 'Maestria', 'Doctorado');
        for ($i=0; $i < count($grados); $i++) { 
            DB::table('grados_academicos')->insert([
                'Grado' => $grados[$i]
            ]);
        }
    }
}
