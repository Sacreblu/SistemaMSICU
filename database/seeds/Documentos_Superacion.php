<?php

use Illuminate\Database\Seeder;

class Documentos_Superacion extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipos = array('Certificación', 'Curso');
        for ($i=0; $i < count($tipos); $i++) { 
            DB::table('documentos_superacions')->insert([
                'Tipo' => $tipos[$i]
            ]);
        }
    }
}
