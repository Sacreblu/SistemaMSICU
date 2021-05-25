<?php

use Illuminate\Database\Seeder;

class Tipo_Colaboracion extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipos = array('Profesor De Tiempo Completo', 'Profesor de Cátedra', 'Profesor Posdoctorante de Tiempo Completo', 'Profesor de Tiempo Parcial Interno', 'Profesor de Tiempo Parcial Externo', 'Tutor Externo', 'Profesor Posdoctorante de Tiempo Parcial');
        for ($i=0; $i < count($tipos); $i++) { 
            DB::table('tipos_colaboraciones')->insert([
                'Tipo' => $tipos[$i]
            ]);
        }
    }
}
