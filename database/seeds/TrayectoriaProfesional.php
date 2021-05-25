<?php

use Illuminate\Database\Seeder;

class TrayectoriaProfesional extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipo = array('Reconocimiento', 'Evaluador', 'Experiencia Profesional', 'Reunion', 'Sinodal', 'Organización de eventos', 'Estancia');
        for ($i=0; $i < count($tipo); $i++) { 
            DB::table('tipos_trayectorias')->insert([
                'Tipo' => $tipo[$i]
            ]);
        }
    }
}
