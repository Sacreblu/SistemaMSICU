<?php

use Illuminate\Database\Seeder;

class Tipo_Contratacion extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipos = array('Profesor Tiempo Completo - Titular A', 'Profesor Tiempo Completo - Titular B', 'Profesor Tiempo Completo - Titular C', 'Investigador Cátedras Conacyt', 'Investigador', 'Profesor Tiempo Parcial/Por Asignatura', 'Técnico Academico Tiempo Completo - Titular B');
        for ($i=0; $i < count($tipos); $i++) { 
            DB::table('tipos_contrataciones')->insert([
                'Tipo' => $tipos[$i]
            ]);
        }
    }
}
